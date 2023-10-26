<template>
  <section
    id="publishing-card"
    class="ez-card"
  >
    <header class="ez-card__header">
      <h2 class="ez-card__title">
        Settings
      </h2>
    </header>

    <ez-table
      :items="items"
      :headers="headers"
    >
      <template #hub="item">
        <div class="table-item">
          <p class="table-item__title">
            {{ item.hub.name }}
          </p>
          <p class="table-item__assistive">
            {{ item.hub.id }}
          </p>
        </div>
      </template>

      <template #credentials="item">
        <div
          v-if="item.credentials"
          class="table-item"
        >
          <p class="table-item__title monospace-text">
            *********
          </p>
          <p class="table-item__assistive">
            {{ item.credentials.topic }}
          </p>
        </div>
        <span
          v-else
          class="table-item_empty"
        >—</span>
      </template>

      <template #actions="item">
        <div class="table-icons">
          <c-icon
            class="error-icon"
            :class="{ 'error-icon_visible': itemsWithErrors[item.hub.id] }"
            :icon="icons.googleErrorBaseline"
            color="#FF6A6A"
            size="18"
          />
          <c-button
            :icon="icons.googleEditBaseline"
            :disabled="isValidating"
            :title="isValidating ? 'Please wait until validation is finished' : null"
            show-icon-only
            small
            @click="openEditDialog(item)"
          />
          <c-menu :disabled="isValidating">
            <template #trigger="">
              <c-button
                :disabled="isValidating"
                :icon="icons.googleMoreVertBaseline"
                :title="isValidating ? 'Please wait until validation is finished' : null"
                show-icon-only
                small
              />
            </template>

            <div class="menu-items">
              <div
                class="menu-item"
                :class="{ 'menu-item_disabled': !item.credentials }"
              >
                <c-button
                  :disabled="!item.credentials"
                  :icon="icons.googlePublishedWithChangesBaseline"
                  :upper-case="false"
                  :title="item.credentials ? null : 'No credentials to validate'"
                  class="menu-item__btn"
                  label="Validate credentials"
                  size="18"
                  @click="validateConfig(item)"
                />
              </div>
              <div
                v-if="item.credentials"
                class="menu-item"
              >
                <c-button
                  :icon="icons.googleDeleteBaseline"
                  :upper-case="false"
                  class="menu-item__btn"
                  color="red"
                  label="Delete credentials"
                  size="18"
                  @click="openDeleteDialog(item)"
                />
              </div>
            </div>
          </c-menu>
        </div>
      </template>
    </ez-table>

    <div
      class="ez-dialog"
      :class="{'ez-dialog_open': isEditDialogOpen}"
    >
      <section
        v-if="isEditDialogOpen"
        class="ez-dialog__inner"
      >
        <header class="ez-dialog__header">
          Settings
        </header>
        <div
          ref="dialogContentEl"
          class="ez-dialog__content"
        >
          <c-alert
            v-if="dialogError"
            class="ez-card__alert"
            :icon="icons.googleWarningBaseline"
            :message="dialogError"
            type="error"
            fluid
          />
          <div class="hub-info">
            <p class="label-text">
              Hub
            </p>
            <div class="table-item">
              <p class="table-item__title">
                {{ currentItem.hub.name }}
              </p>
              <p class="table-item__assistive">
                {{ currentItem.hub.id }}
              </p>
            </div>
          </div>
          <form
            action=""
            class="ez-dialog__form"
          >
            <div class="account-json-wrapper">
              <div class="custom-file-input ez-dialog__controls">
                <label
                  for="file-input"
                  class="custom-file-input__label"
                >
                  <c-icon
                    :icon="icons.googleUploadBaseline"
                    size="16"
                    class="custom-file-input__label-icon"
                  />
                  <span>{{ loadedFileName || 'Load from file' }}</span>
                </label>
                <input
                  id="file-input"
                  class="custom-file-input__input"
                  type="file"
                  accept=".json"
                  @change="onFileChange"
                >
              </div>
              <label
                for="account_info"
                class="label-text"
              >Google Credentials JSON</label>
              <textarea
                id="account_info"
                ref="textarea-account-info"
                v-model="accountInfo"
                class="code account-info-area"
                materialize
              />
            </div>

            <label
              for="product_topic"
              class="label-text"
            >Pub/Sub Topic</label>
            <textarea
              id="product_topic"
              v-model="productTopic"
              class="code topic-area"
              materialize
            />
          </form>
        </div>
        <footer class="ez-dialog__footer">
          <c-button
            label="cancel"
            @click="closeEditDialog"
          />
          <c-button
            :disabled="!canSaveCreds"
            :loading="isSaving"
            color="light blue"
            label="Save"
            @click="saveConfig"
          />
        </footer>
      </section>
    </div>

    <div
      class="ez-dialog"
      :class="{ 'ez-dialog_open': isDeleteDialogOpen }"
    >
      <section
        v-if="isDeleteDialogOpen"
        class="ez-dialog__inner"
      >
        <header class="ez-dialog__header">
          Delete credentials
        </header>
        <div class="ez-dialog__content">
          <p class="delete-dialog-text">
            Are you sure you want to delete the credentials for
            {{ currentItem.hub.name }} hub ({{ currentItem.hub.id }})?
          </p>
        </div>
        <footer class="ez-dialog__footer">
          <c-button
            color="black"
            label="Cancel"
            @click="closeDeleteDialog"
          />
          <c-button
            :loading="isDeleting"
            color="red"
            label="Delete"
            @click="deleteCredentials"
          />
        </footer>
      </section>
    </div>
  </section>
