import axios from 'axios';
// import queryString from 'query-string';
import {DEV_API, APP_INFO, IS_DEV, IS_CLIENT} from '../constants';


const ssrFetch = axios.create();

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
ssrFetch.defaults.withCredentials = true;
ssrFetch.defaults.baseURL = domain[process.env.NODE_ENV]; // eslint-disable-line

ssrFetch.interceptors.response.use(response => {
    const { code } = response.data;
    if (code === -2 || code === 1004) {
        login();
        // return;
    }
    response.json = () => response.data;

    return Promise.resolve(response);
});

export default ssrFetch;
