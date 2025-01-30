/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // ✅ `standalone` ではなく `export` にする
  trailingSlash: true, // 末尾のスラッシュを許可
};

export default nextConfig;
