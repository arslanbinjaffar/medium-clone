import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXT_BACKEND_URL: process.env.NEXT_BACKEND_URL,
  },
    api: {
      bodyParser: {
        sizeLimit: "10mb", 
      },
    },
  
};

export default nextConfig;
