import Heading from '@/components/heading/heading'
import React from 'react'
import { featureData } from '@/data'
import FeaturedCard from '@/components/cards/featured/featured-card';
import ExpandableFeatured from '@/components/expandables/expandable-featured';

const MainFeatured = featureData[0];

export default function FeaturedSection() {
    return (
        <section id="featured" className='pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-3 sm:px-6 lg:px-8'>
            {/* Heading with better spacing */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
                <Heading number='01' title_1='Featured' title_2='Work' />
            </div>

            {/* Main featured Card */}
            <div className="mb-8 sm:mb-12 lg:mb-16">
                <FeaturedCard
                    active={true}
                    title={MainFeatured.title}
                    tag={MainFeatured.tag}
                    video={MainFeatured.video}
                />
            </div>

            {/* Expandable featured cards */}
            <ExpandableFeatured />
        </section>
    )
}