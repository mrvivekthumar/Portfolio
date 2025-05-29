import { cn } from "@/lib/utils";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { FC, useState, useEffect } from "react";

interface TooltipProps {
    title: string;
    bgColor: string;
    image: string | StaticImport;
}

const Tooltip: FC<TooltipProps> = ({ title, bgColor, image }) => {
    const [active, setActive] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleInteraction = () => {
        if (isMobile) {
            setActive(!active);
        }
    };

    const handleMouseEnter = () => {
        if (!isMobile) {
            setActive(true);
        }
    };

    const handleMouseLeave = () => {
        if (!isMobile) {
            setActive(false);
        }
    };

    // Auto-hide tooltip on mobile after 2 seconds
    useEffect(() => {
        if (active && isMobile) {
            const timer = setTimeout(() => {
                setActive(false);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [active, isMobile]);

    return (
        <div
            className={cn(
                "link relative bg-[#2D2C33] w-10 h-10 transform cursor-pointer grid place-items-center",
                "border border-border rounded-xl",
                "hover:scale-110 transition-all duration-200",
                // Add touch-friendly sizing on mobile
                "sm:w-12 sm:h-12"
            )}
            style={{ background: `${bgColor || "#2D2C33"}` }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleInteraction}
            onClick={handleInteraction}
        >
            <div className="w-[27px] h-[27px] sm:w-[30px] sm:h-[30px]">
                <Image
                    src={image}
                    alt={title}
                    className="w-full h-full overflow-clip object-contain"
                    width={30}
                    height={30}
                />
            </div>

            {/* Tooltip */}
            {active && (
                <div className={cn(
                    "absolute -top-8 sm:-top-10 bg-black/80 py-1 px-2 sm:py-1.5 sm:px-3 rounded-xl backdrop-blur-md transition-all duration-200 z-50",
                    // Ensure tooltip doesn't go off screen on mobile
                    "left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                )}>
                    <p className="font-pixel text-xs sm:text-sm text-white">{title}</p>
                    {/* Arrow pointing down */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80"></div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;