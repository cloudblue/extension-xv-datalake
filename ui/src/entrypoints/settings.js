/*
Copyright (c) 2023, Rahul
All rights reserved.
*/

import createApp, {
  Card,
} from '@cloudblueconnect/connect-ui-toolkit';

import {
  createApp as createVueApp,
} from 'vue';


import 'normalize.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto-mono/400.css';
import '~styles/settings.css';
import '~styles/common.styl';

import App from '~components/App.vue';


createApp({
  'settings-card': Card,
}).then((connectBus) => {
  const app = createVueApp(App);

  app.provide('$injector', connectBus);
  app.mount('#app');
});

