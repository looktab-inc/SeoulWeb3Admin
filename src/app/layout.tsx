import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Recoil from "@/components/Recoil";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NUPY',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr">
      <body className={inter.className}>
        <Recoil>
          {children}
        </Recoil>
      </body>
    </html>
  )
}
