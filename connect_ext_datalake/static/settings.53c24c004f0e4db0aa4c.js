/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 299:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/connect-ui-toolkit/dist/index.js
var dist = __webpack_require__(164);
// EXTERNAL MODULE: ./node_modules/vue/dist/vue.esm-bundler.js + 6 modules
var vue_esm_bundler = __webpack_require__(166);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/App.vue?vue&type=template&id=ad465a10&scoped=true

function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_sync_card = (0,vue_esm_bundler/* resolveComponent */.up)("sync-card");
  var _component_pub_card = (0,vue_esm_bundler/* resolveComponent */.up)("pub-card");
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("section", {
    "class": "app",
    style: (0,vue_esm_bundler/* normalizeStyle */.j5)($data.cssStyles)
  }, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_sync_card, {
    enabled: $data.syncEnabled
  }, null, 8 /* PROPS */, ["enabled"]), (0,vue_esm_bundler/* createVNode */.Wm)(_component_pub_card, {
    onCanSync: _cache[0] || (_cache[0] = function ($event) {
      return $data.syncEnabled = $event;
    })
  })], 4 /* STYLE */);
}
;// CONCATENATED MODULE: ./ui/src/components/App.vue?vue&type=template&id=ad465a10&scoped=true

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/SyncCard.vue?vue&type=template&id=d28dc2c6&scoped=true

var _withScopeId = function _withScopeId(n) {
  return (0,vue_esm_bundler/* pushScopeId */.dD)("data-v-d28dc2c6"), n = n(), (0,vue_esm_bundler/* popScopeId */.Cn)(), n;
};
var _hoisted_1 = {
  id: "synchronisation-card",
  "class": "ez-card",
  title: "Synchronisation"
};
var _hoisted_2 = {
  "class": "ez-dialog__inner"
};
var _hoisted_3 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("header", {
    "class": "ez-dialog__header"
  }, " Sync Products ", -1 /* HOISTED */);
});
var _hoisted_4 = {
  "class": "ez-dialog__content"
};
var _hoisted_5 = {
  action: "",
  "class": "ez-dialog__form"
};
var _hoisted_6 = {
  "class": "ez-text-field ez-text-field_search ez-dialog__search"
};
var _hoisted_7 = {
  key: 0,
  "class": "products-list"
};
var _hoisted_8 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("li", {
    "class": "products-list__item products-list__item_header products-item"
  }, [/*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": "products-item__heading"
  }, " Product "), /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": "products-item__heading"
  }, " Vendor ")], -1 /* HOISTED */);
});
var _hoisted_9 = {
  "class": "products-list__item products-list__item_all products-item"
};
var _hoisted_10 = /*#__PURE__*/_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": "products-item__part"
  }, [/*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("label", {
    "class": "products-item__title",
    "for": "select-all"
  }, "All")], -1 /* HOISTED */);
});
var _hoisted_11 = {
  "class": "products-item__part"
};
var _hoisted_12 = {
  "class": "products-item__part"
};
var _hoisted_13 = ["src"];
var _hoisted_14 = ["for"];
var _hoisted_15 = {
  "class": "products-item__assistive-text"
};
var _hoisted_16 = {
  "class": "products-item__part"
};
var _hoisted_17 = ["src"];
var _hoisted_18 = ["for"];
var _hoisted_19 = {
  "class": "products-item__assistive-text"
};
var _hoisted_20 = {
  "class": "products-item__part"
};
var _hoisted_21 = ["id", "checked"];
var _hoisted_22 = {
  "class": "ez-dialog__footer"
};
var _hoisted_23 = {
  "class": "ez-card__header"
};
var _hoisted_24 = {
  "class": "ez-card__title"
};
var _hoisted_25 = {
  "class": "ez-card__controls"
};
function SyncCardvue_type_template_id_d28dc2c6_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_c_icon = (0,vue_esm_bundler/* resolveComponent */.up)("c-icon");
  var _component_c_button = (0,vue_esm_bundler/* resolveComponent */.up)("c-button");
  var _component_c_alert = (0,vue_esm_bundler/* resolveComponent */.up)("c-alert");
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("section", _hoisted_1, [(0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["ez-dialog", {
      'ez-dialog_open': $data.isSyncDialogOpen
    }])
  }, [(0,vue_esm_bundler/* createElementVNode */._)("section", _hoisted_2, [_hoisted_3, (0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_4, [(0,vue_esm_bundler/* createElementVNode */._)("form", _hoisted_5, [(0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_6, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_icon, {
    icon: $data.icons.googleSearchBaseline,
    size: "24",
    "class": "ez-text-field__icon"
  }, null, 8 /* PROPS */, ["icon"]), (0,vue_esm_bundler/* withDirectives */.wy)((0,vue_esm_bundler/* createElementVNode */._)("input", {
    "onUpdate:modelValue": _cache[0] || (_cache[0] = function ($event) {
      return $data.searchQuery = $event;
    }),
    type: "search",
    "class": "ez-text-field__input",
    placeholder: "Search for product"
  }, null, 512 /* NEED_PATCH */), [[vue_esm_bundler/* vModelText */.nr, $data.searchQuery]])]), $data.products.length ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("ul", _hoisted_7, [_hoisted_8, (0,vue_esm_bundler/* createElementVNode */._)("li", _hoisted_9, [_hoisted_10, (0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_11, [(0,vue_esm_bundler/* withDirectives */.wy)((0,vue_esm_bundler/* createElementVNode */._)("input", {
    id: "select-all",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.syncAll = $event;
    }),
    type: "checkbox",
    "class": "products-item__checkbox",
    onChange: _cache[2] || (_cache[2] = function ($event) {
      return $options.toggleAll($event);
    })
  }, null, 544 /* HYDRATE_EVENTS, NEED_PATCH */), [[vue_esm_bundler/* vModelCheckbox */.e8, $data.syncAll]])])]), ((0,vue_esm_bundler/* openBlock */.wg)(true), (0,vue_esm_bundler/* createElementBlock */.iD)(vue_esm_bundler/* Fragment */.HY, null, (0,vue_esm_bundler/* renderList */.Ko)($options.filteredProducts, function (p) {
    return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("li", {
      key: p.id,
      "class": "products-list__item products-item"
    }, [(0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_12, [p.icon ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("img", {
      key: 0,
      "class": "products-item__logo",
      src: p.icon,
      alt: ""
    }, null, 8 /* PROPS */, _hoisted_13)) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true), (0,vue_esm_bundler/* createElementVNode */._)("label", {
      "class": "products-item__title",
      "for": p.id
    }, [(0,vue_esm_bundler/* createTextVNode */.Uk)((0,vue_esm_bundler/* toDisplayString */.zw)(p.name) + " ", 1 /* TEXT */), (0,vue_esm_bundler/* createElementVNode */._)("span", _hoisted_15, (0,vue_esm_bundler/* toDisplayString */.zw)(p.id), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_14)]), (0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_16, [p.owner.icon ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("img", {
      key: 0,
      "class": "products-item__logo",
      src: p.owner.icon,
      alt: ""
    }, null, 8 /* PROPS */, _hoisted_17)) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true), (0,vue_esm_bundler/* createElementVNode */._)("label", {
      "class": "products-item__title",
      "for": p.id
    }, [(0,vue_esm_bundler/* createTextVNode */.Uk)((0,vue_esm_bundler/* toDisplayString */.zw)(p.owner.name) + " ", 1 /* TEXT */), (0,vue_esm_bundler/* createElementVNode */._)("span", _hoisted_19, (0,vue_esm_bundler/* toDisplayString */.zw)(p.owner.id), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_18)]), (0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_20, [(0,vue_esm_bundler/* createElementVNode */._)("input", {
      id: p.id,
      type: "checkbox",
      checked: $data.selectedProductsIds[p.id],
      "class": "products-item__checkbox",
      onChange: _cache[3] || (_cache[3] = function ($event) {
        return $options.toggle($event);
      })
    }, null, 40 /* PROPS, HYDRATE_EVENTS */, _hoisted_21)])]);
  }), 128 /* KEYED_FRAGMENT */))])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)])]), (0,vue_esm_bundler/* createElementVNode */._)("footer", _hoisted_22, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    label: "Cancel",
    onClick: _cache[4] || (_cache[4] = function ($event) {
      return $data.isSyncDialogOpen = false;
    })
  }), (0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    color: "light blue",
    disabled: !$options.productsToSync.length,
    loading: $data.isSyncing,
    label: "Sync",
    onClick: $options.syncProducts
  }, null, 8 /* PROPS */, ["disabled", "loading", "onClick"])])])], 2 /* CLASS */), (0,vue_esm_bundler/* createElementVNode */._)("header", _hoisted_23, [(0,vue_esm_bundler/* createElementVNode */._)("h2", _hoisted_24, (0,vue_esm_bundler/* toDisplayString */.zw)($props.title || 'Synchronisation'), 1 /* TEXT */), (0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_25, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    id: "sync",
    disabled: !$props.enabled,
    icon: $data.icons.googleSyncBaseline,
    size: 14,
    color: "light blue",
    label: "Sync products",
    mode: "solid",
    small: "",
    onClick: _cache[5] || (_cache[5] = function ($event) {
      return $data.isSyncDialogOpen = true;
    })
  }, null, 8 /* PROPS */, ["disabled", "icon"])])]), $data.showValidation ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_alert, {
    key: 0,
    "class": "ez-card__alert",
    type: "success",
    message: $options.syncedProductsMsg,
    fluid: true,
    icon: $data.icons.googleCheckCircleBaseline
  }, null, 8 /* PROPS */, ["message", "icon"])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)]);
}
;// CONCATENATED MODULE: ./ui/src/components/SyncCard.vue?vue&type=template&id=d28dc2c6&scoped=true

// EXTERNAL MODULE: ./node_modules/ramda/es/index.js + 246 modules
var es = __webpack_require__(42);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/sync/baseline.svg
var baseline = __webpack_require__(743);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/check_circle/baseline.svg
var check_circle_baseline = __webpack_require__(752);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/search/baseline.svg
var search_baseline = __webpack_require__(585);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/ezAlert.vue?vue&type=template&id=6fc12faf

var ezAlertvue_type_template_id_6fc12faf_hoisted_1 = {
  "class": "c-alert-holder"
};
var ezAlertvue_type_template_id_6fc12faf_hoisted_2 = {
  "class": "c-alert__icon"
};
var ezAlertvue_type_template_id_6fc12faf_hoisted_3 = {
  "class": "c-alert__text"
};
var ezAlertvue_type_template_id_6fc12faf_hoisted_4 = {
  key: 0,
  "class": "c-alert__actions"
};
function ezAlertvue_type_template_id_6fc12faf_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_c_icon = (0,vue_esm_bundler/* resolveComponent */.up)("c-icon");
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", ezAlertvue_type_template_id_6fc12faf_hoisted_1, [(0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["c-alert", $options.classSettings])
  }, [(0,vue_esm_bundler/* createElementVNode */._)("div", ezAlertvue_type_template_id_6fc12faf_hoisted_2, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_icon, {
    icon: $props.icon,
    size: "16"
  }, null, 8 /* PROPS */, ["icon"])]), (0,vue_esm_bundler/* createElementVNode */._)("div", ezAlertvue_type_template_id_6fc12faf_hoisted_3, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "message", {}, function () {
    return [(0,vue_esm_bundler/* createTextVNode */.Uk)((0,vue_esm_bundler/* toDisplayString */.zw)($props.message), 1 /* TEXT */)];
  })]), _ctx.$slots.actions ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", ezAlertvue_type_template_id_6fc12faf_hoisted_4, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "actions")])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)], 2 /* CLASS */)]);
}
;// CONCATENATED MODULE: ./ui/src/components/ezAlert.vue?vue&type=template&id=6fc12faf

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/info/baseline.svg
var info_baseline = __webpack_require__(232);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/ezIcon.vue?vue&type=template&id=35ac3bd2

