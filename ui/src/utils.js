
/*
Copyright (c) 2023, Rahul
All rights reserved.
*/
// API calls to the backend
export const getSettings = () => fetch('/api/settings').then((response) => response.json());

export const updateSettings = (settings) => fetch('/api/settings', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(settings),
}).then((response) => response.json());
