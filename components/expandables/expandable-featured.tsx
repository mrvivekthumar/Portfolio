// components/expandables/expandable-featured.tsx - Mobile optimized
import { featureData } from '@/data'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import FeaturedCard from '../cards/featured/featured-card'

export default function ExpandableFeatured() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);

    // Detect device types
    useEffect(() => {
        const checkDevice = () => {
            const width = window.innerWidth;
            setIsMobile(width < 768);
            setIsTablet(width >= 768 && width < 1024);
        };

        checkDevice();
        window.addEventListener('resize', checkDevice);

        return () => window.removeEventListener('resize', checkDevice);
    }, []);

    const handleInteraction = (index: number) => {
        if (isMobile || isTablet) {
            // On mobile/tablet, toggle the selection
            setHoveredIndex(hoveredIndex === index ? null : index);
        } else {
            // On desktop, just set hover
            setHoveredIndex(index);
        }
    }

    const handleMouseEnter = (index: number) => {
        if (!isMobile && !isTablet) {
            setHoveredIndex(index);
        }
    }

    const handleMouseLeave = () => {
        if (!isMobile && !isTablet) {
            setHoveredIndex(null);
        }
    }

    // Auto-close expanded card on mobile after 3 seconds
    useEffect(() => {
        if ((isMobile || isTablet) && hoveredIndex !== null) {
            const timer = setTimeout(() => {
                setHoveredIndex(null);
            }, 4000);

            return () => clearTimeout(timer);
        }
    }, [hoveredIndex, isMobile, isTablet]);

    return (
        <div className='w-full'>
            {/* Mobile Layout: Optimized vertical stack */}
            <div className='block md:hidden space-y-4'>
                {featureData.slice(1).map((featured, i) => (
                    <div
                        key={i}
                        className={cn(
                            "w-full transition-all duration-300 ease-out relative",
                            // Mobile responsive heights with better touch targets
                            hoveredIndex === i
                                ? "h-[280px] xs:h-[320px] sm:h-[380px]"
                                : "h-[200px] xs:h-[220px] sm:h-[250px]"
                        )}
                        onTouchStart={() => handleInteraction(i)}
                        onClick={() => handleInteraction(i)}
                    >
                        <FeaturedCard
                            active={i === hoveredIndex}
                            title={featured.title}
                            tag={featured.tag}
                            video={featured.video}
                        />

                        {/* Touch indicator for mobile */}
                        {hoveredIndex !== i && (
                            <div className="absolute inset-0 bg-black/40 rounded-2xl sm:rounded-3xl flex items-center justify-center backdrop-blur-[1px] transition-all duration-200">
                                <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                                    <p className="text-white text-sm font-medium">Tap to preview</p>
                                </div>
                            </div>
                        )}

                        {/* Active indicator */}
                        {hoveredIndex === i && (
                            <div className="absolute top-3 right-3 bg-green-500 w-3 h-3 rounded-full animate-pulse shadow-lg"></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Tablet Layout: 2 columns */}
            <div className='hidden md:grid lg:hidden grid-cols-2 gap-4'>
                {featureData.slice(1).map((featured, i) => (
                    <div
                        key={i}
                        className={cn(
                            "h-[350px] transition-all duration-300 ease-out cursor-pointer",
                            hoveredIndex === i && "scale-[1.02] z-10"
                        )}
                        onTouchStart={() => handleInteraction(i)}
                        onClick={() => handleInteraction(i)}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FeaturedCard
                            active={i === hoveredIndex}
                            title={featured.title}
                            tag={featured.tag}
                            video={featured.video}
                        />

                        {/* Tablet touch overlay */}
                        {hoveredIndex !== i && (
                            <div className="absolute inset-0 bg-black/30 rounded-2xl sm:rounded-3xl flex items-center justify-center transition-all duration-200">
                                <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/30">
                                    <p className="text-white text-xs font-medium">Tap to view</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Desktop Layout: Flex row with hover expansion */}
            <div className='hidden lg:flex justify-between gap-4'>
                {featureData.slice(1).map((featured, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative h-[500px] xl:h-[600px] 2xl:h-[640px] transition-all origin-center duration-500 ease-out cursor-pointer",
                            // Desktop responsive width with smooth hover expansion
                            hoveredIndex === i
                                ? "w-[50%] xl:w-[45%]"
                                : "w-[25%] xl:w-[27.5%]",
                            // Add subtle transform on hover
                            hoveredIndex === i && "scale-[1.01] z-10 shadow-2xl"
                        )}
                        onMouseEnter={() => handleMouseEnter(i)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleInteraction(i)}
                    >
                        <FeaturedCard
                            active={i === hoveredIndex}
                            title={featured.title}
                            tag={featured.tag}
                            video={featured.video}
                        />

                        {/* Hover indicator for desktop */}
                        {hoveredIndex !== i && (
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl sm:rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                                <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-2 border border-white/30">
                                    <p className="text-white text-sm font-medium">Hover to preview</p>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Mobile instruction text */}
            <div className="block md:hidden mt-4 text-center">
                <p className="text-secondary-foreground text-sm">
                    {hoveredIndex !== null ? "Tap again to close preview" : "Tap any project to see preview"}
                </p>
            </div>
        </div>
    )
}