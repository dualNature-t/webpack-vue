const path = require("path");
const htmlPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssPresetEnv = require('postcss-preset-env');
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
	//入口
	entry: {
		main: './src/main.js'
	},
	// 出口
	output: {
		// 出口文件名
		filename: './js/[name].bundle.js',
		// 出口路径
		path: path.resolve(__dirname, '../dist')
	},
	plugins: [
		//打包前清除dist文件夹
		new CleanWebpackPlugin(),
		//自动生成html文件并指定模板
		new htmlPlugin({ template: "./public/index.html" }),
		//生成单独的css文件
		new MiniCssExtractPlugin({
			filename: './css/[name].css'
		}),
		new VueLoaderPlugin()
	],
	module: {
		rules: [
			//对于css的打包
			{
				test: /(\.css)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [
									postcssPresetEnv ( { 
  										autoprefixer: {  grid : true, remove: false  } 
									} )
								]
							}
						}
					},
				]
			},
			// 对于scss的打包
			{
				test: /(\.scss)$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					'css-loader',
					'sass-loader'
				]
			},
			//对图片的打包
			{
				test: /\.(png|svg|jpg|gif)$/,
				use:[
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							pablicPath: '../images',
							outputPath: 'images'
						}
					}
				]
			},
			//对低版本浏览器兼容
			{
		      test: /\.js$/,
		      exclude: /(node_modules)/,
		      use: {
		        loader: 'babel-loader',
		        options: {
		          presets: ['@babel/preset-env']
		        }
		      }
		    },
		    //处理vue文件
		    {
		    	test: /\.vue$/,
		    	use: [ 'vue-loader' ]
		    }
		]
	}
}