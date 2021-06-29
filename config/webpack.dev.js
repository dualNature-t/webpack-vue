const { merge }  =  require('webpack-merge');
const base = require('./webpack.base.js');
const path = require('path');

module.exports = merge(base, {
	//配置服务器
	devServer: {
		open: true,
		port: 3000,
		contentBase: path.resolve(__dirname, 'dist')
	}
});