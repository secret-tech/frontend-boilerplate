import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const entry = path.resolve(__dirname, '../../src/index');
const target = 'web';
const output = {
  path: path.resolve(__dirname, '../../dist'),
  publicPath: '/',
  filename: '[name].[chunkhash].js'
};
const devtool = 'source-map';
const resolve = { extensions: ['*', '.js', '.jsx', '.json'] };

const plugins = [
  new WebpackMd5Hash(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify('production'),
    __DEV__: false
  }),
  new ExtractTextPlugin('[name].[contenthash].css'),
  new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
  new HtmlWebpackPlugin({
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
  }
];

export default {
  entry,
  target,
  output,
  devtool,
  resolve,
  plugins,
  module: { rules }
};

// export default {
//   // resolve: {
//   //   extensions: ['*', '.js', '.jsx', '.json']
//   // },
//   // devtool: 'source-map',
//   // entry: path.resolve(__dirname, 'src/index'),
//   // target: 'web',
//   // output: {
//   //   path: path.resolve(__dirname, 'dist'),
//   //   publicPath: '/',
//   //   filename: '[name].[chunkhash].js'
//   // },
//   // plugins: [
//   //   // Hash the files using MD5 so that their names change when the content changes.
//   //   new WebpackMd5Hash(),
//   //
//   //   // Tells React to build in prod mode. https://facebook.github.io/react/downloads.html
//   //   new webpack.DefinePlugin(GLOBALS),
//   //
//   //   // Generate an external css file with a hash in the filename
//   //   new ExtractTextPlugin('[name].[contenthash].css'),
//   //
//   //   // Generate HTML file that contains references to generated bundles. See here for how this works: https://github.com/ampedandwired/html-webpack-plugin#basic-usage
//   //   new HtmlWebpackPlugin({
//   //     template: 'src/index.ejs',
//   //     favicon: 'src/favicon.ico',
//   //     minify: {
//   //       removeComments: true,
//   //       collapseWhitespace: true,
//   //       removeRedundantAttributes: true,
//   //       useShortDoctype: true,
//   //       removeEmptyAttributes: true,
//   //       removeStyleLinkTypeAttributes: true,
//   //       keepClosingSlash: true,
//   //       minifyJS: true,
//   //       minifyCSS: true,
//   //       minifyURLs: true
//   //     },
//   //     inject: true,
//   //     // Note that you can add custom options here if you need to handle other custom logic in index.html
//   //     // To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
//   //     trackJSToken: ''
//   //   }),
//   //
//   //   // Minify JS
//   //   new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
//   // ],
//   module: {
//     rules: [
//       {
//         test: /\.jsx?$/,
//         exclude: /node_modules/,
//         use: ['babel-loader']
//       },
//       {
//         test: /\.eot(\?v=\d+.\d+.\d+)?$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               name: '[name].[ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 10000,
//               mimetype: 'application/font-woff',
//               name: '[name].[ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 10000,
//               mimetype: 'application/octet-stream',
//               name: '[name].[ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
//         use: [
//           {
//             loader: 'url-loader',
//             options: {
//               limit: 10000,
//               mimetype: 'image/svg+xml',
//               name: '[name].[ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /\.(jpe?g|png|gif|ico)$/i,
//         use: [
//           {
//             loader: 'file-loader',
//             options: {
//               name: '[name].[ext]'
//             }
//           }
//         ]
//       },
//       {
//         test: /(\.css|\.scss|\.sass)$/,
//         use: ExtractTextPlugin.extract({
//           use: [
//             {
//               loader: 'css-loader',
//               options: {
//                 minimize: true,
//                 sourceMap: true
//               }
//             }, {
//               loader: 'postcss-loader',
//               options: {
//                 plugins: () => [
//                   require('autoprefixer')
//                 ],
//                 sourceMap: true
//               }
//             }, {
//               loader: 'sass-loader',
//               options: {
//                 includePaths: [path.resolve(__dirname, 'src', 'scss')],
//                 sourceMap: true
//               }
//             }
//           ]
//         })
//       }
//     ]
//   }
// };
