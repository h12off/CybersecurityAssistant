import type { Metadata, Viewport } from 'next'
import { Share_Tech_Mono } from 'next/font/google'
import './globals.css'

const techMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['monospace'],
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#000000',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://cybersecurity-assistant.vercel.app'),
  title: {
    default: 'AI-Powered Cybersecurity Assistant | Expert Security Guidance',
    template: '%s | Cybersecurity Assistant'
  },
  description: 'Get expert cybersecurity guidance with our AI-powered assistant. Real-time threat analysis, security best practices, and professional advice for your cybersecurity needs.',
  keywords: 'cybersecurity assistant, AI security, cyber threat analysis, security guidance, cybersecurity expert, AI cybersecurity tool, security best practices, cyber defense, information security, network security',
  authors: [{ name: 'Salma Ait Nassir' }],
  creator: 'Salma Ait Nassir',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cybersecurity-assistant.vercel.app',
    title: 'AI-Powered Cybersecurity Assistant | Expert Security Guidance',
    description: 'Get expert cybersecurity guidance with our AI-powered assistant. Real-time threat analysis, security best practices, and professional advice.',
    siteName: 'Cybersecurity Assistant',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Powered Cybersecurity Assistant',
    description: 'Expert cybersecurity guidance powered by AI',
    creator: '@salmaaitnassir',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <link rel="canonical" href="https://cybersecurity-assistant.vercel.app" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </head>
      <body className={`${techMono.className} h-full bg-black text-green-400 antialiased`}>
        {children}
      </body>
    </html>
  )
}
