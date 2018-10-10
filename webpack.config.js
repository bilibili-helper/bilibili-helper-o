/**
 * Author: Ruo
 * Create: 2018-05-30
 * Description:
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const webpackPath = path.resolve('webpack-src');
const buildPath = path.resolve('build');
const webpackJSPath = path.resolve(webpackPath, 'js');
const indexFilename = 'index.js';

module.exports = {
    watch: true,
    mode: 'development',
    node: {
        global: false,
    },
    devtool: false,
    watchOptions: {
        aggregateTimeout: 1000, // milliseconds
        poll: 1000,
        ignored: ['node_modules'],
    },
    entry: {
        'background': path.resolve(webpackJSPath, 'pages', 'background', indexFilename),
        'live': path.resolve(webpackJSPath, 'pages', 'live', indexFilename),
        'options': path.resolve(webpackJSPath, 'pages', 'options', indexFilename),
        'popup': path.resolve(webpackJSPath, 'pages', 'popup', indexFilename),
        'video': path.resolve(webpackJSPath, 'pages', 'video', indexFilename),
    },
    output: {
        filename: '[name].js',
        path: buildPath,
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },
    resolve: {
        alias: {
            'Libs': path.resolve(webpackJSPath, 'libs'),
            'Utils': path.resolve(webpackJSPath, 'utils'),
            'Components': path.resolve(webpackJSPath, 'components'),
            'Modules': path.resolve(webpackJSPath, 'modules'),
            'Statics': path.resolve(webpackPath, 'statics'),
            'Styles': path.resolve(webpackPath, 'styles'),
        },
        mainFiles: ['index.js'],
        extensions: ['.js', '.json', '.jsx', '.css', '.less', '.scss', '.sass'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'},
                    {loader: 'sass-loader'},
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin([buildPath], {
            verbose: false,
        }),
        new MiniCssExtractPlugin({
            filename: path.join('styles', '[name].css'),
            chunkFilename: path.join('styles', '[id].css'),
        }),
        new CopyWebpackPlugin([
            {from: 'webpack-src/html/*.html', to: '', flatten: true},
            {from: 'webpack-src/*.json', to: '', flatten: true},
            {from: 'webpack-src/_locales', to: '_locales'},
            {from: 'webpack-src/statics', to: 'statics'},
            // {from: 'webpack-src/styles/**/*.css', to: 'styles/css', flatten: true},
        ]),
    ],
};
