import type { Metadata } from 'next'
import './globals.css'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'Blog Posts - Next.js 14 with Cloudflare Pages',
  description: 'A blog built with Next.js 14 and Cloudflare Pages',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white">
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
} 