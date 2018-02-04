const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './client/src/index.js',
	devtool: 'eval-source-map',
	devServer: {
		port: process.env.CLIENT_PORT,
        proxy: {
            '/api/v1': 'http://localhost:3000'
        }
	},
	output: {
        path: path.resolve(__dirname, 'client/dist/'),
        filename: '[name]-bundle.js',
        chunkFilename: '[name]-chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: ["source-map-loader"],
				enforce: "pre"
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['client/dist']),
        new HtmlWebpackPlugin({
            template: './client/src/index.html'
        }),
        new webpack.ProvidePlugin({
            m: 'mithril'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function(module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            },
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            minChunks: Infinity,
        }),
        new webpack.optimize.ModuleConcatenationPlugin()
	]
};
