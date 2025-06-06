import FancyButton from '@/components/ui/fancy-button'
import Profile from '@/components/ui/profile'
import MagneticWrapper from '@/components/visualEffects/magnetic-wrapper'
import React, { useEffect, useState, useCallback } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import FullScreenMenu from './full-screen-menu/full-screen-menu'
import ToggleButton from './full-screen-menu/toggle-button'
import { AnimatePresence } from 'framer-motion'
import { handleNavClick } from '@/utils/navigation'

export default function Header() {
    const [open, setOpen] = useState<boolean>(false);
    const [showToggle, setShowToggle] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    // Close menu function
    const closeMenu = useCallback(() => {
        setOpen(false);
    }, []);

    // Toggle menu function
    const toggleMenu = useCallback(() => {
        setOpen(prev => !prev);
    }, []);

    useEffect(() => {
        // Check if device is mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        // Handle scroll for toggle button visibility
        const handleScroll = () => {
            const shouldShow = window.scrollY > 100;
            setShowToggle(shouldShow);
        };

        // Initial checks
        checkMobile();
        handleScroll();

        // Add event listeners
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', checkMobile, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (open) {
            // Prevent scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.width = '100%';
        } else {
            // Restore scrolling
            const scrollY = document.body.style.top;
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            if (scrollY) {
                window.scrollTo(0, parseInt(scrollY || '0') * -1);
            }
        }

        return () => {
            // Cleanup on unmount
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
        };
    }, [open]);

    // Close menu on escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                closeMenu();
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [open, closeMenu]);

    return (
        <>
            {/* Main Header */}
            <header className='w-full flex items-center justify-between relative z-30 py-4'>
                {/* Profile Section */}
                <div className="flex-shrink-0">
                    <Profile />
                </div>

                {/* Desktop Navigation & CTA */}
                <div className='hidden md:flex items-center gap-6'>
                    {/* Navigation Links */}
                    <nav className="hidden lg:flex items-center gap-8">
                        <button
                            onClick={() => handleNavClick('#featured')}
                            className="text-primary-foreground hover:text-blue-400 transition-colors duration-200 font-medium cursor-pointer touch-target"
                        >
                            Work
                        </button>
                        <button
                            onClick={() => handleNavClick('#about')}
                            className="text-primary-foreground hover:text-blue-400 transition-colors duration-200 font-medium cursor-pointer touch-target"
                        >
                            About
                        </button>
                        <button
                            onClick={() => handleNavClick('#contact')}
                            className="text-primary-foreground hover:text-blue-400 transition-colors duration-200 font-medium cursor-pointer touch-target"
                        >
                            Contact
                        </button>
                    </nav>

                    {/* CTA Button */}
                    <MagneticWrapper>
                        <FancyButton
                            text="Let's Talk"
                            icon={<FaArrowRight />}
                            onClick={() => handleNavClick('#contact')}
                        />
                    </MagneticWrapper>
                </div>

                {/* Mobile Menu Button - Always visible on mobile */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="w-12 h-12 rounded-full bg-primary-background border border-border flex items-center justify-center hover:bg-white/10 transition-colors duration-200 touch-target"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                    >
                        <div className="flex flex-col gap-1.5 w-6">
                            <div
                                className={`h-0.5 bg-white transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''
                                    }`}
                            />
                            <div
                                className={`h-0.5 bg-white transition-all duration-300 ${open ? 'opacity-0' : ''
                                    }`}
                            />
                            <div
                                className={`h-0.5 bg-white transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''
                                    }`}
                            />
                        </div>
                    </button>
                </div>
            </header>

            {/* Floating Toggle Button (shows on scroll or when menu is open) */}
            {showToggle && !isMobile && (
                <ToggleButton open={open} setOpen={setOpen} />
            )}

            {/* Full Screen Menu */}
            <AnimatePresence mode='wait'>
                {open && <FullScreenMenu closeMenu={closeMenu} />}
            </AnimatePresence>
        </>
    )
}