<template>
  <div>
    <input type="checkbox" v-model="isChecked" @change="toggleCheck">
    <label>{{ product.name }}</label>
  </div>

  <li class="list-item">
    <label class="list-item__title" :for="p.id">
      {{ p.name }}
      <span class="list-item__assistive-text">{{ p.id }}</span>
    </label>
    <input
      type="checkbox"
      :id="p.id"
      :value="p.id"
      v-model="productsToSync"
      @change="toggle($event)"
    />
  </li>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      isChecked: false
    }
  },
  methods: {
    toggleCheck() {
      this.$emit('toggle-check', this.product.id, this.isChecked);
    }
  }
}
</script>
