<template>
<section id="publishing-card" class="ez-card" title="Publishing">
    <header class="ez-card__header">
      <h2 class="ez-card__title">Settings</h2>
      <div class="ez-card__controls">
        <button id="edit" class="btn" type="button" @click="isDialogOpen = true">Edit</button>
        <button id="validate" class="btn" type="button" disabled>Validate</button>
      </div>
    </header>

    <div class="group-set">
      <h4 class="label-text">Google Credentials JSON</h4>
      <p class="monospace-text">{{ validAccountInfo ? '*********' : '—' }}</p>
    </div>

    <div class="group-set">
      <h4 class="label-text">Pub/Sub Topic</h4>
      <p class="monospace-text">{{ productTopic || '—' }}</p>
    </div>

    <div class="ez-dialog" :class="{'ez-dialog_open': isDialogOpen}">
      <section class="ez-dialog__inner">
        <header class="ez-dialog__header">Settings</header>
        <div class="ez-dialog__content">
          <div class="custom-file-input ez-dialog__controls">
            <label for="file-input" class="custom-file-input__label">{{ loadedFileName || 'Load from file' }}</label>
            <input type="file" id="file-input" class="custom-file-input__input" @change="onFileChange"/>
          </div>

          <form action="" class="ez-dialog__form">
            <label for="account_info" class="label-text">Google Credentials JSON</label>
            <textarea :value="accountInfo" class="code account-info-area" id="account_info" @input="onAccountInfoUpdate" materialize ref="textarea-account-info"></textarea>

            <label for="product_topic" class="label-text">Pub/Sub Topic</label>
            <textarea :value="productTopic" class="code topic-area" id="product_topic" @input="onTopicUpdate" materialize></textarea>
          </form>
        </div>
        <footer class="ez-dialog__footer">
          <button type="button" class="btn btn_large" @click="isDialogOpen = false">Cancel</button>
          <button @click="saveConfig" class="btn btn_large" :disabled="!canSaveCreds">{{ saveBtnText }}</button>
        </footer>
      </section>
    </div>
</section>
</template>


<script>
import {
  updateSettings,
} from '~scripts/api';

import {
  googleUploadBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  isValidJSON,
} from '~scripts/helpers';

// import hljs from 'highlight.js/lib/core';
// import jsonLang from 'highlight.js/lib/languages/json'; // Replace with the desired language
// import 'highlight.js/styles/default.css'; // Replace with the desired stylesheet

// hljs.registerLanguage('json', jsonLang);

const simplestJSONLength = 9;


export default {
  inject: ['$injector'],

  props: {
    accountInfo: String,
    productTopic: String,
  },
  data() {
    return {
      saveBtnText: 'Save',
      isDialogOpen: false,
      loadedFileName: '',
    };
  },

  computed: {
    validAccountInfo: vm => isValidJSON(vm.accountInfo) && vm.accountInfo.length >= simplestJSONLength,
    canSaveCreds: vm => vm.validAccountInfo && !!vm.productTopic,
  },

  methods: {
    sendMsg(msg) {
      this.$injector.emit('snackbar:message', msg);
    },
    handleErr(err) {
      this.$injector.emit('snackbar:error', err);
    },

    async saveConfig() {
      this.saveBtnText = 'Saving...';

      try {
        // eslint-disable-next-line camelcase
        const account_info = JSON.parse(this.accountInfo);
        // eslint-disable-next-line camelcase
        const product_topic = this.productTopic;

        await updateSettings({ account_info, product_topic });

        console.log('Success:');

        this.sendMsg('Settings saved');
      } catch (err) {

        console.log('Got error:', err);

        this.handleErr(err);
      }

      this.saveBtnText = 'Save';
    },

    onAccountInfoUpdate(e) {
      this.$emit('account-info-update', e.target.value);
    },
    onTopicUpdate(e) {
      this.$emit('product-topic-update', e.target.value);
    },

    onFileChange(evt) {
      const file = evt.target.files[0];
      this.loadedFileName = file.name.slice(0, 20) + '...' + file.name.slice(-20, file.name.length);

      const reader = new FileReader();
      reader.onload = (evt) => {
        const fileContent = evt.target.result;
        this.onAccountInfoUpdate({ target: { value: fileContent }});
      };
      reader.readAsText(file);
    }
  },
};
</script>


<style scoped>
textarea[materialize] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  box-sizing: border-box;

  width: 100%;
  padding: 12px;
  background: var(--theme-controls-background);
  border: 1px solid var(--theme-border-color);
  border-radius: 2px;

  color: var(--base-text-color);
  font-family: var(--theme-font-family);
  font-size: var(--theme-font-size-smaller);
  font-style: normal;
  font-weight: 400;
  line-height: 1.2em;
}

textarea[materialize]:focus-visible {
  outline-width: 0;
  border-color: var(--accent);
  border-color: var(--dark-grey);
}

textarea[materialize]:disabled {
  border-style: dashed;
}

textarea[materialize].code,
.code {
  color: var(--base-text-color);
  font-family: var(--monospace-font-family);
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  background: var(--controls-field-bg, #FBFBFB);
  border: 1px solid var(--controls-field-outline, #D8D8D8);
  border-radius: 2px;
}


textarea[materialize].code:not(:last-child) {
  margin-bottom: 24px;
}

.account-info-area {
  min-height: 372px;
}

.topic-area {
  min-height: 84px;
}


/*-----------*/
/* EZ-DIALOG */
/*-----------*/

.ez-dialog {
  position: fixed;
  top: 0;
  left: 0;

  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  pointer-events: none;
  opacity: 0;

  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
  transition: opacity 0.3s ease-in;
}

.ez-dialog_open {
  opacity: 1;
  pointer-events: auto;
}

.ez-dialog__inner {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 580px;
  padding: 0;
  border-radius: 4px;
  border: 1px solid var(--light-grey, #E0E0E0);
  background-color: white;
  opacity: 0;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s ease-in;
  box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.25);
}

.ez-dialog_open > .ez-dialog__inner {
  opacity: 1;
}

.ez-dialog__header {
  color: var(--base-text-color, #212121);
  font-family: var(--theme-font-family);
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  text-transform: capitalize;

  padding: 24px 24px 20px 24px;
  background-color: var(--white-smoke, #F5F5F5);
}

.ez-dialog__content {
  position: relative;
  padding: 24px;
}

.ez-dialog__form {
  display: flex;
  flex-flow: column nowrap;

  width: auto;
  margin: 0;
}

.ez-dialog__footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  gap: 16px;
  padding: 8px 16px;
}

.ez-dialog__controls {
  position: absolute;
  top: 20px;
  right: 24px;
}


/*********************/
/* custom-file-input */
/*********************/

.custom-file-input {

}

.custom-file-input__label {
  box-sizing: border-box;

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.48px;
  text-transform: uppercase;

  color: var(--base-text-color, #212121);

  display: flex;
  height: 28px;
  padding: 4px 10px 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  cursor: pointer;
}

.custom-file-input__input {
  display: none;
}
</style>
