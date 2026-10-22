/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  //STEP 6：外部サイト(PokeAPI)の画像を next/image で表示する許可
  images: {
    remotePatterns: [
      new URL(
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/**',
      ),
    ],
  },
};

export default nextConfig;
