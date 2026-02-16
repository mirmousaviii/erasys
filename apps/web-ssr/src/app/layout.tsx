import './global.css';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { HeaderCta } from './components/header-cta';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#4f46e5',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://erasys-gallery.com'),
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
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Erasys Gallery',
    description: 'Discover user profiles and browse curated photo galleries.',
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
          <svg
            className="h-7 w-7 text-indigo-600 sm:h-8 sm:w-8"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
