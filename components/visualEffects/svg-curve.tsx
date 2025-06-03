import { useEffect, useRef, useCallback, useState } from "react";

export default function SvgCurve() {
    const path = useRef<SVGPathElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<number>(0);
    const reqIdRef = useRef<number | null>(null);
    const xRef = useRef<number>(0.5);
    const timeRef = useRef<number>(Math.PI / 2);
    const [isActive, setIsActive] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [viewBoxWidth, setViewBoxWidth] = useState(800); // Default fallback

    // Ensure client-side only rendering
    useEffect(() => {
        setIsMounted(true);
        const updateWidth = () => {
            if (typeof window !== "undefined") {
                setViewBoxWidth(Math.min(window.innerWidth * 0.7, 1200));
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    // Memoized setPath function for better performance
    const setPath = useCallback((value: number) => {
        if (!path.current || !isMounted) return;

        const width = viewBoxWidth;
        const x = xRef.current;

        path.current.setAttributeNS(
            null,
            "d",
            `M 0 50 Q ${width * x} ${50 + value} ${width} 50`
        );
    }, [viewBoxWidth, isMounted]);

    // Rest of your methods remain the same...
    const animateIn = useCallback(() => {
        if (reqIdRef.current !== null) {
            cancelAnimationFrame(reqIdRef.current);
            timeRef.current = Math.PI / 2;
        }

        setPath(progressRef.current);
        reqIdRef.current = requestAnimationFrame(animateIn);
    }, [setPath]);

    const lerp = useCallback((x: number, y: number, a: number): number => {
        return x * (1 - Math.max(0, Math.min(1, a))) + y * Math.max(0, Math.min(1, a));
    }, []);

    const animateOut = useCallback(() => {
        const newProgress = progressRef.current * Math.sin(timeRef.current);
        setPath(newProgress);

        progressRef.current = lerp(progressRef.current, 0, 0.06);
        timeRef.current += 0.15;

        if (Math.abs(progressRef.current) > 0.3) {
            reqIdRef.current = requestAnimationFrame(animateOut);
        } else {
            timeRef.current = Math.PI / 2;
            progressRef.current = 0;
            setPath(0);
            setIsActive(false);
        }
    }, [setPath, lerp]);

    const manageMouseMove = useCallback((e: React.MouseEvent<HTMLSpanElement>) => {
        if (!containerRef.current) return;

        const { movementY } = e.nativeEvent;
        const box = containerRef.current.getBoundingClientRect();

        const newX = Math.max(0.1, Math.min(0.9, (e.clientX - box.left) / box.width));
        xRef.current = newX;

        progressRef.current = Math.max(-100, Math.min(100, progressRef.current + movementY * 0.5));
    }, []);

    const handleMouseEnter = useCallback(() => {
        setIsActive(true);
        animateIn();
    }, [animateIn]);

    const handleMouseLeave = useCallback(() => {
        if (reqIdRef.current !== null) {
            cancelAnimationFrame(reqIdRef.current);
            reqIdRef.current = null;
        }
        animateOut();
    }, [animateOut]);

    useEffect(() => {
        if (isMounted) {
            setPath(0);
        }
    }, [setPath, isMounted]);

    const handleTouchMove = useCallback((e: React.TouchEvent<HTMLSpanElement>) => {
        if (!containerRef.current) return;

        const touch = e.touches[0];
        const box = containerRef.current.getBoundingClientRect();
        const newX = Math.max(0.1, Math.min(0.9, (touch.clientX - box.left) / box.width));
        xRef.current = newX;

        progressRef.current = Math.max(-50, Math.min(50, progressRef.current + (Math.random() - 0.5) * 10));
    }, []);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLSpanElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleMouseEnter();
            setTimeout(handleMouseLeave, 1000);
        }
    }, [handleMouseEnter, handleMouseLeave]);

    // Don't render until mounted to prevent hydration mismatch
    if (!isMounted) {
        return (
            <div className="line relative w-full">
                <span className="box relative block w-full h-10" />
                <svg className="absolute top-0 left-0 w-full h-[100px] pointer-events-none" style={{ top: "-50px" }}>
                    <path stroke="white" strokeWidth="1" fill="none" d="M 0 50 Q 400 50 800 50" />
                </svg>
            </div>
        );
    }

    return (
        <div className="line relative w-full" ref={containerRef}>
            <span
                className={`
                    box relative block w-full h-10 cursor-pointer transition-opacity duration-300
                    ${isActive ? "opacity-100" : "opacity-60"}
                    hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-black
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
                onKeyDown={handleKeyDown}
            />
            <svg
                className="absolute top-0 left-0 w-full h-[100px] pointer-events-none"
                style={{ top: "-50px" }}
                preserveAspectRatio="none"
                viewBox={`0 0 ${viewBoxWidth} 100`}
            >
                <path
                    ref={path}
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                    className="transition-all duration-75 ease-out"
                    style={{
                        filter: isActive ? "drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))" : "none"
                    }}
                />
            </svg>
        </div>
    );
}