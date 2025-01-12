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
  metadataBase: new URL('https://www.sstrust.cloud'),
  title: {
    default: 'SSTrust | AI-Powered Cybersecurity Assistant',
    template: '%s | SSTrust Security'
  },
  description: 'Enhance your cybersecurity with SSTrust - Your AI-powered security assistant. Get expert guidance, real-time threat analysis, and professional cybersecurity advice.',
  keywords: 'SSTrust, cybersecurity assistant, AI security, cyber threat analysis, security guidance, cybersecurity expert, AI cybersecurity tool, security best practices, cyber defense, information security, network security',
  authors: [{ name: 'Salma Ait Nassir', url: 'https://github.com/h12off' }],
  creator: 'Salma Ait Nassir',
  publisher: 'SSTrust Security',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.sstrust.cloud',
    siteName: 'SSTrust Security',
    title: 'SSTrust | AI-Powered Cybersecurity Assistant',
    description: 'Enhance your cybersecurity with SSTrust - Your AI-powered security assistant. Get expert guidance and real-time threat analysis.',
    images: [
      {
        url: '/social-share.svg',
        width: 1200,
        height: 630,
        alt: 'SSTrust - AI-Powered Security Guidance',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SSTrust | AI Security Assistant',
    description: 'Expert cybersecurity guidance powered by AI',
    creator: '@salmaaitnassir',
    images: ['/social-share.svg'],
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
  icons: {
    icon: [
      { url: '/favicon.svg' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#00ff00',
      },
    ],
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black',
    title: 'SSTrust Security',
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
    other: {
      'norton-safeweb': 'your-norton-verification',
    },
  },
  category: 'Technology',
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
        <link rel="canonical" href="https://www.sstrust.cloud" />
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        
        {/* Favicon Tags */}
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00ff00" />
        <meta name="msapplication-TileColor" content="#000000" />

        {/* Social Media Tags */}
        <meta property="og:site_name" content="SSTrust Security" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:creator" content="@salmaaitnassir" />
        <meta name="twitter:site" content="@salmaaitnassir" />
        
        {/* Additional SEO Tags */}
        <meta name="referrer" content="origin-when-cross-origin" />
        <meta name="skype_toolbar" content="skype_toolbar_parser_compatible" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${techMono.className} h-full bg-black text-green-400 antialiased`}>
        {children}
      </body>
    </html>
  )
}
