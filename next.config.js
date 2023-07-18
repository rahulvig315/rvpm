/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
    },
    webpack(config) {
        config.infrastructureLogging = { debug: /PackFileCache/ }
        return config;
    }
}

module.exports = nextConfig
