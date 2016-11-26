var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: './client/index.tsx',
	output: {
		path: './public',
		filename: 'bundle.js'
	},

	resolve: {
		extensions: ['', 'js', 'ts', '.tsx', '.scss']
	},

	module: {
		loaders: [
			{ test: /\.tsx?$/, loader: 'ts-loader' },
			{ test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader') },
			{	test: /\.json$/, loader: 'json' },
			{ test: /\.(xml|html|txt|md)$/, loader: 'raw'},
			{ test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i, loader: 'url' }
		]
	},

	postcss: () => [
		require('autoprefixer')
	],

	plugins: ([
		new ExtractTextPlugin('style.css', { allChunks: true, }),
		new HtmlWebpackPlugin({ template: './client/index.html', title: 'Naturfreunde Lichtenwald e.v.'})
	]),

	devtool: 'source-map'
};