<template>
  <section>
    <h1>Test {{ foo }} with {{ title }}</h1>
    <inner-component></inner-component>

    <button @click="showExtra">click me</button>

    <div class="extra" v-if="data.extra">I Am Extra!</div>
  </section>
</template>

<script setup>
import { ref, reactive, defineProps } from 'vue';
import InnerComponent from './InnerComponent.vue';

const foo = ref('bar');
const extra = ref(false);

const data = reactive({
  extra: false,
  foo: 'bar',
});

const props = defineProps({
  title: String,
});

const showExtra = () => {
  /* eslint-disable-next-line */
  console.log('showExtra is here');
  /* eslint-disable-next-line */
  console.log('data:', data, data.extra);
  // extra.value = true;
  data.extra = true;
  /* eslint-disable-next-line */
  console.log('data last:', data, data.extra);
};
</script>

<style>
.extra {
  height: 50px;
  background-color: olive;
  color: cyan;
}

</style>
