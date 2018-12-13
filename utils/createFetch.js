import axios from 'axios';
// import queryString from 'query-string';
import qc from './qiancheng';
import {DEV_API, APP_INFO, IS_DEV, IS_CLIENT} from '../constants';


const createFetch = axios.create();
console.log('IS_CLIENT=>', IS_CLIENT);

let hostname;
if (IS_CLIENT) {
    hostname = IS_CLIENT && window.location.hostname;
}

// test-gate.cui51.cn    test-api.imcjbt.com
const domain = {
    development: DEV_API,
    test: hostname === 'test-h5.cui51.cn' ? `http://test-gate.cui51.cn/` : 'http://test-api.imcjbt.com/',
    pro: hostname === 'h5.cui51.cn' ? `https://gate.cui51.cn/` : 'https://api.imcjbt.com/',
};
createFetch.defaults.withCredentials = true;
createFetch.defaults.baseURL = domain[process.env.NODE_ENV]; // eslint-disable-line

createFetch.interceptors.request.use(async config => {
    const options = { ...config };
    await qc
        .track('getSessionID')
        .then(response => {
            const { sessionid } = response.data;
            if (sessionid) {
                // document.cookie = `SESSIONID=;path=/;domain=.xianjincard.com;`
                // document.cookie = `SESSIONID=${sessionid};path=/;domain=.xianjincard.com;`
                options.headers.common.Token = sessionid;
            }
        })
        .catch(() => {});
    // if (options.method && config.method.toUpperCase() === 'POST') {
    //     options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    //     options.data = queryString.stringify(config.data);
    // }
    IS_DEV && (options.headers.common.appInfo = APP_INFO);
    return options;
});

createFetch.interceptors.response.use(response => {
    const { code } = response.data;
    if (code === -2 || code === 1004) {
        login();
        // return;
    }
    response.json = () => response.data;

    return Promise.resolve(response);
});

export default createFetch;