var ezIconvue_type_template_id_35ac3bd2_hoisted_1 = ["view-box"];
var ezIconvue_type_template_id_35ac3bd2_hoisted_2 = ["xlink:href"];
function ezIconvue_type_template_id_35ac3bd2_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("svg", {
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["c-icon", $options.classes]),
    "view-box": $props.icon.viewBox,
    style: (0,vue_esm_bundler/* normalizeStyle */.j5)($options.styles),
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('click', $event);
    })
  }, [(0,vue_esm_bundler/* createElementVNode */._)("use", {
    "xlink:href": "#".concat($props.icon.id)
  }, null, 8 /* PROPS */, ezIconvue_type_template_id_35ac3bd2_hoisted_2)], 14 /* CLASS, STYLE, PROPS */, ezIconvue_type_template_id_35ac3bd2_hoisted_1);
}
;// CONCATENATED MODULE: ./ui/src/components/ezIcon.vue?vue&type=template&id=35ac3bd2

// EXTERNAL MODULE: ./node_modules/color-convert/index.js
var color_convert = __webpack_require__(85);
var color_convert_default = /*#__PURE__*/__webpack_require__.n(color_convert);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/fiber_manual_record/baseline.svg
var fiber_manual_record_baseline = __webpack_require__(136);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/error/baseline.svg
var error_baseline = __webpack_require__(208);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/cancel/baseline.svg
var cancel_baseline = __webpack_require__(171);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/visibility_off/baseline.svg
var visibility_off_baseline = __webpack_require__(829);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/label_off/baseline.svg
var label_off_baseline = __webpack_require__(263);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/label/baseline.svg
var label_baseline = __webpack_require__(366);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/lock/baseline.svg
var lock_baseline = __webpack_require__(424);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/lock_open/baseline.svg
var lock_open_baseline = __webpack_require__(521);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/pause_circle_filled/baseline.svg
var pause_circle_filled_baseline = __webpack_require__(744);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/remove_circle/baseline.svg
var remove_circle_baseline = __webpack_require__(777);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/connect/optimized_clock/animated.svg
var animated = __webpack_require__(569);
;// CONCATENATED MODULE: ./ui/src/scripts/constants.js
var _colorsValues;
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }



/* COLORS */
/* eslint padding-line-between-statements: 0 */
var baseTextColor = '#212121';
var assistiveTextColor = '#707070';
var cGreyDarken1 = '#757575';
var cGreyDarken2 = '#616161';
var cGreyDarken3 = '#424242';
var disabledColor = '#bdbdbd';
var niceGreen = '#0bb071';
var niceRed = '#ff6a6a';
var orangeDimmed = '#f2994a';
var paleOrange = '#fff2e6';
var themeGrey1 = '#666666';
var themeLight1 = '#e0e0e0';
var yellow = '#F2C94C';
var white = '#ffffff';
var whiteSmoke = '#f5f5f5';
var defaultEchartsColorPalette = (/* unused pure expression or super */ null && (['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']));
var colorsDict = {
  black: 'black',
  blue: 'blue',
  green: 'green',
  grey: 'grey',
  lightBlue: 'light blue',
  lime: 'lime',
  orange: 'orange',
  pink: 'pink',
  red: 'red',
  violet: 'violet',
  white: 'white'
};

// Hex only
var colorsValues = (_colorsValues = {}, _defineProperty(_colorsValues, colorsDict.blue, {
  color: '#3150bc',
  label: 'blue'
}), _defineProperty(_colorsValues, colorsDict.green, {
  color: '#0bb071',
  label: 'green'
}), _defineProperty(_colorsValues, colorsDict.grey, {
  color: '#666666',
  label: 'grey'
}), _defineProperty(_colorsValues, colorsDict.lightBlue, {
  color: '#2c98f0',
  label: 'light blue'
}), _defineProperty(_colorsValues, colorsDict.lime, {
  color: '#2fb11a',
  label: 'lime'
}), _defineProperty(_colorsValues, colorsDict.orange, {
  color: '#f2994a',
  label: 'orange'
}), _defineProperty(_colorsValues, colorsDict.pink, {
  color: '#f70076',
  label: 'pink'
}), _defineProperty(_colorsValues, colorsDict.red, {
  color: '#ff6a6a',
  label: 'red'
}), _defineProperty(_colorsValues, colorsDict.violet, {
  color: '#8133ff',
  label: 'violet'
}), _defineProperty(_colorsValues, colorsDict.white, {
  color: '#ffffff',
  label: 'white'
}), _defineProperty(_colorsValues, colorsDict.black, {
  color: '#000000',
  label: 'black'
}), _colorsValues);
var colorVars = ['primary', 'accent', 'contrast'];

/* REST */
var responseTypes = {
  BLOB: 'blob',
  JSON: 'json',
  FORM_DATA: 'formData',
  TEXT: 'text'
};

/* STATUSES */

var icons = {
  done: check_circle_baseline/* default */.Z,
  dot: fiber_manual_record_baseline/* default */.Z,
  error: error_baseline/* default */.Z,
  failed: cancel_baseline/* default */.Z,
  hidden: visibility_off_baseline/* default */.Z,
  label_off: label_off_baseline/* default */.Z,
  label: label_baseline/* default */.Z,
  lock: lock_baseline/* default */.Z,
  open: lock_open_baseline/* default */.Z,
  paused: pause_circle_filled_baseline/* default */.Z,
  skip: remove_circle_baseline/* default */.Z,
  waiting: animated/* default */.Z
};
var statusesColors = {
  attention: '#f2994a',
  "default": '#424242',
  disabled: '#b1b1b1',
  done: '#0bb071',
  negative: '#ff6a6a'
};
var statuses = {
  deleted: {
    text: 'deleted',
    icon: icons.failed,
    color: statusesColors.negative
  },
  active: {
    text: 'active',
    icon: icons.done,
    color: statusesColors.done
  },
  reconfiguring: {
    text: 'reconfiguring',
    icon: icons.waiting,
    color: statusesColors.attention
  },
  reviewing: {
    text: 'reviewing',
    icon: icons.waiting,
    color: statusesColors.disabled
  }
};
;// CONCATENATED MODULE: ./ui/src/scripts/helpers.js
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




/**
 * Convert HEX to RGB.
 *
 * @function
 * @param {string} hex Hex string
 * @returns {array} Color in RGB color space
 *
 * @example
 * hexToRGB('ffffff') //=> [255, 255, 255]
 */
var hexToRGB = function hexToRGB(hex) {
  return color_convert_default().hex.rgb(hex);
};

/**
 * Returns a object with a given key as property in format `--{key}` and
 * RGB components with comma delimiter as value.
 *
 * @function
 * @param {string} key
 * @param {string} hexVal
 * @returns {object}
 *
 * @example
 * hexToStyleVar('color', '#00FF00') //=> { --color: '0, 255, 0' }
 */
var rgbToStyleVar = (0,es/* curry */.WAo)(function (key, rgb) {
  return (0,es/* pipe */.zGw)((0,es/* join */.v_p)(', '), (0,es/* objOf */.RVN)("--".concat(key)))(rgb);
});

/**
 * Returns a object with a given key as property in format `--{key}` and
 * RGB components with comma delimiter as value.
 *
 * @function
 * @param {string} key
 * @param {string} hexVal
 * @returns {object}
 *
 * @example
 * hexToStyleVar('color', '#00FF00') //=> { --color: '0, 255, 0' }
 */
var hexToStyleVar = (0,es/* curry */.WAo)(function (key, hex) {
  return (0,es/* pipe */.zGw)(hexToRGB, rgbToStyleVar(key))(hex);
});

/**
 * If the input has no units, adds px to it, otherwise returns the input.
 *
 * @function
 * @param {string|number} value
 *
 * @example
 * ```javascript
 * addUnits(20) // '20px';
 * addUnits('20px') // '20px';
 * ```
 */
var addUnits = (0,es/* when */.gxm)((0,es/* test */.Bul)(/^-?\d+$/), function (v) {
  return "".concat(v, "px");
});
var checkVarColor = (0,es/* includes */.q9t)(es.__, colorVars);
var hexColor = (0,es/* when */.gxm)((0,es/* has */.e$l)(es.__, colorsValues), function (colorName) {
  return (0,es/* path */.ETc)([colorName, 'color'], colorsValues);
});
var colorToRGB = (0,es/* pipe */.zGw)(hexColor, hexToRGB);

/**
 * Convert RGB to HEX.
 *
 * @function
 * @param {string} rgb rgb string
 * @returns {string} hex color string
 *
 * @example
 * hexToRGB('255, 255, 255') //=> 'ffffff'
 */
var rgbToHEX = (0,es/* pipe */.zGw)((0,es/* split */.Vl2)(','), (0,es/* map */.UID)(Number), (color_convert_default()).rgb.hex);
var hexRegExp = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
var validateColor = (0,es/* anyPass */.H50)([es/* isEmpty */.xbD, (0,es/* test */.Bul)(hexRegExp), checkVarColor, (0,es/* has */.e$l)(es.__, colorsValues)]);

/**
 * Check is color bright or not.
 * https://www.w3.org/TR/AERT/#color-contrast
 *
 * @function
 * @param {string} color Color in hex (supports `#` at start)
 * @returns {boolean} Is color bright or not
 */
var isBright = (0,es/* pipe */.zGw)((0,es/* replace */.gxs)('#', ''), (color_convert_default()).hex.rgb, function (_ref) {
  var _ref2 = _slicedToArray(_ref, 3),
    r = _ref2[0],
    g = _ref2[1],
    b = _ref2[2];
  return r * 0.299 + g * 0.587 + b * 0.114 > 180;
});

/**
 * Check that json-like string is a valid JSON
 *
 * @function
 * @param {string}
 * @returns {boolean} is string a JSON or not
 */
var isValidJSON = function isValidJSON(jsonString) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
};
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/ezIcon.vue?vue&type=script&lang=js

/* harmony default export */ const ezIconvue_type_script_lang_js = ({
  props: {
    icon: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      "default": ''
    },
    disabled: Boolean,
    size: {
      type: [Number, String],
      "default": ''
    }
  },
  emits: ['click'],
  computed: {
    classes: function classes(vm) {
      return {
        'c-icon_disabled': vm.disabled
      };
    },
    styles: function styles(vm) {
      return {
        color: vm.color,
        height: vm.actualSize,
        width: vm.actualSize
      };
    },
    actualSize: function actualSize(vm) {
      return addUnits(vm.size);
    }
  }
});
;// CONCATENATED MODULE: ./ui/src/components/ezIcon.vue?vue&type=script&lang=js
 
