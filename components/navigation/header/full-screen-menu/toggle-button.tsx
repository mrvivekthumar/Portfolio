import { cn } from "@/lib/utils";
import React from "react";

export default function ToggleButton({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setOpen(!open);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen(!open);
        }
    };

    return (
        <button
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={cn(
                "fixed right-4 top-4 z-50 touch-target",
                "w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20",
                "rounded-full bg-[#323E56] hover:bg-[#3a4666] active:bg-[#2a3446]",
                "cursor-pointer transition-all duration-300 ease-out",
                "border-2 border-white/10 hover:border-white/20",
                "backdrop-blur-md shadow-2xl",
                "flex items-center justify-center",
                "hover:scale-110 active:scale-95",
                "focus:outline-none focus:ring-2 focus:ring-white/30",
                // Ensure it's always clickable
                "pointer-events-auto"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            type="button"
        >
            <div className="relative flex items-center justify-center">
                <div className="flex flex-col gap-y-1.5 sm:gap-y-2 w-6 sm:w-7 lg:w-8 transform transition-all duration-300 origin-center overflow-hidden">
                    {/* Top line */}
                    <div
                        className={cn(
                            "bg-white h-[2px] w-full transform transition-all duration-300 origin-left",
                            {
                                "rotate-45 translate-y-[8px] sm:translate-y-[10px] lg:translate-y-[12px]": open,
                                "rotate-0 translate-y-0": !open,
                            }
                        )}
                    />
                    {/* Middle line */}
                    <div
                        className={cn(
                            "bg-white h-[2px] w-full transform transition-all duration-300",
                            {
                                "opacity-0 scale-0": open,
                                "opacity-100 scale-100": !open,
                            }
                        )}
                    />
                    {/* Bottom line */}
                    <div
                        className={cn(
                            "bg-white h-[2px] transform transition-all duration-300 origin-left",
                            {
                                "w-full -rotate-45 -translate-y-[8px] sm:-translate-y-[10px] lg:-translate-y-[12px]": open,
                                "w-3/4 rotate-0 translate-y-0": !open,
                            }
                        )}
                    />
                </div>
            </div>

            {/* Ripple effect on click */}
            <div className={cn(
                "absolute inset-0 rounded-full bg-white/10 scale-0 transition-transform duration-200",
                "opacity-0"
            )} />
        </button>
    );
}