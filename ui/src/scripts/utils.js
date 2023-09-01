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
  complement,
  cond,
  curry,
  equals,
  identity,
  is,
  isEmpty,
  isNil,
  map,
  objOf,
  or,
  path,
  pipe,
  prop,
  props,
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
export const isNilOrEmpty = anyPass([isEmpty, isNil]);

/**
 * Returns `true` if value is not empty and not `null`/`undefined`, otherwise `false`.
 *
 * @function
 * @param {*} value
 * @returns {boolean}
 */
export const isNotNilOrEmpty = complement(isNilOrEmpty);

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
export const notProp = complement(prop);

/**
 * Returns new empty object.
 *
 * @function
 * @returns {object}
 */
export const obj = () => ({});

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
export const alt = curry((t, f, c) => {
  if (is(Function, c)) {
    return (...v) => alt(t, f, c(...v));
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
export const pathAlt = curry((p, t, f) => pathTo(p, alt(t, f)));

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
export const propsTo = curry((p, cb, source) => pipe(props(p), cb)(source));
