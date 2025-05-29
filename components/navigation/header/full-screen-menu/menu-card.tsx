import { HeadingAnimatedSvg } from '@/components/heading/heading-animated-svg'
import Image from 'next/image'
import React from 'react'
import { handleNavClick } from '@/utils/navigation'
// import Shade from "@/public/assets/images/background/card-shade.jpeg"

interface MenuCardProps {
    closeMenu: () => void;
}

export default function MenuCard({ closeMenu }: MenuCardProps) {
    const handleMenuClick = (link: string) => {
        handleNavClick(link, closeMenu);
    };

    return (
        <div className='w-full h-auto min-h-[427px] gap-[70px] bg-gradient-to-br from-[#1e36ea] to-[#4f46e5] rounded-[10px] flex-col justify-between items-start flex relative overflow-hidden pt-10 px-[25px] pb-5 shadow-2xl border border-white/10'>
            {/* Header */}
            <div className="w-full flex relative justify-between items-center">
                <div className='uppercase font-bold text-xl lg:text-2xl text-white'>
                    About Vivek
                </div>
                <HeadingAnimatedSvg animated text='FULL-STACK DEVELOPER & IT STUDENT' />
            </div>

            {/* Quick Info */}
            <div className='z-40 w-full flex flex-col gap-4 text-white/90'>
                <div className="text-sm leading-relaxed">
                    <p className="mb-3">
                        <strong>🎓 Education:</strong> B.Tech Information Technology at DDIT Nadiad
                    </p>
                    <p className="mb-3">
                        <strong>🏆 Achievement:</strong> 99.07 percentile in 10th standard
                    </p>
                    <p className="mb-3">
                        <strong>💻 Expertise:</strong> React, Next.js, Node.js, Full-Stack Development
                    </p>
                    <p className="mb-4">
                        <strong>🚀 Passion:</strong> Building innovative web solutions
                    </p>
                </div>

                {/* Quick Navigation */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                    {quickLinks.map((link, i) => (
                        <button
                            key={i}
                            onClick={() => handleMenuClick(link.href)}
                            className='bg-white/10 hover:bg-white/20 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm border border-white/20'
                        >
                            {link.icon} {link.title}
                        </button>
                    ))}
                </div>

                {/* Main CTA */}
                <div className="mt-6">
                    <button
                        onClick={() => handleMenuClick('#contact')}
                        className="w-full bg-white text-[#1e36ea] font-bold py-3 px-6 rounded-lg hover:bg-white/90 transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                        Let&apos;s Connect 🚀
                    </button>
                </div>
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 right-10 w-32 h-32 border border-white/20 rounded-full"></div>
                <div className="absolute bottom-20 left-10 w-20 h-20 border border-white/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full"></div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e36ea]/20 to-transparent pointer-events-none"></div>
        </div>
    )
}

const quickLinks = [
    {
        title: "Skills",
        href: "#about",
        icon: "⚡"
    },
    {
        title: "Projects",
        href: "#featured",
        icon: "🎨"
    },
    {
        title: "Experience",
        href: "#about",
        icon: "💼"
    },
    {
        title: "Education",
        href: "#about",
        icon: "🎓"
    }
];