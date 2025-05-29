"use client";
import { FC, ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticWrapperProps {
  className?: string;
  children: ReactNode;
}

const MagneticWrapper: FC<MagneticWrapperProps> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Fix: Use React.MouseEvent instead of MouseEvent
  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const boundingRect = ref.current?.getBoundingClientRect();
    if (boundingRect) {
      const { width, height, top, left } = boundingRect;
      const middleX = clientX - (left + width / 2);
      const middleY = clientY - (top + height / 2);
      setPosition({ x: middleX * 0.1, y: middleY * 0.1 }); // Reduced intensity for smoother effect
    }
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const { x, y } = position;

  return (
    <motion.div
      className={cn("relative", className)}
      ref={ref}
      animate={{ x, y }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8,
        restDelta: 0.001
      }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onMouseEnter={() => setPosition({ x: 0, y: 0 })} // Reset on enter for clean start
    >
      {children}
    </motion.div>
  );
};

export default MagneticWrapper;