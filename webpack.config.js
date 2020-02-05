const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: './src/particles.js',
	devtool: "source-map",
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'particles.js',
	},
	module: {
		rules: [
			{
				test: /\.js$|jsx/,
				use: 'babel-loader'
			}
		]
	},
	optimization: {
		minimize: true,
		minimizer: [
			new UglifyJsPlugin({
				include: /\.min\.js$/
			})
		]
	}
};