// path模块是node.js中处理路径的核心模块。可以很方便的处理关于文件路径的问题。
const path = require('path')

// 拼接路径
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // 在histroy模式下，使用动态路由，publicpath不能是相对路径
  // 如果改成hash，使用默认值，publicPath可以使用相对路径
  publicPath: '/', // 部署应用包时的基本 URL Default: '/'  
  outputDir: 'dist',
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。 Default: 'index.html'
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('views', resolve('src/views'))
      .set('network', resolve('src/network'))
  }
}
