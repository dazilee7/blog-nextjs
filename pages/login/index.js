import { InputItem, Toast } from 'antd-mobile';
import React, { Component } from 'react';
import Head from 'next/head';
// import { qc, createFetch, goBack, history, request, to } from 'utils';
import './Login.less';
const logoZj = '../../static/img/logo.png';
const logoBhh = '../../static/img/bhh.png';

class Index extends Component {
    static propTypes = {};
    constructor (props) {
        super(props);

        this.state = {
            seconds: '获取验证码',
            quickLogin: false
        };

        console.info(1)
    }
    componentDidMount() {
        console.info(2)
    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    async getCode() {
        const { counting, phone } = this.state;
        if (counting) return;
        if (!phone) {
            Toast.info('请输入手机号', 2);
            return;
        }
        this.setState({ counting: true });

        Toast.loading('', 0);
        const [err, res] = await to(
            request
                .post('/api/login/creditCheckCaptchaSendMessage', {
                    phone,
                })
                .then(r => r.data),
        );
        Toast.hide();
        if (err || +res.code !== 0) {
            Toast.fail((err && err.message) || res.message || '发送失败', 2, () => this.setState({ counting: false }));
            return;
        }

        Toast.info('验证码发送成功', 3);
        this.countTimer();
    }
    countTimer() {
        clearInterval(this.timer);
        let seconds = 120;
        this.timer = setInterval(() => {
            if (seconds === 1) {
                seconds = '重新发送';
                this.setState({ counting: false });
                clearInterval(this.timer);
            } else {
                seconds--;
            }
            this.setState({ seconds });
        }, 1000);
    }
    async login() {
        const { lock, quickLogin, phone, code, password } = this.state;
        if (lock) return;

        if (!phone) {
            Toast.info('请输入手机号', 2);
            return;
        }
        if (quickLogin && !code) {
            Toast.info('请输入验证码', 2);
            return;
        }

        if (!quickLogin && !password) {
            Toast.info('请输入密码', 2);
            return;
        }

        Toast.loading('', 0);
        const [err, res] = await to(
            request.post('/api/login/creditLoginNew', { phone, message_code: code, password, type: +!quickLogin }).then(r => r.data),
        );

        Toast.hide();
        if (err || +res.code !== 0) {
            Toast.fail((err && err.message) || res.message || '登录失败', 2);
            return;
        }

        Toast.info('登录成功', 3, () => history.replace('/user'));
    }
    render() {
        const { quickLogin, phone, password, code, counting, lock, seconds } = this.state;
        return (
            <div className={`login`}>
                <Head>
                    <title>登录</title>
                </Head>
                <div className={`logo`}>
                    <img src={logoZj} alt="" />
                </div>
                <div className={`form`}>
                    <div className={`input_item`}>
                        <InputItem
                            type="number"
                            value={phone}
                            placeholder="请输入手机号"
                            maxLength={11}
                            onChange={e => this.setState({ phone: e })}
                        />
                    </div>
                    {!quickLogin ? (
                        <div className={`input_item`}>
                            <InputItem
                                type="password"
                                placeholder="请输入密码"
                                value={password}
                                maxLength={22}
                                onChange={e => this.setState({ password: e })}
                            />
                        </div>
                    ) : (
                        <div className={`input_item`}>
                            <div className={s.code}>
                                <InputItem
                                    type="number"
                                    placeholder="请输入验证码"
                                    value={code}
                                    maxLength={6}
                                    onChange={e => this.setState({ code: e })}
                                />
                            </div>
                            <div
                                className={`code_btn ${counting ? 'counting' : ''}`}
                                onClick={() => this.getCode()}
                            >
                                {seconds}
                            </div>
                        </div>
                    )}
                </div>
                <div className={`button`} onClick={() => this.login()}>
                    登录
                </div>
                <div className={`login_type`}>
                    <span onClick={() => this.setState({ quickLogin: !quickLogin })}>
                        {!quickLogin ? '手机号快捷登录' : '账户密码登录'}
                    </span>
                </div>
            </div>
        );
    }
}

export default Index;
