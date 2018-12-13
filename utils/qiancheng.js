import { platform, IS_CLIENT } from '../constants';
import * as SCHEME from '../constants/scheme';

const METHODS = [
    'addCalendarRemind',
    'emailcert',
    'Moxiecert',
    'getDeviceId',
    'registerCallBack',
    'startUnicorn',
    'copyTextMethod',
    'shareMethod',
    'jump',
    'popWindow',
    'captureScreen',
    'qianchengAuthorize',
];
const SCHEMAS_MAPPED = {
    // APP主页
    [SCHEME.APP_MAIN]: 4,
    // 忘记交易密码
    [SCHEME.APP_FORGET_PAYPASSWORD]: 2,
    // 认证中心
    [SCHEME.APP_AUTH]: 3,
    // 借款记录
    [SCHEME.APP_LOAN_LIST]: 8,
    // 优惠券
    [SCHEME.APP_COUPON]: 13,
};
const INSTALL_APP_MAPPED = [
    {
        alias: ['wechat', 'weixin', 'wx', '微信'],
        platform: {
            ios: 'wechat://',
            android: 'com.tencent.mm',
        },
    },
    {
        alias: ['tb', 'taobao', 'taobao.com', 'www.taobao.com', '淘宝', '手机淘宝'],
        platform: {
            ios: 'taobao://',
            android: 'com.taobao.taobao',
        },
    },
    {
        alias: ['tmall', 'tmall.com', '天猫'],
        platform: {
            ios: 'tmall://',
            android: 'com.tmall.wireless',
        },
    },
    {
        alias: ['ofo', 'ofo.so', 'www.ofo.so'],
        platform: {
            ios: 'ofoapp://',
            android: 'so.ofo.labofo',
        },
    },
    {
        alias: ['mobike', 'mobike.com', 'www.mobike.com', '摩拜', '摩拜单车'],
        platform: {
            ios: 'mobike://',
            android: 'com.mobike.mobikeapp',
        },
    },
    {
        alias: ['didi', '滴滴出行'],
        platform: {
            ios: 'diditripcard://',
            android: 'com.sdu.didi.psnger',
        },
    },
    {
        alias: ['jd', 'jd.com', '京东'],
        platform: {
            ios: 'openApp.jdMobile://',
            android: 'com.jingdong.app.mall',
        },
    },
    {
        alias: ['alipay', 'alipay.com', 'www.alipay.com', '支付宝'],
        platform: {
            ios: 'alipay://',
            android: 'com.eg.android.AlipayGphone',
        },
    },
    {
        alias: ['qq', 'qq.com', 'www.qq.com', 'mobileqq'],
        platform: {
            ios: 'mqq://',
            android: 'com.tencent.mobileqq',
        },
    },
    {
        alias: ['qqlive', '腾讯视频'],
        platform: {
            ios: 'tenvideo://',
            android: 'com.tencent.qqlive',
        },
    },
    {
        alias: ['baidumap', 'map.baidu.com', '百度地图'],
        platform: {
            ios: 'baidumap://',
            android: 'com.baidu.BaiduMap',
        },
    },
    {
        alias: ['gaode', 'gaode.com', 'www.gaode.com', 'amap', 'amap.com', 'www.amap.com', '高德', '高德地图'],
        platform: {
            ios: 'amapuri://',
            android: 'com.autonavi.minimap',
        },
    },
    {
        alias: ['dianping', 'dianping.com', 'www.dianping.com', '大众点评'],
        platform: {
            ios: 'dianping://',
            android: 'com.dianping.v1',
        },
    },
    {
        alias: ['baidu.com', 'baidu.com', 'www.baidu.com', '百度', '手机百度'],
        platform: {
            ios: 'baiduboxapp://',
            android: 'com.baidu.searchbox',
        },
    },
    {
        alias: ['meituan', 'meituan.com', 'www.meituan.com', '美团'],
        platform: {
            ios: 'meituan0000://',
            android: 'com.sankuai.meituan',
        },
    },
    {
        alias: ['eleme', 'ele.me', 'www.ele.me', '饿了么'],
        platform: {
            ios: 'eleme://',
            android: 'me.ele',
        },
    },
    {
        alias: ['waimai.meituan.com', '美团外卖'],
        platform: {
            ios: 'meituanwaimai://',
            android: 'com.sankuai.meituan',
        },
    },
    {
        alias: ['iqiyi', 'iqiyi.com', 'www.iqiyi.com', '爱奇艺'],
        platform: {
            ios: 'qiyi-iphone://',
            android: 'com.qiyi.video',
        },
    },
    {
        alias: ['youku', '优酷', '优酷视频'],
        platform: {
            ios: 'youku://',
            android: 'com.youku.phone',
        },
    },
    {
        alias: ['tv.sohu.com', '搜狐视频'],
        platform: {
            ios: 'sohuvideo://',
            android: '',
        },
    },
    {
        alias: ['douban', 'douban.com', 'www.douban.com', '豆瓣'],
        platform: {
            ios: 'douban://',
            android: '',
        },
    },
    {
        alias: ['58.com', 'www.58.com', '58同城'],
        platform: {
            ios: 'wbmain://',
            android: '',
        },
    },
    {
        alias: ['letv', 'le.com', 'www.le.com', '乐视视频'],
        platform: {
            ios: 'LetviPhone://',
            android: '',
        },
    },
    {
        alias: ['kuaishou', 'kuaishou.com', 'www.kuaishou.com', '快手'],
        platform: {
            ios: 'kwai://',
            android: 'com.smile.gifmaker',
        },
    },
];

