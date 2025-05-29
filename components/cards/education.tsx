import React from 'react'
import Card from '../ui/card'
import { Timeline, TimelineItem } from '../ui/timeline'

export default function EducationCard() {
    return (
        <Card title='My Education'>
            <Timeline>
                {
                    educationData.map((ex, i) => (
                        <TimelineItem
                            key={i}
                            date={ex.date}
                            subTitle={ex.subTitle}
                            title={ex.title}
                            tag={ex.tag}
                        />
                    ))
                }
            </Timeline>
        </Card>
    )
}



const educationData = [
    {
        date: "2022 - 2026",
        title: "B.Tech in Information Technology",
        subTitle: "DDIT_Nadiad",
        tag: "Education",
    },
    {
        date: "2020 - 2022",
        title: "11th & 12th (95.83 PR)",
        subTitle: "Bliss_science_academy",
        tag: "Education",
    },
    {
        date: "2019 - 2020",
        title: "10th (99.07 PR)",
        subTitle: "Nobel_high_school",
        tag: "Education",
    },
]