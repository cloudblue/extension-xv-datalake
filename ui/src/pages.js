/*
Copyright (c) 2023, Rahul
All rights reserved.
*/
import {
  combineStylesStr,
  getSettings,
  getStyleCustomizations,
  updateSettings,
} from './utils';

import {
  addEventListener,
  disableButton,
  enableButton,
  hideComponent,
  setAttrOnComponent,
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

    // // NOTE: confirm logic

    // const confirm = document.getElementById('confirm');

    // const onConfirmClick = () => {
    //   app.emit('confirm', {
    //     title: 'Please confirm me!',
    //     text: 'Don\'t read it — just say OK',
    //   });
    // };

    // confirm.addEventListener('click', onConfirmClick);
    // confirm.addEventListener('keydown', onConfirmClick);

    // const result = document.getElementById('result');
    // app.watch('confirmationToken', (val) => {
    //   if (val) {
    //     result.textContent = `${result.textContent}: ${val}`;
    //     result.style.display = 'block';
    //   }
    // });
  } catch (error) {
    app.emit('snackbar:error', error);
    showComponent('error');
  }
  hideComponent('loader');
  showComponent('app');
};
