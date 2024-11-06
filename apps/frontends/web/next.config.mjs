/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    tsconfigPath: './tsconfig.app.json',
  },
  transpilePackages: ['@company/ui'],
};

export default nextConfig;