const ERROR_NAME_EMPTY = 'please enter the Interface name.';
const ERROR_PARAMS_TYPE = 'params is not an object.';
const ERROR_JSSDK_NOTEXIST = 'Interface isn`t support.';

const REG_CALLBACKS = /alert|actionSheet|registerCallBack|setRightNavButton/;

// 适配老版本
function adaptToPast(options) {
    let { name, params } = options;
    const { native, callbackid } = options;
    if (name === 'jump') {
        let { type } = params;
        const { url, is_browser: isBrowser } = params;
        const scheme = SCHEMAS_MAPPED[url];
        if (isBrowser === 1 && !type) type = 10;
        if (scheme) {
            params = { type: scheme };
            name = 'returnNativeMethod';
        } else if (type === 10) {
            params = { url, type };
        } else {
            window.location.href = url;
            return;
        }
    }
    if (['jump', 'addCalendarRemind', 'copyTextMethod', 'shareMethod'].indexOf(name) >= 0) {
        native[name](JSON.stringify(params));
        return;
    }
    if (['emailcert', 'Moxiecert', 'startUnicorn'].indexOf(name) >= 0) {
        const config = [];
        const { tasktype } = params;
        if (name === 'Moxiecert' && tasktype === 'email') {
            name = 'emailcert';
            delete params.tasktype;
        }

        Object.values(params).map(param => config.push(param));
        native[name](...config);
        return;
    }
    if (name === 'registerCallBack') {
        const fn = id => {
            if (window.QCJSAPI && window.QCJSAPI.appCallback) {
                window.QCJSAPI.appCallback({ callbackid: id, data: { code: 0, message: 'success', data: {} } });
            }
        };
        native[name](`(${fn.toString()}('${callbackid}'))`);
        return;
    }
    const TYPES = {
        popWindow: 0,
        qianchengAuthorize: 7,
        captureScreen: 14,
    };

    if (typeof TYPES[name] === 'number') {
        native.returnNativeMethod(JSON.stringify({ type: TYPES[name], params }));
    }
}

function isFunction(fn) {
    return fn && typeof fn === 'function';
}

function compatible() {
    return window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.QCJSInterface;
}

function createCallbackID(name = 'callback') {
    const timerstamp = Date.now();
    return `QC_${name.toUpperCase()}_${timerstamp}`;
}

