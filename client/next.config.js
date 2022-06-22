/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/landing",
                permanent: true,
            },
        ];
    },
    rewrites: async () => {
        return [
            {
                source: "/:path*", // -> http://localhost:4000/api/v1
                destination: "http://localhost:4000/:path*",
            },
        ];
    },
};
