
import { Button } from 'antd-mobile';
import Link from 'next/link'
import {Component} from "react";

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
                <Link href="/login">
                    <Button type="primary">Go to Index Page</Button>
                </Link>
                <p className="example">Hello Next.js</p>
            </div>
        )
    }
}

export default Index


