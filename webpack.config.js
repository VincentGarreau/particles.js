const path = require('path');

module.exports = {
	entry: './src/particles.js',
	output: {
		filename: 'particles.min.js',
		path: path.resolve(__dirname, 'dist')
	}
};