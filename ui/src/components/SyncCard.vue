<template>
<section id="synchronisation-card" class="ez-card" title="Synchronisation">
    <header class="ez-card__header">
        <h2 class="ez-card__title">{{ title || 'Synchronisation' }}</h2>
        <div class="ez-card__controls">
            <button id="sync" class="btn btn_default" type="button" disabled>Sync products</button>
        </div>
    </header>
</section>
</template>


<script>
import {
  googleSyncBaseline,
} from '@cloudblueconnect/material-svg/baseline';

export default {
  props: {
    title: String,
  },
  data() {
    return {
      hello: 'hello world!',
    };
  },
};
</script>


<style scoped>
</style>
