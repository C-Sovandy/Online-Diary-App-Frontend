/** @type {import('next').NextConfig} */
const nextConfig = {
    
        // matching all API routes
        // source: "/components/*",
        // headers: [
        //     { key: "Access-Control-Allow-Credentials", value: "true" },
        //     { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
        //     { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
        //     { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        // ],
        // webpackDevMiddleware: (config) => {
        //     config.watchOptions = {
        //       poll: 1000, // Check for changes every second
        //       aggregateTimeout: 300, // Delay before rebuilding
        //     };
        //     return config;
        //   },
        reactStrictMode: true,
        env: {
                LOCAL_URL:'http://localhost:8081',
                NEXT_PUBLIC_API_KEY: 'your_api_key',
                NEXT_PUBLIC_SECRET_KEY: 'your_secret_key',
              },
}

module.exports = nextConfig
