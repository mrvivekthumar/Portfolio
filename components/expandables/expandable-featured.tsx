import { featureData } from '@/data'
import { cn } from '@/lib/utils'
import React, { useState, useEffect } from 'react'
import FeaturedCard from '../cards/featured/featured-card'

export default function ExpandableFeatured() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    // Detect mobile devices
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInteraction = (index: number) => {
        if (isMobile) {
            // On mobile, toggle the selection
            setHoveredIndex(hoveredIndex === index ? null : index);
        } else {
            // On desktop, just set hover
            setHoveredIndex(index);
        }
    }

    const handleMouseEnter = (index: number) => {
        if (!isMobile) {
            setHoveredIndex(index);
        }
    }

    const handleMouseLeave = () => {
        if (!isMobile) {
            setHoveredIndex(null);
        }
    }

    return (
        <div className='w-full grid grid-cols-1 gap-4 lg:flex lg:justify-between lg:gap-x-4'>
            {
                featureData.slice(1).map((featured, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative h-[400px] sm:h-[500px] lg:h-[640px] mb-8 lg:mb-16 transition-all origin-center duration-300 ease-in-out cursor-pointer",
                            // Mobile: full width, Desktop: responsive width
                            "w-full lg:w-1/3",
                            // Only apply hover effects on desktop
                            !isMobile && i === hoveredIndex ? "lg:w-[40%]" : "lg:w-[33%]"
                        )}
                        // Touch events for mobile
                        onTouchStart={() => handleInteraction(i)}
                        // Mouse events for desktop
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
                    </div>
                ))
            }
        </div>
    )
}