"use client";
import { FC, ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";

interface CustomWaterWaveWrapperProps {
    children: () => ReactNode;
    className?: string;
}

const CustomWaterWaveWrapper: FC<CustomWaterWaveWrapperProps> = ({
    children,
    className = ""
}) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const rippleCounter = useRef(0);

    const createRipple = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            id: rippleCounter.current++,
            x,
            y
        };

        setRipples(prev => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 1200);
    };

    return (
        <div
            ref={containerRef}
            className={`relative min-h-screen overflow-hidden cursor-pointer ${className}`}
            onClick={createRipple}
        >
            {/* Base gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse at top, rgba(16, 33, 62, 0.8), transparent 50%),
                        radial-gradient(ellipse at bottom, rgba(26, 26, 46, 0.8), transparent 50%),
                        linear-gradient(135deg, #000000 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #000000 100%)
                    `
                }}
            />

            {/* Animated floating gradients */}
            <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 20%, rgba(86, 172, 255, 0.3), transparent 40%)',
                        'radial-gradient(circle at 80% 80%, rgba(0, 211, 114, 0.3), transparent 40%)',
                        'radial-gradient(circle at 50% 50%, rgba(113, 121, 239, 0.3), transparent 40%)',
                        'radial-gradient(circle at 20% 80%, rgba(216, 124, 172, 0.3), transparent 40%)',
                        'radial-gradient(circle at 80% 20%, rgba(86, 172, 255, 0.3), transparent 40%)',
                        'radial-gradient(circle at 20% 20%, rgba(86, 172, 255, 0.3), transparent 40%)',
                    ]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />

            {/* Click ripple effects */}
            {ripples.map((ripple) => (
                <motion.div
                    key={ripple.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: ripple.x - 25,
                        top: ripple.y - 25,
                    }}
                >
                    {/* Outer ripple */}
                    <motion.div
                        className="absolute rounded-full border border-white/30"
                        initial={{
                            width: 50,
                            height: 50,
                            opacity: 0.8,
                            scale: 0
                        }}
                        animate={{
                            width: 400,
                            height: 400,
                            opacity: 0,
                            scale: 1
                        }}
                        transition={{
                            duration: 1.2,
                            ease: "easeOut"
                        }}
                    />
                    {/* Inner ripple */}
                    <motion.div
                        className="absolute rounded-full bg-white/10"
                        initial={{
                            width: 20,
                            height: 20,
                            opacity: 0.6,
                            scale: 0,
                            left: 15,
                            top: 15
                        }}
                        animate={{
                            width: 120,
                            height: 120,
                            opacity: 0,
                            scale: 1,
                            left: -35,
                            top: -35
                        }}
                        transition={{
                            duration: 0.8,
                            ease: "easeOut"
                        }}
                    />
                </motion.div>
            ))}

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(8)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                        style={{
                            width: Math.random() * 6 + 2,
                            height: Math.random() * 6 + 2,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -30, 0],
                            x: [0, Math.random() * 20 - 10, 0],
                            opacity: [0.2, 0.6, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-5 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px'
                }}
            />

            {/* Main content */}
            <div className="relative z-10">
                {children()}
            </div>
        </div>
    );
};

export default CustomWaterWaveWrapper;