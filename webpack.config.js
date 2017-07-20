const webpack = require('webpack');
const path = require('path');

const HtmlPlugin = require('html-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const entry = [
  'babel-polyfill',
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?reload=true',
  path.resolve(__dirname, 'src/index')
];

const output = {
  path: path.resolve('dist'),
  publicPath: '/',
  filename: 'bundle.js'
};

const devtool = 'inline-source-map';

const resolve = {
  extensions: ['.js', '.jsx', '.json'],
  modules: [
    path.resolve(__dirname, 'src'),
    'node_modules'
  ]
};

const plugins = [
  new webpack.DefinePlugin({
    'process.env': { NODE_ENV: JSON.stringify('development') }
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
  new StylelintPlugin({
    files: 'src/**/*.css',
    formatter: require('stylelint-formatter-pretty'),
    emitErrors: true,
    failOnError: false,
    quiet: false
  }),
  new HtmlPlugin({
    template: 'src/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true
    },
    inject: true
  })
];

const webpackModule = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      include: /src/,
      loader: 'eslint-loader'
    },
    {
      test: /\.js$/,
      include: /src/,
      loader: 'babel-loader'
    },
    {
      test: /\.css$/,
      include: /src/,
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            sourceMap: true,
            localIdentName: '[local]___[hash:base64:5]'
          }
        },
        { loader: 'postcss-loader' }
      ]
    },
    {
      test: /\.css$/,
      include: /node_modules/,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.(ttf|otf|eot|svg|woff2?)(\?.+)?$/,
      loader: 'url-loader',
      options: { limit: 10000 }
    },
    {
      test: /\.(jpe?g|png|gif|ico)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]'
      }
    }
  ]
};

module.exports = {
  entry,
  output,
  devtool,
  resolve,
  plugins,
  module: webpackModule
};
