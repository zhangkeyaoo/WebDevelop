const path = require('path');

module.exports = {
  entry: './src/index.jsx', // 入口文件
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录
    filename: 'bundle.js' // 输出文件名
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // 匹配所有 .js 和 .jsx 文件
        exclude: /node_modules/, // 排除 node_modules 目录
        use: {
          loader: 'babel-loader', // 使用 babel-loader
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // 使用的 Babel 预设
          }
        }
      },
      {
        test: /\.css$/, // 匹配所有 .css 文件
        use: ['style-loader', 'css-loader'] // 使用 style-loader 和 css-loader
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'] // 解析这些扩展名
  },
  mode: 'production' // 生产模式
};