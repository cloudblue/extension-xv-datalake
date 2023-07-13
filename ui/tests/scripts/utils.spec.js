/*
copyright (c) 2023, Rahul
All rights reserved.
*/
import {
  addEventListener,
  disableButton,
  enableButton,
  hideComponent,
  showComponent,
} from '@/scripts/utils';


describe('utils.js', () => {
  describe('enableButton', () => {
    beforeEach(() => {
      document.body.innerHTML = '<button id="button" disabled></button>';
    });
    test('enables a button', () => {
      enableButton('button');
      expect(document.getElementById('button').disabled).toBe(false);
    });
    test('enables a button with a custom message', () => {
      enableButton('button', 'custom message');
      expect(document.getElementById('button').disabled).toBe(false);
      expect(document.getElementById('button').innerText).toBe('custom message');
    });
  });

  describe('disableButton', () => {
    beforeEach(() => {
      document.body.innerHTML = '<button id="button"></button>';
    });
    test('disables a button', () => {
      disableButton('button');
      expect(document.getElementById('button').disabled).toBe(true);
    });
    test('disables a button with a custom message', () => {
      disableButton('button', 'custom message');
      expect(document.getElementById('button').disabled).toBe(true);
      expect(document.getElementById('button').innerText).toBe('custom message');
    });
  });

  describe('addEventListener', () => {
    test('adds an event listener', () => {
      document.body.innerHTML = '<button id="button"></button>';
      const callback = jest.fn();
      addEventListener('button', 'click', callback);
      document.getElementById('button').click();
      expect(callback).toBeCalled();
    });
  });

  describe('showLoader', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="loader" class="hidden"></div>';
      showComponent('loader');
    });
    it('shows a loader', () => {
      expect(document.getElementById('loader').classList.contains('hidden')).toBe(false);
    });
  });

  describe('showComponent without passing id', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="component" class="hidden"></div>';
      showComponent();
    });
    it('does not show a component', () => {
      expect(document.getElementById('component').classList.contains('hidden')).toBe(true);
    });
  });

  describe('hideLoader', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="loader"></div>';
      hideComponent('loader');
    });
    it('hides a loader', () => {
      expect(document.getElementById('loader').classList.contains('hidden')).toBe(true);
    });
  });

  describe('hideComponent without passing id', () => {
    beforeEach(() => {
      document.body.innerHTML = '<div id="component"></div>';
      hideComponent();
    });
    it('does not hide a component', () => {
      expect(document.getElementById('component').classList.contains('hidden')).toBe(false);
    });
  });
});
