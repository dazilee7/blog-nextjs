import { Toast } from 'antd-mobile';
import React, { Component } from 'react';
import { ssrFetch, history, to, login } from '../../utils';
import s from './User.less';

class User extends Component {
    static propTypes = {};
    static async getInitialProps (ctx) {
        const props = {title: '用户', data: {}};
        const [err, res] = await to(ssrFetch('/api/user/center').then(r => r.data));
        console.log(err, res);

        if (err || +res.code !== 0) {
            // Toast.fail((err && err.message) || res.message || '网络异常', 2);
            props.err = 1;
            return props;
        }

        props.data = res.data;
        return props;
    }
    constructor(props) {
        super(props);
        console.log('User props:', props);

        this.state = {
            list: props.data.list || [],
            user_info: props.data.user_info || {},
        };

    }
    componentDidMount() {}
    render() {
        console.log('render', this.state);
        const { list, user_info } = this.state;
        return (
            <div className={s.user}>
                <div className={s.header}>
                    <div className={s.user_info}>
                        <div className={s.portrait}>
                            <img src={user_info.user_photo} alt="" />
                        </div>
                        <div
                            className={`${user_info.user_phone ? s.user_phone : s.login_btn}`}
                            onClick={() => {
                                !user_info.user_phone && login();
                            }}
                        >
                            {user_info.user_phone || '立即登录'}
                        </div>
                    </div>
                    {/* H5 接口返回的内容和app内不一样 */}
                    <div className={s.user_order} onClick={() => history.push('/order')}>
                        <div className={s.status}>
                            <div className={s.item}>
                                <p className={s.num}>{0}</p>
                                <p>未完结</p>
                            </div>
                            <div className={s.item}>
                                <p className={s.num}>{0}</p>
                                <p>审核中</p>
                            </div>
                            <div className={s.item}>
                                <p className={s.num}>{0}</p>
                                <p>已审核</p>
                            </div>
                        </div>
                    </div>
                </div>
                {list.map((v, i) => (
                    <a href={v.url} className={s.row} key={i} style={{ marginTop: `${v.margin_top}px` }}>
                        <img className={s.icon} src={v.icon} alt="" />
                        <p className={s.title}>{v.title}</p>
                    </a>
                ))}
            </div>
        );
    }
}

export default User;
