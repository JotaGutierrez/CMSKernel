/*
 * This file is part of the CMS Kernel package.
 *
 * Copyright (c) 2017-2018 LIN3S <info@lin3s.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * @author Mikel Tuesta <mikeltuesta@gmail.com>
 */

import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import {join, resolve} from 'path';
import precss from 'precss';
import Webpack from 'webpack';
import {getOutputPath} from './webpack.build.config';

const
  include = join(__dirname, './../js'),
  outputPath = join(__dirname, getOutputPath());

export default {
  entry: [
    `${include}/polyfill/polyfill.js`,
    `${include}/bundle.js`
  ],
  output: {
    path: `${outputPath}/js`,
    publicPath: '/',
    filename: 'bundle.min.js',
    libraryTarget: 'window'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: include,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(s?css)$/,
        loader: ExtractTextPlugin.extract({
          publicPath: '/',
          fallback: 'style-loader',
          loader: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./../css/bundle.min.css'),
    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions']
          }),
          precss
        ]
      }
    })
  ],
};
