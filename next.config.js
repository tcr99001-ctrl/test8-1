/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 서버 전용 패키지(undici)가 브라우저 번들에 포함되지 않도록 막습니다.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false, // 클라이언트 빌드 시 undici 제거
      };
    }
    return config;
  },
  // 2. 혹시 모르니 트랜스파일 설정도 유지합니다.
  transpilePackages: ['undici', 'firebase', '@firebase/auth'],
};

module.exports = nextConfig;
