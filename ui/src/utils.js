
/*
Copyright (c) 2023, Rahul
All rights reserved.
*/

import {
  objOf,
} from 'ramda';

import {
  hexToRGB,
} from './helpers';

// API calls to the backend
export const getSettings = () => fetch('/api/settings').then((response) => response.json());

export const updateSettings = (settings) => fetch('/api/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(settings),
}).then((response) => response.json());


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
