
const path = require('path');

module.exports = {

    entry: './src/index.ts',
    mode: "development",
    output: {
        filename: 'tCommunication.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd'
    },

    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.css']
    },

    externals: {
        "jj": {
            commonjs: "jQuery",
            amd: "jQuery",
            root: "$"
        }
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}
