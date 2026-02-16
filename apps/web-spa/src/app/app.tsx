import { useState } from 'react';
import { fetchProfile, buildImageUrl } from '@erasys/profile-sdk';
import type { Profile } from '@erasys/profile-sdk';

const FEATURED_USERNAME = 'msescortplus';

export function App() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'home' | 'profile'>('home');

  const loadProfile = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchProfile({
        baseUrl: '',
        username: FEATURED_USERNAME,
      });
      setProfile(data);
      setView('profile');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to load profile'
      );
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    setView('home');
    setProfile(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 antialiased">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={goHome}
            className="flex items-center gap-2"
          >
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
            <span className="ml-2 rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold uppercase text-emerald-700">
              SPA
            </span>
          </button>
          {view === 'profile' && (
            <button
              onClick={goHome}
              className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                />
              </svg>
              Home
            </button>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {view === 'home' && (
          <HomeView
            onExplore={loadProfile}
            loading={loading}
            error={error}
          />
        )}
        {view === 'profile' && profile && (
          <ProfileView profile={profile} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl px-4 py-8 text-center sm:px-6 lg:px-8">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Erasys Gallery SPA. Built with
            React, Vite &amp; Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ───────── Home View ───────── */

function HomeView({
  onExplore,
  loading,
  error,
}: {
  onExplore: () => void;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div>
      <section className="bg-gradient-to-br from-emerald-600 via-emerald-700 to-teal-800 text-white">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
              Client-Side Rendered
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
              Erasys Gallery
              <span className="text-emerald-200"> SPA</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-emerald-100">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation.
            </p>
            <div className="mt-10">
              <button
                onClick={onExplore}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-emerald-700 shadow-lg transition-all hover:bg-emerald-50 hover:shadow-xl disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <svg
                      className="h-5 w-5 animate-spin"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Loading...
                  </>
                ) : (
                  <>
                    Explore Featured Profile
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
            {error && (
              <p className="mt-4 rounded-lg bg-red-500/20 px-4 py-2 text-sm text-red-100">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold text-gray-900 sm:text-3xl">
            What Makes This Different?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aute
            irure dolor in reprehenderit in voluptate velit esse.
          </p>
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Client-Side Rendering
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim
                ad minim veniam, quis nostrud exercitation.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.959.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0Z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Shared SDK
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-gray-900">
                Fully Responsive
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ───────── Profile View ───────── */

function ProfileView({ profile }: { profile: Profile }) {
  return (
    <div>
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
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {profile.name}
                </h1>
                {profile.is_plus && (
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
                    PLUS
                  </span>
                )}
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    profile.online_status === 'ONLINE'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      profile.online_status === 'ONLINE'
                        ? 'bg-green-500'
                        : 'bg-gray-400'
                    }`}
                  />
                  {profile.online_status}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{profile.headline}</p>
              <p className="mt-2 text-sm text-gray-500">
                {profile.location.name}, {profile.location.country}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          Photos
          <span className="ml-2 text-base font-normal text-gray-500">
            ({profile.pictures.length})
          </span>
        </h2>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {profile.pictures.map((pic) => (
            <div
              key={pic.id}
              className="group relative aspect-square overflow-hidden rounded-xl bg-gray-200 shadow-sm transition-shadow hover:shadow-md"
            >
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
            <span className="ml-2 text-base font-normal text-gray-500">
              ({profile.reviews.length})
            </span>
          </h2>
          <div className="mt-6 space-y-4">
            {profile.reviews.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <span className="text-sm font-medium text-gray-900">
                    {review.reviewer_name || 'Anonymous'}
                  </span>
                  <time className="text-xs text-gray-400">
                    {new Date(review.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default App;