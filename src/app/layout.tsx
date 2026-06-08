import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'A Secret Story',
  description: 'A premium personal memory website crafted for a best friend.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
