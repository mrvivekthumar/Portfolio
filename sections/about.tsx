import BackgroundCard from '@/components/cards/background'
import CertificationCard from '@/components/cards/certification'
import EducationCard from '@/components/cards/education'
import ExperienceCard from '@/components/cards/experinece'
import MeCard from '@/components/cards/me'
import ResumeCard from '@/components/cards/resume'
import StackCard from '@/components/cards/stack'
import Heading from '@/components/heading/heading'
import Card from '@/components/ui/card'
import Gallery from '@/components/ui/gallery'
import React from 'react'

export default function AboutSection() {
    return (
        <section id="about" className='pt-20 sm:pt-24 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-3 sm:px-6 lg:px-8'>
            <div className="mb-8 sm:mb-12 lg:mb-16">
                <Heading number='02' title_1='About' title_2='Me' />
            </div>
            <div className='space-y-6 sm:space-y-8 lg:space-y-12'>
                <div className='space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 2xl:grid-cols-3'>
                    {/* Me card */}
                    <MeCard />
                    <ResumeCard />
                    <BackgroundCard />
                    <div className='2xl:hidden'>
                        <Gallery />
                    </div>
                </div>
                <div className='space-y-4 md:grid md:grid-cols-2 md:gap-4 md:space-y-0 2xl:grid-cols-3'>
                    <div className='space-y-4'>
                        {/* <Card title='Instructor'>Instructor</Card> */}
                        <EducationCard />
                        <CertificationCard />
                        <Card title='My project'><p> Future Uploads </p></Card>
                    </div>
                    <div className='space-y-4'>
                        {/* Me card */}
                        <StackCard />
                        <ExperienceCard />
                    </div>
                    <div className='hidden 2xl:flex'>
                        <Gallery />
                    </div>
                </div>
            </div>
        </section>
    )
}
