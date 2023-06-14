/*
Copyright (c) 2023, Rahul
All rights reserved.
*/
import {
  getSettings,
  updateSettings,
} from './utils';

import {
  addEventListener,
  disableButton,
  enableButton,
  hideComponent,
  showComponent,
} from './components';


export const saveSettingsData = async (app) => {
  if (!app) return;
  disableButton('save', 'Saving...');
  try {
    // eslint-disable-next-line camelcase
    const account_info = JSON.parse(document.getElementById('account_info').value);
    // eslint-disable-next-line camelcase
    const product_topic = document.getElementById('product_topic').value;
    // eslint-disable-next-line camelcase
    await updateSettings({ account_info, product_topic });
    app.emit('snackbar:message', 'Settings saved');
  } catch (error) {
    app.emit('snackbar:error', error);
  }
  enableButton('save', 'Save');
};

export const settings = async (app) => {
  if (!app) return;
  showComponent('loader');
  hideComponent('app');
  hideComponent('error');
  enableButton('save', 'Save');
  try {
    // eslint-disable-next-line camelcase
    const { account_info, product_topic } = await getSettings();

    const accountInfoInput = document.getElementById('account_info');
    // eslint-disable-next-line camelcase
    accountInfoInput.value = JSON.stringify(account_info);

    const productTopicInput = document.getElementById('product_topic');
    // eslint-disable-next-line camelcase
    productTopicInput.value = product_topic;

    enableButton('save', 'Save');
    addEventListener('save', 'click', saveSettingsData.bind(null, app));
    showComponent('app');
  } catch (error) {
    app.emit('snackbar:error', error);
    showComponent('error');
  }
  hideComponent('loader');
  showComponent('app');
};
