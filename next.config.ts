import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns:[
        {
            protocol: 'https',
            hostname: 'upload.wikimedia.org',
            port: '',
            pathname: '/**'
        },
        //Imagen de ejemplo con puerto aprobado: https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6twAZOiK4sZfNi2vFem43gtwkb18jrwhGPg&s
    ]
},
};

export default nextConfig;
