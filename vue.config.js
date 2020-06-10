const packageJson = require('./package.json')

module.exports = {
   productionSourceMap: true,
   chainWebpack: config => {
      config.plugin('define')
      .tap(args =>{
        args[0]['process.env']['PACKAGE_VERSION'] = JSON.stringify(packageJson.version || 'x.x.x')
        args[0]['process.env']['GOOGLE_ANALYTICS_KEY'] = JSON.stringify(process.env.GOOGLE_ANALYTICS_KEY || '')
        return args
      })

      /* disable insertion of assets as data urls b/c Phaser doesn't support it */
      const rules = [
        { name: 'images', dir: 'img' },
        { name: 'media',  dir: 'media' }
      ]
      rules.forEach(rule => {
        const ruleConf = config.module.rule(rule.name)

        ruleConf.uses.clear()

        ruleConf
          .use('file-loader')
            .loader('file-loader')
            .options({
              name: `${rule.dir}/[name].[hash:8].[ext]`
            })
      })

    },
    devServer: {
      open: true,
      hot: false
    }
};