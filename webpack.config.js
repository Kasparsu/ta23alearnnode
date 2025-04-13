import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";

export default {
	entry: "./src/index.js",
	output: {
		filename: "main.js",
		path: path.resolve(import.meta.dirname, "dist"),
	},
	devServer: {
		static: {
			directory: path.join(import.meta.dirname, "public"),
		},
		compress: true,
		port: 9000,
		historyApiFallback: true,
		allowedHosts: "all",
	},
	module: {
		rules: [
			{
				test: /\.css$/i,
				use: ["style-loader", "css-loader"],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				type: "asset/resource",
			},
			{
				test: /\.mp3$/,
				use: [
					{
						loader: "file-loader",
						options: {
							name: "assets/[name].[hash:8].[ext]",
						},
					},
				],
			},
			{
				test: /\.scss$/i,
				use: [
					"style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							sassOptions: {
								quietDeps: true,
							},
						},
					},
				],
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
		new VueLoaderPlugin(),
	],
};
