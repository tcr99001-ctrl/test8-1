export const metadata = {
  title: "Let's Go GoldButton",
  description: 'Be The Real YouTuber: Million',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Tailwind CSS를 인터넷에서 바로 가져옵니다 (설치 필요 없음) */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              theme: {
                extend: {
                  animation: {
                    'spin-slow': 'spin 3s linear infinite',
                  }
                }
              },
              // [중요] 동적 클래스가 누락되지 않도록 미리 지정 (Safelist)
              safelist: [
                'bg-red-600', 'bg-rose-800', 'bg-orange-700',
                'bg-sky-600', 'bg-indigo-600', 'bg-violet-700',
                'bg-yellow-500', 'bg-orange-500', 'bg-amber-600',
                'bg-emerald-500', 'bg-green-700',
                'bg-purple-600', 'bg-pink-600',
                'bg-stone-500', 'bg-zinc-600'
              ]
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              background-color: #020617; /* slate-950 */
              color: white;
            }
            /* 스크롤바 숨기기 */
            ::-webkit-scrollbar {
              width: 0px;
              background: transparent;
            }
          `
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}