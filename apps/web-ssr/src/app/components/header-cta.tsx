'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const FEATURED_USERNAME = 'msescortplus';

export function HeaderCta() {
  const pathname = usePathname();
  const isProfilePage = pathname.startsWith('/profile/');

  if (isProfilePage) return null;

  return (
    <Link
      href={`/profile/${FEATURED_USERNAME}`}
      className="rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 sm:px-4 sm:py-2"
    >
      Sample Profile
    </Link>
  );
}
