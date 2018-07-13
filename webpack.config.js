const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const PATHS = {
    WEBAPP: path.resolve(__dirname, 'build'),
    JS: path.resolve(__dirname, 'src/app')
};

const PATHS_TO_CLEAN = ['js/head.min.js'];

const FILES_TO_COPY_MOCK = [
    {from: './index.html', to: path.join(PATHS.WEBAPP, 'index.html')},
    {from: './head.min.js', to: path.join(PATHS.WEBAPP, 'js/')},
];

const FILES_TO_COPY_PROD = [
    {from: './index.prod.html', to: path.join(PATHS.WEBAPP, 'index.html')},
];

function plugins(isMock) {
    const FILES_TO_COPY = isMock ? FILES_TO_COPY_MOCK : FILES_TO_COPY_PROD;

    return [
        new ExtractTextPlugin('css/index.css'), new OptimizeCssAssetsPlugin(),
        new CopyWebpackPlugin(FILES_TO_COPY),
        new CleanWebpackPlugin(PATHS_TO_CLEAN, {root: PATHS.WEBAPP}),
        new webpack.DefinePlugin({
            MOCK: JSON.stringify(isMock),
        })
    ]
}

const RULES = [
    {
        test: /\.js$|\.tsx?$/,
        exclude: /node_modules/, loader: 'awesome-typescript-loader'
    },
    {
        test: /\.less$/
        , loader: ExtractTextPlugin.extract({
            use: [
                {loader: 'css-loader'}, {
                    loader: 'less-loader',
                    options: {
                        globalVars: {
                            coreModulePath: "'./../../../node_modules/'",
                            nodeModulesPath: "'./../../../node_modules/'"
                        }
                    }
                }
            ]
        })
    }
];

module.exports = function (env) {
    const isDev = env && env.dev;
    const isMock = env && env.mock;

    const CONTEXTPATH = '/veilarbportefoljeflatefs/';
    return {
        entry:
            path.join(PATHS.JS, 'index.js'), devtool: isDev ? 'source-map' : false,
        output: {path: PATHS.WEBAPP, filename: 'js/bundle.js'},
        stats: {children: false},
        plugins: plugins(isMock),
        module: {rules: RULES},
        resolve: {extensions: ['.js', '.ts', '.tsx', '.less']},
        devServer: {
            port:
                3000, open: true,
            overlay: true,
            publicPath: CONTEXTPATH,
            historyApiFallback: true,
            before: (app) => {
                app.get('/', (req, res) => res.redirect(CONTEXTPATH));
            }
        }
    }
};