// EXTERNAL MODULE: ./node_modules/vue-loader/dist/exportHelper.js
var exportHelper = __webpack_require__(789);
;// CONCATENATED MODULE: ./ui/src/components/ezIcon.vue




;


const __exports__ = /*#__PURE__*/(0,exportHelper/* default */.Z)(ezIconvue_type_script_lang_js, [['render',ezIconvue_type_template_id_35ac3bd2_render]])

/* harmony default export */ const ezIcon = (__exports__);
;// CONCATENATED MODULE: ./ui/src/scripts/utils.js
function utils_typeof(obj) { "@babel/helpers - typeof"; return utils_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, utils_typeof(obj); }
function utils_slicedToArray(arr, i) { return utils_arrayWithHoles(arr) || utils_iterableToArrayLimit(arr, i) || utils_unsupportedIterableToArray(arr, i) || utils_nonIterableRest(); }
function utils_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function utils_unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return utils_arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return utils_arrayLikeToArray(o, minLen); }
function utils_arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function utils_iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function utils_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function utils_defineProperty(obj, key, value) { key = utils_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function utils_toPropertyKey(arg) { var key = utils_toPrimitive(arg, "string"); return utils_typeof(key) === "symbol" ? key : String(key); }
function utils_toPrimitive(input, hint) { if (utils_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (utils_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
/*
Copyright (c) 2023, Rahul
All rights reserved.
*/




// ///////////// //
// Styling Utils //
// ///////////// //

var getStyleCustomizations = function getStyleCustomizations() {
  var namespace = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'theme';
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$primary = _ref.primary,
    primary = _ref$primary === void 0 ? '#1565c0' : _ref$primary,
    _ref$accent = _ref.accent,
    accent = _ref$accent === void 0 ? '#4797f2' : _ref$accent,
    _ref$contrast = _ref.contrast,
    contrast = _ref$contrast === void 0 ? '#ffffff' : _ref$contrast;
  return {
    computed: {
      styleCustomizations: function styleCustomizations() {
        var _ref2;
        return _ref2 = {}, utils_defineProperty(_ref2, "--".concat(namespace, "_primary"), primary), utils_defineProperty(_ref2, "--".concat(namespace, "_primary_rgb"), hexToRGB(primary)), utils_defineProperty(_ref2, "--".concat(namespace, "_accent"), accent), utils_defineProperty(_ref2, "--".concat(namespace, "_accent_rgb"), hexToRGB(accent)), utils_defineProperty(_ref2, "--".concat(namespace, "_contrast"), contrast), utils_defineProperty(_ref2, "--".concat(namespace, "_contrast_rgb"), hexToRGB(contrast)), _ref2;
      }
    },
    methods: {
      genCssVar: function genCssVar(name, value) {
        return (0,es/* objOf */.RVN)("--".concat(namespace, "_").concat(name), value);
      }
    }
  };
};
var combineStylesStr = function combineStylesStr(styleObj) {
  return Object.entries(styleObj).reduce(function (acc, _ref3) {
    var _ref4 = utils_slicedToArray(_ref3, 2),
      key = _ref4[0],
      val = _ref4[1];
    return "".concat(acc).concat(key, ":").concat(val, ";");
  }, '');
};

// ////////////////////////////// //
// render UI components - buttons //
// ////////////////////////////// //

var enableButton = function enableButton(id, text) {
  var element = document.getElementById(id);
  element.disabled = false;
  if (text) element.innerText = text;
};
var disableButton = function disableButton(id, text) {
  var element = document.getElementById(id);
  element.disabled = true;
  if (text) element.innerText = text;
};
var addEventListener = function addEventListener(id, event, callback) {
  var element = document.getElementById(id);
  element.addEventListener(event, callback);
};

// //////////////////////////////// //
// render UI components - show/hide //
// //////////////////////////////// //

var showComponent = function showComponent(id) {
  if (!id) return;
  var element = document.getElementById(id);
  element.classList.remove('hidden');
};
var hideComponent = function hideComponent(id) {
  if (!id) return;
  var element = document.getElementById(id);
  element.classList.add('hidden');
};
var setAttrOnComponent = function setAttrOnComponent(id, attrName, attrValue) {
  if (!id) return;
  var element = document.getElementById(id);
  element.setAttribute(attrName, attrValue);
};

// ///////////// //
// Generic utils //
// ///////////// //

/**
 * Returns true if the `value` is string.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
var isString = (0,es.is)(String);

/**
 * Invokes `cb` function with value retrieved from `target` at a given path
 * and returns result of `cb`.
 *
 * @function
 * @param {array} path Prop path.
 * @param {function} cb Callback function.
 * @param {object} target Target object.
 * @returns {*} Result of `cb` call.
 *
 * @example
 * pathTo(['a', 'b'], a => a * 2, { a: { b: 2 } }) //=> 4
 */
var pathTo = (0,es/* curry */.WAo)(function (p, cb, target) {
  return (0,es/* pipe */.zGw)((0,es/* path */.ETc)(p), cb)(target);
});

/**
 * Returns first truthy value of two property paths.
 * If there is no truthy value returns last of two.
 *
 * @function
 * @param {array} propPath
 * @param {array} altPropPath
 * @param {object} source
 * @returns {*}
 *
 * @example
 * pathOrPath([a, b], [c], { a: [ b: B ], c: C }) //=> B
 * pathOrPath([a, b], [c], { c: C }) //=> C
 */
var pathOrPath = (0,es/* curry */.WAo)(function (a, b, source) {
  return (0,es.or)((0,es/* path */.ETc)(a, source), (0,es/* path */.ETc)(b, source));
});

/**
 * Check that given value is object.
 *
 * @function
 * @param {object} value
 * @returns {boolean}
 *
 * @example
 * isObjectStrict({}) //=> true
 * isObjectStrict(1) //=> false
 */
var isObjectStrict = (0,es/* pipe */.zGw)(es/* type */.dt8, (0,es/* equals */.fS0)('Object'));

/**
 * Verify all elements are number or string.
 *
 * @function
 * @param {array} arr
 * @returns {boolean}
 */
var isAllPrimitive = (0,es/* all */.$6P)((0,es/* anyPass */.H50)([(0,es.is)(Number), (0,es.is)(String)]));

/**
 * Returns new object based on a template.
 * Supports nested objects.
 *
 * @function
 * @param {object} template
 * @param {object} source
 * @returns {object}
 *
 * @example
 * template(
 *  {
 *    id: path(['data', 'uuid'])
 *  },
 *  { data: { uuid: 42 } }
 * ) //=> { id: 42 }
 *
 * @example #2
 * template({
 *   id: ['data', 'uuid'],
 *   title: ['data', 'details', 'title'],
 * })
 * ({
 *  data: {
 *    uuid: 53,
 *    details: {
 *      title: 'hello world!',
 *      amount: 10,
 *    },
 *  }
 * })  //=> { id: 53, title: 'hello world!' }
 */
var template = (0,es/* curry */.WAo)(function (tpl, src) {
  /* eslint-disable no-use-before-define */
  function processTpl(v) {
    return (0,es/* map */.UID)((0,es/* cond */.wVM)([
    // Result of function
    [(0,es.is)(Function), (0,es/* applyTo */.gH4)(src)],
    // Empty is constant data
    [es/* isEmpty */.xbD, es/* identity */.yRu],
    // Array may be path or template
    [(0,es.is)(Array), processArray],
    // Object is always template part
    [isObjectStrict, template(es.__, src)],
    // Everything else is constant data
    [es.T, es/* identity */.yRu]]))(v);
  }
  function processArray(v) {
    return (0,es/* cond */.wVM)([
    // if array is path
    [isAllPrimitive, (0,es/* path */.ETc)(es.__, src)],
    // In other cases array is template part
    [es.T, processTpl]])(v);
  }
  return processTpl(tpl);
});

/**
 * Returns `true` if value is empty, `null` or `undefined`, otherwise `false`.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 *
 * @example
 * isNilOrEmpty({}) //=> true
 * isNilOrEmpty([1]) //=> false
 */
var isNilOrEmpty = (0,es/* anyPass */.H50)([es/* isEmpty */.xbD, es/* isNil */.kKJ]);

/**
 * Returns `true` if value is not empty and not `null`/`undefined`, otherwise `false`.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
var isNotNilOrEmpty = (0,es/* complement */.CyQ)(isNilOrEmpty);

/**
 * Checks truthiness of a property.
 * Returns true if property value is falsy.
 *
 * @function
 * @param {string} prop
 * @param {object}
 * @returns {boolean}
 *
 * @example
 * notProp('country', { country: '' }) //=> true
 * notProp('country', { country: 'France' }) //=> false
 */
var notProp = (0,es/* complement */.CyQ)(es/* prop */.vgT);

/**
 * Returns new empty object.
 *
 * @function
 * @returns {object}
 */
var obj = function obj() {
  return {};
};

/**
 * Returns value based on condition.
 * If truthy returns first, otherwise second.
 * Condition could be function, in this case returns a function that after call
 * invokes condition function with actual arguments and apply to `alt`.
 *
 * @function
 * @param {*} a Value if condition is true
 * @param {*} b Value if condition is false
 * @param {*} cond Condition
 * @returns {*}
 */
var alt = (0,es/* curry */.WAo)(function (t, f, c) {
  if ((0,es.is)(Function, c)) {
    return function () {
      return alt(t, f, c.apply(void 0, arguments));
    };
  }
  return c ? t : f;
});

/**
 * If value is truthy at given path return `t` value, `f` otherwise.
 *
 * @function
 * @param {array} path
 * @param {*} t Value returned if path value is truthy
 * @param {*} f Value returned if path value is falsy
 * @param {object} target Target object
 * @returns {*}
 *
 * @example
 * pathAlt(['a', 'b'], true, false, {}) //=> false
 * pathAlt(['a', 'b'], 'pass', 'fail', { a: { b: 42 } }) //=> 'pass'
 */
var pathAlt = (0,es/* curry */.WAo)(function (p, t, f) {
  return pathTo(p, alt(t, f));
});

/**
 * Calls `fn` with `props` values as first argument and returns result of that call.
 *
 * @function
 * @param {array} props
 * @param {function} fn
 * @param {object} source
 * @returns {*}
 *
 * @example
 * propsTo(['a', 'b'], (props) => props, { a: 1, b: 2 }) //=> [1, 2]
 */
var propsTo = (0,es/* curry */.WAo)(function (p, cb, source) {
  return (0,es/* pipe */.zGw)((0,es/* props */.NQ5)(p), cb)(source);
});
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/ezAlert.vue?vue&type=script&lang=js
function ezAlertvue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return ezAlertvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, ezAlertvue_type_script_lang_js_typeof(obj); }
function ezAlertvue_type_script_lang_js_defineProperty(obj, key, value) { key = ezAlertvue_type_script_lang_js_toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function ezAlertvue_type_script_lang_js_toPropertyKey(arg) { var key = ezAlertvue_type_script_lang_js_toPrimitive(arg, "string"); return ezAlertvue_type_script_lang_js_typeof(key) === "symbol" ? key : String(key); }
function ezAlertvue_type_script_lang_js_toPrimitive(input, hint) { if (ezAlertvue_type_script_lang_js_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (ezAlertvue_type_script_lang_js_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }




var typeAlert = ['info', 'error', 'success', 'warning', 'default'];
/* harmony default export */ const ezAlertvue_type_script_lang_js = ({
  components: {
    cIcon: ezIcon
  },
  props: {
    message: {
      type: String,
      "default": 'List is empty. Please add item.'
    },
    icon: {
      type: Object,
      "default": function _default() {
        return info_baseline/* default */.Z;
      }
    },
    dense: {
      type: Boolean
    },
    alignTop: {
      type: Boolean
    },
    fluid: {
      type: Boolean
    },
    grid: {
      type: Boolean
    },
    type: {
      type: String,
      validator: (0,es/* flip */.RRI)(es/* includes */.q9t)(typeAlert),
      "default": 'default'
    }
  },
  computed: {
    isStringIcon: pathTo(['icon'], isString),
    classSettings: function classSettings() {
      return ezAlertvue_type_script_lang_js_defineProperty({
        'c-alert_align-top': this.alignTop,
        'c-alert_fluid': this.fluid,
        'c-alert_dense': this.dense,
        'c-alert_grid': this.grid
      }, "c-alert_".concat(this.type), true);
    }
  }
});
;// CONCATENATED MODULE: ./ui/src/components/ezAlert.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/ezAlert.vue




;


const ezAlert_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(ezAlertvue_type_script_lang_js, [['render',ezAlertvue_type_template_id_6fc12faf_render]])

/* harmony default export */ const ezAlert = (ezAlert_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/cButton.vue?vue&type=template&id=bb187e20

var cButtonvue_type_template_id_bb187e20_hoisted_1 = ["type", "disabled"];
var cButtonvue_type_template_id_bb187e20_hoisted_2 = ["href"];
var cButtonvue_type_template_id_bb187e20_hoisted_3 = {
  key: 1,
  "class": "c-button__icon-left"
};
var cButtonvue_type_template_id_bb187e20_hoisted_4 = {
  key: 2,
  "class": "c-button__icon-right"
};
function cButtonvue_type_template_id_bb187e20_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_c_icon = (0,vue_esm_bundler/* resolveComponent */.up)("c-icon");
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("button", {
    ref: "button",
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["c-button", $options.computedClasses]),
    style: (0,vue_esm_bundler/* normalizeStyle */.j5)($options.computedColors),
    type: $props.type,
    disabled: $options.calculatedDisabled,
    onClick: _cache[0] || (_cache[0] = function ($event) {
      return _ctx.$emit('click', $event);
    })
  }, [$props.link && !$props.disabled && !$props.loading ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("a", {
    key: 0,
    "class": "c-button__link",
    href: $props.link
  }, null, 8 /* PROPS */, cButtonvue_type_template_id_bb187e20_hoisted_2)) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true), _ctx.$slots.icon || $props.icon ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", cButtonvue_type_template_id_bb187e20_hoisted_3, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "icon", {}, function () {
    return [$options.showIconLoader ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_icon, {
      key: 0,
      icon: _ctx.icons.connectLoaderAnimated,
      size: $options.iconSize,
      locator: "loading-indicator"
    }, null, 8 /* PROPS */, ["icon", "size"])) : $props.icon ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_icon, {
      key: 1,
      icon: $props.icon,
      size: $options.iconSize
    }, null, 8 /* PROPS */, ["icon", "size"])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)];
  })])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true), (0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "default", {}, function () {
    return [$props.label ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)(vue_esm_bundler/* Fragment */.HY, {
      key: 0
    }, [$options.showLoader ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_icon, {
      key: 0,
      icon: _ctx.icons.connectLoaderAnimated,
      size: $options.iconSize,
      locator: "loading-indicator"
    }, null, 8 /* PROPS */, ["icon", "size"])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true), (0,vue_esm_bundler/* createElementVNode */._)("div", {
      "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["c-button__label", $options.cButtonLabelClasses])
    }, (0,vue_esm_bundler/* toDisplayString */.zw)($props.label), 3 /* TEXT, CLASS */)], 64 /* STABLE_FRAGMENT */)) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)];
  }), _ctx.$slots['right-icon'] || $props.iconRight ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", cButtonvue_type_template_id_bb187e20_hoisted_4, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "right-icon", {}, function () {
    return [$options.showRightIconLoader ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_icon, {
      key: 0,
      icon: _ctx.icons.connectLoaderAnimated,
      size: $options.iconSize,
      locator: "loading-indicator"
    }, null, 8 /* PROPS */, ["icon", "size"])) : $props.iconRight ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_icon, {
      key: 1,
      icon: $props.iconRight,
      size: $options.iconSize,
      "class": (0,vue_esm_bundler/* normalizeClass */.C_)($options.cButtonIconRightClasses)
    }, null, 8 /* PROPS */, ["icon", "size", "class"])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)];
  })])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)], 14 /* CLASS, STYLE, PROPS */, cButtonvue_type_template_id_bb187e20_hoisted_1);
}
;// CONCATENATED MODULE: ./ui/src/components/cButton.vue?vue&type=template&id=bb187e20

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/connect/loader/animated.svg
var loader_animated = __webpack_require__(836);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/cButton.vue?vue&type=script&lang=js





