/* global require, module, process */
/**
 * Author: Ruo
 * Create: 2018-05-30
 * Description:
 */

const _ = require('lodash');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const WriteJsonPlugin = require('./write-json-webpack-plugin');

const srcPath = path.resolve('src');
const buildPath = path.resolve('build');
const jsPath = path.resolve(srcPath, 'js');
const indexFilename = 'index.js';

const localesSupportList = require('./localesSupportList.json');
const localesGroup = localesSupportList.map((name) => ({
    pattern: `{./src/**/_locales/${name}/messages.json,./src/_locales/${name}/*.json}`,
    fileName: `./_locales/${name}/messages.json`,
}));

module.exports = (env) => {
    // sync version
    let manifestJSON, packageJSON;
    packageJSON = require('./package.json');
    manifestJSON = require('./src/manifest.json');
    if (process.env.npm_config_setversion) {
        const version = /^([\d.]+)(?:-beta\.)?(\d+)?/.exec(process.env.npm_config_setversion);
        if (version && version[1]) {
            packageJSON.version = process.env.npm_config_setversion;
            manifestJSON.version = `${version[1]}${version[2] ? '.' + version[2] : ''}`;
        }
    }
    return {
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
            'background': path.resolve(jsPath, 'pages', 'background', indexFilename),
            'live': path.resolve(jsPath, 'pages', 'live', indexFilename),
            'config': path.resolve(jsPath, 'pages', 'config', indexFilename),
            'popup': path.resolve(jsPath, 'pages', 'popup', indexFilename),
            'video': path.resolve(jsPath, 'pages', 'video', indexFilename),
            'website': path.resolve(jsPath, 'pages', 'website', indexFilename),
            'cv': path.resolve(jsPath, 'pages', 'cv', indexFilename),
            'tbilibili': path.resolve(jsPath, 'pages', 'tbilibili', indexFilename),
            'videoList': path.resolve(jsPath, 'pages', 'videoList', indexFilename),
        },
        output: {
            filename: '[name].js',
            path: buildPath,
            chunkFilename: '[name].bundle.js',
        },
        optimization: {
            splitChunks: {
                minChunks: 2,
                cacheGroups: {
                    vendors: {
                        name: 'vendors',
                        test: /[\\/](node_modules|src\/js\/libs|src\/js\/utils|src\/_locales|src\/js\/libs|src\/js\/components|src\/styles)[\\/]/,
                        chunks: 'all',
                        minChunks: 1,
                    },
                    features: {
                        name: 'features',
                        test: /[\\/](src\/js\/modules)[\\/]/,
                        chunks: 'all',
                        minChunks: 1,
                    },
                },
            },
            nodeEnv: 'production',
        },
        resolve: {
            alias: {
                'Libs': path.resolve(jsPath, 'libs'),
                'Utils': path.resolve(jsPath, 'utils'),
                'Components': path.resolve(jsPath, 'components'),
                'Modules': path.resolve(jsPath, 'modules'),
                'Statics': path.resolve(srcPath, 'statics'),
                'Styles': path.resolve(srcPath, 'styles'),
                'jquery': path.resolve(jsPath, 'libs', 'jquery.min.js'),
            },
            mainFiles: ['index.js'],
            extensions: ['.js', '.json', '.jsx', '.css', '.less', '.scss', '.sass'],
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.js$/,
                    exclude: /(\/node_modules\/|\/modules\/|\.min\.js|\/ffmpeg\/)/,
                    loader: 'eslint-loader',
                    options: {
                        emitError: true,
                        failOnError: true,
                        fix: true,
                    },
                },
                {
                    test: /\.js$/,
                    exclude: /(\.min\.js|\/ffmpeg\/)/,
                    include: /(\/src\/js\/*)/,
                    loaders: [
                        'babel-loader',
                    ],
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
        plugins: _.compact([
            new webpack.DefinePlugin({
                'process.env': {
                    DEBUG: Boolean(env.DEBUG) || false,
                },
                TARGET_ORIGIN: "'http://localhost:8000'",
            }),
            new webpack.EnvironmentPlugin({
                'DEBUG': false,
            }),
            new CleanWebpackPlugin([buildPath], {
                verbose: false,
            }),
            new MiniCssExtractPlugin({
                filename: path.join('styles', '[name].css'),
                chunkFilename: path.join('styles', '[name].css'),
            }),
            new CopyWebpackPlugin([
                {from: 'src/html/*.html', to: '', flatten: true},
                //{from: 'src/manifest.json', to: '', flatten: true},
                {from: 'src/statics/fonts', to: 'statics/fonts'},
                {from: 'src/statics/imgs', to: 'statics/imgs'},
                {from: 'src/statics/js', to: 'statics/js'},
                //{from: 'src/js/libs', to: 'libs'},
                // {from: 'webpack-src/styles/**/*.css', to: 'styles/css', flatten: true},
            ]),
            new MergeJsonWebpackPlugin({
                debug: true,
                output: {groupBy: localesGroup},
            }),
            (manifestJSON && new WriteJsonPlugin({
                pretty: true,
                object: manifestJSON,
                path: '../src/',
                filename: 'manifest.json',
            })),
            (manifestJSON && new WriteJsonPlugin({
                object: manifestJSON,
                path: '/',
                filename: 'manifest.json',
            })),
            (packageJSON && new WriteJsonPlugin({
                object: packageJSON,
                path: '../',
                filename: 'package.json',
                pretty: true,
            })),
            {
                apply: compiler => {
                    compiler.hooks.watchClose.ta
                }
            }
            //new BundleAnalyzerPlugin(),
        ]),
    };
};
