/** @type {import('next').NextConfig} */

module.exports = {
    reactStrictMode: true,
    redirects: async () => {
        return [
            {
                source: "/",
                destination: "/landing",
                permanent: true
            },
        ];
    },
};
