const ExtractTextPlugin = require("extract-text-webpack-plugin");

const babelPresetLatest = ["env", {"es2015": {"modules": false}}];

module.exports = {
	resolve: {
		extensions: ['.js']
	},
	module: {
		rules: [{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [babelPresetLatest],
						plugins: ["transform-object-rest-spread"]
					}
				}
			},
			{
				test: /\.html$/,
				use: "html-loader"
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader",
					publicPath: "/dist"
				})
			},
			{
				test: /.(png|woff|woff2|eot|ttf|svg)(\?.*)?$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 100000
					}
				}
			}
		]
	},
	plugins: [
		new ExtractTextPlugin({
			filename: "index.css",
			disable: false,
			allChunks: true
		})
	]
}