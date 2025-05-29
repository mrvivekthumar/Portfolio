/** @type {import('next').NextConfig} */
const nextConfig = {
    // Image optimization settings
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.dribbble.com',
                port: '',
                pathname: '/userupload/**',
            },
        ],
        // Enable image optimization (default is true for production)
        unoptimized: false,
    },

    // Enable React strict mode for better development experience
    reactStrictMode: true,

    // Optimize for production
    swcMinify: true,

    // Enable experimental features if needed
    experimental: {
        // Add any experimental features here
    },

    // Asset prefix for production (if deploying to subdirectory)
    // assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',

    // Base path if deploying to subdirectory
    // basePath: '/your-repo-name', // Uncomment and modify if needed

    // Redirect configuration
    async redirects() {
        return [
            // Add any redirects here if needed
        ]
    },

    // Headers configuration for security
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'origin-when-cross-origin',
                    },
                ],
            },
        ]
    },
}

// ES Module export syntax for .mjs files
export default nextConfig