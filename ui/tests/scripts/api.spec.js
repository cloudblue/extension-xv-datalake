/*
Copyright (c) 2023, Rahul
All rights reserved.
*/
import {
  getSettings,
  updateSettings,
} from '@/scripts/api';


global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve({}),
}));


describe('api.js API calls', () => {
  describe('getSettings', () => {
    test('returns settings', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ someKey: 'someValue' }),
      }));
      const result = await getSettings();
      expect(result).toEqual({ someKey: 'someValue' });
    });

    test('returns error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
      try { await getSettings(); } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });

  describe('updateSettings', () => {
    test('returns settings', async () => {
      fetch.mockImplementationOnce(() => Promise.resolve({
        json: () => Promise.resolve({ someKey: 'someValue' }),
      }));
      const result = await updateSettings({ someKey: 'someValue' });
      expect(fetch).toHaveBeenCalledWith('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ someKey: 'someValue' }),
      });
      expect(result).toEqual({ someKey: 'someValue' });
    });

    test('returns error', async () => {
      fetch.mockImplementationOnce(() => Promise.reject(new Error('error')));
      try { await updateSettings({ someKey: 'someValue' }); } catch (e) {
        expect(e.message).toBe('error');
      }
    });
  });
});
