// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    const dir = path.resolve(__dirname, 'src/assets/icons') // 确定 icons 的目录

    config.module
        .rule('svg-sprite') // 添加 svg-sprite 规则
        .test(/.svg$/) // 匹配上该正则的文件才能使用这个规则
        .include.add(dir).end() // 只包含 icons 目录 走这个规则
        .use('svg-sprite-loader').loader('svg-sprite-loader').options({extract: false}).end()

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{plainSprite: true}])
    config.module.rule('svg').exclude.add(dir) // 其他 svg loader 排除 icons 目录

  }
}