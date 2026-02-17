import { Link } from 'react-router-dom';
import { FEATURED_USERNAME } from '../constants';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <span className="text-lg font-bold text-white">
              Erasys<span className="text-emerald-400"> Gallery</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed">
              Discover user profiles and browse beautiful photo galleries.
              Client-side rendered for interactivity, optimized for every
              screen.
            </p>
          </div>
          <nav>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to={`/profile/${FEATURED_USERNAME}`}
                  className="text-sm transition-colors hover:text-white"
                >
                  Featured Profile
                </Link>
              </li>
            </ul>
          </nav>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Built With
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>React (SPA)</li>
              <li>Vite &amp; TypeScript</li>
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
