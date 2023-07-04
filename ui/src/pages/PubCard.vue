<template>
<section id="publishing-card" class="ez-card" title="Publishing">
    <header class="ez-card__header">
        <h2 class="ez-card__title">Settings</h2>
        <div class="ez-card__controls">
            <button id="edit" class="button" type="button">Edit</button>
            <button id="validate" class="button" type="button" disabled>Validate</button>
        </div>
    </header>
    <form>
        <div class="group">
            <h4>Google Credentials JSON</h4>
            <textarea type="text" id="account_info" @input="onCredsUpdate" materialize>
                {{ accountInfo }}
            </textarea>
            <!-- <input type="text" id="account_info" /> -->
            <!-- <p id="account-info">—</p> -->
        </div>
        <div class="group">
            <h4>Pub/Sub Topic</h4>
            <input type="text" :value="productTopic" @input="onTopicUpdate" id="product_topic" />
            <!-- <p id="product-topic">—</p> -->
        </div>
    </form>

    <div class="button-container">
        <button id="save" class="button" disabled="!canSaveCreds">{{ saveBtnText }}</button>
    </div>
</section>
</template>


<script>
import {
  isEmpty,
  not,
} from 'ramda';



export default {

  inject: ['$injector'],

  props: {
    accountInfo: Object,
    productTopic: String,
  },
  data() {
    return {
      saveBtnText: 'Save',
    };
  },
  computed: {
    canSaveCreds: vm => not(isEmpty(vm.accountInfo)) && vm.productTopic,
  },
  methods: {
    sendMsg(msg) {
      this.$injector.emit('snackbar:message', msg);
    },
    handleErr(err) {
      this.$injector.emit('snackbar:error', err);
    },
    async onSave() {
      // export const saveSettingsData = async (app) => {
      //   if (!app) return;
      //   disableButton('save', 'Saving...');
      //   try {
      //     // eslint-disable-next-line camelcase
      //     const account_info = JSON.parse(document.getElementById('account_info').value);
      //     // eslint-disable-next-line camelcase
      //     const product_topic = document.getElementById('product_topic').value;
      //     // eslint-disable-next-line camelcase
      //     await updateSettings({ account_info, product_topic });

      //     app.emit({ name: 'snackbar:message', value: 'Settings saved' });
      //   } catch (error) {
      //     app.emit({ name: 'snackbar:error', value: error });
      //   }
      //   enableButton('save');
      // };

      this.saveBtnText = 'Saving...';

      try {
        // eslint-disable-next-line camelcase
        const account_info = JSON.parse(this.credsJSON);
        // eslint-disable-next-line camelcase
        const product_topic = this.productTopic;

        await updateSettings({ account_info, product_topic });

        this.sendMsg('Settings saved');
      } catch (err) {
        this.handleErr(err);
      }

      this.saveBtnText = 'Save';
    },
    onCredsUpdate(e) {
      this.$emit('account-info-update', e.value);
    },
    onTopicUpdate(e) {
      this.$emit('product-topic-update', e.value);
    },
  },
};
</script>


<style scoped>
form {
    margin: 45px auto;
    min-width: 600px;
}

.group {
    position: relative;
    margin: 45px 0;
}


input {
    background: none;
    font-size: 18px;
    padding: 10px 10px 10px 5px;
    display: block;
    border: none;
    border-radius: 0;
    border-bottom: 1px solid #757575;
    width: 610px;
}

input:focus {
    outline: none;
    border-color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
}

input:focus~label {
    top: -14px;
    font-size: 12px;
    color: rgb(var(--pure-material-primary-rgb, 33, 150, 243));
}

input[type="password"] {
    letter-spacing: 0.3em;
}

label {
    top: -14px;
    font-size: 12px;
    font-weight: normal;
    position: absolute;
    pointer-events: none;
    left: 5px;
    transition: 300ms ease all;
    color: #757575;
}

.bar {
    position: relative;
    display: block;
}

textarea[materialize] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

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
}

textarea[materialize]:disabled {
  border-style: dashed;
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
