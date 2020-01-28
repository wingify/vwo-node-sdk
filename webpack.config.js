const webpack = require('webpack');
const path = require('path');
const packageFile = require('./package.json');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PRODUCTION = 'production';

const libraryName = 'vwo-javascript-sdk';
const libVersion = packageFile.version;
let deps = '';

Object.keys(packageFile.dependencies).map((key, index) => {
  deps += `\n ${index + 1}. ${key} - ${packageFile.dependencies[key]}`;
});

const libraryHeaderComment = `${libraryName} - v${libVersion}
URL - https://github.com/wingify/vwo-node-sdk

Copyright 2019 Wingify Software Pvt. Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Dependencies used - ${deps}`;

function addPlugins(argv) {
  const plugins = [
    new webpack.BannerPlugin({
      banner: libraryHeaderComment,
      entryOnly: true
    }),
    new webpack.DefinePlugin({
      'typeof process.env': JSON.stringify('undefined'),
      SDK_NAME: JSON.stringify(libraryName),
      SDK_VERSION: JSON.stringify(libVersion)
    })
  ];

  if (argv.analyze && argv.mode !== argv.PRODUCTION) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}

module.exports = function(_env, argv) {
  return {
    entry: {
      [libraryName]: './lib/index.js'
    },
    mode: argv.mode === PRODUCTION ? 'production' : 'development',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: () => {
        if (argv.mode === PRODUCTION) {
          return '[name].min.js';
        }

        return '[name].js';
      },
      library: 'vwoSdk',
      libraryTarget: 'umd',
      auxiliaryComment: {
        root: ' Root',
        commonjs: ' CommonJS',
        commonjs2: ' CommonJS2',
        amd: ' AMD'
      }
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules|dist/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    node: {
      URL: false
    },
    plugins: addPlugins(argv)
  };
};
