/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  // Use a fresh build output folder to avoid stale, locked .next artifacts on Windows/OneDrive
  distDir: 'build-cache',
};

export default nextConfig;
