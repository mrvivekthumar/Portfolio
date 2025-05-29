import { motion } from "framer-motion";
import { menuSlide } from "./animation";
import Curve from "./curve";
import Profile from "@/components/ui/profile";
import NavLink from "./nav-link";
import MenuCard from "./menu-card";
import { handleNavClick } from "@/utils/navigation";
import { useEffect } from "react";

interface FullScreenMenuProps {
    closeMenu: () => void;
}

export default function FullScreenMenu({ closeMenu }: FullScreenMenuProps) {
    const handleMenuItemClick = (href: string) => {
        handleNavClick(href, closeMenu);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        // Close menu if clicking on the backdrop (not the content)
        if (e.target === e.currentTarget) {
            closeMenu();
        }
    };

    // Close menu with Escape key
    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => {
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [closeMenu]);

    return (
        <>
            {/* Background Overlay - Covers everything */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-30"
                onClick={handleBackdropClick}
            />

            {/* Main Menu Container */}
            <motion.div
                variants={menuSlide}
                initial="initial"
                animate="enter"
                exit="exit"
                className="fixed top-0 right-0 h-screen w-full bg-black text-primary-foreground z-40 font-oswald overflow-hidden"
                onClick={handleBackdropClick}
            >
                {/* Menu Content - Prevent click propagation */}
                <div
                    className="relative w-full h-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Profile Section */}
                    <div className="absolute top-8 left-[5%] z-50">
                        <Profile />
                    </div>

                    {/* Close Button - Always Visible (Top Right) */}
                    <div className="absolute top-6 right-6 z-50">
                        <button
                            onClick={closeMenu}
                            className="w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-all duration-200 touch-target group"
                            aria-label="Close menu"
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                className="group-hover:scale-110 transition-transform duration-200"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>

                    {/* ESC Key Hint */}
                    <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
                        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white/60 text-sm">
                            Press <kbd className="bg-white/20 px-2 py-1 rounded text-xs font-mono">ESC</kbd> to close
                        </div>
                    </div>

                    {/* Main Menu Content */}
                    <div className="absolute bottom-32 w-full px-4 lg:px-[5%]">
                        <div className="grid relative grid-cols-1 lg:grid-cols-[1fr_500px] gap-8">
                            {/* Navigation Links */}
                            <div className="flex flex-col justify-end space-y-2 lg:space-y-4">
                                {navItems.map((item, index) => (
                                    <NavLink
                                        key={index}
                                        data={{ ...item, index }}
                                        onClick={() => handleMenuItemClick(item.href)}
                                    />
                                ))}
                            </div>

                            {/* Menu Card - Hidden on mobile for better UX */}
                            <div className="hidden lg:block">
                                <MenuCard closeMenu={closeMenu} />
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="absolute bottom-4 left-4 right-4 lg:left-[5%] lg:right-[5%]">
                        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:justify-between text-white/80 text-xs sm:text-sm">
                            {/* Social Links */}
                            <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                                <a
                                    href="https://www.linkedin.com/in/mrvivekthumar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors touch-target"
                                >
                                    LINKEDIN
                                </a>
                                <a
                                    href="https://github.com/mrvivekthumar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-400 transition-colors touch-target"
                                >
                                    GITHUB
                                </a>
                                <a
                                    href="https://x.com/mrvivekthumar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-300 transition-colors touch-target"
                                >
                                    TWITTER
                                </a>
                            </div>

                            {/* Quick Navigation */}
                            <div className="flex flex-wrap items-center gap-3 lg:gap-4">
                                <button
                                    onClick={() => handleMenuItemClick('#about')}
                                    className="hover:text-purple-400 transition-colors touch-target"
                                >
                                    ABOUT
                                </button>
                                <button
                                    onClick={() => handleMenuItemClick('#contact')}
                                    className="hover:text-orange-400 transition-colors touch-target"
                                >
                                    CONTACT
                                </button>
                            </div>

                            {/* Copyright */}
                            <div className="text-white/60">
                                <span>© 2024 VIVEK THUMAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Click Outside Hint (Mobile) */}
                    <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 md:hidden">
                        <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white/60 text-xs text-center">
                            Tap outside to close
                        </div>
                    </div>

                    {/* Curve Effect */}
                    <Curve />
                </div>
            </motion.div>
        </>
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