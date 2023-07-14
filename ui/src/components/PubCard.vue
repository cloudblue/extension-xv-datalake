<template>
<section id="publishing-card" class="ez-card" title="Publishing">
    <header class="ez-card__header">
      <h2 class="ez-card__title">Settings</h2>
      <div class="ez-card__controls">
        <button class="btn btn_outlined" type="button" @click="isDialogOpen = true">Edit</button>
        <button class="btn btn_outlined" type="button" :disabled="!canSaveCreds"
          @click="validateConfig">{{ validateBtnText }}</button>
      </div>
    </header>

    <c-alert
      v-if="isValidationSuccess"
      class="ez-card__alert"
      message="Settings are valid"
      type="success"
      :fluid="true"
      :icon="icons.googleCheckCircleBaseline"
    ></c-alert>

    <c-alert
      v-else-if="isValidationError"
      class="ez-card__alert"
      :message="validationError || 'Settings invalid'"
      type="error"
      :fluid="true"
      :icon="icons.googleWarningBaseline"
    ></c-alert>

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
            <label for="file-input" class="custom-file-input__label">
              <c-icon :icon="icons.googleUploadBaseline" size="16" class="custom-file-input__label-icon"></c-icon>
              {{ loadedFileName || 'Load from file' }}
            </label>
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
          <button @click="saveConfig" class="btn btn_large btn_accent" :disabled="!canSaveCreds">{{ saveBtnText }}</button>
        </footer>
      </section>
    </div>
</section>
</template>


<script>
import {
  validateSettings,
  updateSettings,
} from '~scripts/api';

import {
  googleUploadBaseline,
  googleWarningBaseline,
  googleCheckCircleBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  isValidJSON,
} from '~scripts/helpers';

import cAlert from '~components/ezAlert.vue';
import cIcon from '~components/ezIcon.vue';


const simplestJSONLength = 9;


export default {
  inject: ['$injector'],
  props: {
    accountInfo: String,
    productTopic: String,
  },

  components: {
    cAlert,
    cIcon,
  },
  data() {
    return {
      saveBtnText: 'Save',
      validateBtnText: 'Validate',
      isDialogOpen: false,
      isValidationSuccess: false,
      isValidationError: false,
      validationError: '',
      loadedFileName: '',
      icons: {
        googleUploadBaseline,
        googleCheckCircleBaseline,
        googleWarningBaseline,
      },
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

        const { error } = await updateSettings({ account_info, product_topic });

        if (!error) {
          this.sendMsg('Settings saved');
        } else {
          this.handleErr(error);
        }
      } catch (err) {
        this.handleErr(err);
      }

      this.saveBtnText = 'Save';
      this.isDialogOpen = false;
    },

    async validateConfig() {
      this.validateBtnText = 'Validating...';

      try {
        const { account_info, product_topic } = await validateSettings();

        this.isValidationSuccess = true;
        this.validationMessage = 'valid';
        this.validationError = '';

        this.$emit('validation-success', this.validationMessage);
        this.sendMsg('Settings validated');
      } catch (err) {

        this.isValidationError = true;
        this.validationMessage = '';
        this.validationError = err;

        this.$emit('validation-error', this.err);
        this.handleErr(err);
      }

      this.validateBtnText = 'Validate';

      setTimeout(() => {
        this.isValidationSuccess = false;
      }, 10000);
    },

    onAccountInfoUpdate(e) {
      this.$emit('account-info-update', e.target.value);
    },
    onTopicUpdate(e) {
      this.$emit('product-topic-update', e.target.value);
    },

    onFileChange(evt) {
      const file = evt.target.files[0];
      if (file.name.length < 40) {
        this.loadedFileName = file.name;
      } else {
        this.loadedFileName = file.name.slice(0, 20) + '...' + file.name.slice(-20, file.name.length);
      }

      const reader = new FileReader();
      reader.onload = (evt) => {
        const fileContent = evt.target.result;
        const fileContentObj = JSON.parse(fileContent);
        const accountInfoContent = JSON.stringify(fileContentObj['account_info']);
        const productTopicContent = fileContentObj['product_topic'];
        this.onAccountInfoUpdate({ target: { value: accountInfoContent }});
        this.onTopicUpdate({ target: { value: productTopicContent }});
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
  min-height: 240px;
}

.topic-area {
  min-height: 84px;
}


/*********************/
/* custom-file-input */
/*********************/

.custom-file-input {
  color: var(--base-text-color, #212121);
}

.custom-file-input__label {
  box-sizing: border-box;

  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0.48px;
  text-transform: uppercase;

  color: inherit;
  cursor: default;

  display: flex;
  height: 28px;
  padding: 4px 10px 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;

  transition: opacity 0.1s ease-in;
}

.custom-file-input__label:hover,
.custom-file-input__label:focus {
  opacity: 0.6;
  cursor: pointer;
}

.custom-file-input__label:active {
  opacity: 0.8;
}

.custom-file-input__label-icon {
  color: inherit;
}

.custom-file-input__input {
  display: none;
}
</style>
