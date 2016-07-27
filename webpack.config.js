const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'eval',

    entry: ['./src/index.jsx'],
    output: {
        path: path.resolve(__dirname + '/public/build'),
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel', "eslint-loader"]
        },{
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};
