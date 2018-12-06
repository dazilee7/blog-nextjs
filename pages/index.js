// This is the Link API
import Link from 'next/link'
import Router from 'next/router'
import "../styles/index.less"

const Index = () => (
    <div>
        <p onClick={() => Router.push('/login')}>Go to About Page</p>
        <p className="">Hello Next.js</p>
    </div>
)

export default Index