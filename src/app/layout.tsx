import type { Metadata } from 'next'
import './globals.css'
import { SessionWrapper } from './SessionWrapper'

export const metadata: Metadata = {
  title: 'ShutterSeek',
  description: 'Find. Book. Capture.',
  generator: 'ShutterSeek',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>{children}</SessionWrapper>
      </body>
    </html>
  )
}
