var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './src/app.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/dist'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['es2015']
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
	      'process.env': {
	        'NODE_ENV': JSON.stringify('production')
	      },
	    }),
		new webpack.optimize.OccurrenceOrderPlugin(),
	    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false, minimize: true, compress: {warnings: false} }),
	    new webpack.LoaderOptionsPlugin({minimize: true})    
	 ],
};