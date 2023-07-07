/*
Copyright (c) 2023, Rahul
All rights reserved.
*/

import {
  objOf,
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

