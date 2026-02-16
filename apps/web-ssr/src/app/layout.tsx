import './global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Profile Gallery',
    template: '%s | Profile Gallery',
  },
  description: 'Browse user profiles and photo galleries',
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 antialiased">{children}</body>
    </html>
  );
}
