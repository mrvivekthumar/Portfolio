import React from 'react'
import Card from '../ui/card'
import { Timeline, TimelineItem } from '../ui/timeline'

export default function ExperienceCard() {
    return (
        <Card title='My Experience'>
            <Timeline>
                {
                    experienceData.map((ex, i) => (
                        <TimelineItem
                            key={i}
                            date={ex.date}
                            subTitle={ex.subTitle}
                            title={ex.title}
                            link={ex.link}
                            tag={ex.tag}
                        />
                    ))
                }
            </Timeline>
        </Card>
    )
}

const experienceData = [
    {
        date: "2025 - Present",
        title: "Full-Stack Developer",
        subTitle: "Personal_Projects & Open_Source",
        link: "https://github.com/mrvivekthumar",
        tag: "Experience",
    },
    {
        date: "2022 - Present",
        title: "Computer Science Student",
        subTitle: "DDIT_Nadiad - Information Technology",
        link: "",
        tag: "Education",
    },
]