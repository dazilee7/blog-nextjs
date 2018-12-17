// This is the Link API
import React, {Component} from 'react';
import Link from 'next/link'
import Router from 'next/router'
import { Button } from 'antd-mobile';
import { inject, observer } from 'mobx-react'
import '../styles/index.less';
import Clock from '../components/Clock';

@inject('store') @observer
class Index extends Component {
    static propTypes = {};
    static async getInitialProps (ctx) {
        console.log(Object.keys(ctx))
        return {title: '首页？'}
    }

    constructor(props) {
        super(props);

        this.state = {
            seconds: '获取验证码',
            quickLogin: false
        };

        console.info('首页props', props)
    }

    componentDidMount () {
        console.log(this.props.store)
        this.props.store.start()
    }

    test = () => {
        // this.props.store.light = false;
        // console.log(test({dazi: new Date().getSeconds()}));
    }

    render() {
        const {lastUpdate, light} = this.props.store;
        return (
            <div>
                <Button type="primary" onClick={() => Router.push('/user')}>Go to About Page</Button>
                <p className="example" onClick={this.test}>Hello Next.js</p>
                <Clock lastUpdate={lastUpdate} light={light}/>
            </div>
        )
    }
}

export default Index