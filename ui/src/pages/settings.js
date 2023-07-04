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

// import {
//   settings,
// } from '../pages';
//
//
import '@fontsource/roboto/500.css';

// import '../../styles/index.css';

// import './app.css';

// import Component from './app.js';
// import Component from './App.vue';

import App from './App.vue';

/* eslint-disable-next-line */
console.log(App);

createApp({
  'settings-card': Card,
  // 'app-root': App,
}).then((connectBus) => {
  const app = createVueApp(App);

  app.mount('#app');
  app.$connectBus = connectBus;
});

// .then(settings);

