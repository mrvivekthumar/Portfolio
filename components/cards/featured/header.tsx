// components/cards/featured/header.tsx - Mobile optimized
import { FC } from "react";

interface HeaderProps {
    title: string;
    tag: string;
}

const Header: FC<HeaderProps> = ({ title, tag }) => {
    return (
        <div className="bg-secondary-background flex flex-none flex-nowrap relative p-3 sm:p-4 md:p-6 w-full items-center justify-between min-h-[3rem] sm:min-h-[3.5rem] md:min-h-[4rem] border border-border rounded-xl sm:rounded-2xl md:rounded-3xl">
            {/* Title - Mobile responsive text */}
            <div className="flex-1 min-w-0 pr-2">
                <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-medium leading-tight text-primary-foreground truncate">
                    {title}
                </h3>
            </div>

            {/* Tag - Mobile responsive */}
            <div className="flex-shrink-0">
                <span className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-secondary-foreground font-pixel bg-white/5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-white/10">
                    {tag}
                </span>
            </div>
        </div>
    )
}

export default Header;