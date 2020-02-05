const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
	// Change to your "entry-point".
	entry: {
		'particles': './src/particles.ts',
		'particles.min': './src/particles.ts'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		// libraryTarget: 'umd',
		// library: 'particles'
	},
	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.json']
	},
	module: {
		rules: [{
			// Include ts, tsx, js, and jsx files.
			test: /\.(ts|js)x?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
		}],
	},
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				sourceMap: true, // Must be set to true if using source-maps in production
				terserOptions: {
					// https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
				}
			}),
		],
	}
};