import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { TbBrandLeetcode } from "react-icons/tb";
import Button from "./button";

export default function Socials() {
    return (
        <div className="flex items-center flex-wrap gap-3">
            {
                socials.map((social, i) => (
                    <Button key={i} link={social.link} isIcon >
                        <span className="w-7 h-7 grid place-items-center text-primary-500">
                            {social.icon}
                        </span>
                    </Button>
                ))
            }
        </div>
    )
}

const socials = [
    {
        icon: <FaLinkedin className="w-7 h-7 text-[#0077b5]" />,
        link: "https://www.linkedin.com/in/mrvivekthumar/",
        username: "Vivek Thumar"
    },
    {
        icon: <FaGithub className="w-7 h-7 text-[#3bc098]" />,
        link: "https://github.com/mrvivekthumar",
        username: "Vivek Thumar"
    },
    {
        icon: <FaXTwitter className="w-7 h-7 text-[#1DA1F2]" />,
        link: "https://x.com/mrvivekthumar",
        username: "VIVEK THUMAR"
    },
    {
        icon: <TbBrandLeetcode className="w-7 h-7 text-[#FFA116]" />,
        link: "https://leetcode.com/u/mrvivekthumar/",
        username: "Vivek Thumar"
    }
]
