import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandLeetcode } from "react-icons/tb";


import Button from "./button";

export default function Socials() {
    return (
        <div className="flex items-center flex-wrap gap-3 ">
            {
                socials.map((social, i) => (
                    <Button key={i} link={social.link} isIcon >
                        <span className="w-7 h-7 grid place-items-center" >{social.icon}</span>
                    </Button>
                ))
            }
        </div>
    )
}










const socials = [
    {
        icon: <FaLinkedin className="w-4 h-4" />,
        link: "https://www.linkedin.com/in/mrvivekthumar/",
        username: "Vivek Thumar"
    },
    {
        icon: <FaGithub className="w-5 h-5 " />,
        link: "https://github.com/mrvivekthumar",
        username: "Vivek Thumar"
    },
    {
        icon: <FaXTwitter className="w-5 h-5 " />,
        link: "https://x.com/mrvivekthumar",
        username: "VIVEK THUMAR"
    },
    {
        icon: <TbBrandLeetcode className="w-5 h-5 " />,
        link: "https://leetcode.com/u/mrvivekthumar/",
        username: "Vivek Thumar"
    }
]