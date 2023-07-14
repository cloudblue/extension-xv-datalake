Some test text
<!-- cAlert Component

  Usage:

  c-alert(
    message="This is alert",    // Alert text, also can be inserted to "message" slot
    :icon="icons.googleStarBaseline",                // Sets icon name
    dense,                      // Makes it dense
    fluid,                      // Makes it fluid
    type="warning",             // Sets alert color to one of following
                                // styles: info, error, success, warning
  )
    template(#message="")
      strong Lorem #[i] Ipsum   // Inserts html to message slot

    c-button(#actions="") Ok    // Inserts content to actions slot

-->

<template>
<div class="c-alert-holder">
  <div class="c-alert" :class="classSettings">
    <div class="c-alert__icon">
      <c-icon :icon="icon" size="16"></c-icon>
    </div>
    <div class="c-alert__text">
      <slot name="message">{{ message }}</slot>
    </div>
    <div class="c-alert__actions" v-if="this.$slots.actions">
      <slot name="actions"></slot>
    </div>
  </div>
</div>
</template>


<script>
import {
  googleInfoBaseline,
} from '@cloudblueconnect/material-svg/baseline';

import {
  flip,
  includes,
} from 'ramda';


import cIcon from '~components/ezIcon.vue';


import {
  isString,
  pathTo,
} from '~scripts/utils';


const typeAlert = [
  'info',
  'error',
  'success',
  'warning',
  'default',
];

export default {
  components: {
    cIcon,
  },

  props: {
    message: {
      type: String,
      default: 'List is empty. Please add item.',
    },

    icon: {
      type: Object,
      default: () => (googleInfoBaseline),
    },

    dense: {
      type: Boolean,
    },

    alignTop: {
      type: Boolean,
    },

    fluid: {
      type: Boolean,
    },

    grid: {
      type: Boolean,
    },

    type: {
      type: String,
      validator: flip(includes)(typeAlert),
      default: 'default',
    },
  },

  computed: {
    isStringIcon: pathTo(['icon'], isString),
    classSettings() {
      return {
        'c-alert_align-top': this.alignTop,
        'c-alert_fluid': this.fluid,
        'c-alert_dense': this.dense,
        'c-alert_grid': this.grid,
        [`c-alert_${this.type}`]: true,
      };
    },
  },
};
</script>


<style lang="stylus">
@import '~styles/common';

.c-alert {
  align-items: center;
  box-sizing: border-box;
  display: inline-flex;

  min-height: $module * 16;
  min-width: 240px;
  max-width: 600px;
  padding: $module * 4;
  border-radius: 8px;

  background-color: rgba($mid-grey, 0.15);

  color: $mid-grey;
}

.c-alert_align-top {
  align-items: flex-start;
}

.c-alert_dense {
  min-height: $module * 14;
  padding-top: $module * 3;
  padding-bottom: $module * 3
}

.c-alert_fluid {
  display: flex;
  max-width: none;
}

// NOTE: this should go later than .c-alert_fluid to work properly !
.c-alert_grid {
  display: grid;
  grid-template-columns: 32px auto;
  grid-template-rows: auto;
  grid-template-areas: "icon text" "x actions";
}

.c-alert_error {
  background-color: rgba($nice-red, 0.2);
  color: $nice-red;
}
.c-alert_info {
  background-color: _rgba($accent-rgb, 0.15);
  color: $accent;
}
.c-alert_success {
  background-color: rgba($green, 0.15);
  color: $green;
}
.c-alert_warning {
  background-color: rgba($nice-yellow, 0.15);
  color: $nice-yellow;
}

.c-alert__icon {
  flex: 0 0 auto;
  margin-right: $module * 3;
  display: flex;

  > .c-icon,
  > .v-icon {
    color: currentColor;
  }

  .c-alert_align-top & {
    margin-top: -2px;
  }

  .c-alert_grid & {
    grid-area: icon;
  }
}

.c-alert__text {
  flex: 1 1 auto;
  font-family: var(--theme-font-family);
  font-size: $theme-font-size-smaller px;
  line-height: $module * 5;
  text-align: left;
  color: $base-text-color;
  letter-spacing: 0em;

  &:first-letter {
    text-transform: uppercase;
  }

  .c-alert_grid & {
    grid-area: text;
  }
}

.c-alert__actions {
  flex: 0 0 auto;
  margin-right: -($module);
  margin-left: $module * 6;

  button {
    margin: -($module / 2) 0;

    & + & {
      margin-left: $module * 4;
    }
  }

  .c-alert_dense & {
    margin-right: -($module * 2);

    button {
      margin-top: -($module);
      margin-bottom: -($module);
    }
  }

  .c-alert_grid & {
    grid-area: actions;
    margin-left: 0;
  }
}
</style>
