export default function ScrollDown() {
    return (
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 rounded-full border-2 border-primary-foreground/30 grid place-items-center group hover:border-primary-foreground/60 transition-all duration-300 cursor-pointer">
            <div className="grid place-items-center w-6 h-8 sm:w-7 sm:h-9 lg:w-8 lg:h-10">
                <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 26 27"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="group-hover:translate-y-1 transition-transform duration-300"
                    style={{
                        transform: "translate3d(0, 0, 0)",
                    }}
                >
                    <path
                        d="M23.2338 12.28L14.7538 20.8V0.239998H11.3538V20.76L2.87375 12.28L0.59375 14.56L13.0738 27L25.5138 14.56L23.2338 12.28Z"
                        fill="white"
                        className="group-hover:fill-blue-400 transition-colors duration-300"
                    />
                </svg>
            </div>

            {/* Animated pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/20 animate-ping opacity-30"></div>

            {/* Inner glow effect */}
            <div className="absolute inset-2 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
    );
}