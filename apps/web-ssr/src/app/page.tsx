import Link from 'next/link';

const FEATURED_USERNAME = 'msescortplus';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 text-white">
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
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-200">
              Photo Gallery Platform
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Discover Profiles.
              <br className="hidden sm:block" />
              <span className="text-indigo-200">Browse Galleries.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-indigo-100 sm:text-xl">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={`/profile/${FEATURED_USERNAME}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl sm:w-auto"
              >
                Explore Featured Profile
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-medium text-white transition-all hover:bg-white/10 sm:w-auto"
              >
                Learn More
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-gray-200 sm:grid-cols-4">
          <StatItem value="Instant" label="Page Load (SSR)" />
          <StatItem value="20+" label="Photos per Profile" />
          <StatItem value="100%" label="Mobile Responsive" />
          <StatItem value="A+" label="SEO Score" className="hidden sm:block" />
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
              How It Works
            </p>
            <h2 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl">
              From API to Gallery in Milliseconds
            </h2>
            <p className="mt-4 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
              aute irure dolor in reprehenderit in voluptate velit esse cillum
              dolore eu fugiat nulla pariatur.
            </p>
          </div>

          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              step="01"
              title="Fetch Profile Data"
              description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
                />
              }
            />
            <FeatureCard
              step="02"
              title="Render on the Server"
              description="Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7"
                />
              }
            />
            <FeatureCard
              step="03"
              title="Optimized Delivery"
              description="Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa quae."
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              }
            />
          </div>
        </div>
      </section>

      {/* Featured Profile CTA */}
      <section className="border-t border-gray-200 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl">
            <div className="px-6 py-12 text-center sm:px-12 sm:py-16">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to See It in Action?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-indigo-100">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                odit aut fugit, sed quia consequuntur magni dolores eos qui
                ratione voluptatem sequi nesciunt.
              </p>
              <Link
                href={`/profile/${FEATURED_USERNAME}`}
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-indigo-700 shadow-lg transition-all hover:bg-indigo-50 hover:shadow-xl"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                View {FEATURED_USERNAME}&apos;s Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function StatItem({
  value,
  label,
  className = '',
}: {
  value: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`px-4 py-6 text-center sm:px-6 ${className}`}>
      <p className="text-2xl font-bold text-indigo-600 sm:text-3xl">{value}</p>
      <p className="mt-1 text-xs font-medium text-gray-500 sm:text-sm">
        {label}
      </p>
    </div>
  );
}

function FeatureCard({
  step,
  title,
  description,
  icon,
}: {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <article className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:border-indigo-200 hover:shadow-md sm:p-8">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            {icon}
          </svg>
        </div>
        <span className="text-sm font-bold text-indigo-600">{step}</span>
      </div>
      <h3 className="mt-5 text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-600">
        {description}
      </p>
    </article>
  );
}