var cButtonModesDict = {
  solid: 'solid',
  flat: 'flat',
  outlined: 'outlined',
  rounded: 'rounded'
};
var cButtonModes = (0,es/* values */.VO0)(cButtonModesDict);
var contrastHexColor = function contrastHexColor(v) {
  return isBright(v) ? '#000000' : '#FFFFFF';
};
var toContrastRGB = (0,es/* pipe */.zGw)(contrastHexColor, hexToRGB);
/* harmony default export */ const cButtonvue_type_script_lang_js = ({
  components: {
    cIcon: ezIcon
  },
  props: {
    active: Boolean,
    icon: {
      type: Object,
      "default": function _default() {
        return null;
      }
    },
    iconRight: {
      type: Object,
      "default": function _default() {
        return null;
      }
    },
    label: {
      type: String,
      "default": ''
    },
    opener: Boolean,
    isOpen: Boolean,
    size: {
      type: String,
      "default": ''
    },
    fluid: Boolean,
    loading: {
      type: Boolean,
      "default": false
    },
    disabled: {
      type: Boolean,
      "default": false
    },
    type: {
      type: String,
      "default": 'button',
      validator: (0,es/* includes */.q9t)(es.__, ['button', 'submit'])
    },
    mode: {
      type: String,
      "default": cButtonModesDict.flat,
      validator: (0,es/* includes */.q9t)(es.__, cButtonModes)
    },
    color: {
      type: String,
      "default": '',
      validator: validateColor
    },
    small: {
      type: Boolean,
      "default": false
    },
    upperCase: {
      type: Boolean,
      "default": true
    },
    link: {
      type: String,
      "default": ''
    }
  },
  emits: ['click'],
  data: function data() {
    return {
      buttonColor: '',
      icons: {
        connectLoaderAnimated: loader_animated/* default */.Z
      }
    };
  },
  computed: {
    calculatedDisabled: (0,es/* either */.wEe)((0,es/* prop */.vgT)('loading'), (0,es/* prop */.vgT)('disabled')),
    isIconOnlyBtn: (0,es/* where */.arb)({
      icon: isNotNilOrEmpty,
      label: isNilOrEmpty,
      iconRight: isNilOrEmpty
    }),
    isTxtOnlyBtn: (0,es/* where */.arb)({
      icon: isNilOrEmpty,
      label: isNotNilOrEmpty,
      iconRight: isNilOrEmpty
    }),
    isIconsBtn: (0,es/* where */.arb)({
      icon: isNotNilOrEmpty,
      iconRight: isNotNilOrEmpty
    }),
    isSolidBtn: (0,es/* propEq */.OH4)(cButtonModesDict.solid, 'mode'),
    initialBtnColor: (0,es/* cond */.wVM)([[(0,es/* prop */.vgT)('color'), pathTo(['color'], hexColor)], [(0,es/* prop */.vgT)('isSolidBtn'), (0,es/* always */.Bxt)('accent')], [es.T, (0,es/* always */.Bxt)('#212121')]]),
    isVarColor: pathTo(['initialBtnColor'], checkVarColor),
    classNameByMode: function classNameByMode(_ref) {
      var mode = _ref.mode;
      return "c-button_".concat(mode);
    },
    classFluid: template({
      'c-button_fluid': ['fluid']
    }),
    classActive: template({
      'c-button_active': ['active']
    }),
    classNameBySize: pathAlt(['small'], 'c-button_small', ''),
    classNameByDisabled: pathAlt(['disabled'], 'c-button_disabled', ''),
    classNameByContent: (0,es/* cond */.wVM)([[(0,es/* prop */.vgT)('isIconOnlyBtn'), (0,es/* always */.Bxt)('c-button_icon-only')], [(0,es/* prop */.vgT)('isTxtOnlyBtn'), (0,es/* always */.Bxt)('c-button_txt-only')], [es.T, (0,es/* always */.Bxt)('')]]),
    computedClasses: (0,es/* pipe */.zGw)((0,es/* pick */.eiS)(['classNameByMode', 'classNameBySize', 'classNameByContent', 'classNameByDisabled', 'classFluid', 'classActive']), (0,es/* pickBy */.D95)(isNotNilOrEmpty), es/* values */.VO0),
    computedColor: function computedColor(vm) {
      return (0,es/* cond */.wVM)([[(0,es/* prop */.vgT)('disabled'), obj], [(0,es/* prop */.vgT)('isVarColor'), (0,es/* always */.Bxt)({
        '--button-computed-color': "var(--theme_".concat(vm.initialBtnColor, "_rgb)")
      })], [(0,es/* prop */.vgT)('color'), (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('color'), colorToRGB, rgbToStyleVar('button-computed-color'))], [es.T, (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('initialBtnColor'), colorToRGB, rgbToStyleVar('button-color'))]])(vm);
    },
    computedContentColor: (0,es/* ifElse */.KJl)((0,es/* anyPass */.H50)([(0,es/* prop */.vgT)('disabled'), notProp('isSolidBtn')]), obj, (0,es/* pipe */.zGw)((0,es/* prop */.vgT)('buttonColor'), toContrastRGB, rgbToStyleVar('solid-content-color'))),
    computedColors: propsTo(['computedColor', 'computedContentColor'], es/* mergeAll */.Jnq),
    showIconLoader: (0,es/* both */.HkC)((0,es/* prop */.vgT)('loading'), (0,es/* anyPass */.H50)([(0,es/* prop */.vgT)('icon'), (0,es/* prop */.vgT)('isIconsBtn')])),
    showLoader: (0,es/* whereEq */.goX)({
      loading: true,
      isTxtOnlyBtn: true
    }),
    showRightIconLoader: (0,es/* where */.arb)({
      loading: Boolean,
      icon: isNilOrEmpty,
      iconRight: isNotNilOrEmpty
    }),
    showIconOnly: (0,es/* anyPass */.H50)([(0,es/* prop */.vgT)('showLoader'), (0,es/* prop */.vgT)('isIconOnlyBtn')]),
    iconSize: (0,es/* cond */.wVM)([[(0,es/* prop */.vgT)('size'), (0,es/* prop */.vgT)('size')], [(0,es/* both */.HkC)((0,es/* prop */.vgT)('showIconOnly'), (0,es/* prop */.vgT)('small')), (0,es/* always */.Bxt)('18')], [(0,es/* prop */.vgT)('showIconOnly'), (0,es/* always */.Bxt)('24')], [(0,es/* prop */.vgT)('small'), (0,es/* always */.Bxt)('14')], [es.T, (0,es/* always */.Bxt)('18')]]),
    cButtonLabelClasses: template({
      'c-button__label_uppercase': ['upperCase'],
      'c-button__label_loading': ['showLoader']
    }),
    cButtonIconRightClasses: template({
      'opener-status': ['opener'],
      open: ['isOpen']
    })
  },
  mounted: function mounted() {
    this.buttonColor = rgbToHEX(getComputedStyle(this.$refs.button).getPropertyValue('--button-color'));
  }
});
;// CONCATENATED MODULE: ./ui/src/components/cButton.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/cButton.vue




