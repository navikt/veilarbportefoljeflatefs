const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
        new CopyWebpackPlugin([
            { from: './index.dev.html', to: path.join(paths.WEBAPP, 'index.html') },
            { from: './head.min.js', to: path.join(paths.WEBAPP, 'js/') },
        ]),
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
    },
    devServer: {
        port: 3000,
        publicPath: '/veilarbportefoljeflatefs/enhet/',
        hot: true,
        inline: true
    }
};
