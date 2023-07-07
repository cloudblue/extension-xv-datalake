<template>
<section class="ez-card hidden ez-card--error" id="error">
  <div class="ez-card__header">
    <h2 class="ez-card__title">Error</h2>
  </div>
  <div class="error-message">
    <p id="error-message">Something went wrong. Please try to reload the page.</p>
  </div>
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

<style scoped></style>
