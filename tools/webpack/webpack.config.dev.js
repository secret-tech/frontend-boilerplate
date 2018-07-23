import path from 'path';
import webpack from 'webpack';

import HtmlPlugin from 'html-webpack-plugin';
import DotenvPlugin from 'dotenv-webpack';
import StylelintWebpackPlugin from 'stylelint-webpack-plugin';

const mode = 'development';
const target = 'web';
const devtool = 'cheap-module-eval-source-map';
const resolve = { extensions: ['*', '.js', '.jsx', '.json'] };

const entry = [
  path.resolve(__dirname, '../../src/webpack-public-path'),
  'react-hot-loader/patch',
  'webpack-hot-middleware/client?reload=true',
  'babel-polyfill',
  path.resolve(__dirname, '../../src/index.js')
];

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/',
  filename: 'bundle.js'
};

const optimization = {
  minimize: false,
  noEmitOnErrors: true
};

const plugins = [
  new DotenvPlugin({
    path: '.env',
    systemvars: true
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('development'),
    __DEV__: true
  }),
  new webpack.HotModuleReplacementPlugin(),
  new StylelintWebpackPlugin(),
  new HtmlPlugin({
    template: 'src/index.html',
    minify: {
      removeComments: true,
      collapseWhitespace: true
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
      'style-loader',
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
    test: /\.css$/,
    include: /(src\/assets|node_modules)/,
    use: [
      'style-loader',
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
    use: ['file-loader']
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/font-woff'
        }
      }
    ]
  },
  {
    test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'application/octet-stream'
        }
      }
    ]
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 10000,
          mimetype: 'image/svg+xml'
        }
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