</template>


<script>
import {
  deleteSettings,
  getHubs,
  getSettings,
  updateSettings,
  validateSettings,
} from '~scripts/api';

import {
  googleDeleteBaseline,
  googleEditBaseline,
  googleErrorBaseline,
  googleMoreVertBaseline,
  googlePublishedWithChangesBaseline,
  googleUploadBaseline,
  googleWarningBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  isValidJSON,
} from '~scripts/helpers';

import cAlert from '~components/ezAlert.vue';
import cButton from '~components/cButton.vue';
import cIcon from '~components/ezIcon.vue';
import EzTable from '~components/ezTable.vue';
import cMenu from '~components/cMenu.vue';


const simplestJSONLength = 9;


export default {
  inject: ['$injector'],

  components: {
    cAlert,
    cButton,
    cIcon,
    EzTable,
    cMenu,
  },

  emits: ['can-sync'],

  data() {
    return {
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
      isSaving: false,
      isDeleting: false,
      isValidating: false,
      loadedFileName: '',
      currentItem: null,
      dialogError: '',

      accountInfo: '',
      productTopic: '',

      itemsWithErrors: {},

      icons: {
        googleUploadBaseline,
        googleWarningBaseline,
        googleEditBaseline,
        googleMoreVertBaseline,
        googlePublishedWithChangesBaseline,
        googleDeleteBaseline,
        googleErrorBaseline,
      },

      headers: [
        {
          label: 'Hub',
          value: 'hub',
        },
        {
          label: 'Credentials',
          value: 'credentials',
        },
        {
          label: '',
          value: 'actions',
          width: '84px',
        },
      ],

      hubs: [],
      settings: [],
    };
  },

  computed: {
    validAccountInfo: vm => isValidJSON(vm.accountInfo)
      && vm.accountInfo.length >= simplestJSONLength,

    canSaveCreds: vm => vm.validAccountInfo && !!vm.productTopic,

    items: ({ hubs, settings }) => hubs.map(hub => {
      const settingsEl = settings.find(x => x.hub.id === hub.id);
      const credentials = settingsEl && Object.keys(settingsEl.account_info).length
        ? {
          topic: settingsEl.product_topic,
          info: JSON.stringify(settingsEl.account_info, null, 2),
        }
        : null;

      return {
        hub,
        credentials,
      };
    }),
  },

  methods: {
    sendMsg(msg) {
      this.$injector.emit('snackbar:message', msg);
    },

    handleErr(err) {
      this.$injector.emit('snackbar:error', `Error: ${err.message}`);
    },

    openEditDialog(item) {
      this.currentItem = item;

      if (item.credentials) {
        this.productTopic = item.credentials.topic;
        this.accountInfo = item.credentials.info;
      } else {
        this.productTopic = '';
        this.accountInfo = '';
      }

      this.isEditDialogOpen = true;
    },

    closeEditDialog() {
      this.isEditDialogOpen = false;
      this.dialogError = '';
      this.accountInfo = '';
      this.productTopic = '';
    },

    openDeleteDialog(item) {
      this.isDeleteDialogOpen = true;
      this.currentItem = item;
    },

    closeDeleteDialog() {
      this.isDeleteDialogOpen = false;
      this.dialogError = '';
    },

    async saveConfig() {
      this.isSaving = true;
      this.dialogError = '';

      try {
        const { error } = await updateSettings(this.currentItem.hub.id, {
          account_info: JSON.parse(this.accountInfo),
          product_topic: this.productTopic,
        });

        if (!error) {
          this.sendMsg('Settings saved');
          await this.loadSettings();
          this.isEditDialogOpen = false;
          this.itemsWithErrors[this.currentItem.hub.id] = false;
        } else {
          this.dialogError = error;
          this.$refs.dialogContentEl.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } catch (err) {
        this.dialogError = err.message;
        this.$refs.dialogContentEl.scrollTo({ top: 0, behavior: 'smooth' });
      } finally {
        this.isSaving = false;
      }
    },

    async validateConfig(item) {
      try {
        this.isValidating = true;
        this.sendMsg(`Validating credentials for hub ${item.hub.name} (${item.hub.id})...`);

        const { error, detail } = await validateSettings(item.hub.id);

        if (error || detail) {
          throw new Error(error || detail);
        }

        this.itemsWithErrors[item.hub.id] = false;

        setTimeout(() => {
          this.sendMsg('Settings validated');
        }, 1500);
      } catch (err) {
        setTimeout(() => {
          this.handleErr(err);
          this.itemsWithErrors[item.hub.id] = true;
        }, 1500);
      } finally {
        setTimeout(() => {
          this.isValidating = false;
        }, 1500);
      }
    },

    async deleteCredentials() {
      this.isDeleting = true;
      try {
        await deleteSettings(this.currentItem.hub.id);
        await this.loadSettings();
        this.isDeleteDialogOpen = false;
        this.itemsWithErrors[this.currentItem.hub.id] = false;
      } catch (err) {
        this.handleErr(err);
      } finally {
        this.isDeleting = false;
      }
    },

    onFileChange(evt) {
      const file = evt.target.files[0];
      if (file.name.length < 40) {
        this.loadedFileName = file.name;
      } else {
        this.loadedFileName = `${file.name.slice(0, 20)}...${file.name.slice(-20, file.name.length)}`;
      }

      const reader = new FileReader();
      reader.onload = ({ target }) => {
        const fileContent = target.result;
        const fileContentObj = JSON.parse(fileContent);
        this.accountInfo = JSON.stringify(fileContentObj.account_info);
        this.productTopic = fileContentObj.product_topic;
      };
      reader.readAsText(file);
    },

    async loadSettings() {
      this.settings = await getSettings();
      this.$emit('can-sync', !!this.settings.length);
    },

    async loadHubs() {
      this.hubs = await getHubs();
    },
  },

  mounted() {
    this.loadHubs();
    this.loadSettings();
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

<style scoped>
.table-icons {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.table-item {
  display: flex;
  flex-direction: column;
}

.table-item__title {
  color: #212121;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  text-align: left;
}

.table-item__assistive {
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  text-align: left;
  color: #707070;
}

.table-item_empty {
  font-size: 14px;
  line-height: 20px;
  text-align: left;
  color: #707070;
}

.hub-info {
  margin-bottom: 24px;
}

.account-json-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.menu-items {
  display: flex;
  flex-direction: column;
}

.menu-item {
  border-bottom: 1px solid #E0E0E0;
}

.menu-item:hover {
  background: #f5f5f5;
  cursor: pointer;
}

.menu-item_disabled {
  color: #BDBDBD;
}

.menu-item_disabled:hover {
  background: transparent;
  cursor: default;
}

.menu-item_red .menu-item__btn {
  color: #FF6A6A;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item__btn {
  height: 48px;
  padding: 6px 12px;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  border: none;
  border-radius: 2px;
  background: transparent;
  cursor: pointer;
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}

.menu-item__btn[disabled] {
  color: #BDBDBD;
  cursor: default;
}

.error-icon {
  padding: 5px;
  visibility: hidden;
}

.error-icon_visible {
  visibility: visible;
}

.delete-dialog-text {
  font-size: 14px;
  line-height: 20px;
  color: #212121;
}

textarea {
  resize: vertical;
}
</style>
