import Link from 'next/link';
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { VscGithubInverted } from "react-icons/vsc";

const Header = () => {
    return (
        <header>
            <nav className='flex justify-evenly items-center m-2 p-4'>
                <div className="text-3xl font-light font-OpenSans"><span className="text-span">V</span>ivek <span className="text-span">T</span>humar</div>
                <div className='flex gap-2'>
                    <Link href="/" className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'>Home</Link>
                    <Link href="/project" className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'>Project</Link>
                    <Link href="/skills" className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'>Skills</Link>
                    <Link href="/auth" className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'>Login</Link>
                </div>
                <div className='flex gap-2'>
                    <a href='https://github.com/mrvivekthumar' className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'><VscGithubInverted /></a>
                    <a href='https://www.linkedin.com/in/mrvivekthumar/' className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'><FaLinkedinIn /></a>
                    <a href='https://x.com/mrvivekthumar' className='m-2 p-2 text-white hover:text-navbarHover transition-all ease-in-out'><FaXTwitter />                    </a>

                </div>
            </nav>
        </header >
    )
}

export default Header