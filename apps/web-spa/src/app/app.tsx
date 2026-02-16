import { useEffect, useState } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchProfile, buildImageUrl } from '@erasys/profile-sdk';
import type { Profile } from '@erasys/profile-sdk';

const FEATURED_USERNAME = 'msescortplus';

/* ═══════════════════ App Shell ═══════════════════ */

export function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50 antialiased">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

/* ═══════════════════ Header ═══════════════════ */

function Header() {
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

/* ═══════════════════ Footer ═══════════════════ */

function Footer() {
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
              Client-side rendered for interactivity, optimized for every screen.
            </p>
          </div>
          <nav>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300">
              Navigation
            </h3>
            <ul className="mt-3 space-y-2">
              <li>
                <Link to="/" className="text-sm transition-colors hover:text-white">
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
          <p>&copy; {new Date().getFullYear()} Erasys Gallery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ Home Page ═══════════════════ */

function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Client-Side Rendered
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Discover Profiles.
              <br className="hidden sm:block" />
              <span className="text-emerald-200">Browse Galleries.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-emerald-100 sm:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                to={`/profile/${FEATURED_USERNAME}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl sm:w-auto"
              >
                Explore Featured Profile
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-medium text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Learn More
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-gray-200 sm:grid-cols-4">
          <StatItem value="Instant" label="Client Rendering" />
          <StatItem value="20+" label="Photos per Profile" />
          <StatItem value="100%" label="Mobile Responsive" />
          <StatItem value="Vite" label="Bundler" className="hidden sm:block" />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-600">
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              From API to Gallery in Milliseconds
            </h2>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
              irure dolor in reprehenderit in voluptate velit esse cillum dolore
              eu fugiat nulla pariatur.
            </p>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              step="01"
              title="Fetch Profile Data"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
            />
            <FeatureCard
              step="02"
              title="Render on the Client"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
            />
            <FeatureCard
              step="03"
              title="Optimized Delivery"
              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae."
            />
          </div>
        </div>
      </section>

      {/* Featured Profile CTA */}
      <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl">
            <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to See It in Action?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-emerald-100">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt.
              </p>
              <Link
                to={`/profile/${FEATURED_USERNAME}`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
                View {FEATURED_USERNAME}'s Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ═══════════════════ Profile Page ═══════════════════ */

function ProfilePage() {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    setLoading(true);
    setError(null);
    setProfile(null);

    fetchProfile({ baseUrl: '', username })
      .then((data) => {
        if (!cancelled) setProfile(data);
      })
      .catch((err) => {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to load profile');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <svg className="h-10 w-10 animate-spin text-emerald-600" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <p className="mt-4 text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">Profile Not Found</h1>
        <p className="mt-2 text-gray-600">
          Could not load profile for &ldquo;{username}&rdquo;.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="transition-colors hover:text-emerald-600">
              Home
            </Link>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
            <span className="font-medium text-gray-900">{profile.name}</span>
          </nav>
        </div>
      </div>

      {/* Profile Header */}
      <section className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-emerald-100 sm:h-32 sm:w-32">
              <img
                src={buildImageUrl(profile.preview_pic.url_token)}
                alt={`${profile.name}'s avatar`}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{profile.name}</h1>
                {profile.is_plus && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">PLUS</span>
                )}
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${profile.online_status === 'ONLINE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${profile.online_status === 'ONLINE' ? 'bg-green-500' : 'bg-gray-400'}`} />
                  {profile.online_status}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{profile.headline}</p>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 sm:justify-start">
                <span className="inline-flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                  {profile.location.name}, {profile.location.country}
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  Age: {profile.personal.age}
                </span>
                {profile.personal.spoken_languages.length > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802" />
                    </svg>
                    {profile.personal.spoken_languages.map((l) => l.toUpperCase()).join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">About</h2>
        {profile.personal.profile_text && (
          <p className="mt-3 max-w-3xl break-words leading-relaxed text-gray-600">{profile.personal.profile_text}</p>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailCard label="Height" value={`${profile.personal.height} cm`} />
          <DetailCard label="Weight" value={`${profile.personal.weight} kg`} />
          <DetailCard label="Body Type" value={profile.personal.body_type} />
          <DetailCard label="Eye Color" value={profile.personal.eye_color} />
          <DetailCard label="Hair Color" value={profile.personal.hair_color} />
          <DetailCard label="Hair Length" value={profile.personal.hair_length} />
          <DetailCard label="Orientation" value={profile.personal.orientation} />
          <DetailCard label="Smoker" value={profile.personal.smoker} />
        </div>
      </section>

      {/* Photo Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          Photos
          <span className="ml-2 text-base font-normal text-gray-500">({profile.pictures.length})</span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {profile.pictures.map((pic) => (
            <div key={pic.id} className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-shadow hover:shadow-md">
              <img
                src={buildImageUrl(pic.url_token)}
                alt={pic.comment || `Photo of ${profile.name}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {pic.comment && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="truncate text-xs text-white">{pic.comment}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      {profile.reviews.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">
            Reviews
            <span className="ml-2 text-base font-normal text-gray-500">({profile.reviews.length})</span>
          </h2>
          <div className="mt-6 space-y-4">
            {profile.reviews.slice(0, 6).map((review) => (
              <div key={review.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm font-medium ${review.reviewer_name ? 'text-gray-900' : 'text-gray-400'}`}>
                      {review.reviewer_name || 'Anonymous'}
                    </span>
                    {review.vote !== undefined && (
                      <span className={`text-sm ${review.vote > 0 ? 'text-green-600' : review.vote < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                        {review.vote > 0 ? '+1' : review.vote < 0 ? '-1' : '0'}
                      </span>
                    )}
                  </div>
                  <time className="text-xs text-gray-400">
                    {new Date(review.updated_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.comment}</p>
                {review.reply && (
                  <div className="mt-3 rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-emerald-600">Reply</p>
                    <p className="mt-1 text-sm text-gray-600">{review.reply.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social Links */}
      {profile.social_links.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900">Social</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {profile.social_links.map((link) => (
              <span key={link.type} className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                <span className="capitalize">{link.type}</span>
                <span className="text-gray-400">@{link.value}</span>
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

/* ═══════════════════ Shared Components ═══════════════════ */

function DetailCard({ label, value }: { label: string; value: string }) {
  const display = value.replace(/_/g, ' ');
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
      <p className="text-xs font-medium uppercase tracking-wider text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-semibold capitalize text-gray-900">{display.toLowerCase()}</p>
    </div>
  );
}

function StatItem({ value, label, className = '' }: { value: string; label: string; className?: string }) {
  return (
    <div className={`px-4 py-6 text-center sm:px-6 ${className}`}>
      <p className="text-2xl font-bold text-emerald-600 sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">{label}</p>
    </div>
  );
}

function FeatureCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
          <span className="text-lg font-bold">{step}</span>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
    </article>
  );
}

export default App;