function queryInstalledApp(name) {
    const type = platform.isIos ? 'ios' : 'android';
    const { platform: PlatForm = {} } =
        INSTALL_APP_MAPPED.find(app => {
            const { alias } = app;
            return alias.indexOf(name) >= 0;
        }) || {};
    return PlatForm[type] || name;
}

class qiancheng {
    static track(...options) {
        const [name, params = {}] = options;
        const callbackid = createCallbackID(name);
        const config = { method: name, params, callback: callbackid };
        const native = window.QCJSInterface || window.nativeMethod || compatible();
        if (!name) {
            throw new Error(ERROR_NAME_EMPTY);
        }
        if (!(params instanceof Object)) {
            throw new Error(ERROR_PARAMS_TYPE);
        }
        return new Promise((resolve, reject) => {
            // 创建回调方法
            window.QCJSAPI.cache[callbackid] = response => (response.code === 0 ? resolve : reject)(response);
            // 解决 Promise.resolve 无法重复执行
            if (REG_CALLBACKS.test(name) && isFunction(params.callback)) {
                const { callback } = params;
                window.QCJSAPI.cache[callbackid] = response => callback(response);
                delete params.callback;
            }
            if (name === 'installApp') {
                if (Array.isArray(params.name)) {
                    const temp = [];
                    params.name.map(app => temp.push(queryInstalledApp(app)));
                    params.name = temp;
                } else {
                    params.name = queryInstalledApp(params.name);
                }
                config.params = params;
            }
            // ios
            if (native && native.postMessage) {
                native.postMessage(config);
                return;
            }
            // android
            if (native && native.callApp) {
                native.callApp(JSON.stringify(config));
                return;
            }
            // 老版本 > 1.5.8
            if (native && METHODS.find(method => method === name)) {
                adaptToPast({ name, params, native, callbackid });
                return;
            }
            const error = { code: 1000, message: ERROR_JSSDK_NOTEXIST };
            reject(error);
        });
    }
    // 弹出框
    static modal(...options) {
        const [name, title, content, buttons] = options;
        Array.isArray(buttons) && buttons.map((button, index) => ({ ...button, key: index }));
        this.track(name, {
            title,
            content,
            buttons: buttons.map(button => {
                const { key, text } = button;
                return { key, text };
            }),
            callback(response) {
                const { key } = response.data;
                const button = buttons.find(data => data.key === key);
                if (button && isFunction(button.onPress)) {
                    button.onPress();
                }
            },
        });
    }
    static alert = (...options) => this.modal({ name: 'alert', ...options });
    static actionSheet = (...options) => this.modal({ name: 'actionSheet', ...options });
    // 通知客户端
    static notification = options => this.track('notification', options);
}

function translate(data) {
    if (data instanceof Object) return data;
    try {
        return JSON.parse(data);
    } catch (e) {
        return {};
    }
}

class QCJSAPI {
    static cache = {};
    static appCallback(result) {
        const response = translate(result);
        const { callbackid, data } = response;
        const callback = this.cache[callbackid];
        if (callback && isFunction(callback)) {
            // if (/GETSESSIONID/i.test(callbackid)) {
            //     let response = data;
            //     if (response instanceof Object) {
            //         const temp = {};
            //         for (let i in response.data) {
            //             const value = response.data[i];
            //             if (/SESSIONID/i.test(i)) {
            //                 i = String(i).toLowerCase();
            //             }
            //             temp[i] = value;
            //         }
            //         response.data = temp;
            //         data = response;
            //     }
            // }
            // if (/FACEPLUSPLUS/i.test(callbackid)) {
            //     const response = data;
            //     if (response && response.data && response.data.ocr) {
            //         response.data.ocr = translate(response.data.ocr);
            //         data = response;
            //     }
            // }
            callback(data);
            if (!/ALERT|ACTIONSHEET|REGISTERCALLBACK|SETRIGHTNAVBUTTON/i.test(callbackid)) {
                delete this.cache[callbackid];
            }
        }
    }
}

if (IS_CLIENT) {
    window.QCJSAPI = QCJSAPI;
}
export default qiancheng;
