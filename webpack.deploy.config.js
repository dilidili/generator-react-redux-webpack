var webpack = require('webpack')
var CleanPlugin = require('clean-webpack-plugin')
var ExtractPlugin = require('extract-text-webpack-plugin')
var autoprefixer = require('autoprefixer')
var path = require('path')

// plugins
plugins = [
	new webpack.HotModuleReplacementPlugin(),
	new ExtractPlugin('bundle.css'),
	new webpack.optimize.CommonsChunkPlugin({
		name: 'main',
		children: true,
		minChunks: 2
	}),

	// Cleanup the builds/ folder before
	// compiling our final assets
	new CleanPlugin('builds'),

	// This plugin looks for similar chunks and files
	// and merges them for better caching by the user
	new webpack.optimize.DedupePlugin(),

	// This plugins optimizes chunks and modules by
	// how much they are used in your app
	new webpack.optimize.OccurenceOrderPlugin(),

	// This plugin prevents Webpack from creating chunks
	// that would be too small to be worth loading separately
	new webpack.optimize.MinChunkSizePlugin({
		minChunkSize: 51200, // ~50kb
	}),

	// This plugin minifies all the Javascript code of the final bundle
	new webpack.optimize.UglifyJsPlugin({
		mangle: true,
		compress: {
			warnings: false, // Suppress uglification warnings
		},
	}),

	// This plugins defines various variables that we can set to false
	// in production to avoid code related to them from being compiled
	// in our final bundle
	new webpack.DefinePlugin({
		__SERVER__: false,
		__DEVELOPMENT__: false,
		__DEVTOOLS__: false,
		'process.env': {
			NODE_ENV: JSON.stringify('production'),
		},
	}),
]

module.exports = {
	debug: false,
	entry: [
		'./src/client.jsx',
	],
	module: {
		loaders: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
		},{
			test: /\.scss$/,
			loaders: ["style", "css", "sass", "postcss"]
		}, {
			test: /\.svg$/,
			loader: 'svg-inline'
		}, {
			test: /\.(jpe?g|png|gif)$/i,
			loaders: [
				'file?hash=sha512&digest=hex&name=[hash].[ext]',
				'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false',
			]
		}],
		postLoaders: [{
			loader: "transform/cacheable?brfs",
		}]
	},
	postcss: function() {
		return [autoprefixer]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		root:[
			path.resolve('./sass_modules/'),
			path.resolve('./src/utils/'),
			path.resolve('./src/react-canvas/'),
			path.resolve('./src/public/'),
		]
	},
	output: {
		path: __dirname + '/dist/build',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: plugins,
	devtool: false,
}