;


const cButton_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(cButtonvue_type_script_lang_js, [['render',cButtonvue_type_template_id_bb187e20_render]])

/* harmony default export */ const cButton = (cButton_exports_);
// EXTERNAL MODULE: ./node_modules/fuse.js/dist/fuse.esm.js
var fuse_esm = __webpack_require__(221);
;// CONCATENATED MODULE: ./ui/src/scripts/api.js
/*
Copyright (c) 2023, Rahul
All rights reserved.
*/

// //////////////////////// //
// API calls to the backend //
// //////////////////////// //

// Retrieve Datalake Pubsub Settings │ GET    │ /settings
// Validate Datalake Pubsub Settings │ GET    │ /settings/validate
// Save Datalake Pubsub Settings     │ POST   │ /settings
//
// Retrieve Product List             │ GET    │ /products
// Publish Products Info             │ POST   │ /products/*/publish
// Publish Products Info             │ POST   │ /products/*/publish-all

var getJson = function getJson(r) {
  return r.json();
};

// Settings API:

var getSettings = function getSettings() {
  return fetch('/api/settings').then(getJson);
};
var getHubs = function getHubs() {
  return fetch('/api/hubs').then(getJson);
};
var validateSettings = function validateSettings(hubId) {
  return fetch("/api/settings/validate/".concat(hubId)).then(getJson);
};
var updateSettings = function updateSettings(hubId, settings) {
  return fetch("/api/settings/".concat(hubId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(settings)
  }).then(getJson);
};
var deleteSettings = function deleteSettings(hubId) {
  return fetch("/api/settings/".concat(hubId), {
    method: 'DELETE'
  }).then(getJson);
};

// Products API:

var getProducts = function getProducts() {
  return fetch('/api/products').then(getJson);
};
var publishProducts = function publishProducts(products) {
  return fetch('/api/products/*/publish', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
  });
};
// .then(getJson);

var publishAllProducts = function publishAllProducts() {
  return fetch('/api/products/*/publish-all');
};
// .then(getJson);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/SyncCard.vue?vue&type=script&lang=js
function SyncCardvue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return SyncCardvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, SyncCardvue_type_script_lang_js_typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == SyncCardvue_type_script_lang_js_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }







/* harmony default export */ const SyncCardvue_type_script_lang_js = ({
  inject: ['$injector'],
  components: {
    cAlert: ezAlert,
    cIcon: ezIcon,
    cButton: cButton
  },
  props: {
    title: {
      type: String,
      "default": ''
    },
    enabled: Boolean
  },
  data: function data() {
    return {
      isSyncDialogOpen: false,
      isSyncing: false,
      showValidation: false,
      products: [],
      searchQuery: '',
      selectedProductsIds: [],
      syncAll: false,
      icons: {
        googleSyncBaseline: baseline/* default */.Z,
        googleCheckCircleBaseline: check_circle_baseline/* default */.Z,
        googleSearchBaseline: search_baseline/* default */.Z
      }
    };
  },
  computed: {
    productsToSync: function productsToSync(vm) {
      return (0,es/* filter */.hXT)(function (p) {
        return vm.selectedProductsIds[p.id] === true;
      }, vm.products);
    },
    syncedProductsMsg: function syncedProductsMsg(vm) {
      return "Products: '".concat((0,es/* join */.v_p)(', ', (0,es/* map */.UID)((0,es/* prop */.vgT)('name'), vm.productsToSync)), "' are successfully synced");
    },
    filteredProducts: function filteredProducts() {
      if (!this.searchQuery) return this.products;
      var fuse = new fuse_esm/* default */.Z(this.products, {
        keys: ['name', 'id', 'owner.name', 'owner.id']
      });
      var results = fuse.search(this.searchQuery);
      return results.map(function (result) {
        return result.item;
      });
    }
  },
  methods: {
    sendMsg: function sendMsg(msg) {
      this.$injector.emit('snackbar:message', msg);
    },
    handleErr: function handleErr(err) {
      this.$injector.emit('snackbar:error', err);
    },
    syncProducts: function syncProducts() {
      var _this = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isSyncing = true;
              _context.prev = 1;
              _context.next = 4;
              return publishProducts(_this.productsToSync);
            case 4:
              _this.sendMsg('Selected products synced');
              _context.next = 10;
              break;
            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](1);
              _this.handleErr(_context.t0);
            case 10:
              _context.prev = 10;
              _this.isSyncing = false;
              return _context.finish(10);
            case 13:
              _this.showValidation = true;
              _this.isSyncDialogOpen = false;
              setTimeout(function () {
                _this.showValidation = false;
              }, 10000);
            case 16:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[1, 7, 10, 13]]);
      }))();
    },
    syncAllProducts: function syncAllProducts() {
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return publishAllProducts();
            case 2:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }))();
    },
    toggle: function toggle(evt) {
      var pId = evt.target.id;
      this.selectedProductsIds[pId] = evt.target.checked;
    },
    toggleAll: function toggleAll(evt) {
      var _this2 = this;
      var isChecked = evt.target.checked;
      Object.keys(this.selectedProductsIds).forEach(function (key) {
        _this2.selectedProductsIds[key] = isChecked;
      });
    }
  },
  watch: {
    isSyncDialogOpen: function isSyncDialogOpen(newVal) {
      var _this3 = this;
      return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              if (!(newVal === true)) {
                _context3.next = 6;
                break;
              }
              _context3.next = 3;
              return getProducts();
            case 3:
              _this3.products = _context3.sent;
              _this3.syncAll = false;
              _this3.selectedProductsIds = (0,es/* reduce */.u4g)(function (acc, p) {
                acc[p.id] = false;
                return acc;
              }, {}, _this3.products);
            case 6:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }))();
    }
  }
});
;// CONCATENATED MODULE: ./ui/src/components/SyncCard.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/SyncCard.vue




;


const SyncCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(SyncCardvue_type_script_lang_js, [['render',SyncCardvue_type_template_id_d28dc2c6_scoped_true_render],['__scopeId',"data-v-d28dc2c6"]])

