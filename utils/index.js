import createFetch from './createFetch';
import ssrFetch from './ssrFetch';
import to from './to';
import * as history from 'next/router';

function login() {
    history.push('/login');
}

export {
    history,
    createFetch,
    ssrFetch,
    to,
    login,
}