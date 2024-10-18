'use client'
import { galleryImages } from '@/data'
import Image from 'next/image'
import React from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import "swiper/css"
import "swiper/css/pagination"

export default function Gallery() {
    console.log(` Gallery Image :  ${galleryImages} `)
    return (

        <div className='h-[550px] sm:h-[650px] md:h-full 2xl:h-[750px] w-full'>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                className='mySwiper rounded-2xl'
            >
                {
                    galleryImages.map((img) => (
                        <SwiperSlide key={img.id}>
                            <Image
                                src={img.img}
                                alt='gallerey images of mine'
                                className='object-cover w-full h-full object-left-top'
                                width={img.width}
                                height={img.height}
                            />
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div >
    )
}
