import Card from '../ui/card'
import { Timeline, TimelineItem } from '../ui/timeline'

export default function CertificationCard() {
    return (
        <Card title='My Certification'>
            <Timeline>
                {
                    certificationData.map((ex, i) => (
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

const certificationData = [
    {
        date: "2023",
        title: "Html & CSS",
        subTitle: "Tinder_Clone",
        link: "https://www.cert.devtown.in/verify/1BWwpv",
        tag: "Certification",
    },
]