<template>
  <section
    class="app"
    :style="cssStyles"
  >
    <sync-card :enabled="syncEnabled" />
    <pub-card @can-sync="syncEnabled = $event" />
  </section>
</template>



<script>
import SyncCard from '~components/SyncCard.vue';
import PubCard from '~components/PubCard.vue';

import {
  getStyleCustomizations,
} from '~scripts/utils';


export default {
  inject: ['$injector'],

  components: {
    SyncCard,
    PubCard,
  },

  data() {
    return {
      cssStyles: {},
      syncEnabled: false,
    };
  },

  mounted() {
    const { styleCustomizations } = getStyleCustomizations().computed;
    this.cssStyles = styleCustomizations();
  },
};
</script>


<style scoped>
.app {
  box-sizing: border-box;
  min-height: 640px;
  padding-top: 24px;
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
</style>

