let path = require('path');
let now_date = new Date();

/**
 * 更新资源更新信息
 * @type {string}
 */
process.env.VUE_APP_LAST_MODIFIED = now_date.toString();

/**
 * 静态资源添加版本号
 * @type {string}
 */
process.env.VUE_APP_PUCLIC_STATIC_VER = '?v' + now_date.getTime();



module.exports = {
    devServer: {
        port: 8080
    },
    // @link https://cli.vuejs.org/zh/config/#outputdir
    // 构建文件的目录
    outputDir: 'dist/' + process.env.VUE_APP_BUILD_OUTPUT_DIR,
    // @link https://cli.vuejs.org/zh/config/#baseurl
    // 部署应用包时的基本 URL
    publicPath: '/player/',
    // @link https://cli.vuejs.org/zh/config/#productionsourcemap
    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: false,
    // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    // @link https://cli.vuejs.org/zh/config/#outputdir
    assetsDir: 'static',

    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('./postcss-vw')({
                        viewportWidth: 1080,
                        viewportUnit: 'vw',
                        propertyBlacklist: [],
                        selectorBlackList: [],
                        minPixelValue: 1,
                        mediaQuery: false,
                        unitPrecision: 3
                    })
                ]
            }
        }
    },
    lintOnSave: false
};
