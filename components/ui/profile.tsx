import Image from 'next/image'
import IMG from "@/public/assets/images/me/IMG.jpg"
import React, { useState } from 'react'

export default function Profile() {
    const [imageError, setImageError] = useState(false);

    return (
        <div className='flex items-center gap-x-2 sm:gap-x-3 lg:gap-x-4 transition-colors duration-75 text-primary-foreground'>
            {/* Profile Photo */}
            <div className='relative w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-joust to-green-benzol p-[2px] hover:scale-105 transition-transform duration-300'>
                {!imageError ? (
                    <Image
                        src={IMG}
                        alt='Vivek Thumar - Full Stack Developer'
                        width={112}
                        height={112}
                        className='w-full h-full rounded-full object-cover border-2 border-blue-cosmos'
                        priority
                        onError={() => setImageError(true)}
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-2 border-blue-cosmos">
                        <span className="text-lg sm:text-xl lg:text-2xl font-bold">VT</span>
                    </div>
                )}

                {/* Online Status Indicator */}
                <div className='w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-green-benzol border-2 border-blue-cosmos absolute -right-1 bottom-1 sm:bottom-2 lg:bottom-3 animate-pulse'></div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-joust/20 to-green-benzol/20 opacity-0 hover:opacity-100 transition-opacity duration-300 -z-10 blur-xl"></div>
            </div>

            {/* Name and Title */}
            <div className='flex flex-col'>
                {/* Name */}
                <div className='text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold font-oswald tracking-wide'>
                    VIVEK THUMAR
                </div>

                {/* Title/Role - Hidden on very small screens */}
                <div className='hidden sm:block text-xs lg:text-sm xl:text-base text-secondary-foreground font-medium'>
                    Full-Stack Developer
                </div>

                {/* Status - Only visible on larger screens */}
                <div className='hidden lg:flex items-center gap-2 text-xs text-secondary-foreground mt-1'>
                    <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                    <span>Available for opportunities</span>
                </div>
            </div>
        </div>
    )
}