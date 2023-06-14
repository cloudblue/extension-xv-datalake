/*
Copyright (c) 2023, Rahul
All rights reserved.
*/
import {
  saveSettingsData,
  settings,
} from '@/pages';
import {
  getSettings,
  updateSettings,
} from '@/utils';
import {
  disableButton,
  enableButton,
  hideComponent,
  showComponent,
} from '@/components';


jest.mock('@/utils', () => ({
  getSettings: jest.fn(() => Promise.resolve({ })),
  updateSettings: jest.fn(() => Promise.resolve({ })),
}));

jest.mock('@/components', () => ({
  showComponent: jest.fn(),
  hideComponent: jest.fn(),
  enableButton: jest.fn(),
  addEventListener: jest.fn(),
  disableButton: jest.fn(),
}));

const app = {
  emit: jest.fn(),
};

describe('pages.js', () => {
  describe('settings', () => {
    beforeAll(() => {
      document.body.innerHTML = `<div id="app">
        <main-card title="Settings">
            <div class="main-container">
                <input id="account_info" />
                <input id="product_topic" />
            </div>
            <button id="save" class="btn btn-primary">Save</button>
        </main-card>
    </div>`;
    });
    describe('app is not passed', () => {
      beforeEach(async () => {
        await settings();
      });
      test('does not execute', () => {
        expect(showComponent).not.toHaveBeenCalled();
      });
    });
    describe('on success', () => {
      beforeEach(async () => {
        await settings(app);
      });
      test('calls showLoader', () => {
        expect(showComponent).toHaveBeenCalledWith('loader');
      });
      test('calls getSettings', () => {
        expect(getSettings).toHaveBeenCalled();
      });
      test('calls hideLoader', () => {
        expect(hideComponent).toHaveBeenCalledWith('loader');
      });
    });
  });

  describe('saveSettingsData', () => {
    describe('app is not passed', () => {
      beforeEach(async () => {
        await saveSettingsData();
      });
      test('does not execute', () => {
        expect(disableButton).not.toHaveBeenCalled();
      });
    });
    describe('on success', () => {
      beforeEach(async () => {
        await saveSettingsData(app);
      });

      test('calls disableButton', () => {
        expect(disableButton).toHaveBeenCalled();
      });
      test('calls updateSettings', () => {
        expect(updateSettings).toHaveBeenCalled();
      });
      test('calls app.emit message', () => {
        expect(app.emit).toHaveBeenCalledWith('snackbar:message', 'Settings saved');
      });
      test('calls enableButton', () => {
        expect(enableButton).toHaveBeenCalled();
      });
    });
    describe('on error', () => {
      beforeEach(async () => {
        updateSettings.mockImplementationOnce(() => Promise.reject());
        await saveSettingsData(app);
      });
      test('calls disableButton', () => {
        expect(disableButton).toHaveBeenCalled();
      });
      test('does not call updateSettings', () => {
        expect(updateSettings).toHaveBeenCalled();
      });
      test('calls app.emit error', () => {
        expect(app.emit).toHaveBeenCalledWith('snackbar:error', undefined);
      });
      test('calls enableButton', () => {
        expect(enableButton).toHaveBeenCalled();
      });
    });
  });
});
