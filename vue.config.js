module.exports = {
    baseUrl: './', // 部署应用的基本URL 相对路径可以部署在任意路径
    // outputDir: 'dist', // 打包输出目录，默认dist
    // filenameHashing: true, // 打包生成的静态文件名包含hash以便控制缓存默认为true
    // lineOnSave: true, // 是否在开发环境下通过eslint-loader在保存时lint代码默认true
    // configureWebpack: {}, // 会通过webpack-merge合并到最终的配置中
    // configureWebpack: (config) => { // 接收被解析的配置做为参数
    //     if(process.env.NODE_ENV ==='production'){

    //     }else{

    //     }
    // },
    // chainWebpack: (config) => {// 接收一个基于webpack-chain的ChainableConfig实例对内部weback配置进行修改
    //     config.module
    //         .rule('vue')
    //         .use('vue-loader')
    //         .loader('vue-loader')
    //         .tap((options) => options);
    // },
    css: {
        extract: process.env.Node_ENV === 'production', // 是否将组建中的css提取到一个独立的css文件中
        loaderOptions: {
            // 给sacc-loader传递选项
            sass: {
                // 向所有sass样式传入共享的全局变量 @是src的别名
                data: '@import "@/styles/variables.scss";',
            },
        },
    },
    devServer: {// 所以webpack-dev-server的选项都支持
        open: true,
        port: '8888',
        proxy: {// 设置代理
            '/login': {
                target: 'http://yzcrm.111.com.cn',
                ws: true,
                changeOrigin: true,
            },
        },
    },
    pwa: {// pwa配置
        name: '医生工作台',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
        // configure the workbox plugin
        // workboxPluginMode: 'InjectManifest', // 默认'GenerateSW'每次重建web程序时都会生成一个新的服务工作文件，'InjectManifest'允许自定义缓存策略
        // workboxOptions: {
        //     // swSrc is required in InjectManifest mode.
        //     swSrc: 'dev/sw.js',
        //     // ...other Workbox options...
        // },
    },
    // parallel: true, // 是否为babel或typeScript使用多核转译，在系统cup多核时自动启用
};
