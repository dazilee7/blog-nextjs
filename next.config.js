// next.config.js
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// fix: prevents error when .css files are required by node
if (typeof require !== 'undefined') {
    // eslint-disable-next-line
    require.extensions['.css'] = (file) => {}
    require.extensions['.less'] = (file) => {}
}

/**
 * TODO loader 的顺序会影响最后合成的文件顺序；
 * 比如css的loader，antd_mobile的是css，项目是less，如果less-loader在css-loader前面会使antd的部分样式如body覆盖项目文件;
 * TODO 还有cssmodules也是，最后一个css-loader的modules属性决定test的文件是否成功使用了cssmodules
 */

module.exports = withCss({
    // lessLoaderOptions: {
    //     javascriptEnabled: true,
    //     // modifyVars: themeVariables // make your antd custom effective
    // },
    webpack(config, options) {
        console.log('=============start===============');
        // console.log('options::', options, JSON.stringify(options));
        const rules = config.module.rules;

        rules.push(...[
            {
                test: /\.less$/,
                use: options.isServer ?
                    ['ignore-loader']
                    :
                    [
                        "extracted-loader",
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                minimize: false,
                                sourceMap: true,
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                javascriptEnabled: true,
                            }
                        }
                    ]
            },
        ])

        rules.forEach(e => console.log(e.test,'=>',JSON.stringify(e)))
        console.log('============end================');
        return config;
    }
});
