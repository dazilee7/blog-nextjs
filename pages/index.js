// This is the Link API
import React, {Component} from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd-mobile';
import '../styles/index.less';


class Index extends Component {
    static propTypes = {};
    static async getInitialProps (ctx) {
        console.log(ctx)
        return {title: '首页？'}
    }

    constructor(props) {
        super(props);

        this.state = {
            seconds: '获取验证码',
            quickLogin: false
        };

        console.info(1)
    }
    render() {
        return (
            <div>
                <Link href="/test">
                    <Button type="primary">Go to About Page</Button>
                </Link>
                <p className="example">Hello Next.js</p>
            </div>
        )
    }
}

export default Index