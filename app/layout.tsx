import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Grupo 1',
  description: 'Grupo 1'
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
