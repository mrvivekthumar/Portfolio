import React from 'react'
import Card from '../ui/card'
import Image from 'next/image'
import signature from "@/public/assets/images/me/signature.png"
import Button from '../ui/button'
import { FaDownload } from 'react-icons/fa'
import Socials from '../ui/socials'

export default function ResumeCard() {
    return (
        <Card className='md:h-full 2xl:h-fit'>
            <p className='text-lg xl:text-2xl font-medium text-primary-foreground'>
                I am a third-year Information Technology student at Dharmsinh Desai University. I am passionate about learning new things and always eager to expand my knowledge. I am dedicated to growing my skills and exploring new opportunities in the field of IT
            </p>
            {/* signature */}
            <div>
                <Image src={signature} alt='signature of vivek' />
            </div>
            {/* Socials and Resume Button */}
            <div className='flex items-center justify-between md:absolute md:bottom-6 md:left-6 md:w-[calc(100%-48px)]'>
                <Socials />
                <Button >
                    <FaDownload />
                    Resume
                </Button>
            </div>
        </Card>
    )
}
