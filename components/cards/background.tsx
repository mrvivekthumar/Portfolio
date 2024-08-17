import React from 'react'
import Card from '../ui/card'

export default function BackgroundCard() {
    return (
        <Card className='md:h-full' title='My Background'>
            <div>
                <p className='leading-[160%] font-normal text-white/[0.4] text-[16px]'>
                    <span className='text-white underline'>My name is Vivek Thumar, and I was born in the small village of Makhiyala near Junagadh in Gujarat.</span>
                    <br />
                    From a young age, I've been known for my smiling face, something I consider a special gift. I love meeting different people and learning from their lives—it's a hobby that keeps me inspired.
                    <br /><br />
                    <span className='text-white underline'>In 10th standard, I realized the importance of taking my career seriously,</span> which led me to achieve a 99.07 percentile, followed by a 95 percentile in 12th standard, and a rank of 1867 across Gujarat.
                    <br /><br />
                    <span className='text-white underline'>Choosing Information Technology for my B.Tech at Dharmsinh Desai University was the right decision for me.</span> The dynamic nature of IT, where each challenge requires a new approach, excites me. Now in my third year, I'm thrilled to be part of this ever-evolving field and eager to connect with others who share my passion.
                </p>
            </div>
        </Card>
    )
}
