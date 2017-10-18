const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const paths = {
    WEBAPP: path.resolve(__dirname, '../main/webapp'),
    JS: path.resolve(__dirname, 'app')
};

module.exports = {
    entry: path.join(paths.JS, 'index.js'),
    output: {
        path: paths.WEBAPP,
        filename: 'js/bundle.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.html')
        }),
        new ExtractTextPlugin('css/index.css'),
        new OptimizeCssAssetsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$|\.tsx?$/,
                exclude: /node_modules/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                                coreModulePath: "'./../../../node_modules/'",
                                nodeModulesPath: "'./../../../node_modules/'"
                            }
                        }
                    }]
                })
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx', '.less']
    }
};
