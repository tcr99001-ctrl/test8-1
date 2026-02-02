import './globals.css'; // [중요] globals.css를 여기서 불러와야 합니다.

export const metadata = {
  title: "Murder Tool",
  description: 'The Tool of Doubt & Truth',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body className="bg-black text-white antialiased overflow-hidden">
        {children}
      </body>
    </html>
  )
}