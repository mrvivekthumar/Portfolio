import { motion } from "framer-motion";
import { menuSlide } from "./animation";
import Curve from "./curve";
import Profile from "@/components/ui/profile";
import NavLink from "./nav-link";
import MenuCard from "./menu-card";
import { handleNavClick } from "@/utils/navigation";

interface FullScreenMenuProps {
    closeMenu: () => void;
}

export default function FullScreenMenu({ closeMenu }: FullScreenMenuProps) {
    const handleMenuItemClick = (href: string) => {
        handleNavClick(href, closeMenu);
    };

    return (
        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className="h-screen w-full bg-black fixed top-0 right-0 text-primary-foreground z-40 font-oswald"
        >
            <div className="relative w-full pl-[5%]">
                {/*Profile*/}
                <div className="absolute top-8">
                    <Profile />
                </div>
            </div>

            {/*Menu and card*/}
            <div className="absolute bottom-32 w-full lg:px-[5%]">
                <div className="grid relative grid-cols-1 lg:grid-cols-[1fr_500px] gap-8">
                    <div className="pl-4 flex flex-col justify-end">
                        {navItems.map((item, index) => (
                            <NavLink
                                key={index}
                                data={{ ...item, index }}
                                onClick={() => handleMenuItemClick(item.href)}
                            />
                        ))}
                    </div>
                    {/*Menu about card - Hidden on mobile */}
                    <div className="hidden lg:block">
                        <MenuCard closeMenu={closeMenu} />
                    </div>
                </div>
            </div>

            {/*Footer links*/}
            <div className="w-[95%] pl-[5%] absolute bottom-8">
                <div className="flex flex-col gap-4 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between uppercase text-white text-sm">
                    {/*----Left--------------*/}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => handleMenuItemClick('#about')}
                            className="hover:text-blue-400 transition-colors"
                        >
                            ABOUT
                        </button>
                        <button
                            onClick={() => handleMenuItemClick('#contact')}
                            className="hover:text-blue-400 transition-colors"
                        >
                            CONTACT
                        </button>
                    </div>
                    {/*----Middle--------------*/}
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.linkedin.com/in/mrvivekthumar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            LINKEDIN
                        </a>
                        <a
                            href="https://github.com/mrvivekthumar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            GITHUB
                        </a>
                        <a
                            href="https://x.com/mrvivekthumar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transition-colors"
                        >
                            TWITTER
                        </a>
                    </div>
                    {/*----Right--------------*/}
                    <div className="flex items-center gap-4">
                        <span>©2024 VIVEK THUMAR</span>
                    </div>
                </div>
            </div>

            {/*Curve svg effect*/}
            <Curve />
        </motion.div>
    );
}

const navItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Featured",
        href: "#featured",
    },
    {
        title: "About",
        href: "#about",
    },
    {
        title: "Contact",
        href: "#contact",
    },
];