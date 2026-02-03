// 재배포 트리거용 주석
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Firebase와 관련된 모든 패키지를 강제로 변환(Transpile)
  transpilePackages: [
    'undici', 
    'firebase', 
    '@firebase/auth', 
    '@firebase/app', 
    '@firebase/component', 
    '@firebase/database', 
    '@firebase/firestore', 
    '@firebase/functions', 
    '@firebase/installations', 
    '@firebase/messaging', 
    '@firebase/storage', 
    '@firebase/util'
  ],
  
  // (선택) 웹팩 별칭 설정은 일단 제거하고 위 설정으로만 시도해봅니다.
  // 에러가 지속되면 그때 다시 추가합니다.
};

module.exports = nextConfig;
