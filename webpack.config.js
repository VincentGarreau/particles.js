const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    // Change to your "entry-point".
    entry: {
        "tsparticles": "./dist/Main.js",
        "tsparticles.min": "./dist/Main.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        // libraryTarget: "umd",
        // library: "particles"
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"]
    },
    module: {
        rules: [{
            // Include ts, tsx, js, and jsx files.
            test: /\.(js)x?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/,
                sourceMap: true
            })
        ]
    }
};