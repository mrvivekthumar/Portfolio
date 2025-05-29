import { FC, ReactNode } from "react";
import Header from "./header";
import Video from "./video";

interface FeaturedCardProps {
    logo?: ReactNode;
    title: string;
    tag: string;
    video: string;
    active: boolean;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ logo, title, tag, video, active }) => {
    return (
        <div className="link w-full h-full bg-secondary-background border border-border shadow-lg rounded-2xl sm:rounded-3xl cursor-pointer flex flex-col gap-2 flex-nowrap p-2 hover:border-border/70 transition-colors duration-300">
            {/* Header */}
            <div className="flex-shrink-0">
                <Header title={title} tag={tag} />
            </div>

            {/* Body - Video Container */}
            <div className="relative flex flex-nowrap p-3 sm:p-4 lg:p-6 w-full items-center justify-center flex-1 border border-border rounded-2xl sm:rounded-3xl overflow-hidden">
                {/* Video */}
                <Video video={video} active={active} />
            </div>
        </div>
    )
}

export default FeaturedCard;