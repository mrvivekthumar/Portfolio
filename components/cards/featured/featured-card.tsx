import { FC, ReactNode } from "react";
import Header from "./header";

interface FeaturedCardProps {
    logo?: ReactNode;
    title: string;
    tag: string;
    video: string;
    active: boolean;
}

const FeaturedCard: FC<FeaturedCardProps> = ({ logo, title, tag, video, active }) => {
    return (
        <div className="link w-full h-full bg-secondary-background border border-border shadow-lg rounded-3xl cursor-pointer flex flex-col flex-nowrap p-2">
            {/* Header */}
            <Header title={title} tag={tag} />
        </div>
    )
}
export default FeaturedCard;