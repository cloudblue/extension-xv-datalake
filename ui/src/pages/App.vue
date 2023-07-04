<template>
  <section class="app" :style="cssStyles">
    <div class="loader" v-if="showLoader" @click="hide"></div>

    <div v-else>
      <sync-card></sync-card>

      <pub-card
        :account-info="accountInfo"
        :product-topic="productTopic"
        @account-info-update="evt => accountInfo = evt"
        @product-topic-update="avt => productTopic = evt"
      ></pub-card>

      <error-card v-if="showError"></error-card>
    </div>
  </section>
</template>



<script>
import SyncCard from './SyncCard.vue';
import PubCard from './PubCard.vue';
import ErrorCard from './ErrorCard.vue';

import {
  // combineStylesStr,
  getSettings,
  getStyleCustomizations,
} from '../utils';


// const injector = inject('$injector');

// const sendMsg = (msg) => injector.emit({ name: 'snackbar:message', value: msg });
// const handleErr = (err) => injector.emit({ name: 'snackbar:error', value: err });

export default {
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
      productInfo: '',
    };
  },
  methods: {
    hide(){
      this.showLoader = false;
    },
    async fetchSettings() {
      const { account_info, product_topic, error } = await getSettings();

      this.accountInfo = account_info;
      this.productTopic = product_topic;

      if (error) {
        this.showError = true;
      }
    },
  },
  mounted() {
    /* eslint-disable-next-line */
    console.log('App component is mounted!');

    const { styleCustomizations } = getStyleCustomizations().computed;
    const stylesObj = styleCustomizations(); // NOTE: use argument for theming
    // const cssStyleString = combineStylesStr(stylesObj);

    this.cssStyles = stylesObj;

    this.fetchSettings().then(() => {
      this.showLoader = false;
    });
  },
}
</script>


<style scoped>
:root {
  /* // Theme */
  --primary: var(--theme_primary);
  --primary-rgb: var(--theme_primary_rgb);
  --accent: var(--theme_accent);
  --accent-rgb: var(--theme_accent_rgb);
  --contrast: var(--theme_contrast);
  --contrast-rgb: var(--theme_contrast_rgb);
  --contrast-accent: var(--theme_contrast);


  /* Layout */
  --module: 4px;

  --edge-gap: calc(var(--module) * 6);
  --theme-content-min-width: 1200px;
  --tab-border-width: 3px;

  --conversation-width: 340px;
  --toolbar-height: 64;

  /* Font */
  --general-font-size: 14px;
  --general-line-height: 20px;

  --theme-font-family: Roboto, "Helvetica Neue", sans-serif;

  --theme-font-size: 16;
  --theme-font-size-h1: 24;
  --theme-line-height-h1: 28;
  --theme-font-size-h2: 20;
  --theme-line-height-h2: 24;
  --theme-font-size-smaller: 14;
  --theme-font-size-small: 12;

  --theme-space-1: 64;
  --theme-space-2: 24;
  --theme-space-3: 16;
  --theme-space-4: 8;

  /* Colors */
  --base-text-color: #212121;
  --assistive-text-color: #707070;
  --theme-grey-1: #666666;
  --theme-light-1: #e0e0e0;
  --theme-black: rgba(0, 0, 0, 0.97);
  --theme-black-2: rgba(0, 0, 0, 0.67);
  --theme-black-3: rgba(0, 0, 0, 0.57);
  --theme-black-4: rgba(0, 0, 0, 0.37);
  --theme-black-5: rgba(0, 0, 0, .5);
  --theme-hover-accent: rgba(0, 0, 0, 0.04);
  --theme-white: rgba(255, 255, 255, 0.97);
  --theme-white-2: rgba(255, 255, 255, 0.67);
  --theme-white-3: rgba(255, 255, 255, 0.57);
  --theme-white-4: rgba(255, 255, 255, 0.85);
  --theme-primary-color: #2196f3;
  --theme-icon-common-color: rgba(0, 0, 0, 0.87);
  --theme-border-color: rgba(0, 0, 0, 0.12);
  --theme-controls-background: rgba(0, 0, 0, 0.01);
  --theme-empty-state-text-color: rgba(0, 0, 0, 0.37);
  --white: white;
  --white-smoke: #f5f5f5;

  --layout-padding: 16px;
  --layout-xs: 600px;
  --layout-sm: 960px;
  --layout-md: 1280px;
  --layout-lg: 1920px;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-bold: 500;

  --sidebar-width-small: 232px;
  --sidebar-width-medium: 320px;

  /* red */
  --red: #f44336;
  --pink: #d21a44;
  --nice-red: #FF6A6A;

  /* green */
  --green: #0bb071;
  --light-green: #00c853;
  --olive: #8bc34a;

  /* grey */
  --dark-grey: #424242;
  --mid-grey: #bdbdbd;
  --light-grey: #e0e0e0;

  /* orange */
  --orange: #f5871f;
  --orange-dimmed: #F2994A;
  --orange-tenn: #D65900;

  /* states */
  --success: var(--light-green);
  --failed: var(--pink);
  --warning: var(--red);

  /* blue */
  --dark-blue: #1565c0;
  --light-blue: #2C98F0;

  /* yellow */
  --nice-yellow: #F2C94C;
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

/*--------*/
/* EZ-CARD */
/*--------*/

.ez-card { /* section */
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  padding: 18px 24px 24px 24px;
  display: block;
  text-decoration: inherit;
  color: inherit;

  margin: 0 auto;
  max-width: 680px;
}

.ez-card--error {
  color: var(--nice-red);
}

.ez-card + .ez-card {
  margin-top: 24px;
}

.ez-card__header{
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  margin-bottom: 26px;
}

.ez-card__title {
  flex-grow: 1;

  line-height: 25px;
  font-size: 20px;
  margin: 0;
}

.ez-card__controls {
}

.ez-card__subtitle {
  font-size: 14px;
  line-height: 20px;
  color: #707070;
  margin: 0;
}
</style>

<!--script setup>
import { ref, inject, onMounted } from 'vue';

import SyncCard from './SyncCard.vue';
import PubCard from './PubCard.vue';
import ErrorCard from './ErrorCard.vue';

import {
  combineStylesStr,
  getSettings,
  getStyleCustomizations,
} from '../utils';


// const injector = inject('$injector');

// const sendMsg = (msg) => injector.emit({ name: 'snackbar:message', value: msg });
// const handleErr = (err) => injector.emit({ name: 'snackbar:error', value: err });

const props = defineProps({
  title: String,
});

const showLoader = ref(true);
const showError = ref(false);
const cssStyles = ref({});

const accountInfo = ref('');
const productTopic = ref('');

const fetchSettings = async () => {
  const { account_info, product_topic, error } = await getSettings();

  accountInfo.value = account_info;
  productTopic.value = product_topic;

  if (error) {
    showError.value = true;
  }
};

const hide = () => showLoader.value = false;

// fetchSettings();

onMounted(() =>  {
  /* eslint-disable-next-line */
  console.log('App component is mounted!');

  const { styleCustomizations } = getStyleCustomizations().computed;
  const stylesObj = styleCustomizations(); // NOTE: use argument for theming
  // const cssStyleString = combineStylesStr(stylesObj);

  cssStyles.value = stylesObj;

  // await fetchSettings();

  showLoader.value = false;
});
</script-->


