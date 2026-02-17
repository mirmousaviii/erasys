import { Link, useLocation } from 'react-router-dom';
import { FEATURED_USERNAME } from '../constants';

export function Header() {
  const { pathname } = useLocation();
  const isProfilePage = pathname.startsWith('/profile/');

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <svg
            className="h-7 w-7 text-emerald-600 sm:h-8 sm:w-8"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
          <span className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl">
            Erasys<span className="text-emerald-600"> Gallery</span>
          </span>
          <span className="ml-1 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
            SPA
          </span>
        </Link>
        {!isProfilePage && (
          <div className="flex items-center gap-3 sm:gap-5">
            <Link
              to={`/profile/${FEATURED_USERNAME}`}
              className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700 sm:px-4 sm:py-2"
            >
              Sample Profile
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
