import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impresio Studio',
  description: 'Impresio Studio',
  generator: 'Impresio Studio',
  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
