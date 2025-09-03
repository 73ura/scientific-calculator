import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '関数電卓',
  description: 'シンプルな関数電卓アプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
