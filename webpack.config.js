const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: [
        './src/js/index.js',
        './src/scss/style.scss',
    ],
    output: {
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            // {
            //     loader: 'postcss-loader', // Run post css actions
            //     options: {
            //         plugins: function () { // post css plugins, can be exported to postcss.config.js
            //             return [
            //                 // require('precss'),
            //                 require('autoprefixer')
            //             ];
            //         }
            //     }
            // },
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        browsers: [
                                            'last 2 versions'
                                        ]
                                    },
                                    modules: false // Needed for tree shaking to work.
                                }
                            ]
                        ]
                    }
                }
            },
            {
                test: /\.(sass|scss)$/,
                include: path.resolve(__dirname, 'src/scss'),
                use: [
                    // {
                    //     // Adds CSS to the DOM by injecting a `<style>` tag
                    //     loader: 'style-loader'
                    // },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // you can specify a publicPath here
                            // by default it uses publicPath in webpackOptions.output
                            // publicPath: '../',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    {
                        loader: "css-loader",
                        options: {modules: false, importLoaders: 1},
                    },
                    {
                        loader: 'postcss-loader', // Run post css actions
                        options: {
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                        }
                    },
                ]
        }
        ,{
            test: /\.(ttf|eot|svg|png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]',
                    },
                }
            ]
        },
            // {
            //     loader: 'postcss-loader',
            //     options: {
            //         ident: 'postcss',
            //         plugins: [
            //             require('precss'),
            //             require('autoprefixer'),
            //         ]
            //     }
            // },
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // all options are optional
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),
        new ExtractTextPlugin({
            filename: './css/style.bundle.css',
            allChunks: true,
        }),
        new CopyWebpackPlugin([{
            from: './src/fonts',
            to: './fonts'
        },
            {
                from: './src/favicon',
                to: './favicon'
            },
            {
                from: './src/img',
                to: './img'
            },
        ]),
    ]
};