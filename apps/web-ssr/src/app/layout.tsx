import './global.css';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { ImageIcon } from 'lucide-react';
import { HeaderCta } from './components/header-cta';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://erasys-gallery.com'),
  applicationName: 'Erasys Gallery',
  referrer: 'strict-origin-when-cross-origin',
  title: {
    default: 'Erasys Gallery — Discover & Browse User Profiles',
    template: '%s | Erasys Gallery',
  },
  description:
    'Discover user profiles and browse curated photo galleries. Fast, beautiful, and optimized for every device.',
  keywords: [
    'profile gallery',
    'user profiles',
    'photo gallery',
    'erasys',
    'browse profiles',
  ],
  authors: [{ name: 'Erasys' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Erasys Gallery',
    title: 'Erasys Gallery — Discover & Browse User Profiles',
    description:
      'Discover user profiles and browse curated photo galleries. Fast, beautiful, and optimized for every device.',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Erasys Gallery — Discover & Browse User Profiles',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erasys Gallery',
    description: 'Discover user profiles and browse curated photo galleries.',
    images: ['/og-default.png'],
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
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex items-center gap-2"
          aria-label="Erasys Gallery — Home"
        >
          <ImageIcon
            className="h-7 w-7 text-indigo-600 sm:h-8 sm:w-8"
            strokeWidth={1.5}
            aria-hidden
          />
          <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Erasys<span className="text-indigo-600"> Gallery</span>
          </span>
          <span className="ml-1 rounded bg-indigo-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-indigo-700">
            SSR
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <HeaderCta />
        </div>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold text-white">
              Erasys<span className="text-indigo-400"> Gallery</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              Discover user profiles and browse beautiful photo galleries.
              Server-rendered for speed, optimized for every screen.
            </p>
          </div>
          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/profile/msescortplus"
                  className="text-sm transition-colors hover:text-white"
                >
                  Featured Profile
                </Link>
              </li>
            </ul>
          </nav>
          {/* Built with */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Built With
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Next.js (SSR)</li>
              <li>React &amp; TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Nx Monorepo</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-xs">
          <p>
            &copy; {new Date().getFullYear()} Erasys Gallery. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gray-50 antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
