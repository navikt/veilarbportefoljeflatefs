module.exports = {
    entry: './out/index.js',
    output: {
        filename: '../main/webapp/js/bundle.js'
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['env'],
                    plugins: [require('babel-plugin-transform-object-rest-spread')]
                }
            },
            {test: /\.(?:css|less|scss|sass)$/, loader: 'ignore-loader'}
        ]
    }
};
