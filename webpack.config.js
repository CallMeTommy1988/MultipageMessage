
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {

    entry: './src/index.ts',

    output: {
        filename: 'tCommunication.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.css']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}
