import template from './app.html';

import './app.css';

import SyncCard from './SyncCard.vue';
// import PubCard from './PubCard.vue';
// import ErrorCard from './ErrorCard.vue';

import {
  // combineStylesStr,
  getSettings,
  getStyleCustomizations,
} from '../utils';


export default {
  template,
  components: {
    SyncCard,
    // PubCard,
    // ErrorCard,
  },

  // inject: ['$injector', '$boiler'],
  props: {
    title: String,
  },
  data() {
    return {
      showLoader: true,
      showError: false,
      cssStyles: {},
      accountInfo: '',
      productTopic: '',
    };
  },
  methods: {
    hide() {
      this.showLoader = false;
    },

    async fetchSettings() {
      // eslint-disable-next-line
      console.log('fetchSettings:');

      // eslint-disable-next-line camelcase
      const { account_info, product_topic, error } = await getSettings();

      // eslint-disable-next-line camelcase
      this.accountInfo = account_info;
      // eslint-disable-next-line camelcase
      this.productTopic = product_topic;

      if (error) {
        this.showError = true;
      }
    },
  },

  mounted() {
    const { styleCustomizations } = getStyleCustomizations().computed;
    const stylesObj = styleCustomizations(); // NOTE: use argument for theming
    // const cssStyleString = combineStylesStr(stylesObj);

    this.cssStyles = stylesObj;


    this.fetchSettings().then(() => {
      // eslint-disable-next-line
      console.log('style app:', stylesObj);

      this.showLoader = false;
    });
  },
};
