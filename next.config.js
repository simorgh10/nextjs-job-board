/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "9cfebpgamaa3lhe7.public.blob.vercel-storage.com",
            }
        ]
    }
}

module.exports = nextConfig
