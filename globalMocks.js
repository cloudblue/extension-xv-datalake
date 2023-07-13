global.console = {
  error: jest.fn(),
  warn: jest.fn(),
  /* eslint-disable no-console */
  log: jest.fn(console.log),
};

global.URL.createObjectURL = jest.fn();

const mockIconProxy = new Proxy(
  {},
  {
    get(obj, prop) {
      return {
        id: prop,
        viewBox: null,
      };
    },
  },
);

// jest.mock('echarts/charts', () => ({}));
// jest.mock('echarts/components', () => ({}));
// jest.mock('echarts/core', () => ({ use: jest.fn() }));
// jest.mock('echarts/renderers', () => ({}));
// jest.mock('vue-echarts', () => ({}));

// jest.mock('v-calendar/lib/components/date-picker.umd', () => ({}));

jest.mock('@cloudblueconnect/material-svg', () => mockIconProxy);
jest.mock('@cloudblueconnect/material-svg/animated', () => mockIconProxy);
jest.mock('@cloudblueconnect/material-svg/baseline', () => mockIconProxy);
jest.mock('@cloudblueconnect/material-svg/outline', () => mockIconProxy);
jest.mock('@cloudblueconnect/material-svg/round', () => mockIconProxy);
jest.mock('@cloudblueconnect/material-svg/sharp', () => mockIconProxy);
jest.mock('@cloudblueconnect/material-svg/twotone', () => mockIconProxy);

jest.mock('@cloudblueconnect/country-flag-mapper', () => ({
  localeFlags: new Proxy({}, {
    get(obj, prop) {
      if (prop === 'xx') return null;

      return {
        id: prop,
        viewBox: null,
      };
    },
  }),
  flags: mockIconProxy,
}));


global.VERSION = 4277742;
global.CONFIG = {
  dev: {
    proxy: {
      vendorHost: 'vendor.cnct.info',
      providerHost: 'provider.cnct.info',
    },
    localHosts: {
      vendorHost: 'vendor.connect.local',
      providerHost: 'provider.connect.local',
    },
  },
};
global.PRODUCTION = true;
