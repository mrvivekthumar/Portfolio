// components/cards/featured/video.tsx - Mobile optimized
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const Video = ({ video, active }: { video: string, active: boolean }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        if (videoRef.current) {
            if (active) {
                const playPromise = videoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log("Auto-play was prevented:", error);
                        setHasError(true);
                    });
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [active]);

    const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
    };

    const handleCanPlay = () => {
        setIsLoading(false);
    };

    const handleError = () => {
        setIsLoading(false);
        setHasError(true);
    };

    const handleVideoClick = () => {
        if (videoRef.current && active) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(console.error);
            } else {
                videoRef.current.pause();
            }
        }
    };

    return (
        <div className="absolute inset-0 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden bg-gray-900">
            {/* Loading State */}
            {isLoading && (
                <div className="absolute inset-0 bg-gray-800 flex items-center justify-center z-10">
                    <div className="flex flex-col items-center gap-2 text-white/70">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <p className="text-xs sm:text-sm">Loading...</p>
                    </div>
                </div>
            )}

            {/* Error State */}
            {hasError && !isLoading && (
                <div className="absolute inset-0 bg-gradient-to-br from-red-900/50 to-gray-900 flex items-center justify-center z-10">
                    <div className="text-center text-white/80 p-4">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-500/20 rounded-full flex items-center justify-center mb-3 mx-auto">
                            <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                            </svg>
                        </div>
                        <p className="text-xs sm:text-sm font-medium mb-1">Unable to load video</p>
                        <p className="text-xs text-white/60">Check your connection</p>
                    </div>
                </div>
            )}

            {/* Video Element */}
            <video
                src={video}
                ref={videoRef}
                loop={active}
                muted
                playsInline // Important for mobile devices
                preload="metadata" // Better for mobile performance
                className={cn(
                    "w-full h-full object-cover transition-all duration-500 cursor-pointer",
                    // Mobile-optimized filters and scaling
                    active ? "grayscale-0 scale-100" : "grayscale scale-95",
                    // Better mobile interaction
                    "touch-manipulation"
                )}
                onLoadStart={handleLoadStart}
                onCanPlay={handleCanPlay}
                onError={handleError}
                onClick={handleVideoClick}
            />

            {/* Play/Pause Overlay for active videos */}
            {active && !isLoading && !hasError && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 bg-black/20">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 sm:p-3">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            )}

            {/* Mobile touch indicator */}
            {active && (
                <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1 md:hidden">
                    <p className="text-white text-xs">Tap to play/pause</p>
                </div>
            )}
        </div>
    )
}

export default Video;