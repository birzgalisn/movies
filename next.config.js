/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "t1.gstatic.com",
      "t3.gstatic.com",
      "encrypted-tbn0.gstatic.com",
      "encrypted-tbn1.gstatic.com",
      "encrypted-tbn2.gstatic.com",
      "encrypted-tbn3.gstatic.com",
      "m.media-amazon.com",
    ],
  },
};

module.exports = nextConfig;
