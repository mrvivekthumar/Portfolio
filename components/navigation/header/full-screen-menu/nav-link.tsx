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

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('NavLink clicked:', title, href); // Debug log
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
            {/* Bullet indicator */}
            <motion.div
                variants={scale}
                animate={hover ? "open" : "closed"}
                className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-white rounded-full absolute -left-4 sm:-left-6 lg:-left-8"
            ></motion.div>

            {/* Navigation text with proper responsive sizing */}
            <span className="text-[12vw] sm:text-[8vw] md:text-[6vw] lg:text-[5vw] xl:text-[4vw] 2xl:text-[3.5vw] uppercase leading-[90%] font-bold text-primary-foreground hover:text-blue-400 transition-colors duration-200 select-none">
                {title}
            </span>
        </motion.div>
    );
};

export default NavLink;