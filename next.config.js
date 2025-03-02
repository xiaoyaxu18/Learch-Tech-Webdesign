/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['your-image-host.com'], // 如果使用外部图片服务
  },
}

module.exports = nextConfig 