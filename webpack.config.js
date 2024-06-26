const path= require('path')
const HTMLWebpackPlugin=require('html-webpack-plugin') ;
const {CleanWebpackPlugin}= require('clean-webpack-plugin')
const  miniCssExtractPlugin=require('mini-css-extract-plugin')

module.exports={
     entry: {
         main:"./src/scripts/index.js"
     },
     output: {
         path:path.resolve(__dirname, 'dist'),
         filename: "main.js",
         publicPath: ""
     },
    mode: "development",
    devServer:{
         static:path.resolve(__dirname, './dist'),
        compress:true,
        port:8080,
        open:true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude:path.resolve(__dirname, 'node_modules')
            },
            {
                test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
            {
                test: /\.css$/,
                use:[miniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {importLoaders:1}
                    },
                'postcss-loader']
            }
        ]
    },
    plugins: [
        new HTMLWebpackPlugin(
            {template: "./src/index.html"}
        ),
        new  CleanWebpackPlugin(),
        new miniCssExtractPlugin()
    ],
    devtool: 'source-map'
}