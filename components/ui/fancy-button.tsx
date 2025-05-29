import { FC, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
    text: string;
    icon: ReactNode;
    onClick?: () => void;
    href?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    fullWidth?: boolean;
}

const FancyButton: FC<ButtonProps> = ({
    text,
    icon,
    onClick,
    href,
    className = "",
    size = 'md',
    fullWidth = false
}) => {
    // Size variants for responsive design
    const sizeClasses = {
        sm: "py-2 px-4 text-sm gap-1",
        md: "py-2 px-4 sm:py-3 sm:px-6 text-sm sm:text-base gap-1 sm:gap-2",
        lg: "py-3 px-6 sm:py-4 sm:px-8 text-base sm:text-lg gap-2",
        xl: "py-4 px-8 sm:py-5 sm:px-10 text-lg sm:text-xl lg:text-2xl gap-2"
    };

    const buttonContent = (
        <div className={cn(
            "group bg-black hover:bg-transparent text-primary-foreground hover:text-black rounded-[108em]",
            "flex items-center justify-center font-bold cursor-pointer transition-all duration-300",
            "min-h-[44px] touch-target hover:scale-105 active:scale-95",
            sizeClasses[size],
            fullWidth && "w-full",
            className
        )}>
            <span className="whitespace-nowrap leading-none">{text}</span>
            <span className={cn(
                "transition-transform duration-300 flex-shrink-0",
                size === 'sm' ? "group-hover:translate-x-0.5" : "group-hover:translate-x-1 sm:group-hover:translate-x-2"
            )}>
                {icon}
            </span>
        </div>
    );

    const wrapperClasses = cn(
        "fancy-btn inline-block",
        fullWidth && "w-full"
    );

    if (href) {
        return (
            <a href={href} className={wrapperClasses}>
                {buttonContent}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={wrapperClasses}>
            {buttonContent}
        </button>
    );
};

export default FancyButton;