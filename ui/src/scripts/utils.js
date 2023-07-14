/*
Copyright (c) 2023, Rahul
All rights reserved.
*/

import {
  T,
  __,
  all,
  anyPass,
  applyTo,
  cond,
  curry,
  equals,
  identity,
  is,
  isEmpty,
  map,
  objOf,
  or,
  path,
  pipe,
  type,
} from 'ramda';

import {
  hexToRGB,
} from '~scripts/helpers';


// ///////////// //
// Styling Utils //
// ///////////// //

export const getStyleCustomizations = (namespace = 'theme', {
  primary = '#1565c0',
  accent = '#4797f2',
  contrast = '#ffffff',
} = {}) => ({
  computed: {
    styleCustomizations() {
      return {
        [`--${namespace}_primary`]: primary,
        [`--${namespace}_primary_rgb`]: hexToRGB(primary),
        [`--${namespace}_accent`]: accent,
        [`--${namespace}_accent_rgb`]: hexToRGB(accent),
        [`--${namespace}_contrast`]: contrast,
        [`--${namespace}_contrast_rgb`]: hexToRGB(contrast),
      };
    },
  },

  methods: {
    genCssVar(name, value) {
      return objOf(`--${namespace}_${name}`, value);
    },
  },
});


export const combineStylesStr = styleObj => Object.entries(styleObj)
  .reduce((acc, [key, val]) => `${acc}${key}:${val};`, '');


// ////////////////////////////// //
// render UI components - buttons //
// ////////////////////////////// //

export const enableButton = (id, text) => {
  const element = document.getElementById(id);
  element.disabled = false;
  if (text) element.innerText = text;
};

export const disableButton = (id, text) => {
  const element = document.getElementById(id);
  element.disabled = true;
  if (text) element.innerText = text;
};

export const addEventListener = (id, event, callback) => {
  const element = document.getElementById(id);
  element.addEventListener(event, callback);
};


// //////////////////////////////// //
// render UI components - show/hide //
// //////////////////////////////// //

export const showComponent = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  element.classList.remove('hidden');
};

export const hideComponent = (id) => {
  if (!id) return;
  const element = document.getElementById(id);
  element.classList.add('hidden');
};

export const setAttrOnComponent = (id, attrName, attrValue) => {
  if (!id) return;
  const element = document.getElementById(id);
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
export const isString = is(String);

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
export const pathTo = curry((p, cb, target) => pipe(path(p), cb)(target));

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
export const pathOrPath = curry((a, b, source) => or(path(a, source), path(b, source)));

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
export const isObjectStrict = pipe(type, equals('Object'));

/**
 * Verify all elements are number or string.
 *
 * @function
 * @param {array} arr
 * @returns {boolean}
 */
const isAllPrimitive = all(anyPass([is(Number), is(String)]));

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
export const template = curry((tpl, src) => {
  /* eslint-disable no-use-before-define */
  function processTpl(v) {
    return map(cond([
      // Result of function
      [is(Function), applyTo(src)],

      // Empty is constant data
      [isEmpty, identity],

      // Array may be path or template
      [is(Array), processArray],

      // Object is always template part
      [isObjectStrict, template(__, src)],

      // Everything else is constant data
      [T, identity],
    ]))(v);
  }

  function processArray(v) {
    return cond([
      // if array is path
      [isAllPrimitive, path(__, src)],

      // In other cases array is template part
      [T, processTpl],
    ])(v);
  }

  return processTpl(tpl);
});
