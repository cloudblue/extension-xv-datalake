<template>
  <section class="app" :style="cssStyles">
    <div class="loader" v-if="showLoader" @click="hide"></div>

    <div v-else>
      <sync-card :enabled="syncEnabled"></sync-card>

      <pub-card
        :account-info="accountInfo"
        :product-topic="productTopic"
        @account-info-update="onInfoUpdate"
        @product-topic-update="onTopicUpdate"
        @validation-success="() => syncEnabled = true"
        @validation-error="() => syncEnabled = false"
      ></pub-card>

      <error-card v-if="showError"></error-card>
    </div>
  </section>
</template>



<script>
import SyncCard from '~components/SyncCard.vue';
import PubCard from '~components/PubCard.vue';
import ErrorCard from '~components/ErrorCard.vue';

import {
  getSettings,
} from '~scripts/api';

import {
  getStyleCustomizations,
} from '~scripts/utils';


export default {
  inject: ['$injector'],
  components: {
    SyncCard,
    PubCard,
    ErrorCard,
  },
  data() {
    return {
      showLoader: true,
      showError: false,
      cssStyles: {},
      accountInfo: '',
      productTopic: '',
      syncEnabled: false,
    };
  },
  methods: {
    hide(){
      this.showLoader = false;
    },
    async fetchSettings() {
      const { account_info, product_topic, error } = await getSettings();

      this.accountInfo = JSON.stringify(account_info);
      this.productTopic = product_topic;

      if (error) {
        this.showError = true;
      }
    },
    onInfoUpdate(evt) {
      this.accountInfo = evt;
      this.syncEnabled = false;
    },
    onTopicUpdate(evt) {
      this.productTopic = evt;
      this.syncEnabled = false;
    },
  },
  mounted() {
    const { styleCustomizations } = getStyleCustomizations().computed;
    const stylesObj = styleCustomizations(); // NOTE: use argument for theming

    this.cssStyles = stylesObj;

    this.fetchSettings().then(() => {
      this.showLoader = false;
    });

  },
};
</script>


<style scoped>
.app {
  box-sizing: border-box;
  min-height: 640px;
  padding-top: 24px;
}

.loader {
  width: 48px;
  height: 48px;
  border: 5px solid white;
  border-bottom-color: #1565c0;
  border-radius: 50%;
  display: block;
  margin: 96px auto 0;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

