
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


// API calls to the backend //

// Retrieve Datalake Pubsub Settings │ GET    │ /settings
// Validate Datalake Pubsub Settings │ GET    │ /settings/validate
// Save Datalake Pubsub Settings     │ POST   │ /settings
//
// Retrieve Product List             │ GET    │ /products
// Publish Products Info             │ POST   │ /products/*/publish
// Publish Products Info             │ POST   │ /products/*/publish-all

const getJson = r => r.json();

// Settings API:

export const getSettings = () => fetch('/api/settings').then(getJson);

export const validateSettings = () => fetch('/api/settings/validate').then(getJson);

export const updateSettings = (settings) => fetch('/api/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(settings),
}).then(getJson);

// Products API:

export const getProducts = () => fetch('/api/products').then(getJson);

export const publishProducts = (products) => fetch('/api/products/*/publish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(products),
}).then(getJson);

export const publishAllProducts = () => fetch('/api/products/*/publish-all').then(getJson);


// Styling Utils //

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
