import { FC, useState } from "react";
import { motion } from "framer-motion"
import { scale, slide } from "./animation";

interface NavLinkProps {
    data: {
        title: string;
        href: string;
        index: number;
    };
    onClick: () => void;
}

const NavLink: FC<NavLinkProps> = ({ data, onClick }) => {
    const { title, href, index } = data;
    const [hover, setHover] = useState<boolean>(false);

    const handleClick = () => {
        onClick();
    };

    return (
        <motion.div
            className="relative flex items-center z-40 cursor-pointer touch-target"
            variants={slide}
            custom={index}
            initial="initial"
            animate="enter"
            exit="exit"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleClick}
        >
            {/* For bullets */}
            <motion.div
                variants={scale}
                animate={hover ? "open" : "closed"}
                className="w-2.5 h-2.5 bg-white rounded-full absolute -left-[30px]"
            ></motion.div>

            <span className="text-[6vw] sm:text-[4vw] lg:text-[6vw] uppercase leading-[96%] font-bold text-primary-foreground hover:text-blue-400 transition-colors duration-200">
                {title}
            </span>
        </motion.div>
    );
};

export default NavLink;