/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com", // Google profile pictures
        ],
        remotePatterns: [
            {
                protocol: "https",
                hostname: new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname,
                pathname: "/storage/v1/object/public/**",
            },
        ],
    },
};

module.exports = nextConfig;
