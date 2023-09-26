import App from '~components/App.vue';


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

jest.mock('@/scripts/utils', () => {
  const actualModule = jest.requireActual('@/scripts/utils');

  return {
    ...actualModule,
    getStyleCustomizations: jest.fn().mockReturnValue({
      computed: {
        styleCustomizations: () => ({
          '--theme_primary': '#1565c0',
          '--theme_primary_rgb': 'rgb(21, 101, 192)',
          '--theme_accent': '#4797f2',
          '--theme_accent_rgb': 'rgb(71, 151, 242)',
          '--theme_contrast': '#ffffff',
          '--theme_contrast_rgb': 'rgb(255, 255, 255)',
        }),
      },
    }),
    combineStylesStr: jest.fn(),
    setAttrOnComponent: jest.fn(),
  };
});


let result;
let context;

describe('App component', () => {
  describe('#data', () => {
    it('returns initial data', () => {
      result = App.data.call(context);

      expect(result).toEqual({
        cssStyles: {},
        syncEnabled: false,
      });
    });
  });

  describe('mounted', () => {
    beforeEach(() => {
      context = {
        cssStyles: {},
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
  });
});
