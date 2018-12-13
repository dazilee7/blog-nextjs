// This is the Link API
import React, {Component} from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd-mobile';


class Index extends Component {
    static propTypes = {};

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
                <Link href="/test/child">
                    <Button type="primary">Test Page</Button>
                </Link>
                <p className="example">Hello Next.js</p>
            </div>
        )
    }
}

export default Index