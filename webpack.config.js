const fs = require('fs');
const path = require('path');

function getAllEntry() {
    const mainPath = path.resolve(__dirname, 'main');
    const paths = fs.readdirSync(mainPath);
    const result = {};
    for (let filename of paths) {
        let name = path.basename(filename, '.js');
        result[name] = path.resolve(mainPath, filename);
        console.log(`${name} => ${result[name]}`);
    }
    return result;
}

module.exports = {
    entry: getAllEntry(),
    output: {
        library: '[name]',
        libraryTarget: 'umd',
        globalObject: 'this',
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    performance: {
        hints: 'warning',
        maxEntrypointSize: 4000000,
        maxAssetSize: 2000000,
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }],
    },
    devServer: {
        host: '0.0.0.0',
        port: 33333,
        contentBase: [
            path.resolve(__dirname, 'demo')
        ],
        contentBasePublicPath: [
            '/'
        ],
    },
};