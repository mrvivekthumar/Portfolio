import { FC, ReactNode, useRef, useState } from "react";
import { motion } from 'framer-motion'
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
    className: string;
    children: ReactNode;
}

const MagneticWrapper: FC<MagneticWrapperProps> = ({ className, children }) => {

    const ref = useRef<HTMLDivElement>(null);

    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: MouseEvent) => {
        const { clientX, clientY } = e;

        const boundingReact = ref.current?.getBoundingClientRect();

        if (boundingReact) {
            const { width, height, top, left } = boundingReact;
            const middleX = clientX - (left + width / 2);
            const middleY = clientY - (top + height / 2);

            setPosition({ x: middleX, y: middleY });
        }
    }

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    }

    const { x, y } = position;

    return (
        <motion.div
            className={cn("relative", className)}
            ref={ref}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            onMouseMove={handleMouse}
            onMouseLeave={reset}

        >
            {children}
        </motion.div >);
}

export default MagneticWrapper;