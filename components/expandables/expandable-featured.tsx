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
        <div className='w-full'>
            {/* Mobile Layout: Stack vertically */}
            <div className='block md:hidden space-y-6'>
                {featureData.slice(1).map((featured, i) => (
                    <div
                        key={i}
                        className="w-full h-[350px] sm:h-[400px]"
                        onTouchStart={() => handleInteraction(i)}
                        onClick={() => handleInteraction(i)}
                    >
                        <FeaturedCard
                            active={i === hoveredIndex}
                            title={featured.title}
                            tag={featured.tag}
                            video={featured.video}
                        />
                    </div>
                ))}
            </div>

            {/* Desktop Layout: Flex row with hover expansion */}
            <div className='hidden md:flex justify-between gap-4'>
                {featureData.slice(1).map((featured, i) => (
                    <div
                        key={i}
                        className={cn(
                            "relative h-[500px] lg:h-[640px] transition-all origin-center duration-300 ease-in-out cursor-pointer",
                            // Desktop responsive width with hover expansion
                            i === hoveredIndex ? "w-[45%]" : "w-[27.5%]"
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
                    </div>
                ))}
            </div>
        </div>
    )
}