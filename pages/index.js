// This is the Link API
import Link from 'next/link'
import Router from 'next/router'


const Index = () => (
    <div>
        <Link href="/login">
            <a>Go to About Page</a>
        </Link>
        <p className="">Hello Next.js</p>
    </div>
)

export default Index