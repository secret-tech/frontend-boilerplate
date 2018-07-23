import path from 'path';
import webpack from 'webpack';

import HtmlPlugin from 'html-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const mode = 'production';
const target = 'web';
const devtool = 'source-map';
const resolve = { extensions: ['*', '.js', '.jsx', '.json'] };

const entry = [
  'babel-polyfill',
  path.resolve(__dirname, '../../src/index')
];

const output = {
  path: path.resolve(__dirname, '../../dist'),
  publicPath: '/',
  filename: '[name].[contenthash].js'
};

const optimization = {
  minimize: true
};

const plugins = [
  new DotenvPlugin({
    path: '.env',
    systemvars: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
  }),
  new MiniCssExtractPlugin('[name].[contenthash].css'),
  new HtmlPlugin({
    template: 'src/index.html',
    favicon: 'src/assets/favicon.png',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true
    },
    inject: true
  })
];

const rules = [
  {
    test: /\.js?$/,
    exclude: /node_modules/,
    use: ['babel-loader']
  },
  {
    test: /\.scss?$/,
    include: /src/,
    exclude: /src\/assets/,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          modules: true,
          importLoaders: 1,
          localIdentName: '[local]__[hash:base64:5]',
          sourceMap: true
        }
      },
      {
        loader: 'postcss-loader',
        options: {
          config: { path: 'tools/postcss.config.js' }
        }
      },
      'sass-loader'
    ]
  },
  {
    test: /\.css?$/,
    include: /(src\/assets|node_modules)/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader'
    ]
  },
  {
    test: /\.(jpe?g|png|gif|ico)$/i,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.eot(\?v=\d+.\d+.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: { name: '[name].[ext]' }
      }
    ]
  }
];

export default {
  mode,
  optimization,
  entry,
  target,
  output,
  devtool,
  resolve,
  plugins,
  module: { rules }
};
