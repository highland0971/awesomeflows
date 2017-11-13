var path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: './dist/',
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader:'url-loader',
                query:{
                    limit:'8192',
                    name:'img/[name].[ext]',
                }
            },
            {
                test: /\.css$/,
                loader:'style-loader!css-loader',
            }
        ]
    },
    externals: {
        'electron': 'require("electron")',
    },
};
