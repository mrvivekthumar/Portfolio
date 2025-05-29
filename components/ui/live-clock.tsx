"use client";
import moment from "moment-timezone";
import { FC, useEffect, useState } from "react";

interface LiveClockProps {
    timeZone: string;
}

const LiveClock: FC<LiveClockProps> = ({ timeZone }) => {
    const [time, setTime] = useState<string>("");
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        const updateClock = () => {
            const now = moment().tz(timeZone);
            const currentTime = now.format("HH:mm");
            const currentDate = now.format("MMM DD");
            setTime(currentTime);
            setDate(currentDate);
        };

        // Update immediately
        updateClock();

        // Update every second
        const intervalId = setInterval(updateClock, 1000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [timeZone]);

    return (
        <div className="text-right font-medium">
            {time ? (
                <div className="space-y-1">
                    {/* Main time display */}
                    <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <span className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-primary-foreground font-bold font-mono">
                            {time}
                        </span>
                        <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
                    </div>

                    {/* Location and date */}
                    <div className="text-xs sm:text-sm lg:text-base text-secondary-foreground space-y-0.5">
                        <div className="font-pixel uppercase tracking-wide">
                            {timeZone.split('/')[1]?.replace('_', ' ') || 'Local'}
                        </div>
                        <div className="font-mono">
                            {date}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="animate-pulse">
                    <div className="bg-secondary-foreground/20 h-6 sm:h-8 lg:h-10 w-16 sm:w-20 lg:w-24 rounded mb-2"></div>
                    <div className="bg-secondary-foreground/20 h-3 sm:h-4 w-12 sm:w-16 rounded ml-auto"></div>
                </div>
            )}
        </div>
    );
};

export default LiveClock;