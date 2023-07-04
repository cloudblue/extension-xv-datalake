<template>
<section id="synchronisation-card" class="ez-card" title="Synchronisation">
    <header class="ez-card__header">
        <h2 class="ez-card__title">{{ title || 'Synchronisation' }}</h2>
        <div class="ez-card__controls">
            <button id="sync" class="button" type="button" disabled>Sync products</button>
            <span>{{ hello }}</span>
        </div>
    </header>
</section>
</template>


<script>
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
