import { motion } from "framer-motion";
import { menuSlide } from "./animation";
import Curve from "./curve";
import Profile from "@/components/ui/profile";
import NavLink from "./nav-link";
import MenuCard from "./menu-card";
import { useEffect } from "react";

interface FullScreenMenuProps {
    closeMenu: () => void;
}

export default function FullScreenMenu({ closeMenu }: FullScreenMenuProps) {

    // Enhanced navigation function
    const handleNavigation = (href: string) => {
        console.log('Navigating to:', href); // Debug log

        // Close menu first
        closeMenu();

        // Wait for menu close animation, then scroll
        setTimeout(() => {
            if (href === "/" || href === "#home") {
                // Scroll to top for home
                console.log('Scrolling to top');
                window.scrollTo({ top: 0, behavior: 'smooth' });

                // Fallback for browsers that don't support smooth behavior
                if (window.scrollY > 0) {
                    window.scrollTo(0, 0);
                }
            } else if (href.startsWith('#')) {
                // Find and scroll to section
                const elementId = href.replace('#', '');
                const element = document.getElementById(elementId);

                console.log('Found element:', element); // Debug log

                if (element) {
                    // Multiple scroll methods for better compatibility
                    try {
                        // Method 1: scrollIntoView (most reliable)
                        element.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start',
                            inline: 'nearest'
                        });

                        console.log('Scrolled using scrollIntoView');
                    } catch (error) {
                        // Method 2: Manual calculation fallback
                        console.log('Fallback to manual scroll');
                        const headerOffset = 80;
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });

                        // Method 3: Instant scroll if smooth doesn't work
                        setTimeout(() => {
                            window.scrollTo(0, offsetPosition);
                        }, 100);
                    }
                } else {
                    console.log('Element not found:', elementId); // Debug log
                }
            }
        }, 400); // Wait for menu close animation
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
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
            {/* Background Overlay */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40"
                onClick={handleBackdropClick}
            />

            {/* Main Menu Container */}
            <motion.div
                variants={menuSlide}
                initial="initial"
                animate="enter"
                exit="exit"
                className="fixed top-0 right-0 h-screen w-full bg-black text-primary-foreground z-50 font-oswald overflow-hidden"
                onClick={handleBackdropClick}
            >
                {/* Menu Content */}
                <div
                    className="relative w-full h-full flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header Section */}
                    <div className="relative flex-shrink-0 p-4 sm:p-6 lg:p-8">
                        {/* Profile Section */}
                        <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-[5%]">
                            <Profile />
                        </div>

                        {/* Close Button */}
                        <div className="absolute top-4 sm:top-6 lg:top-8 right-4 sm:right-6 lg:right-8">
                            <button
                                onClick={closeMenu}
                                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/30 flex items-center justify-center text-white transition-all duration-200 touch-target group"
                                aria-label="Close menu"
                            >
                                <svg
                                    width="20"
                                    height="20"
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

                        {/* ESC Key Hint - Desktop only */}
                        <div className="hidden lg:block absolute top-6 left-1/2 transform -translate-x-1/2">
                            <div className="bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-white/60 text-sm">
                                Press <kbd className="bg-white/20 px-2 py-1 rounded text-xs font-mono">ESC</kbd> to close
                            </div>
                        </div>
                    </div>

                    {/* Main Navigation - Centered */}
                    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                        <div className="w-full max-w-4xl">
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12 items-center">
                                {/* Navigation Links */}
                                <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8">
                                    {navItems.map((item, index) => (
                                        <NavLink
                                            key={index}
                                            data={{ ...item, index }}
                                            onClick={() => handleNavigation(item.href)}
                                        />
                                    ))}
                                </div>

                                {/* Menu Card - Hidden on mobile, visible on desktop */}
                                <div className="hidden lg:block">
                                    <MenuCard closeMenu={closeMenu} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Links */}
                    <div className="flex-shrink-0 p-4 sm:p-6 lg:p-8">
                        <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:items-center lg:justify-between text-white/80">
                            {/* Social Links */}
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6">
                                <a
                                    href="https://www.linkedin.com/in/mrvivekthumar/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-400 transition-colors touch-target text-sm sm:text-base"
                                >
                                    LINKEDIN
                                </a>
                                <a
                                    href="https://github.com/mrvivekthumar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-green-400 transition-colors touch-target text-sm sm:text-base"
                                >
                                    GITHUB
                                </a>
                                <a
                                    href="https://x.com/mrvivekthumar"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-blue-300 transition-colors touch-target text-sm sm:text-base"
                                >
                                    TWITTER
                                </a>
                            </div>

                            {/* Copyright */}
                            <div className="text-white/60 text-center lg:text-right text-xs sm:text-sm">
                                <span>© 2024 VIVEK THUMAR</span>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Tap Hint */}
                    <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 lg:hidden">
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
        href: "#home",
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