const nextConfig = {
    // Image optimization settings
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.dribbble.com",
                port: "",
                pathname: "/userupload/**",
            },
        ],
        // Enable image optimization (default is true for production)
        unoptimized: false,
    },
    // Enable React strict mode for better development experience
    reactStrictMode: true,
    experimental: {
        // Add any experimental features here
    },
    async redirects() {
        return [
            // Add any redirects here if needed
        ]
    },
    // Headers configuration for security
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "origin-when-cross-origin",
                    },
                ],
            },
        ]
    },
}
// ES Module export syntax for .mjs files
export default nextConfig