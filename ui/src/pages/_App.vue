<template>
  <h1> Some {{ title }} app says: {{ hello }}</h1>
  <button @click="showExtra = true" type="button">click me</button>

  <div class="extra" v-if="showExtra">I AM HERE</div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  data() {
    return {
      hello: 'hello world!',
      showExtra: false,
    };
  },
};
</script>

<style>

</style>
