// sections/featured.tsx - Mobile optimized version
import Heading from '@/components/heading/heading'
import React from 'react'
import { featureData } from '@/data'
import FeaturedCard from '@/components/cards/featured/featured-card';
import ExpandableFeatured from '@/components/expandables/expandable-featured';

const MainFeatured = featureData[0];

export default function FeaturedSection() {
    return (
        <section id="featured" className='pt-16 sm:pt-20 md:pt-24 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-28 px-3 sm:px-6 lg:px-8'>
            {/* Heading with mobile-optimized spacing */}
            <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                <Heading number='01' title_1='Featured' title_2='Work' />
            </div>

            {/* Main featured Card - Mobile optimized height */}
            <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                <div className="h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px]">
                    <FeaturedCard
                        active={true}
                        title={MainFeatured.title}
                        tag={MainFeatured.tag}
                        video={MainFeatured.video}
                    />
                </div>
            </div>

            {/* Expandable featured cards */}
            <ExpandableFeatured />
        </section>
    )
}