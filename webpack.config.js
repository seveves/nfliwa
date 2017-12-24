var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	context: path.resolve(__dirname, 'client'),
	entry: {
	  init: [ './init.tsx' ],
	  bundle: ['./index.tsx'],
	  polyfills: [ './polyfills.tsx' ]
	},

	resolve: {
		extensions: [ '.js', '.ts', '.tsx', '.scss', '.css', ]
	},
		
	output: {
		path: path.join(__dirname, 'public/client'),
		filename: '[name].js',
		publicPath: '/client/'
	},

	module: {
		rules: [
			{
				test: /\.(tsx|ts)?$/,
				use: [
					{ loader: 'ts-loader' }
				]
			},
			{
				test: /\.(scss|css)$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ loader: 'css-loader', options: { importLoaders: 1 } },
						{
							loader: 'postcss-loader',
							options: {
								ident: 'postcss',
								plugins: (loader) => [require('autoprefixer')({ browsers: ['Last 2 versions']})]
							}
						},
						'sass-loader',
					]
				})
			},
			{
				test: /\.(xml|html|txt|md)$/,
				use: [
					{ loader: 'raw-loader' }
				]
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: [
					{ loader: 'url-loader?limit=10000' }
				]
			}
		]
	},

	plugins: ([
		new CopyWebpackPlugin([
			{ from: './index.html', to: 'index.html' },
			{ from: './assets/img/', to: '../img' },
			{ from: './manifest.json', to: 'manifest.json' }
		]),
		new ExtractTextPlugin('style.css', { allChunks: true, }),
	]),

	devtool: 'source-map',

	devServer: {
		proxy: {
			"/client/api": {
				target: "http://localhost:3000"
			}
		}
	}
};