"use client";
import { useEffect, useRef, useCallback, useState } from "react";

export default function SvgCurve() {
    const path = useRef<SVGPathElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<number>(0);
    const reqIdRef = useRef<number | null>(null);
    const xRef = useRef<number>(0.5);
    const timeRef = useRef<number>(Math.PI / 2);
    const [isActive, setIsActive] = useState(false);

    // Memoized setPath function for better performance
    const setPath = useCallback((value: number) => {
        if (!path.current || typeof window === 'undefined') return;

        const width = Math.min(window.innerWidth * 0.7, 1200); // Max width limit
        const x = xRef.current;

        path.current.setAttributeNS(
            null,
            "d",
            `M 0 50 Q ${width * x} ${50 + value} ${width} 50`
        );
    }, []);

    // Improved animation with better performance
    const animateIn = useCallback(() => {
        if (reqIdRef.current !== null) {
            cancelAnimationFrame(reqIdRef.current);
            timeRef.current = Math.PI / 2;
        }

        setPath(progressRef.current);
        reqIdRef.current = requestAnimationFrame(animateIn);
    }, [setPath]);

    // Linear interpolation with bounds checking
    const lerp = useCallback((x: number, y: number, a: number): number => {
        return x * (1 - Math.max(0, Math.min(1, a))) + y * Math.max(0, Math.min(1, a));
    }, []);

    // Improved animation out with smoother transitions
    const animateOut = useCallback(() => {
        const newProgress = progressRef.current * Math.sin(timeRef.current);
        setPath(newProgress);

        progressRef.current = lerp(progressRef.current, 0, 0.06); // Slightly faster lerp
        timeRef.current += 0.15; // Slightly slower time increment

        if (Math.abs(progressRef.current) > 0.3) { // Lower threshold for better performance
            reqIdRef.current = requestAnimationFrame(animateOut);
        } else {
            // Reset values when animation is complete
            timeRef.current = Math.PI / 2;
            progressRef.current = 0;
            setPath(0);
            setIsActive(false);
        }
    }, [setPath, lerp]);

    // Improved mouse move handler with throttling
    const manageMouseMove = useCallback((e: React.MouseEvent) => {
        if (!containerRef.current) return;

        const { movementY } = e;
        const box = containerRef.current.getBoundingClientRect();

        // Bounds checking to prevent extreme values
        const newX = Math.max(0.1, Math.min(0.9, (e.clientX - box.left) / box.width));
        xRef.current = newX;

        // Limit progress change for smoother animation
        progressRef.current = Math.max(-100, Math.min(100, progressRef.current + movementY * 0.5));
    }, []);

    // Mouse enter handler
    const handleMouseEnter = useCallback(() => {
        setIsActive(true);
        animateIn();
    }, [animateIn]);

    // Mouse leave handler with cleanup
    const handleMouseLeave = useCallback(() => {
        if (reqIdRef.current !== null) {
            cancelAnimationFrame(reqIdRef.current);
            reqIdRef.current = null;
        }
        animateOut();
    }, [animateOut]);

    // Resize handler with debouncing
    useEffect(() => {
        let resizeTimeout: NodeJS.Timeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                setPath(progressRef.current);
            }, 100); // Debounce resize events
        };

        // Initial path setup
        setPath(0);

        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
            if (reqIdRef.current !== null) {
                cancelAnimationFrame(reqIdRef.current);
            }
        };
    }, [setPath]);

    // Touch support for mobile devices
    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!containerRef.current) return;

        const touch = e.touches[0];
        const box = containerRef.current.getBoundingClientRect();
        const newX = Math.max(0.1, Math.min(0.9, (touch.clientX - box.left) / box.width));
        xRef.current = newX;

        // Gentle touch response
        progressRef.current = Math.max(-50, Math.min(50, progressRef.current + (Math.random() - 0.5) * 10));
    }, []);

    return (
        <div className="line relative w-full" ref={containerRef}>
            <span
                className={`
                    box relative block w-full h-10 cursor-pointer transition-opacity duration-300
                    ${isActive ? 'opacity-100' : 'opacity-60'}
                    hover:opacity-100
                `}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={manageMouseMove}
                onTouchStart={handleMouseEnter}
                onTouchEnd={handleMouseLeave}
                onTouchMove={handleTouchMove}
                role="button"
                tabIndex={0}
                aria-label="Interactive curve animation"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        handleMouseEnter();
                        setTimeout(handleMouseLeave, 1000);
                    }
                }}
            />
            <svg
                className="absolute top-0 left-0 w-full h-[100px] pointer-events-none"
                style={{ top: '-50px' }}
                preserveAspectRatio="none"
                viewBox={`0 0 ${typeof window !== 'undefined' ? window.innerWidth * 0.7 : 800} 100`}
            >
                <path
                    ref={path}
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    className="transition-all duration-75 ease-out"
                    style={{
                        filter: isActive ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))' : 'none'
                    }}
                />
            </svg>
        </div>
    );
}