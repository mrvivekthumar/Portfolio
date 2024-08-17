import ContactCard from '@/components/cards/contact'
import Heading from '@/components/heading/heading'
import Card from '@/components/ui/card'
import React from 'react'
import { FaPhoneVolume } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

export default function ContactSection() {
    return (
        <div className='pt-24 px-3 lg:px-8'>
            <Heading number='03' title_1='Contact' title_2='Me' />
            <Card>
                <div className='grid gap-8 grid-cols-1 lg:grid-cols-3'>
                    {/* Contact cards */}
                    <div className='flex flex-col gap-8 ' >
                        <ContactCard
                            title="Call us directly at"
                            icon={<FaPhoneVolume className='fill-[#333] text-lg ' />}
                            text="123 - 456 - 789."
                            btnText="Call us"

                        />
                        <ContactCard
                            title="Chat with us"
                            icon={<MdEmail className='fill-[#333] text-lg ' />}
                            text="Test@gmail.com"
                            btnText="Email us"

                        />
                    </div>
                    {/* Contact Form */}
                    
                </div>
            </Card>
        </div>
    )
}
