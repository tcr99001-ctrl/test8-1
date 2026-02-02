/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. 최신 문법(Private fields 등)을 사용하는 패키지들을 강제로 변환(Transpile)합니다.
  transpilePackages: ['undici', 'firebase', '@firebase/auth'],

  // 2. Webpack 설정 (혹시 모를 브라우저/서버 충돌 방지)
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'undici': 'undici-types', // undici를 직접 번들링하지 않도록 우회
    };
    return config;
  },
};

module.exports = nextConfig;
