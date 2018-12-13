// next.config.js
const theme = require('./package.json').theme;
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
    fs.readFileSync(
        path.resolve(__dirname, './styles/antd-custom.less'),
        'utf8'
    )
)

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    // eslint-disable-next-line
    require.extensions['.css'] = (file) => {};
    require.extensions['.less'] = (file) => {};
}

/**
 * TODO loader 的顺序会影响最后合成的文件顺序；
 * 比如css的loader，antd_mobile的是css，项目是less，如果less-loader在css-loader前面会使antd的部分样式如body覆盖项目文件;
 * TODO 还有cssmodules也是，最后一个css-loader的modules属性决定test的文件是否成功使用了cssmodules
 */

module.exports = withCss({
    // 不使用cssModules的配置, 页面切换样式正常
    ...withLess({
        cssModules: true, // 与ant-mobile冲突
        lessLoaderOptions: {
            javascriptEnabled: true,
            modifyVars: themeVariables // 自定义覆盖antd-mobile主题样式
        },
        postcssLoaderOptions: {
            config: {
                path: './postcss.config.js'
            }
        },
        webpack(config, options) {
            const rules = config.module.rules;
            let addLessRule;
            rules.forEach(e => {
                if (e.test.test('.less')) {
                    const i = e.use.findIndex(r => r.loader && r.loader.indexOf('css-loader')>-1);
                    if (i >= 0) {
                        addLessRule = JSON.parse(JSON.stringify(e));
                        addLessRule.use[i].options.modules = false;
                        e.exclude = [/node_modules/];
                        addLessRule.include = [/node_modules/];
                        addLessRule.test = e.test;
                    }
                }
                if (e.test.test('.css')) {
                    const i = e.use.findIndex(r => r.loader && r.loader.indexOf('css-loader')>-1);
                    if (i >= 0) {
                        e.use[i].options.modules = false;
                    }
                }
                console.log(e.test,'=>',JSON.stringify(e));
            });

            addLessRule && rules.unshift(addLessRule);

            console.log('============end================');


            return config;
        }
    })

    // 使用cssModules的配置，但是页面样式加载有延迟，应该是webpack配置不到位
    // webpack(config, options) {
    //     console.log('=============start===============');
    //     // console.log('options::', options.defaultLoaders);
    //     // console.log('options::', JSON.stringify(options.defaultLoaders));
    //     const rules = config.module.rules;
    //
    //     rules.push(...[
    //         // 非antd-mobile的less处理，主要是不使用cssModules
    //         {
    //             test: /\.less$/,
    //             exclude: [/node_modules/],
    //             use: options.isServer ?
    //                 [
    //                     {
    //                         loader: 'css-loader/locals',
    //                         options: {
    //                             modules: true,
    //                             minimize: false,
    //                             sourceMap: true,
    //                             importLoaders: 1
    //                         }
    //                     },
    //                     {
    //                         loader: 'less-loader',
    //                         options: {
    //                             javascriptEnabled: true,
    //                             // modifyVars: themeVariables
    //                         }
    //                     }
    //                 ]
    //                 :
    //                 [
    //                     'style-loader',
    //                     {
    //                         loader: 'css-loader',
    //                         options: {
    //                             modules: true,
    //                             minimize: false,
    //                             sourceMap: true,
    //                             importLoaders: 1
    //                         }
    //                     },
    //                     {
    //                         loader: 'less-loader',
    //                         options: {
    //                             javascriptEnabled: true,
    //                             // modifyVars: themeVariables
    //                         }
    //                     }
    //                 ]
    //         },
    //         // antd-mobile less处理，主要是不使用cssModules
    //         {
    //             test: /\.less$/,
    //             exclude: [/pages/],
    //             use: options.isServer ?
    //                 [
    //                     {
    //                         loader: 'css-loader/locals',
    //                         options: {
    //                             modules: false,
    //                             minimize: false,
    //                             sourceMap: true,
    //                             importLoaders: 1
    //                         }
    //                     },
    //                     {
    //                         loader: 'less-loader',
    //                         options: {
    //                             javascriptEnabled: true,
    //                             modifyVars: themeVariables
    //                         }
    //                     }
    //                 ]
    //                 :
    //                 [
    //                     'style-loader',
    //                     {
    //                         loader: 'css-loader',
    //                         options: {
    //                             modules: false,
    //                             minimize: false,
    //                             sourceMap: true,
    //                             importLoaders: 1
    //                         }
    //                     },
    //                     {
    //                         loader: 'less-loader',
    //                         options: {
    //                             javascriptEnabled: true,
    //                             modifyVars: themeVariables
    //                         }
    //                     }
    //                 ]
    //         },
    //     ]);
    //
    //     rules.forEach(e => console.log(e.test,'=>',JSON.stringify(e)));
    //     console.log('============end================');
    //     return config;
    // }
});
