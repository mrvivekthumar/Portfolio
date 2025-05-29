import React from 'react'
import Card from '../ui/card'

export default function BackgroundCard() {
    return (
        <Card className='md:h-full' title='My Background'>
            <div>
                <p className='leading-[160%] font-normal text-white/[0.4] text-[16px]'>
                    I'm Vivek Thumar, Born and raised in Junagadh, Gujarat.<br></br>
                    <span className='text-white underline'> I discovered my passion for technology during my academic journey.</span>
                    <br />
                    <br />
                    <span className='text-white underline'> I love meeting different Tech people and learning from their Experiences.</span>
                    <br /><br />
                    The rapidly evolving nature of technology excites me most about this field.<br></br><br></br>
                    <span className='text-white underline'> Every project is an opportunity to learn new frameworks, implement better architectures, and solve complex problems with elegant solutions..</span>
                </p>
            </div>
        </Card>
    )
}
