import { FC } from "react";
import SvgCurve from "../visualEffects/svg-curve";
import { HeadingAnimatedSvg } from "./heading-animated-svg";

interface HeadingProps {
    number: string;
    title_1: string;
    title_2: string;
}

const Heading: FC<HeadingProps> = ({ number, title_1, title_2 }) => {
    return (
        <div className="relative my-8 sm:my-12 lg:my-16 xl:my-20 px-4 sm:px-6 lg:px-8 z-20">
            {/* Number Background */}
            <div className="outline-none flex flex-col justify-start shrink-0 opacity-5 transform -top-16 sm:-top-20 lg:-top-24 xl:-top-32 w-[50px] sm:w-[60px] lg:w-[71px] flex-none h-auto left-2 sm:left-4 lg:left-8 xl:left-12 absolute whitespace-pre">
                <h2 className="font-pixel text-[80px] sm:text-[120px] lg:text-[150px] xl:text-[180px] text-center text-primary-foreground relative">
                    <span className="bg-clip-text text-transparent p-2 sm:p-3 lg:p-4 bottom_fade">{number}</span>
                </h2>
            </div>

            {/* Heading text wrapper */}
            <div className="flex flex-col sm:flex-row items-center flex-nowrap min-h-min overflow-hidden p-0 w-full font-oswald gap-2 sm:gap-4">
                <p className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[12vw] leading-[90%] sm:leading-[100%] text-primary-foreground whitespace-nowrap">
                    {title_1}
                </p>
                
                {/* Animated SVG - Hidden on very small screens */}
                <div className="hidden sm:block flex-shrink-0">
                    <HeadingAnimatedSvg text="EMPOWER YOUR LIFE, LIVE MORE" />
                </div>
                
                <p className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] xl:text-[12vw] leading-[90%] sm:leading-[100%] text-primary-foreground italic whitespace-nowrap">
                    {title_2}
                </p>
            </div>
            
            {/* SVG Curve */}
            <div className="mt-4 sm:mt-6 lg:mt-8">
                <SvgCurve />
            </div>
        </div>
    );
};

export default Heading;