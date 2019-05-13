const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
	// entry: './src/index.js',
	// output: {
	// 	path: path.resolve(__dirname, 'dist'),
	// 	filename: 'main.js',
	// 	publicPath: './dist'
	// },
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader"
				}
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader"
					}
				]
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					"css-loader",
					"sass-loader"
				]
			}
		]
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html"
		})
	],
	externals: {
		config: JSON.stringify({
            // apiUrl: 'http://localhost:8080'
            apiUrl: 'http://localhost:8081'
        })
	},
	devServer: {
		historyApiFallback: true
	}
};