/* harmony default export */ const SyncCard = (SyncCard_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/PubCard.vue?vue&type=template&id=e73ee2ac&scoped=true

var PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId = function _withScopeId(n) {
  return (0,vue_esm_bundler/* pushScopeId */.dD)("data-v-e73ee2ac"), n = n(), (0,vue_esm_bundler/* popScopeId */.Cn)(), n;
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_1 = {
  id: "publishing-card",
  "class": "ez-card"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_2 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("header", {
    "class": "ez-card__header"
  }, [/*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("h2", {
    "class": "ez-card__title"
  }, " Settings ")], -1 /* HOISTED */);
});
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_3 = {
  "class": "table-item"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_4 = {
  "class": "table-item__title"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_5 = {
  "class": "table-item__assistive"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_6 = {
  key: 0,
  "class": "table-item"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_7 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("p", {
    "class": "table-item__title monospace-text"
  }, " ********* ", -1 /* HOISTED */);
});
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_8 = {
  "class": "table-item__assistive"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_9 = {
  key: 1,
  "class": "table-item_empty"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_10 = {
  "class": "table-icons"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_11 = {
  "class": "menu-items"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_12 = {
  key: 0,
  "class": "menu-item"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_13 = {
  key: 0,
  "class": "ez-dialog__inner"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_14 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("header", {
    "class": "ez-dialog__header"
  }, " Settings ", -1 /* HOISTED */);
});
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_15 = {
  ref: "dialogContentEl",
  "class": "ez-dialog__content"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_16 = {
  "class": "hub-info"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_17 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("p", {
    "class": "label-text"
  }, " Hub ", -1 /* HOISTED */);
});
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_18 = {
  "class": "table-item"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_19 = {
  "class": "table-item__title"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_20 = {
  "class": "table-item__assistive"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_21 = {
  action: "",
  "class": "ez-dialog__form"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_22 = {
  "class": "account-json-wrapper"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_23 = {
  "class": "custom-file-input ez-dialog__controls"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_24 = {
  "for": "file-input",
  "class": "custom-file-input__label"
};
var PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_25 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("label", {
    "for": "account_info",
    "class": "label-text"
  }, "Google Credentials JSON", -1 /* HOISTED */);
});
var _hoisted_26 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("label", {
    "for": "product_topic",
    "class": "label-text"
  }, "Pub/Sub Topic", -1 /* HOISTED */);
});
var _hoisted_27 = {
  "class": "ez-dialog__footer"
};
var _hoisted_28 = {
  key: 0,
  "class": "ez-dialog__inner"
};
var _hoisted_29 = /*#__PURE__*/PubCardvue_type_template_id_e73ee2ac_scoped_true_withScopeId(function () {
  return /*#__PURE__*/(0,vue_esm_bundler/* createElementVNode */._)("header", {
    "class": "ez-dialog__header"
  }, " Delete credentials ", -1 /* HOISTED */);
});
var _hoisted_30 = {
  "class": "ez-dialog__content"
};
var _hoisted_31 = {
  "class": "delete-dialog-text"
};
var _hoisted_32 = {
  "class": "ez-dialog__footer"
};
function PubCardvue_type_template_id_e73ee2ac_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_c_icon = (0,vue_esm_bundler/* resolveComponent */.up)("c-icon");
  var _component_c_button = (0,vue_esm_bundler/* resolveComponent */.up)("c-button");
  var _component_c_menu = (0,vue_esm_bundler/* resolveComponent */.up)("c-menu");
  var _component_ez_table = (0,vue_esm_bundler/* resolveComponent */.up)("ez-table");
  var _component_c_alert = (0,vue_esm_bundler/* resolveComponent */.up)("c-alert");
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("section", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_1, [PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_2, (0,vue_esm_bundler/* createVNode */.Wm)(_component_ez_table, {
    items: $options.items,
    headers: $data.headers
  }, {
    hub: (0,vue_esm_bundler/* withCtx */.w5)(function (item) {
      return [(0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_3, [(0,vue_esm_bundler/* createElementVNode */._)("p", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_4, (0,vue_esm_bundler/* toDisplayString */.zw)(item.hub.name), 1 /* TEXT */), (0,vue_esm_bundler/* createElementVNode */._)("p", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_5, (0,vue_esm_bundler/* toDisplayString */.zw)(item.hub.id), 1 /* TEXT */)])];
    }),

    credentials: (0,vue_esm_bundler/* withCtx */.w5)(function (item) {
      return [item.credentials ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_6, [PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_7, (0,vue_esm_bundler/* createElementVNode */._)("p", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_8, (0,vue_esm_bundler/* toDisplayString */.zw)(item.credentials.topic), 1 /* TEXT */)])) : ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("span", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_9, "—"))];
    }),
    actions: (0,vue_esm_bundler/* withCtx */.w5)(function (item) {
      return [(0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_10, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_icon, {
        "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["error-icon", {
          'error-icon_visible': $data.itemsWithErrors[item.hub.id]
        }]),
        icon: $data.icons.googleErrorBaseline,
        color: "#FF6A6A",
        size: "18"
      }, null, 8 /* PROPS */, ["class", "icon"]), (0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
        icon: $data.icons.googleEditBaseline,
        disabled: $data.isValidating,
        title: $data.isValidating ? 'Please wait until validation is finished' : null,
        "show-icon-only": "",
        small: "",
        onClick: function onClick($event) {
          return $options.openEditDialog(item);
        }
      }, null, 8 /* PROPS */, ["icon", "disabled", "title", "onClick"]), (0,vue_esm_bundler/* createVNode */.Wm)(_component_c_menu, {
        disabled: $data.isValidating
      }, {
        trigger: (0,vue_esm_bundler/* withCtx */.w5)(function () {
          return [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
            disabled: $data.isValidating,
            icon: $data.icons.googleMoreVertBaseline,
            title: $data.isValidating ? 'Please wait until validation is finished' : null,
            "show-icon-only": "",
            small: ""
          }, null, 8 /* PROPS */, ["disabled", "icon", "title"])];
        }),
        "default": (0,vue_esm_bundler/* withCtx */.w5)(function () {
          return [(0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_11, [(0,vue_esm_bundler/* createElementVNode */._)("div", {
            "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["menu-item", {
              'menu-item_disabled': !item.credentials
            }])
          }, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
            disabled: !item.credentials,
            icon: $data.icons.googlePublishedWithChangesBaseline,
            "upper-case": false,
            title: item.credentials ? null : 'No credentials to validate',
            "class": "menu-item__btn",
            label: "Validate credentials",
            size: "18",
            onClick: function onClick($event) {
              return $options.validateConfig(item);
            }
          }, null, 8 /* PROPS */, ["disabled", "icon", "title", "onClick"])], 2 /* CLASS */), item.credentials ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_12, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
            icon: $data.icons.googleDeleteBaseline,
            "upper-case": false,
            "class": "menu-item__btn",
            color: "red",
            label: "Delete credentials",
            size: "18",
            onClick: function onClick($event) {
              return $options.openDeleteDialog(item);
            }
          }, null, 8 /* PROPS */, ["icon", "onClick"])])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)])];
        }),
        _: 2 /* DYNAMIC */
      }, 1032 /* PROPS, DYNAMIC_SLOTS */, ["disabled"])])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["items", "headers"]), (0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["ez-dialog", {
      'ez-dialog_open': $data.isEditDialogOpen
    }])
  }, [$data.isEditDialogOpen ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("section", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_13, [PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_14, (0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_15, [$data.dialogError ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createBlock */.j4)(_component_c_alert, {
    key: 0,
    "class": "ez-card__alert",
    icon: $data.icons.googleWarningBaseline,
    message: $data.dialogError,
    type: "error",
    fluid: ""
  }, null, 8 /* PROPS */, ["icon", "message"])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true), (0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_16, [PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_17, (0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_18, [(0,vue_esm_bundler/* createElementVNode */._)("p", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_19, (0,vue_esm_bundler/* toDisplayString */.zw)($data.currentItem.hub.name), 1 /* TEXT */), (0,vue_esm_bundler/* createElementVNode */._)("p", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_20, (0,vue_esm_bundler/* toDisplayString */.zw)($data.currentItem.hub.id), 1 /* TEXT */)])]), (0,vue_esm_bundler/* createElementVNode */._)("form", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_21, [(0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_22, [(0,vue_esm_bundler/* createElementVNode */._)("div", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_23, [(0,vue_esm_bundler/* createElementVNode */._)("label", PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_24, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_icon, {
    icon: $data.icons.googleUploadBaseline,
    size: "16",
    "class": "custom-file-input__label-icon"
  }, null, 8 /* PROPS */, ["icon"]), (0,vue_esm_bundler/* createElementVNode */._)("span", null, (0,vue_esm_bundler/* toDisplayString */.zw)($data.loadedFileName || 'Load from file'), 1 /* TEXT */)]), (0,vue_esm_bundler/* createElementVNode */._)("input", {
    id: "file-input",
    "class": "custom-file-input__input",
    type: "file",
    accept: ".json",
    onChange: _cache[0] || (_cache[0] = function () {
      return $options.onFileChange && $options.onFileChange.apply($options, arguments);
    })
  }, null, 32 /* HYDRATE_EVENTS */)]), PubCardvue_type_template_id_e73ee2ac_scoped_true_hoisted_25, (0,vue_esm_bundler/* withDirectives */.wy)((0,vue_esm_bundler/* createElementVNode */._)("textarea", {
    id: "account_info",
    ref: "textarea-account-info",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.accountInfo = $event;
    }),
    "class": "code account-info-area",
    materialize: ""
  }, null, 512 /* NEED_PATCH */), [[vue_esm_bundler/* vModelText */.nr, $data.accountInfo]])]), _hoisted_26, (0,vue_esm_bundler/* withDirectives */.wy)((0,vue_esm_bundler/* createElementVNode */._)("textarea", {
    id: "product_topic",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.productTopic = $event;
    }),
    "class": "code topic-area",
    materialize: ""
  }, null, 512 /* NEED_PATCH */), [[vue_esm_bundler/* vModelText */.nr, $data.productTopic]])])], 512 /* NEED_PATCH */), (0,vue_esm_bundler/* createElementVNode */._)("footer", _hoisted_27, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    label: "cancel",
    onClick: $options.closeEditDialog
  }, null, 8 /* PROPS */, ["onClick"]), (0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    disabled: !$options.canSaveCreds,
    loading: $data.isSaving,
    color: "light blue",
    label: "Save",
    onClick: $options.saveConfig
  }, null, 8 /* PROPS */, ["disabled", "loading", "onClick"])])])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)], 2 /* CLASS */), (0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["ez-dialog", {
      'ez-dialog_open': $data.isDeleteDialogOpen
    }])
  }, [$data.isDeleteDialogOpen ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("section", _hoisted_28, [_hoisted_29, (0,vue_esm_bundler/* createElementVNode */._)("div", _hoisted_30, [(0,vue_esm_bundler/* createElementVNode */._)("p", _hoisted_31, " Are you sure you want to delete the credentials for " + (0,vue_esm_bundler/* toDisplayString */.zw)($data.currentItem.hub.name) + " hub (" + (0,vue_esm_bundler/* toDisplayString */.zw)($data.currentItem.hub.id) + ")? ", 1 /* TEXT */)]), (0,vue_esm_bundler/* createElementVNode */._)("footer", _hoisted_32, [(0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    color: "black",
    label: "Cancel",
    onClick: $options.closeDeleteDialog
  }, null, 8 /* PROPS */, ["onClick"]), (0,vue_esm_bundler/* createVNode */.Wm)(_component_c_button, {
    loading: $data.isDeleting,
    color: "red",
    label: "Delete",
    onClick: $options.deleteCredentials
  }, null, 8 /* PROPS */, ["loading", "onClick"])])])) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)], 2 /* CLASS */)]);
}
;// CONCATENATED MODULE: ./ui/src/components/PubCard.vue?vue&type=template&id=e73ee2ac&scoped=true

// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/upload/baseline.svg
var upload_baseline = __webpack_require__(390);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/warning/baseline.svg
var warning_baseline = __webpack_require__(294);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/edit/baseline.svg
var edit_baseline = __webpack_require__(434);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/more_vert/baseline.svg
var more_vert_baseline = __webpack_require__(281);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/published_with_changes/baseline.svg
var published_with_changes_baseline = __webpack_require__(91);
// EXTERNAL MODULE: ./node_modules/@cloudblueconnect/material-svg/icons/google/delete/baseline.svg
var delete_baseline = __webpack_require__(746);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/ezTable.vue?vue&type=template&id=5be50262&scoped=true

function ezTablevue_type_template_id_5be50262_scoped_true_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("table", null, [(0,vue_esm_bundler/* createElementVNode */._)("thead", null, [(0,vue_esm_bundler/* createElementVNode */._)("tr", null, [((0,vue_esm_bundler/* openBlock */.wg)(true), (0,vue_esm_bundler/* createElementBlock */.iD)(vue_esm_bundler/* Fragment */.HY, null, (0,vue_esm_bundler/* renderList */.Ko)($props.headers, function (header) {
    return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("th", {
      key: header.value,
      style: (0,vue_esm_bundler/* normalizeStyle */.j5)({
        width: header.width || 'auto'
      }),
      role: "columnheader"
    }, (0,vue_esm_bundler/* toDisplayString */.zw)(header.label), 5 /* TEXT, STYLE */);
  }), 128 /* KEYED_FRAGMENT */))])]), (0,vue_esm_bundler/* createElementVNode */._)("tbody", null, [((0,vue_esm_bundler/* openBlock */.wg)(true), (0,vue_esm_bundler/* createElementBlock */.iD)(vue_esm_bundler/* Fragment */.HY, null, (0,vue_esm_bundler/* renderList */.Ko)($props.items, function (item, idx) {
    return (0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "items", (0,vue_esm_bundler/* normalizeProps */.vs)((0,vue_esm_bundler/* guardReactiveProps */.F4)({
      item: item,
      headers: $props.headers
    })), function () {
      return [((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("tr", {
        key: "tr-".concat(idx)
      }, [((0,vue_esm_bundler/* openBlock */.wg)(true), (0,vue_esm_bundler/* createElementBlock */.iD)(vue_esm_bundler/* Fragment */.HY, null, (0,vue_esm_bundler/* renderList */.Ko)($props.headers, function (header) {
        return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("td", {
          key: header.value
        }, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, header.value, (0,vue_esm_bundler/* normalizeProps */.vs)((0,vue_esm_bundler/* guardReactiveProps */.F4)(item)), undefined, true)]);
      }), 128 /* KEYED_FRAGMENT */))]))];
    }, true);
  }), 256 /* UNKEYED_FRAGMENT */))])]);
}
;// CONCATENATED MODULE: ./ui/src/components/ezTable.vue?vue&type=template&id=5be50262&scoped=true

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/ezTable.vue?vue&type=script&lang=js
/* harmony default export */ const ezTablevue_type_script_lang_js = ({
  props: {
    headers: {
      type: Array,
      required: true
    },
    items: {
      type: Array,
      required: true
    }
  }
});
;// CONCATENATED MODULE: ./ui/src/components/ezTable.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/ezTable.vue




