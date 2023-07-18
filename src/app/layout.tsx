import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NotificationProvider } from './context/notification';
import './globals.css';
import { NextAuthProvider } from './providers';

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
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
