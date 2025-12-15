import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Analitica X',
  description: 'Dashboard Analítico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
