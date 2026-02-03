
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 서버 전용 패키지(undici)가 브라우저 번들에 포함되지 않도록 'alias'로 막습니다.
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'undici': false, // 여기가 핵심! undici를 빈 껍데기로 만듭니다.
      };
    }
    return config;
  },
  // 2. 혹시 모르니 트랜스파일 설정도 유지합니다...
  transpilePackages: ['undici', 'firebase', '@firebase/auth'],
};

module.exports = nextConfig;
