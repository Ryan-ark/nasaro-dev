"use client"

import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import AnimatedBackground from "@/components/effects/animated-background"
import { PortfolioProvider } from "./context/PortfolioContext"
import CursorEffect from "@/components/effects/cursor-effect"
import ImageProvider from "@/components/image-provider"

const inter = Inter({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <title>Ryan Elico | Software Engineer | nasaro.dev</title>
        <meta 
          name="description" 
          content="Ryan Elico - Software Engineer specializing in Next.js, Laravel, React Native, and WordPress development."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={cn(inter.className, "bg-n-8 text-n-1 antialiased")} suppressHydrationWarning>
        <PortfolioProvider>
          <ImageProvider>
            <AnimatedBackground />
            <CursorEffect />
            {children}
          </ImageProvider>
        </PortfolioProvider>
      </body>
    </html>
  )
}
