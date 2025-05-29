"use client";
import { FC, ReactNode, useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CustomWaterWaveWrapperProps {
    children: () => ReactNode;
    className?: string;
}

// Create consistent particle data that won't change between server and client
const generateStaticParticles = () => {
    // Use fixed seed values instead of Math.random() for consistency
    const particles = [];
    const seedValues = [0.1, 0.3, 0.7, 0.2, 0.9, 0.5, 0.8, 0.4]; // Fixed "random" values

    for (let i = 0; i < 8; i++) {
        particles.push({
            id: i,
            width: seedValues[i] * 6 + 2, // 2-8px
            height: seedValues[(i + 1) % 8] * 6 + 2,
            left: seedValues[(i + 2) % 8] * 100, // 0-100%
            top: seedValues[(i + 3) % 8] * 100,
            animationDelay: seedValues[(i + 4) % 8] * 3, // 0-3s delay
            animationDuration: 4 + seedValues[(i + 5) % 8] * 3, // 4-7s duration
            xMovement: seedValues[(i + 6) % 8] * 20 - 10, // -10 to 10
        });
    }

    return particles;
};

const CustomWaterWaveWrapper: FC<CustomWaterWaveWrapperProps> = ({
    children,
    className = ""
}) => {
    const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([]);
    const [isMounted, setIsMounted] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const rippleCounter = useRef(0);

    // Wait for component to mount before rendering dynamic content
    useEffect(() => {
        setIsMounted(true);
    }, []);

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

    // Generate static particles that won't cause hydration mismatch
    const staticParticles = generateStaticParticles();

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

            {/* Click ripple effects - Only render after mount */}
            {isMounted && ripples.map((ripple) => (
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

            {/* Floating particles - Only render after mount to avoid hydration mismatch */}
            {isMounted && (
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {staticParticles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20"
                            style={{
                                width: particle.width,
                                height: particle.height,
                                left: `${particle.left}%`,
                                top: `${particle.top}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, particle.xMovement, 0],
                                opacity: [0.2, 0.6, 0.2],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: particle.animationDuration,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: particle.animationDelay,
                            }}
                        />
                    ))}
                </div>
            )}

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