;


const ezTable_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(ezTablevue_type_script_lang_js, [['render',ezTablevue_type_template_id_5be50262_scoped_true_render],['__scopeId',"data-v-5be50262"]])

/* harmony default export */ const ezTable = (ezTable_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/cMenu.vue?vue&type=template&id=c5037f40

function cMenuvue_type_template_id_c5037f40_render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", {
    ref: "cMenu",
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)([$options.menuClasses, "c-menu"])
  }, [(0,vue_esm_bundler/* createElementVNode */._)("div", {
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["c-menu__trigger", $options.classNameByDisabled]),
    style: (0,vue_esm_bundler/* normalizeStyle */.j5)($options.triggerStyle),
    onClick: _cache[0] || (_cache[0] = (0,vue_esm_bundler/* withModifiers */.iM)(function ($event) {
      return $options.switchVisibility(!$data.value, true);
    }, ["prevent"])),
    onMouseover: _cache[1] || (_cache[1] = (0,vue_esm_bundler/* withModifiers */.iM)(function ($event) {
      return $options.switchVisibility(true, false);
    }, ["prevent"])),
    onMouseleave: _cache[2] || (_cache[2] = (0,vue_esm_bundler/* withModifiers */.iM)(function ($event) {
      return $options.switchVisibility(false, false);
    }, ["prevent"]))
  }, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "trigger")], 38 /* CLASS, STYLE, HYDRATE_EVENTS */), $data.value ? ((0,vue_esm_bundler/* openBlock */.wg)(), (0,vue_esm_bundler/* createElementBlock */.iD)("div", {
    key: 0,
    ref: "cMenuContainer",
    "class": (0,vue_esm_bundler/* normalizeClass */.C_)(["c-menu__container", $props.contentClass]),
    style: (0,vue_esm_bundler/* normalizeStyle */.j5)($options.containerStyle),
    onClick: _cache[3] || (_cache[3] = (0,vue_esm_bundler/* withModifiers */.iM)(function () {
      return $options.onClickInside && $options.onClickInside.apply($options, arguments);
    }, ["stop"])),
    onMouseover: _cache[4] || (_cache[4] = (0,vue_esm_bundler/* withModifiers */.iM)(function ($event) {
      return $options.switchVisibility(true, false);
    }, ["prevent"])),
    onMouseleave: _cache[5] || (_cache[5] = (0,vue_esm_bundler/* withModifiers */.iM)(function ($event) {
      return $options.switchVisibility(false, false);
    }, ["prevent"]))
  }, [(0,vue_esm_bundler/* renderSlot */.WI)(_ctx.$slots, "default")], 38 /* CLASS, STYLE, HYDRATE_EVENTS */)) : (0,vue_esm_bundler/* createCommentVNode */.kq)("v-if", true)], 2 /* CLASS */);
}
;// CONCATENATED MODULE: ./ui/src/components/cMenu.vue?vue&type=template&id=c5037f40

