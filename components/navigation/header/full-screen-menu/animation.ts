// Update your animation.ts file with these improved animations

export const menuSlide = {
    initial: {
        x: "100%",
        opacity: 0
    },
    enter: {
        x: "0",
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
            opacity: { duration: 0.3 }
        }
    },
    exit: {
        x: "100%",
        opacity: 0,
        transition: {
            duration: 0.5,
            ease: [0.76, 0, 0.24, 1],
            opacity: { duration: 0.2, delay: 0.1 }
        },
    },
};

export const slide = {
    initial: {
        x: 80,
        opacity: 0
    },
    enter: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.05 * i + 0.2 // Stagger effect
        },
    }),
    exit: (i: number) => ({
        x: 80,
        opacity: 0,
        transition: {
            duration: 0.4,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.03 * (4 - i) // Reverse stagger
        },
    }),
};

export const scale = {
    open: {
        scale: 1,
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    closed: {
        scale: 0,
        opacity: 0,
        transition: { duration: 0.2, ease: "easeIn" }
    },
};

// Background overlay animation
export const backdrop = {
    initial: { opacity: 0 },
    enter: {
        opacity: 1,
        transition: { duration: 0.3 }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2, delay: 0.1 }
    },
};