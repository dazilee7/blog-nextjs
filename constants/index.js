/* eslint-disable import/prefer-default-export */
export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

// test-gate.cui51.cn    test-api.imcjbt.com  localhost:3200
export const DEV_API = 'http://test-api.imcjbt.com/';

// 请求头添加信息
export const APP_INFO =
    '{"device":"web","os":"web","os_type":"web","os_ver":"1.0.0","market":"web","brand":"","model":"","size":"","ver":"0.0.1","name":"transfer"}';

// 测试环境
export const IS_DEV = process.env.NODE_ENV !== 'pro';

// 客户端还是服务端
export const IS_CLIENT = typeof window !== 'undefined';

// 注册页不显示年龄芝麻分的渠道
export const QD_WHITE = ['dhh'];

export const platform = (function () {
    let navigator;
    const { userAgent } = navigator || {};
    const REG_APP_USERAGENT = /kdxj|xxzs/;
    const REG_APPVERSION_USERAGENT = /(kdxj|xxzs)\/(\d{1,3}\.\d{1,3}\.\d{1,3})/;
    const REG_IOS_USERAGENT = /\(i[^;]+;( U;)? CPU.+Mac OS X/;
    const REG_ANDROID_USERAGENT = /Adr|Android/;
    const REG_WEICHAT_USERAGENT = /MicroMessenger/;
    const REG_QQ_USERAGENT = /\sQQ/i;

    return {
        isApp: REG_APP_USERAGENT.test(userAgent),
        isIos: REG_IOS_USERAGENT.test(userAgent),
        isAndroid: REG_ANDROID_USERAGENT.test(userAgent),
        isWeChat: REG_WEICHAT_USERAGENT.test(userAgent),
        isQQ: REG_QQ_USERAGENT.test(userAgent),
        version: userAgent && userAgent.replace(REG_APPVERSION_USERAGENT, '$1'),
    };
})()
