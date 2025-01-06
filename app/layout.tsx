import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { siteMetadata } from '@/constants/metadata'
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = siteMetadata

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-white min-h-screen`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

