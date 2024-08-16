import Heading from '@/components/heading/heading'
import React from 'react'

import { featureData } from '@/data'
import FeaturedCard from '@/components/cards/featured/featured-card';

const MainFeatured = featureData[0];

export default function FeaturedSection() {
    return (
        <div className='pt-24 px-3 lg:px-8'>
            {/* Heading */}
            <Heading number='01' title_1='Featured' title_2='Work' />
            {/* Main featured Card */}
            <FeaturedCard
                active
                title={MainFeatured.title}
                tag={MainFeatured.tag}
                video={MainFeatured.video}
            />
        </div>
    )
}
