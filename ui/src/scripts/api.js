
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

const getJson = r => r.json();

// Settings API:

export const getSettings = () => fetch('/api/settings').then(getJson);

export const getHubs = () => fetch('/api/hubs').then(getJson);

export const validateSettings = (hubId) => fetch(`/api/settings/validate/${hubId}`).then(getJson);

export const updateSettings = (hubId, settings) => fetch(`/api/settings/${hubId}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(settings),
}).then(getJson);

export const deleteSettings = (hubId) => fetch(`/api/settings/${hubId}`, {
  method: 'DELETE',
}).then(getJson);

// Products API:

export const getProducts = () => fetch('/api/products').then(getJson);

export const publishProducts = (products) => fetch('/api/products/*/publish', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(products),
});
// .then(getJson);

export const publishAllProducts = () => fetch('/api/products/*/publish-all');
// .then(getJson);

