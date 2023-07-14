import App from '~components/App.vue';

// import {
//   getSettings,
//   updateSettings,
// } from '@/scripts/api';

jest.mock('@/scripts/api', () => ({
  getSettings: jest.fn(() => Promise.resolve({
    account_info: 'foo',
    product_topic: 'bar',
  }))
    .mockImplementationOnce(() => Promise.resolve({
      account_info: 'foo',
      product_topic: 'bar',
    }))
    .mockImplementationOnce(() => Promise.resolve({
      error: 'some error',
    })),
  updateSettings: jest.fn(() => Promise.resolve({ })),
}));

jest.mock('@/scripts/utils', () => ({
  pathOrPath: jest.fn(),
  template: jest.fn(),
  pathTo: jest.fn(),
  getStyleCustomizations: jest.fn().mockReturnValue({
    computed: {
      styleCustomizations: () => ({
        '--theme_primary': '#1565c0',
        '--theme_primary_rgb': 'rgb(21, 101, 192)',
        '--theme_accent': '#4797f2',
        '--theme_accent_rgb': 'rgb(71, 151, 242)',
        '--theme_contrast': '#ffffff',
        '--theme_contrast_rgb': 'rgb(255, 255, 255)',
      })
    }
  }),
  combineStylesStr: jest.fn(),
  setAttrOnComponent: jest.fn(),
}));


let result;
let context;

describe('App component', () => {
  describe('#data', () => {
    it('returns initial data', () => {
      result = App.data.call(context);

      expect(result).toEqual({
        showLoader: true,
        showError: false,
        cssStyles: {},
        accountInfo: '',
        productTopic: '',
        syncEnabled: false,
      });
    });
  });

  describe('#methods', () => {
    beforeEach(() => {
      context = {
        showLoader: true,
        $refs: {
          'ctf-00000': {
            focus: jest.fn(),
          },
        },
        $emit: jest.fn(),
      };
    });

    describe('#hide', () => {
      it('should hide loader', () => {
        App.methods.hide.call(context, {});

        expect(context.showLoader).toEqual(false);
      });
    });

    describe('#fetchSettings', () => {
      it('should set accountInfo and productTopic on successfull backend request', async () => {
        context = {
          accountInfo: '',
          productTopic: '',
          showError: false,
        };

        await App.methods.fetchSettings.call(context);

        expect(context).toEqual({
          accountInfo: '\"foo\"',
          productTopic: 'bar',
          showError: false,
        });
      });

      it('should set error on failed backend request', async () => {
        context.showError = false;

        await App.methods.fetchSettings.call(context, {});

        expect(context.showError).toBe(true);
      });
    });

    describe('#onInfoUpdate', () => {
      it('should update data correctly', () => {
        context = {
          accountInfo: '',
          syncEnabled: true,
        };

        App.methods.onInfoUpdate.call(context, 'hello world');

        expect(context).toEqual({
          accountInfo: 'hello world',
          syncEnabled: false,
        });
      });
    });

    describe('#onTopicUpdate', () => {
      it('should update data correctly', () => {
        context = {
          productTopic: '',
          syncEnabled: true,
        };

        App.methods.onTopicUpdate.call(context, 'some text');

        expect(context).toEqual({
          productTopic: 'some text',
          syncEnabled: false,
        });
      });
    });
  });

  describe('mounted', () => {
    beforeEach(() => {
      context = {
        fetchSettings: jest.fn().mockResolvedValue({}),
        cssStyles: {},
        showLoader: true,
      };

      App.mounted.call(context);
    });

    it('should set cssStyles obj', async () => {
      expect(context.cssStyles).toEqual({
        '--theme_primary': '#1565c0',
        '--theme_primary_rgb': 'rgb(21, 101, 192)',
        '--theme_accent': '#4797f2',
        '--theme_accent_rgb': 'rgb(71, 151, 242)',
        '--theme_contrast': '#ffffff',
        '--theme_contrast_rgb': 'rgb(255, 255, 255)',
      });
    });

    it('should call #fetchSettings and hide loader after its success', async () => {
      expect(context.fetchSettings).toHaveBeenCalled();
      expect(context.showLoader).toEqual(false);
    });
  });
});
