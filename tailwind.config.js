/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // [핵심] 이 줄이 없으면 컴포넌트 스타일이 다 깨집니다!
  ],
  theme: {
    extend: {
      // 시스템 폰트 설정 (터미널 느낌)
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', "Liberation Mono", "Courier New", 'monospace'],
      },
      // 커스텀 애니메이션 정의
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'stamp': 'stamp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.5s ease-out forwards',
        'scale-in': 'scale-in 0.2s ease-out forwards',
        'glitch-skew': 'glitch-skew 1s infinite linear alternate-reverse',
      },
      // 키프레임 정의 (globals.css와 매칭)
      keyframes: {
        stamp: {
          '0%': { transform: 'scale(3) rotate(-12deg)', opacity: '0' },
          '100%': { transform: 'scale(1) rotate(-12deg)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '60%': { transform: 'scale(1.2)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'glitch-skew': {
          '0%': { transform: 'skew(0deg)' },
          '20%': { transform: 'skew(-20deg)' },
          '40%': { transform: 'skew(10deg)' },
          '60%': { transform: 'skew(-5deg)' },
          '80%': { transform: 'skew(5deg)' },
          '100%': { transform: 'skew(0deg)' },
        }
      },
    },
  },
  plugins: [],
}