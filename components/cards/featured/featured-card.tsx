// components/cards/featured/featured-card.tsx - Mobile optimized
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
        <div className="link w-full h-full bg-secondary-background border border-border shadow-lg rounded-xl sm:rounded-2xl md:rounded-3xl cursor-pointer flex flex-col gap-1.5 sm:gap-2 flex-nowrap p-1.5 sm:p-2 hover:border-border/70 transition-all duration-300 overflow-hidden">
            {/* Header - Mobile optimized */}
            <div className="flex-shrink-0 min-h-0">
                <Header title={title} tag={tag} />
            </div>

            {/* Body - Video Container - Mobile optimized aspect ratio */}
            <div className="relative flex flex-nowrap p-2 sm:p-3 md:p-4 lg:p-6 w-full items-center justify-center flex-1 min-h-0 border border-border rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden bg-black/20">
                {/* Video with better mobile handling */}
                <Video video={video} active={active} />

                {/* Loading state for mobile */}
                {!active && (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                        <div className="text-center text-white/70">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-full flex items-center justify-center mb-2 mx-auto">
                                <svg
                                    className="w-6 h-6 sm:w-8 sm:h-8"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <p className="text-xs sm:text-sm font-medium">Preview Project</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FeaturedCard;