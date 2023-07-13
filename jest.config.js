/*
Copyright (c) 2023, Ingram Micro - Rahul Mondal
All rights reserved.
*/
module.exports = {
  moduleFileExtensions: [
    'js',
  ],

  clearMocks: true,

  transform: {
    '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.js$': 'babel-jest',
    // '^.+\\.(vue)$': '@vue/vue3-jest',
  },
  transformIgnorePatterns: [
    '<rootDir>/node_modules/',
  ],


  testMatch: [
    '<rootDir>/ui/tests(**/*\\.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx))',
  ],

  collectCoverage: true,

  collectCoverageFrom: [
    'ui/src/**/*.js',
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/ui/src/$1',
    '^~components/(.*)$': '<rootDir>/ui/src/components/$1',
    '^~scripts/(.*)$': '<rootDir>/ui/src/scripts/$1',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
  },

  coverageDirectory: '<rootDir>/ui/tests/coverage/',

  coveragePathIgnorePatterns: ['<rootDir>/ui/src/pages/'],

  testEnvironment: 'jsdom',
};
