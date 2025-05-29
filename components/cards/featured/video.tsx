import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const Video = ({ video, active }: { video: string, active: boolean }) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (active) {
                // Only autoplay on desktop or when explicitly activated on mobile
                if (!isMobile || active) {
                    const playPromise = videoRef.current.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(() => {
                            // Auto-play was prevented, which is fine
                        });
                    }
                }
            } else {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
            }
        }
    }, [active, isMobile]);

    const handleLoadedData = () => {
        setIsLoaded(true);
    };

    return (
        <div className="absolute inset-0 rounded-2xl sm:rounded-3xl overflow-hidden">
            {/* Loading placeholder */}
            {!isLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
                    <div className="text-center text-white/70">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 border-2 border-white/30 border-t-white/70 rounded-full animate-spin mx-auto mb-2"></div>
                        <p className="text-xs sm:text-sm font-medium">Loading...</p>
                    </div>
                </div>
            )}

            {/* Video element */}
            <video
                ref={videoRef}
                src={video}
                loop={active}
                muted
                playsInline
                preload={isMobile ? "none" : "metadata"}
                onLoadedData={handleLoadedData}
                className={cn(
                    "h-full w-full object-cover rounded-2xl sm:rounded-3xl transition-all duration-300",
                    active ? "grayscale-0 opacity-100" : "grayscale opacity-75",
                    !isLoaded && "opacity-0"
                )}
                style={{
                    // Optimize for mobile performance
                    transform: active ? 'scale(1)' : 'scale(0.98)',
                    transition: 'all 0.3s ease'
                }}
            />

            {/* Play indicator for mobile */}
            {isMobile && !active && isLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-2xl sm:rounded-3xl">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                        <svg
                            className="w-6 h-6 sm:w-8 sm:h-8 text-black ml-1"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Video;