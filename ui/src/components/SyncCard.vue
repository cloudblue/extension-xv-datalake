<template>
  <section
    id="synchronisation-card"
    class="ez-card"
    title="Synchronisation"
  >
    <div
      class="ez-dialog"
      :class="{'ez-dialog_open': isSyncDialogOpen}"
    >
      <section class="ez-dialog__inner">
        <header class="ez-dialog__header">
          Sync Products
        </header>
        <div class="ez-dialog__content">
          <form
            action=""
            class="ez-dialog__form"
          >
            <div class="ez-text-field ez-text-field_search ez-dialog__search">
              <c-icon
                :icon="icons.googleSearchBaseline"
                size="24"
                class="ez-text-field__icon"
              />
              <input
                v-model="searchQuery"
                type="search"
                class="ez-text-field__input"
                placeholder="Search for product"
              >
            </div>

            <ul
              v-if="products.length"
              class="products-list"
            >
              <li class="products-list__item products-list__item_header products-item">
                <div class="products-item__heading">
                  Product
                </div>
                <div class="products-item__heading">
                  Vendor
                </div>
              </li>

              <li class="products-list__item products-list__item_all products-item">
                <div class="products-item__part">
                  <label
                    class="products-item__title"
                    for="select-all"
                  >All</label>
                </div>
                <div class="products-item__part">
                  <input
                    id="select-all"
                    v-model="syncAll"
                    type="checkbox"
                    class="products-item__checkbox"
                    @change="toggleAll($event)"
                  >
                </div>
              </li>

              <li
                v-for="p in filteredProducts"
                :key="p.id"
                class="products-list__item products-item"
              >
                <div class="products-item__part">
                  <img
                    v-if="p.icon"
                    class="products-item__logo"
                    :src="p.icon"
                    alt=""
                  >
                  <label
                    class="products-item__title"
                    :for="p.id"
                  >
                    {{ p.name }}
                    <span class="products-item__assistive-text">{{ p.id }}</span>
                  </label>
                </div>
                <div class="products-item__part">
                  <img
                    v-if="p.owner.icon"
                    class="products-item__logo"
                    :src="p.owner.icon"
                    alt=""
                  >
                  <label
                    class="products-item__title"
                    :for="p.id"
                  >
                    {{ p.owner.name }}
                    <span class="products-item__assistive-text">{{ p.owner.id }}</span>
                  </label>
                </div>
                <div class="products-item__part">
                  <input
                    :id="p.id"
                    type="checkbox"
                    :checked="selectedProductsIds[p.id]"
                    class="products-item__checkbox"
                    @change="toggle($event)"
                  >
                </div>
              </li>
            </ul>
          </form>
        </div>
        <footer class="ez-dialog__footer">
          <c-button
            label="Cancel"
            @click="isSyncDialogOpen = false"
          />
          <c-button
            color="light blue"
            :disabled="!productsToSync.length"
            :loading="isSyncing"
            label="Sync"
            @click="syncProducts"
          />
        </footer>
      </section>
    </div>


    <header class="ez-card__header">
      <h2 class="ez-card__title">
        {{ title || 'Synchronisation' }}
      </h2>
      <div class="ez-card__controls">
        <c-button
          id="sync"
          :disabled="!enabled"
          :icon="icons.googleSyncBaseline"
          :size="14"
          color="light blue"
          label="Sync products"
          mode="solid"
          small
          @click="isSyncDialogOpen = true"
        />
      </div>
    </header>

    <c-alert
      v-if="showValidation"
      class="ez-card__alert"
      type="success"
      :message="syncedProductsMsg"
      :fluid="true"
      :icon="icons.googleCheckCircleBaseline"
    />
  </section>
</template>


<script>
import {
  filter,
  join,
  map,
  prop,
  reduce,
} from 'ramda';

import {
  googleCheckCircleBaseline,
  googleSearchBaseline,
  googleSyncBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import cAlert from '~components/ezAlert.vue';
import cIcon from '~components/ezIcon.vue';
import cButton from '~components/cButton.vue';

import Fuse from 'fuse.js';

import {
  getProducts,
  publishAllProducts,
  publishProducts,
} from '~scripts/api';


export default {
  inject: ['$injector'],

  components: {
    cAlert,
    cIcon,
    cButton,
  },

  props: {
    title: {
      type: String,
      default: '',
    },

    enabled: Boolean,
  },

  data() {
    return {
      isSyncDialogOpen: false,
      isSyncing: false,
      showValidation: false,

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
    syncedProductsMsg: vm => `Products: '${join(', ', map(prop('name'), vm.productsToSync))}' are successfully synced`,
    filteredProducts() {
      if (!this.searchQuery) return this.products;

      const fuse = new Fuse(this.products, { keys: ['name', 'id', 'owner.name', 'owner.id'] });
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
      this.isSyncing = true;

      try {
        await publishProducts(this.productsToSync);
        this.sendMsg('Selected products synced');
      } catch (err) {
        this.handleErr(err);
      } finally {
        this.isSyncing = false;
      }

      this.showValidation = true;
      this.isSyncDialogOpen = false;

      setTimeout(() => {
        this.showValidation = false;
      }, 10000);
    },

    async syncAllProducts() {
      await publishAllProducts();
    },

    toggle(evt) {
      const pId = evt.target.id;
      this.selectedProductsIds[pId] = evt.target.checked;
    },

    toggleAll(evt) {
      const isChecked = evt.target.checked;
      Object.keys(this.selectedProductsIds).forEach(key => {
        this.selectedProductsIds[key] = isChecked;
      });
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
  padding: 4px 0;
  align-items: center;
  flex-shrink: 0;
}

.products-list__item_header {
  background: var(--white-smoke, #f5f5f5);
  border-bottom: 1px solid var(--assistive-text-color, #070707);
}

.products-item {
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  align-items: center;
  padding: 6px 8px;
  border-bottom: 1px solid var(--light-grey, #E0E0E0);
}

.products-item:last-of-type {
  border-width: 0;
}

.products-item__part {
  display: flex;
  justify-content: flex-start;
  flex-flow: row nowrap;
  align-items: center;

  width: calc((100% - 44px) / 2);
}

.products-item__part:nth-last-of-type(2) {
  flex-grow: 1;
}

.products-item__part:last-child {
  width: 44px;
  padding: 15px 11px 15px 15px;
}

.products-item__heading {
  color: var(--assistive-text-color, #707070);

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.48px;
  text-transform: uppercase;

  width: calc((100% - 44px) / 2);
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

.products-item__checkbox {
  width: 18px;
  height: 18px;
}
</style>
