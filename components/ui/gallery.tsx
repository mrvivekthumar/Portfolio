'use client'
import { galleryImages } from '@/data'
import Image from 'next/image'
import React, { useState } from 'react'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import "swiper/css"
import "swiper/css/pagination"

export default function Gallery() {
    const [imageErrors, setImageErrors] = useState<{ [key: number]: boolean }>({});

    const handleImageError = (imageId: number) => {
        setImageErrors(prev => ({ ...prev, [imageId]: true }));
    };

    return (
        <div className='h-[400px] sm:h-[500px] md:h-[600px] lg:h-full 2xl:h-[750px] w-full'>
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                }}
                loop={true}
                className='mySwiper rounded-2xl'
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    },
                    1024: {
                        slidesPerView: 1,
                    },
                }}
            >
                {galleryImages.map((img) => (
                    <SwiperSlide key={img.id}>
                        <div className="relative w-full h-full overflow-hidden rounded-2xl">
                            {!imageErrors[img.id] ? (
                                <Image
                                    src={img.img}
                                    alt={img.alt || `Gallery image ${img.id + 1}`}
                                    fill
                                    className='object-cover object-center'
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    priority={img.id === 0} // Load first image with priority
                                    onError={() => handleImageError(img.id)}
                                    placeholder="blur"
                                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                />
                            ) : (
                                // Fallback content when image fails to load
                                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <div className="text-6xl mb-4">📸</div>
                                        <p className="text-lg font-medium">Image Loading...</p>
                                        <p className="text-sm opacity-75">Gallery Item {img.id + 1}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}