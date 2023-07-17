import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'RV Project Manager',
  description: 'Simple Kanban CRUD Project Manager',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  )
}
