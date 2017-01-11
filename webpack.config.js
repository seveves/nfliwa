var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	context: __dirname,
	entry: {
	  init: [ './client/init.tsx' ],
	  bundle: ['./client/index.tsx'],
	  polyfills: [ './client/polyfills.tsx' ]
	},
		
	output: {
		path: './public/client',
		filename: '[name].js',
		publicPath: '/client/'
	},

	resolve: {
		extensions: ['', 'js', 'ts', '.tsx', '.scss']
	},

	module: {
		loaders: [
			{ test: /\.(tsx|ts)?$/, loader: 'ts-loader' },
			{ test: /\.(scss|css)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader') },
			{ test: /\.(xml|html|txt|md)$/, loader: 'raw'},
			{ test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i, loader: 'url-loader?limit=10000' }
		]
	},

	postcss: () => [
		require('autoprefixer')
	],

	plugins: ([
		new webpack.optimize.DedupePlugin(),
		new CopyWebpackPlugin([
			{ from: './client/index.html', to: 'index.html' },
			{ from: './client/manifest.json', to: 'manifest.json' }
		]),
		new ExtractTextPlugin('style.css', { allChunks: true, }),
		new CompressionPlugin()
	]),

	devtool: 'source-map'
};