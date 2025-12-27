import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI导航 - 中国AI网站集合',
  description: '发现最好的中国AI工具和平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}

