// webpack 性能优化的方法
/**
 * webpack4.0 默认在生产环境的时候是支持代码压缩的，即 mode=production 模式下
 * 
 * 实际上 webpack4.0 默认是使用  terser-webpack-plugin 这个压缩插件，在此之前是使用 uglifyjs-webpack-plugin，
 * 两者的区别是后者对 ES6 的压缩不是很好，同时我们可以开启 parallel 参数，使用多进程压缩，加快压缩。
*/ 

// 1. 压缩js terser-webpack-plugin
// config/webpack.common.js
const TerserPlugin = require('terser-webpack-plugin');
// ...
const commonConfig = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
        cache: true, // 开启缓存  todo 
      }),
    ],
  },
  // ...
}

// 2.压缩CSS optimize-css-assets-webpack-plugin
// config/webpack.prod.js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// ...
const prodConfig = {
  // ...
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      })
    ]
  },
}

// 3.图片压缩  image-webpack-loader
/**
 * 一般来说在打包之后，一些图片文件的大小是远远要比 js 或者 css 文件要来的大，所以我们首先要做的就是对于图片的优化
 * */ 
// config/webpack.common.js
// ...
module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // 压缩 jpeg 的配置
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
              optipng: {
                enabled: false,
              },
              // 使用 imagemin-pngquant 压缩 png
              pngquant: {
                quality: '65-90',
                speed: 4
              },
              // 压缩 gif 的配置
              gifsicle: {
                interlaced: false,
              },
              // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
    ]
  }         
  // ...

//   4. 拆分代码
/**
 * 某些模块根本没有使用，但是还是被打包了，这样实际上会拖累 webpack 的打包速度，而且也会增加打包文件的体积，
 * 所以我们可以使用 tree-shaking 将这些代码剔除掉
 **/ 
// splitChunksPlugin 把一个大的文件分割成几个小的文件，这样也可以有效的提升 webpack 的打包速度

// 5. 预先编译资源模块 DllPlugin
/**
 * 在打包的时候，一般来说第三方模块是不会变化的，所以我们想只要在第一次打包的时候去打包一下第三方模块，并将第三方模块打包到一个特定的文件中，
 * 当第二次 webpack 进行打包的时候，就不需要去 node_modules 中去引入第三方模块，而是直接使用我们第一次打包的第三方模块的文件就行。
    
    webpack.DllPlugin 就是来解决这个问题的插件，使用它可以在第一次编译打包后就生成一份不变的代码供其他模块引用，
    这样下一次构建的时候就可以节省开发时编译打包的时间
 * */ 
// config/webpack.dll.js
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'production', // 环境
  entry: {
    vendors: ['lodash'], // 将 lodash 打包到 vendors.js 下
    react: ['react', 'react-dom'], // 将 react 和 react-dom 打包到 react.js 下
  },
  output: {
    filename: '[name].dll.js', // 输出的名字
    path: path.resolve(__dirname, '../dll'), // 输出的文件目录
    library: '[name]' // 将我们打包出来的文件以全部变量的形式暴露，可以在浏览器变量的名字进行访问
  },
  plugins: [
    // 对生成的库文件进行分析，生成库文件与业务文件的映射关系，将结果放在 mainfest.json 文件中
    new webpack.DllPlugin({
      name: '[name]', // 和上面的 library 输出的名字要相同
      path: path.resolve(__dirname, '../dll/[name].manifest.json'),
    })
  ]
}

// 6 使用 ES6 Modules 语法，以保证 Tree-Shaking 起作用
//  因为 tree-shaking 只对 ES6 Modules 静态引入生效，对于类似于 CommonJs 的动态引入方式是无效的

// 7 预加载资源 webpackPrefetch
// 使用 webpackPrefetch 来提前预加载一些资源，意思就是 将来可能需要一些模块资源，在核心代码加载完成之后带宽空闲的时候再去加载需要用到的模块代码

// 8. 使用 css Sprite 雪碧图 减少网络请求

// 9. html-webpack-externals-plugin
// 将一些公用包提取出来使用 cdn 引入，不打入 bundle 中，从而减少打包文件大小，加快打包速度

// babel-plugin-dynamic-import-node
// webpack-deadcode-plugin

