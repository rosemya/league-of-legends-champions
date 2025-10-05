import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ddragon.leagueoflegends.com',
                port: '',
                pathname: '/cdn/15.19.1/img/**/**',
                search: '',
            },
            {
                protocol: 'https',
                hostname: 'ddragon.leagueoflegends.com',
                port: '',
                pathname: '/cdn/img/**/**',
                search: '',
            },
        ],
    },
};

export default nextConfig;