;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/cMenu.vue?vue&type=script&lang=js
function cMenuvue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return cMenuvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, cMenuvue_type_script_lang_js_typeof(obj); }
function cMenuvue_type_script_lang_js_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ cMenuvue_type_script_lang_js_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == cMenuvue_type_script_lang_js_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function cMenuvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function cMenuvue_type_script_lang_js_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { cMenuvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { cMenuvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/* harmony default export */ const cMenuvue_type_script_lang_js = ({
  props: {
    disabled: Boolean,
    small: Boolean,
    isContrast: Boolean,
    overlay: Boolean,
    fullWidth: Boolean,
    setWidth: Boolean,
    contentClass: {
      type: String,
      "default": ''
    },
    openOnClick: {
      type: Boolean,
      "default": true
    },
    attach: {
      type: Boolean,
      "default": true
    },
    actionType: {
      type: String,
      "default": 'click',
      validator: (0,es/* includes */.q9t)(es.__, ['click', 'hover'])
    },
    position: {
      type: String,
      "default": 'right',
      validator: (0,es/* includes */.q9t)(es.__, ['left', 'right', 'center'])
    },
    positionY: {
      type: String,
      "default": 'bottom',
      validator: (0,es/* includes */.q9t)(es.__, ['top', 'bottom'])
    },
    closeOnClickOutside: {
      type: Boolean,
      "default": true
    },
    closeOnClickInside: {
      type: Boolean,
      "default": true
    },
    minWidth: {
      type: Number,
      "default": 40
    },
    zIndex: {
      type: [String, Number],
      "default": 8
    }
  },
  data: function data() {
    return {
      value: false,
      containerWidth: 40,
      triggerWidth: 40,
      triggerBox: {
        width: 40,
        height: 28,
        top: 0,
        left: 0
      }
    };
  },
  computed: {
    classNameByActive: function classNameByActive(vm) {
      return vm.value ? 'c-menu_active' : null;
    },
    classNameByDisabled: function classNameByDisabled(vm) {
      return vm.disabled ? 'c-menu_disabled' : null;
    },
    classNameByWidth: function classNameByWidth(vm) {
      return vm.fullWidth ? 'c-menu_full-width' : null;
    },
    classNameByAttachement: function classNameByAttachement(vm) {
      return vm.attach ? 'c-menu_attached' : null;
    },
    classNameByAction: function classNameByAction(_ref) {
      var actionType = _ref.actionType;
      return "c-menu_".concat(actionType);
    },
    classNameByPosition: function classNameByPosition(_ref2) {
      var position = _ref2.position,
        attach = _ref2.attach;
      return attach ? "c-menu_position-".concat(position) : null;
    },
    classNameByPositionY: function classNameByPositionY(_ref3) {
      var positionY = _ref3.positionY,
        attach = _ref3.attach;
      return attach ? "c-menu_at-".concat(positionY) : null;
    },
    menuClasses: function menuClasses(vm) {
      return [vm.classNameByActive, vm.classNameByWidth, vm.classNameByPosition, vm.classNameByPositionY, vm.classNameByAttachement, vm.classNameByAction];
    },
    containerTop: function containerTop(vm) {
      return vm.overlay ? "".concat(vm.triggerBox.top - 10, "px") : "".concat(vm.triggerBox.top + vm.triggerBox.height, "px");
    },
    containerLeft: function containerLeft(vm) {
      if (vm.position === 'center') return "".concat(vm.triggerBox.left - (vm.containerWidth - vm.triggerBox.width) / 2, "px");
      if (vm.position === 'left') return "".concat(vm.triggerBox.left, "px");
      return "".concat(vm.triggerBox.left + vm.triggerBox.width - vm.containerWidth, "px");
    },
    containerStyleWidth: function containerStyleWidth(vm) {
      return vm.setWidth ? "".concat(vm.triggerBox.width, "px") : null;
    },
    containerStyle: function containerStyle(vm) {
      return {
        'z-index': vm.zIndex,
        '--c-menu-left': vm.containerLeft,
        '--c-menu-top': vm.containerTop,
        '--c-menu-offsetX': "".concat(vm.triggerWidth - vm.containerWidth, "px"),
        'min-width': "".concat(vm.minWidth, "px"),
        width: vm.containerStyleWidth
      };
    },
    triggerStyle: function triggerStyle(vm) {
      return {
        '--c-menu-trigger-color': vm.isContrast ? 'rgba(255, 255, 255, 0.2)' : 'rgba(102, 102, 102, 0.2)'
      };
    }
  },
  methods: {
    switchVisibility: function switchVisibility(visibility, isClick) {
      if (this.disabled || !this.openOnClick) return;
      if (isClick || this.actionType === 'hover') {
        this.value = visibility;
      }
    },
    onClickInside: function onClickInside() {
      if (this.closeOnClickInside) this.value = false;
    },
    addEventOnClickOutside: function addEventOnClickOutside() {
      if (!this.closeOnClickOutside) return;
      window.addEventListener('click', this.closeMenuOnClickOutside);
    },
    removeEventOnClickOutside: function removeEventOnClickOutside() {
      if (!this.closeOnClickOutside) return;
      window.removeEventListener('click', this.closeMenuOnClickOutside);
    },
    closeMenuOnClickOutside: function closeMenuOnClickOutside(e) {
      // w/a for v-select inside menu container click event
      // should be removed after replacing v-select with c-select component in scope of LITE-16180
      var selectedOptionsList = this.$refs.cMenuContainer ? this.$refs.cMenuContainer.querySelectorAll('.v-select__selection') : [];
      var selectedOptionInContainer = (0,es/* any */.YjB)((0,es/* propEq */.OH4)(e.target.textContent, 'textContent'))(selectedOptionsList);
      if (!this.value || !this.closeOnClickOutside || this.$refs.cMenu.contains(e.target) || this.$refs.cMenuContainer && this.$refs.cMenuContainer.contains(e.target) || selectedOptionInContainer) return;
      this.value = false;
    },
    // need to add this event listener because navigation bar button use @click.stop
    addEventOnNavBarClick: function addEventOnNavBarClick() {
      var navBarButton = document.getElementById('navigation-opener');
      if (navBarButton) navBarButton.addEventListener('click', this.closeMenu);
    },
    removeEventOnNavBarClick: function removeEventOnNavBarClick() {
      var navBarButton = document.getElementById('navigation-opener');
      if (navBarButton) navBarButton.removeEventListener('click', this.closeMenu);
    },
    addEventOnPopState: function addEventOnPopState() {
      window.addEventListener('popstate', this.closeMenu);
    },
    removeEventOnPopState: function removeEventOnPopState() {
      window.removeEventListener('popstate', this.closeMenu);
    },
    closeMenu: function closeMenu() {
      this.value = false;
    }
  },
  watch: {
    value: {
      immediate: true,
      handler: function handler(v) {
        var _this = this;
        return cMenuvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/cMenuvue_type_script_lang_js_regeneratorRuntime().mark(function _callee() {
          var trigger, containerBlock;
          return cMenuvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (v) {
                  _context.next = 2;
                  break;
                }
                return _context.abrupt("return");
              case 2:
                trigger = _this.$refs.cMenu.querySelector('.c-menu__trigger');
                if (trigger) {
                  _this.triggerWidth = trigger.clientWidth;
                  _this.triggerBox = _this.attach ? {
                    width: trigger.clientWidth,
                    height: trigger.clientHeight,
                    top: trigger.offsetTop,
                    left: trigger.offsetLeft
                  } : trigger.getBoundingClientRect();
                }
                _context.next = 6;
                return _this.$nextTick();
              case 6:
                containerBlock = _this.$refs.cMenuContainer;
                if (containerBlock) _this.containerWidth = containerBlock.clientWidth;
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      }
    }
  },
  mounted: function mounted() {
    if (this.disabled) return;
    this.addEventOnClickOutside();
    this.addEventOnNavBarClick();
    this.addEventOnPopState();
  },
  beforeUnmount: function beforeUnmount() {
    if (this.disabled) return;
    this.removeEventOnClickOutside();
    this.removeEventOnNavBarClick();
    this.removeEventOnPopState();
  }
});
;// CONCATENATED MODULE: ./ui/src/components/cMenu.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/cMenu.vue




;


const cMenu_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(cMenuvue_type_script_lang_js, [['render',cMenuvue_type_template_id_c5037f40_render]])

/* harmony default export */ const cMenu = (cMenu_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/PubCard.vue?vue&type=script&lang=js
function PubCardvue_type_script_lang_js_typeof(obj) { "@babel/helpers - typeof"; return PubCardvue_type_script_lang_js_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, PubCardvue_type_script_lang_js_typeof(obj); }
function PubCardvue_type_script_lang_js_regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ PubCardvue_type_script_lang_js_regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == PubCardvue_type_script_lang_js_typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function PubCardvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function PubCardvue_type_script_lang_js_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { PubCardvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { PubCardvue_type_script_lang_js_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }








var simplestJSONLength = 9;
/* harmony default export */ const PubCardvue_type_script_lang_js = ({
  inject: ['$injector'],
  components: {
    cAlert: ezAlert,
    cButton: cButton,
    cIcon: ezIcon,
    EzTable: ezTable,
    cMenu: cMenu
  },
  emits: ['can-sync'],
  data: function data() {
    return {
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
      isSaving: false,
      isDeleting: false,
      isValidating: false,
      loadedFileName: '',
      currentItem: null,
      dialogError: '',
      accountInfo: '',
      productTopic: '',
      itemsWithErrors: {},
      icons: {
        googleUploadBaseline: upload_baseline/* default */.Z,
        googleWarningBaseline: warning_baseline/* default */.Z,
        googleEditBaseline: edit_baseline/* default */.Z,
        googleMoreVertBaseline: more_vert_baseline/* default */.Z,
        googlePublishedWithChangesBaseline: published_with_changes_baseline/* default */.Z,
        googleDeleteBaseline: delete_baseline/* default */.Z,
        googleErrorBaseline: error_baseline/* default */.Z
      },
      headers: [{
        label: 'Hub',
        value: 'hub'
      }, {
        label: 'Credentials',
        value: 'credentials'
      }, {
        label: '',
        value: 'actions',
        width: '84px'
      }],
      hubs: [],
      settings: []
    };
  },
  computed: {
    validAccountInfo: function validAccountInfo(vm) {
      return isValidJSON(vm.accountInfo) && vm.accountInfo.length >= simplestJSONLength;
    },
    canSaveCreds: function canSaveCreds(vm) {
      return vm.validAccountInfo && !!vm.productTopic;
    },
    items: function items(_ref) {
      var hubs = _ref.hubs,
        settings = _ref.settings;
      return hubs.map(function (hub) {
        var settingsEl = settings.find(function (x) {
          return x.hub.id === hub.id;
        });
        var credentials = settingsEl && Object.keys(settingsEl.account_info).length ? {
          topic: settingsEl.product_topic,
          info: JSON.stringify(settingsEl.account_info, null, 2)
        } : null;
        return {
          hub: hub,
          credentials: credentials
        };
      });
    }
  },
  methods: {
    sendMsg: function sendMsg(msg) {
      this.$injector.emit('snackbar:message', msg);
    },
    handleErr: function handleErr(err) {
      this.$injector.emit('snackbar:error', "Error: ".concat(err.message));
    },
    openEditDialog: function openEditDialog(item) {
      this.currentItem = item;
      if (item.credentials) {
        this.productTopic = item.credentials.topic;
        this.accountInfo = item.credentials.info;
      } else {
        this.productTopic = '';
        this.accountInfo = '';
      }
      this.isEditDialogOpen = true;
    },
    closeEditDialog: function closeEditDialog() {
      this.isEditDialogOpen = false;
      this.dialogError = '';
      this.accountInfo = '';
      this.productTopic = '';
    },
    openDeleteDialog: function openDeleteDialog(item) {
      this.isDeleteDialogOpen = true;
      this.currentItem = item;
    },
    closeDeleteDialog: function closeDeleteDialog() {
      this.isDeleteDialogOpen = false;
      this.dialogError = '';
    },
    saveConfig: function saveConfig() {
      var _this = this;
      return PubCardvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/PubCardvue_type_script_lang_js_regeneratorRuntime().mark(function _callee() {
        var _yield$updateSettings, error;
        return PubCardvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _this.isSaving = true;
              _this.dialogError = '';
              _context.prev = 2;
              _context.next = 5;
              return updateSettings(_this.currentItem.hub.id, {
                account_info: JSON.parse(_this.accountInfo),
                product_topic: _this.productTopic
              });
            case 5:
              _yield$updateSettings = _context.sent;
              error = _yield$updateSettings.error;
              if (error) {
                _context.next = 15;
                break;
              }
              _this.sendMsg('Settings saved');
              _context.next = 11;
              return _this.loadSettings();
            case 11:
              _this.isEditDialogOpen = false;
              _this.itemsWithErrors[_this.currentItem.hub.id] = false;
              _context.next = 17;
              break;
            case 15:
              _this.dialogError = error;
              _this.$refs.dialogContentEl.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            case 17:
              _context.next = 23;
              break;
            case 19:
              _context.prev = 19;
              _context.t0 = _context["catch"](2);
              _this.dialogError = _context.t0.message;
              _this.$refs.dialogContentEl.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            case 23:
              _context.prev = 23;
              _this.isSaving = false;
              return _context.finish(23);
            case 26:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[2, 19, 23, 26]]);
      }))();
    },
    validateConfig: function validateConfig(item) {
      var _this2 = this;
      return PubCardvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/PubCardvue_type_script_lang_js_regeneratorRuntime().mark(function _callee2() {
        var _yield$validateSettin, error, detail;
        return PubCardvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _this2.isValidating = true;
              _this2.sendMsg("Validating credentials for hub ".concat(item.hub.name, " (").concat(item.hub.id, ")..."));
              _context2.next = 5;
              return validateSettings(item.hub.id);
            case 5:
              _yield$validateSettin = _context2.sent;
              error = _yield$validateSettin.error;
              detail = _yield$validateSettin.detail;
              if (!(error || detail)) {
                _context2.next = 10;
                break;
              }
              throw new Error(error || detail);
            case 10:
              _this2.itemsWithErrors[item.hub.id] = false;
              setTimeout(function () {
                _this2.sendMsg('Settings validated');
              }, 1500);
              _context2.next = 17;
              break;
            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              setTimeout(function () {
                _this2.handleErr(_context2.t0);
                _this2.itemsWithErrors[item.hub.id] = true;
              }, 1500);
            case 17:
              _context2.prev = 17;
              setTimeout(function () {
                _this2.isValidating = false;
              }, 1500);
              return _context2.finish(17);
            case 20:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[0, 14, 17, 20]]);
      }))();
    },
    deleteCredentials: function deleteCredentials() {
      var _this3 = this;
      return PubCardvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/PubCardvue_type_script_lang_js_regeneratorRuntime().mark(function _callee3() {
        return PubCardvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _this3.isDeleting = true;
              _context3.prev = 1;
              _context3.next = 4;
              return deleteSettings(_this3.currentItem.hub.id);
            case 4:
              _context3.next = 6;
              return _this3.loadSettings();
            case 6:
              _this3.isDeleteDialogOpen = false;
              _this3.itemsWithErrors[_this3.currentItem.hub.id] = false;
              _context3.next = 13;
              break;
            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);
              _this3.handleErr(_context3.t0);
            case 13:
              _context3.prev = 13;
              _this3.isDeleting = false;
              return _context3.finish(13);
            case 16:
            case "end":
              return _context3.stop();
          }
        }, _callee3, null, [[1, 10, 13, 16]]);
      }))();
    },
    onFileChange: function onFileChange(evt) {
      var _this4 = this;
      var file = evt.target.files[0];
      if (file.name.length < 40) {
        this.loadedFileName = file.name;
      } else {
        this.loadedFileName = "".concat(file.name.slice(0, 20), "...").concat(file.name.slice(-20, file.name.length));
      }
      var reader = new FileReader();
      reader.onload = function (_ref2) {
        var target = _ref2.target;
        var fileContent = target.result;
        var fileContentObj = JSON.parse(fileContent);
        _this4.accountInfo = JSON.stringify(fileContentObj.account_info);
        _this4.productTopic = fileContentObj.product_topic;
      };
      reader.readAsText(file);
    },
    loadSettings: function loadSettings() {
      var _this5 = this;
      return PubCardvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/PubCardvue_type_script_lang_js_regeneratorRuntime().mark(function _callee4() {
        return PubCardvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return getSettings();
            case 2:
              _this5.settings = _context4.sent;
              _this5.$emit('can-sync', !!_this5.settings.length);
            case 4:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }))();
    },
    loadHubs: function loadHubs() {
      var _this6 = this;
      return PubCardvue_type_script_lang_js_asyncToGenerator( /*#__PURE__*/PubCardvue_type_script_lang_js_regeneratorRuntime().mark(function _callee5() {
        return PubCardvue_type_script_lang_js_regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return getHubs();
            case 2:
              _this6.hubs = _context5.sent;
            case 3:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }))();
    }
  },
  mounted: function mounted() {
    this.loadHubs();
    this.loadSettings();
  }
});
;// CONCATENATED MODULE: ./ui/src/components/PubCard.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/PubCard.vue




;



const PubCard_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(PubCardvue_type_script_lang_js, [['render',PubCardvue_type_template_id_e73ee2ac_scoped_true_render],['__scopeId',"data-v-e73ee2ac"]])

/* harmony default export */ const PubCard = (PubCard_exports_);
;// CONCATENATED MODULE: ./node_modules/babel-loader/lib/index.js??clonedRuleSet-1.use!./node_modules/vue-loader/dist/index.js??ruleSet[1].rules[8].use[0]!./ui/src/components/App.vue?vue&type=script&lang=js



/* harmony default export */ const Appvue_type_script_lang_js = ({
  inject: ['$injector'],
  components: {
    SyncCard: SyncCard,
    PubCard: PubCard
  },
  data: function data() {
    return {
      cssStyles: {},
      syncEnabled: false
    };
  },
  mounted: function mounted() {
    var styleCustomizations = getStyleCustomizations().computed.styleCustomizations;
    this.cssStyles = styleCustomizations();
  }
});
;// CONCATENATED MODULE: ./ui/src/components/App.vue?vue&type=script&lang=js
 
;// CONCATENATED MODULE: ./ui/src/components/App.vue




;


const App_exports_ = /*#__PURE__*/(0,exportHelper/* default */.Z)(Appvue_type_script_lang_js, [['render',render],['__scopeId',"data-v-ad465a10"]])

/* harmony default export */ const App = (App_exports_);
;// CONCATENATED MODULE: ./ui/src/entrypoints/settings.js
/*
Copyright (c) 2023, Rahul
All rights reserved.
*/











(0,dist/* default */.ZP)({
  'settings-card': dist/* Card */.Zb
}).then(function (connectBus) {
  var app = (0,vue_esm_bundler/* createApp */.ri)(App);
  app.provide('$injector', connectBus);
  app.mount('#app');
});

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			571: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkextension_xv_datalake"] = self["webpackChunkextension_xv_datalake"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, [216], () => (__webpack_require__(299)))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;