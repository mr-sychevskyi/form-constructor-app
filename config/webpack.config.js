const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['./src/index.js'],
  output: {
    filename: './build.js',
    path: path.resolve(__dirname, '../build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        API_KEY: JSON.stringify(process.env.API_KEY)
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve()
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jp?g|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(eot|svg|otf|ttf|woff|woff2)$/,
        loader: 'url-loader'
      }
      // {
      //   test: /\.(jpe?g|png)$/,
      //   loader: 'url-loader'
      // },
      // {
      //   test: /\.html$/,
      //   use: [
      //     {
      //       loader: "html-loader"
      //     }
      //   ]
      // }
    ]
  },
};
