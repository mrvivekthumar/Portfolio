import Header from '@/components/navigation/header/header'
import FancyButton from '@/components/ui/fancy-button'
import LiveClock from '@/components/ui/live-clock'
import ScrollDown from '@/components/ui/scroll-down'
import MagneticWrapper from '@/components/visualEffects/magnetic-wrapper'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { handleNavClick } from '@/utils/navigation'

export default function LandingSection() {
    return (
        <section id="home" className='relative min-h-screen w-full overflow-hidden'>
            {/* Background gradient for better visual appeal */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-50 z-0" />

            {/* Main content container with proper padding */}
            <div className="relative z-10 min-h-screen flex flex-col p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <Header />

                {/* Main content area - using flexbox for better control */}
                <div className="flex-1 flex flex-col justify-center items-center relative">

                    {/* Hero Content */}
                    <div className="text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Main Headline */}
                        <div className="space-y-2 sm:space-y-4 lg:space-y-6">
                            <h1 className="font-bold text-primary-foreground leading-none tracking-tight">
                                {/* Mobile: 12vw, Tablet: 10vw, Desktop: fixed sizes */}
                                <div className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7rem] xl:text-[8rem] 2xl:text-[9rem]">
                                    <div className="block">BUILDING</div>
                                    <div className="block">TOMORROW'S</div>
                                    <div className="block relative">
                                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                            SOLUTIONS
                                        </span>
                                    </div>
                                </div>
                            </h1>

                            {/* Subtitle */}
                            <div className="mt-6 sm:mt-8 lg:mt-12 max-w-4xl mx-auto">
                                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-secondary-foreground leading-relaxed font-normal px-4">
                                    Full-Stack Developer & Information Technology Student at DDIT Nadiad
                                    <br className="hidden sm:block" />
                                    <span className="block mt-2 sm:mt-1">
                                        Crafting innovative web solutions with modern technologies
                                    </span>
                                </p>
                            </div>

                            {/* Call to Action - Mobile visible button */}
                            <div className="mt-8 sm:mt-12 lg:hidden">
                                <MagneticWrapper>
                                    <FancyButton
                                        text="Let's Connect"
                                        icon={<FaArrowRight />}
                                        onClick={() => handleNavClick('#contact')}
                                    />
                                </MagneticWrapper>
                            </div>
                        </div>
                    </div>

                    {/* Scroll Down Indicator */}
                    <div className="absolute bottom-8 sm:bottom-12 lg:bottom-16 left-1/2 transform -translate-x-1/2">
                        <MagneticWrapper>
                            <ScrollDown />
                        </MagneticWrapper>
                    </div>
                </div>

                {/* Bottom positioned elements */}
                <div className="relative">
                    {/* Desktop Call to Action Button - Hidden on mobile, shown in header on desktop */}
                    <div className="hidden lg:block absolute bottom-8 left-8 z-20">
                        <MagneticWrapper>
                            <FancyButton
                                text="Let's Collaborate"
                                icon={<FaArrowRight />}
                                onClick={() => handleNavClick('#contact')}
                            />
                        </MagneticWrapper>
                    </div>

                    {/* Live Clock - Responsive positioning */}
                    <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8">
                        <div className="text-right">
                            <LiveClock timeZone='Asia/Kolkata' />
                            <p className="text-xs sm:text-sm text-secondary-foreground mt-1 font-pixel">
                                LOCAL TIME
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}