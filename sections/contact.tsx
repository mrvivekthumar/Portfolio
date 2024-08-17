import ContactCard from '@/components/cards/contact'
import Heading from '@/components/heading/heading'
import Button from '@/components/ui/button'
import Card from '@/components/ui/card'
import Input from '@/components/ui/input'
import TextArea from '@/components/ui/text-area'
import React from 'react'
import { FaPhoneVolume, FaProjectDiagram, FaUser } from 'react-icons/fa'
import { MdEmail, MdSubject } from 'react-icons/md'
import { SiMinutemailer } from 'react-icons/si'

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
                    <div className='lg:col-span-2 bg-secondary-background border border-border rounded-lg space-y-6 relative overflow-hidden py-5 px-[25px] shadow-md '>
                        <div className="flex flex-col lg:flex-row items-center justify-between mb-4 gap-8">
                            <Input type='text' placeholder='Full Name' icon={<FaUser />} />
                            <Input type='email' placeholder='Email Address' icon={<MdEmail />} />
                        </div>
                        <div className="flex items-center justify-between mb-4 gap-8">
                            <Input type='text' placeholder='Subject' icon={<MdSubject />} />
                        </div>
                        {/* Multiple select wrapper */}
                        <div className='flex flex-col gap-6 '>
                            <div>
                                <h1 className='font-bold text-lg '>What Services are you in need for ?</h1>
                                <div className='flex flex-wrap items-center justify-between mb-4 gap-8 '>
                                    {/* Services */}
                                </div>
                            </div>
                        </div>
                        {/* Multiple select wrapper */}
                        <div className='flex flex-col gap-6 '>
                            <div>
                                <h1 className='font-bold text-lg '>What is your budget ?</h1>
                                <div className='flex flex-wrap items-center justify-between mb-4 gap-8 '>
                                    {/* Services */}
                                </div>
                            </div>
                        </div>
                        {/* TextArea */}
                        <TextArea
                            placeholder='Tell use about your projects'
                            icon={<FaProjectDiagram />}
                        />

                        <div className='!w-full !flex !justify-end '>
                            <Button>Send <SiMinutemailer />  </Button>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
