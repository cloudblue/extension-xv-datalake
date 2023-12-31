/*
Copyright (c) 2023, Rahul
All rights reserved.
*/
import {
  getSettings,
  updateSettings,
} from '~scripts/api';

import {
  addEventListener,
  combineStylesStr,
  disableButton,
  enableButton,
  getStyleCustomizations,
  hideComponent,
  setAttrOnComponent,
  showComponent,
} from '~scripts/utils';


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

    app.emit({ name: 'snackbar:message', value: 'Settings saved' });
  } catch (error) {
    app.emit({ name: 'snackbar:error', value: error });
  }
  enableButton('save');
};


export const settings = async (app) => {
  if (!app) return;

  const { styleCustomizations } = getStyleCustomizations().computed;
  const stylesObj = styleCustomizations(); // NOTE: use argument for theming
  const cssStyleString = combineStylesStr(stylesObj);

  showComponent('loader');
  hideComponent('app');
  setAttrOnComponent('app', 'style', cssStyleString);
  hideComponent('error');
  enableButton('save');


  try {
    /* eslint-disable-next-line */ // camelcase
    const { account_info, product_topic } = await getSettings();

    const accountInfoInput = document.getElementById('account_info');
    // eslint-disable-next-line camelcase
    accountInfoInput.value = JSON.stringify(account_info);

    const productTopicInput = document.getElementById('product_topic');
    // eslint-disable-next-line camelcase
    productTopicInput.value = product_topic;

    enableButton('save');
    addEventListener('save', 'click', saveSettingsData.bind(null, app));
  } catch (error) {
    app.emit('snackbar:error', error);
    showComponent('error');
  }
  hideComponent('loader');
  showComponent('app');
};
