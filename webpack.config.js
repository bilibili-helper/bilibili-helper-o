/**
 * Author: Ruo
 * Create: 2018-05-30
 * Description:
 */

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpackPath = path.resolve('webpack-src');
const buildPath = path.resolve('build');
const webpackJSPath = path.resolve(webpackPath, 'js');
const indexFilename = 'index.js';
module.exports = {
    watch: true,
    watchOptions: {
        aggregateTimeout: 1000, // milliseconds
        poll: 1000,
        ignored: ['node_modules'],
    },
    mode: 'development',
    entry: {
        'background': path.resolve(webpackJSPath, 'background', indexFilename),
        'live': path.resolve(webpackJSPath, 'live', indexFilename),
        'options': path.resolve(webpackJSPath, 'options', indexFilename),
        'popup': path.resolve(webpackJSPath, 'popup', indexFilename),
        'video': path.resolve(webpackJSPath, 'video', indexFilename),
    },
    output: {
        filename: '[name].js',
        path: path.resolve('./build'),
    },
    resolve: {
        alias: {
            'Libs': path.resolve(webpackJSPath, 'libs'),
            'Utils': path.resolve(webpackJSPath, 'utils'),
            'Statics': path.resolve(webpackPath, 'statics'),
            'Styles': path.resolve(webpackPath, 'styles'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: [
                    'babel-loader',
                ],
            },
            {
                test: /\.(css|scss|sass)$/,
                loader: 'style-loader!css-loader!sass-loader',
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(['./build'], {
            verbose: false,
        }),
        new CopyWebpackPlugin([
            {from: 'webpack-src/*.html', to: '', flatten: true},
            {from: 'webpack-src/*.json', to: '', flatten: true},
            {from: 'webpack-src/_locales', to: '_locales'},
            {from: 'webpack-src/statics', to: 'statics'},
        ], {
            debug: 'info',
        }),
    ],
};
