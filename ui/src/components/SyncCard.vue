<template>
<section id="synchronisation-card" class="ez-card" title="Synchronisation">

    <div class="ez-dialog" :class="{'ez-dialog_open': isSyncDialogOpen}">
      <section class="ez-dialog__inner">
        <header class="ez-dialog__header">Sync Products</header>
        <div class="ez-dialog__content">
          <form action="" class="ez-dialog__form">
            <div class="ez-text-field ez-text-field_search ez-dialog__search">
              <c-icon :icon="icons.googleSearchBaseline" size="24" class="ez-text-field__icon"></c-icon>
              <input type="search" v-model="searchQuery" class="ez-text-field__input" placeholder="Search for product"/>
            </div>

            <ul class="products-list" v-if="products.length">
              <li class="products-list__item products-list__item_header products-item">
                <div class="products-item__heading">Product</div>
                <!-- <div class="products-item__heading">Vendor</div> -->
              </li>

              <li class="products-list__item products-list__item_all products-item">
                <label class="products-item__title" for="select-all">All</label>
                <input
                  id="select-all"
                  type="checkbox"
                  v-model="syncAll"
                  @change="toggleAll($event)"
                />
              </li>

              <li v-for="p in filteredProducts" :key="p.id" class="products-list__item products-item">
                <img v-if="p.icon" class="products-item__logo" :src="p.icon" alt=""/>
                <label class="products-item__title" :for="p.id">
                  {{ p.name }}
                  <span class="products-item__assistive-text">{{ p.id }}</span>
                </label>
                <input
                  type="checkbox"
                  :id="p.id"
                  :checked="selectedProductsIds[p.id]"
                  @change="toggle($event)"
                />
              </li>
            </ul>
          </form>
        </div>
        <footer class="ez-dialog__footer">
          <button type="button" class="btn btn_large" @click="isSyncDialogOpen = false">Cancel</button>
          <button @click="syncProducts" class="btn btn_large"
            :disabled="isSyncing || !productsToSync.length">{{ syncBtnText }}</button>
        </footer>
      </section>
    </div>

    <header class="ez-card__header">
        <h2 class="ez-card__title">{{ title || 'Synchronisation' }}</h2>
        <div class="ez-card__controls"><button
            id="sync"
            class="btn btn_default"
            type="button"
            :disabled="!enabled"
            @click="isSyncDialogOpen = true"
          >Sync products</button></div>
    </header>

    <c-alert
      v-if="showValidation"
      class="ez-card__alert"
      type="success"
      :message="syncedProductsMsg"
      :fluid="true"
      :icon="icons.googleCheckCircleBaseline"
    ></c-alert>
</section>
</template>


<script>
import {
  map,
  reduce,
  filter,
  prop,
  join,
} from 'ramda';

import {
  googleSyncBaseline,
  googleCheckCircleBaseline,
  googleSearchBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import cAlert from '~components/ezAlert.vue';
import cIcon from '~components/ezIcon.vue';

import Fuse from 'fuse.js';

import {
  getProducts,
  publishProducts,
  publishAllProducts,
} from '~scripts/api';


export default {
  inject: ['$injector'],
  props: {
    title: String,
    enabled: Boolean,
  },
  components: {
    cAlert,
    cIcon,
  },
  data() {
    return {
      isSyncDialogOpen: false,
      isSyncing: false,
      showValidation: false,
      syncBtnText: 'Sync',

      products: [],
      searchQuery: '',

      selectedProductsIds: [],
      syncAll: false,

      icons: {
        googleSyncBaseline,
        googleCheckCircleBaseline,
        googleSearchBaseline,
      },
    };
  },
  computed: {
    productsToSync: vm => filter(p => vm.selectedProductsIds[p.id] === true, vm.products),
    syncedProductsMsg: vm => `Products: '${ join(', ', map(prop('name'), vm.productsToSync)) }' are successfully synced`,
    filteredProducts() {
      if (!this.searchQuery) return this.products;

      const fuse = new Fuse(this.products, { keys: ['name', 'id'] });
      const results = fuse.search(this.searchQuery);
      return results.map((result) => result.item);
    },
  },
  methods: {
    sendMsg(msg) {
      this.$injector.emit('snackbar:message', msg);
    },
    handleErr(err) {
      this.$injector.emit('snackbar:error', err);
    },

    async syncProducts() {
      this.syncBtnText = 'Syncing...'

      try {
        await publishProducts(this.productsToSync);
        this.sendMsg('Selected products synced');
      } catch (err) {
        this.handleErr(err);
      }

      this.syncBtnText = 'Sync';
      this.showValidation = true;
      this.isSyncDialogOpen = false;

      setTimeout(() => {
        this.showValidation = false;
      }, 10000);
    },
    async syncAllProducts() {
      this.syncBtnText = 'Syncing all...'
      await publishAllProducts();
      this.syncBtnText = 'Sync';
    },
    toggle(evt) {
      const pId = evt.target.id;
      const isChecked = evt.target.checked;
      this.selectedProductsIds[pId] = isChecked;
    },
    toggleAll(evt) {
      const isChecked = evt.target.checked;
      for (const key in this.selectedProductsIds) {
        if (this.selectedProductsIds.hasOwnProperty(key)) {
          this.selectedProductsIds[key] = isChecked;
        }
      }
    },
  },

  watch: {
    async isSyncDialogOpen(newVal) {
      if (newVal === true) {
        this.products = await getProducts();
        this.syncAll = false;
        this.selectedProductsIds = reduce((acc, p) => {
          acc[p.id] = false;
          return acc;
        }, {}, this.products);
      }
    },
  },
};
</script>


<style scoped>
.products-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.products-list__item_all {
  height: 48px;
  padding: 4px 0px;
  align-items: center;
  flex-shrink: 0;
}

.products-list__item_header {
  background: var(--white-smoke, #f5f5f5);
  border-bottom: 1px solid var(--assistive-text-color, #070707);
}

.products-item {
  display: flex;
  padding: 6px 8px;
  flex-flow: row nowrap;
  align-items: center;
}

.products-item:not(:last-of-type) {
  padding-bottom: 5px;
  border-bottom: 1px solid var(--light-grey, #E0E0E0);
}

.products-item__heading {
  color: var(--assistive-text-color, #707070);

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.48px;
  text-transform: uppercase;
}

.products-item__logo {
  box-sizing: border-box;
  display: block;
  width: 32px;
  height: 32px;
  overflow: hidden;
  border-width: 0;
  border-radius: 2px;
  margin-right: 8px;
}

.products-item__title {
  display: flex;
  flex-flow: column nowrap;
  flex-grow: 1;

  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  color: var(--content-body-text, #212121);
  text-overflow: ellipsis;
}

.products-item__assistive-text {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  color: var(--light-grey, #E0E0E0);
}
</style>
