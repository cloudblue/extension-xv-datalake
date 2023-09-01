<template>
  <svg
    class="c-icon"
    :class="classes"
    :view-box="icon.viewBox"
    :style="styles"
    @click="$emit('click', $event)"
  >
    <use :xlink:href="`#${icon.id}`" />
  </svg>
</template>

<script>
import {
  addUnits,
} from '~scripts/helpers';


export default {
  props: {
    icon: {
      type: Object,
      required: true,
    },

    color: {
      type: String,
      default: '',
    },

    disabled: Boolean,
    size: {
      type: [Number, String],
      default: '',
    },
  },

  emits: ['click'],

  computed: {
    classes: vm => ({
      'c-icon_disabled': vm.disabled,
    }),

    styles: vm => ({
      color: vm.color,
      height: vm.actualSize,
      width: vm.actualSize,
    }),

    actualSize: vm => addUnits(vm.size),
  },
};
</script>

<style lang="stylus">
@import '~styles/variables';

.c-icon {
  color: #757575;
  caret-color: currentColor;

  vertical-align: text-bottom;
  fill: currentColor;

  height: 24px;
  width: 24px;

  &_disabled {
    pointer-events: none;
    color: #c5c5c5 !important;
  }

  &_link {
    cursor: pointer;
    outline: none;
  }

  button & {
    color: inherit;
  }
}
</style>
