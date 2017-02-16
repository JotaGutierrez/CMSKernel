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
import {getOutputPath, getWebpackExternals} from './webpack.build.config';
import getComponentsMap from '../js/components/components.entry';

const
  include = join(__dirname, './../js'),
  outputPath = join(__dirname, getOutputPath());

export default {
  entry: getComponentsMap(`${include}/components`),
  externals: getWebpackExternals(),
  output: {
    path: `${outputPath}/js`,
    publicPath: '/',
    filename: '/components/[name].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: include,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                "react",
                "es2015",
                "stage-2"
              ],
              compact: false
            }
          },
          {
            loader: 'eslint-loader',
            options: {
              enforce: 'pre'
            }
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
    new ExtractTextPlugin('./../css/components/[name].min.css'),
    new Webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer({
            browsers: ['last 2 versions']
          }),
          precss
        ],
        eslint: {
          configFile: join(__dirname, '.eslint.yml')
        }
      }
    })
  ],
  devtool: 'source-map'
};
