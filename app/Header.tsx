import Link from 'next/link'

const Header = () => {
    return (
        <nav className='flex justify-between items-center m-5 p-4'>
            <div className="text-2xl font-medium font-PlayfairFrance mx-10"><span className="text-span">V</span>ivek <span className="text-span">T</span>humar</div>
            <div className='flex'>
                <Link href="/" className='m-2'>Home</Link>
                <Link href="/project" className='m-2'>Project</Link>
                <Link href="/skills" className='m-2'>Skills</Link>
                <Link href="/auth" className='m-2'>Login</Link>
            </div>
        </nav>
    )
}

export default Header