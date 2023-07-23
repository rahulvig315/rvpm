/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/api/auth/signin',
                has: [
                    {
                        type: "query",
                        key: "error",
                        value: 'CredentialsSignin'
                    }
                ],
                destination: '/',
                permanent: true
            }
        ]
    }
}

module.exports = nextConfig
