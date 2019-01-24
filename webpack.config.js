const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    WEBAPP: path.resolve(__dirname, './build'),
    JS: path.resolve(__dirname, './src/app/')
};

const PATHS_TO_CLEAN = [
    './build/js/head.min.js'
];

const FILES_TO_COPY_MOCK = [
    { from: './index.html', to: path.join(PATHS.WEBAPP, 'index.html') },
    { from: './head.min.js', to: path.join(PATHS.WEBAPP, 'js/') },
];

const FILES_TO_COPY_PROD = [
    { from: './index.prod.html', to: path.join(PATHS.WEBAPP, 'index.html') },
];

function plugins(isMock, isDev) {
    const FILES_TO_COPY = isDev ? FILES_TO_COPY_MOCK : FILES_TO_COPY_PROD;
    return [
        new MiniCssExtractPlugin({
            filename: './css/index.css'
        }),
        new CopyWebpackPlugin(FILES_TO_COPY),
        new CleanWebpackPlugin(PATHS_TO_CLEAN, { root: PATHS.WEBAPP }),
        new webpack.DefinePlugin({
            MOCK: JSON.stringify(isMock),
        })
    ];
}

function rules(isDev) {
    return [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader'
        },

        {
            test: /\.less$/,
            use: [
                isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                { loader: 'less-loader', options: {
                        globalVars: {
                            coreModulePath: "'./../../../node_modules/'",
                            nodeModulesPath: "'./../../../node_modules/'"
                        }
                    }
                }
            ]
        }
    ];
}

module.exports = function (env) {
    const isDev = env && env.dev;
    const isMock = env && env.mock;

    const CONTEXTPATH = '/veilarbportefoljeflatefs/';
    return {
        mode: isDev ? 'development' : 'production',
        entry: path.join(PATHS.JS, 'index.js'),
        devtool: isDev ? 'source-map' : false,
        output: {
            path: PATHS.WEBAPP,
            filename: 'js/bundle.js',
            publicPath: CONTEXTPATH
        },
        stats: {
            children: false
        },
        plugins: plugins(isMock, isDev),
        module: {
            rules: rules(isDev)
        },
        resolve: {
            extensions: ['.js', '.ts', '.tsx', '.less']
        },
        devServer: {
            port: 3000,
            open: true,
            overlay: true,
            publicPath: CONTEXTPATH,
            historyApiFallback: true,
            before: (app) => {
                app.get('/', (req, res) => res.redirect(CONTEXTPATH));
            }
        }
    };
};
