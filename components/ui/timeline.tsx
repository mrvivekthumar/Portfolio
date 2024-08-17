import Link from "next/link";
import { FC, ReactNode } from "react";
import { FiArrowUp, FiArrowUpRight } from "react-icons/fi";

// For Time-Line
interface TimelineProps {
    children: ReactNode;
}

export const Timeline: FC<TimelineProps> = ({ children }) => {
    return (
        <div className="flex flex-col gap-y-6">
            {children}
        </div>
    )
}


// For Time-Line items 

interface TimelineItemProps {
    date: string;
    title: string;
    subTitle: string;
    link?: string;
    tag?: string;
    isCourse?: boolean;
}

export const TimelineItem: FC<TimelineItemProps> = ({ date, title, subTitle, link, tag, isCourse }) => {
    return (
        <div className="flex flex-wrap gap-12 min-h justify-start relative">
            {/* Date Timeline */}
            <div className="h-auto flex-none break-words whitespace-pre"
                style={{ width: `${isCourse ? "0" : ""}` }}
            >
                <p className="text-secondary-foreground">{date} </p>
            </div>
            {/* Right Side */}
            <div className=" flex gap-x-2"
                style={{ transform: `${isCourse ? "translateX(-45px)" : ""}` }}
            >
                <div className="flex flex-col gap-0.5">
                    {/* Title */}
                    <div className="text-primary-foreground break-words whitespace-pre ">
                        <p className="leading-6 font-medium text-sm">{title}</p>
                    </div>
                    {/* Subtitle */}
                    <div className="flex items-center gap-2 w-min">
                        {
                            link ?
                                <Link href={link} target="_blank">
                                    <Body link={link} tag={tag} subTitle={subTitle} />
                                </Link>
                                :
                                <Body tag={tag} subTitle={subTitle} />
                        }

                    </div>
                </div>
            </div>

        </div>
    )
}


interface BodyProps {
    subTitle: string;
    tag?: string;
    link?: string;
}

const Body: FC<BodyProps> = ({ subTitle, tag, link }) => {
    return (
        <div className="text-secondary-foreground items-center flex">
            <p className="text-sm font-normal leading-6 mt-1 ">{subTitle} </p>
            {link ? <FiArrowUpRight /> : null}
            {
                tag ? <div className="ms-2 rounded-[20px] bg-white/5 py-0.5 px-1.5 ">
                    <p className="text-[10px] font-normal text-secondary-foreground">{tag}</p>
                </div>
                    : null
            }
        </div>

    )
}