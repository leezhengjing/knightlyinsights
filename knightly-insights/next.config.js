/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = {
    ...nextConfig,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'knightly-insights.pockethost.io',
                port: '',
                pathname: '/api/files/**'
            }
        ]
    }
}
