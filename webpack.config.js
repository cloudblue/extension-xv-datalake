/*
Copyright (c) 2023, Ingram Micro - Rahul Mondal
All rights reserved.
*/
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
// const CircularDependencyPlugin = require('circular-dependency-plugin');


const generateHtmlPlugin = (title) => {
  const moduleName = title.toLowerCase();

  /* eslint-disable-next-line */
  return new htmlWebpackPlugin({
    title,
    filename: `${moduleName}.html`,
    template: `./ui/pages/${moduleName}.html`,
    // chunks: [moduleName],
  });
};

const populateHtmlPlugins = (pagesArray) => {
  /* eslint-disable-next-line */
  let res = [];
  pagesArray.forEach(page => {
    res.push(generateHtmlPlugin(page));
  });

  return res;
};

const pages = populateHtmlPlugins(['Settings']);

module.exports = {
  mode: 'production',

  entry: {
    // settings: path.resolve(__dirname, '/ui/src/pages/settings.js'),
    settings: __dirname + '/ui/src/pages/settings.js',
  },

  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'connect_ext_datalake/static'),
    clean: true,
  },

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    ...pages,
    new CopyWebpackPlugin({
      patterns: [
        // { from: path.resolve(__dirname, '/ui/images'), to: 'images' },
        { from: __dirname + '/ui/images', to: 'images' },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].css',
    }),
    new ESLintPlugin(),
    new VueLoaderPlugin(),

    // new CircularDependencyPlugin({
    //   exclude: /node_modules/,
    //   include: /(.*\.vue)|(.*\.js)/,
    //   failOnError: true,
    //   allowAsyncCycles: false,
    //   cwd: process.cwd(),
    // }),
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        // use: {
        //   loader: 'vue-loader',
        //   options: {
        //     customElement: true,
        //   },
        // },
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/, /\.spec.js/],
        // include: [path.resolve(__dirname, 'extension/')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'vue-style-loader',
      //     'style-loader',
      //     'css-loader',
      //   ],
      // },
      {
        test: /\.styl(us)?$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'stylus-loader',
        ],
      },
      {
        test: /\.html$/i,
        exclude: /settings.html/,
        use: [
          // 'vue-loader',
          'html-loader',
        ],
      },
      // {
      //   test: /\.html$/i,
      //   loader: 'html-loader',
      // },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              spriteFilename: '[hash:20].svg',
              symbolId: '[folder]_[name]_[hash:6]',
            },
          },
        ],
      },
    ],
  },

  // resolve: {
  //   // extensions: ['.js', '.vue'],
  //   alias: {
  //     // vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js'),
  //     // vue$: 'vue/dist/vue.esm-bundler.js',
  //     '@': path.resolve(__dirname, 'ui/src'),
  //     '~utils': path.resolve(__dirname, 'ui/src/tools/utils'),
  //     '~helpers': path.resolve(__dirname, 'ui/src/tools/helpers'),
  //     '~constants': path.resolve(__dirname, 'ui/src/tools/constants'),
  //     '~components': path.resolve(__dirname, 'ui/src/components'),
  //     '~styles': path.resolve(__dirname, 'ui/styles'),
  //   },

  //   // fallback: {
  //   //   buffer: require.resolve('buffer'),
  //   // },

  //   // // modules: [path.resolve(__dirname, 'node_modules')],

  //   // alias: {
  //   //   '@': path.resolve(__dirname, './'),
  //   //   //   // rest: path.resolve(__dirname, 'ui/app/tools/rest'),
  //   //   //   // '~tools': path.resolve(__dirname, 'ui/app/tools'),
  //   //   //   // '~utils': path.resolve(__dirname, 'ui/app/tools/utils'),
  //   //   //   // '~helpers': path.resolve(__dirname, 'ui/app/tools/helpers'),
  //   //   //   // '~constants': path.resolve(__dirname, 'ui/app/tools/constants'),
  //   //   //   // '~mixins': path.resolve(__dirname, 'ui/app/tools/mixins'),
  //   //   //   // '~views': path.resolve(__dirname, 'ui/app/views'),
  //   //   //   // '~components': path.resolve(__dirname, 'ui/app/components'),
  //   //   //   // '~styles': path.resolve(__dirname, 'ui/app/styles'),
  //   //   //   // '~api': path.resolve(__dirname, 'ui/app/api'),
  //   // },
  // },
};
