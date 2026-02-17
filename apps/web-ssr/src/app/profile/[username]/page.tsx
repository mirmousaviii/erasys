import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { fetchProfile, buildImageUrl } from '@erasys/profile-sdk';

const API_BASE = process.env.API_BASE_URL || 'https://www.hunqz.com';

type PageProps = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;

  try {
    const profile = await fetchProfile({ baseUrl: API_BASE, username });

    return {
      title: `${profile.name}`,
      description: profile.headline,
      alternates: {
        canonical: `/profile/${username}`,
      },
      openGraph: {
        title: `${profile.name} | Erasys Gallery`,
        description: profile.headline,
        url: `/profile/${username}`,
        images: [
          {
            url: buildImageUrl(profile.preview_pic.url_token),
            width: profile.preview_pic.width,
            height: profile.preview_pic.height,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Profile Not Found',
      description:
        'The requested profile could not be found. It may have been removed or the username is incorrect.',
      robots: {
        index: false,
        follow: true,
      },
    };
  }
}

export default async function ProfilePage({ params }: PageProps) {
  const { username } = await params;

  let profile;
  try {
    profile = await fetchProfile({ baseUrl: API_BASE, username });
  } catch {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h1 className="text-2xl font-bold text-gray-900">Profile Not Found</h1>
        <p className="mt-2 text-gray-600">
          Could not load profile for &ldquo;{username}&rdquo;.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
        >
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
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-sm text-gray-500"
          >
            <Link href="/" className="transition-colors hover:text-indigo-600">
              Home
            </Link>
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            <span
              className="font-medium text-gray-900"
              aria-current="page"
            >
              {profile.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Profile Header */}
      <section className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-full ring-4 ring-indigo-100 sm:h-32 sm:w-32">
              <Image
                src={buildImageUrl(profile.preview_pic.url_token)}
                alt={`${profile.name}'s avatar`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {profile.name}
                </h1>
                {profile.is_plus && (
                  <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
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
              <div className="mt-3 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-500 sm:justify-start">
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                  {profile.location.name}, {profile.location.country}
                </span>
                <span className="inline-flex items-center gap-1">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                    />
                  </svg>
                  Age: {profile.personal.age}
                </span>
                {profile.personal.spoken_languages.length > 0 && (
                  <span className="inline-flex items-center gap-1">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                      />
                    </svg>
                    {profile.personal.spoken_languages
                      .map((l) => l.toUpperCase())
                      .join(', ')}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Details */}
      <section
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        aria-labelledby="about-heading"
      >
        <h2 id="about-heading" className="text-xl font-bold text-gray-900">
          About
        </h2>
        {profile.personal.profile_text && (
          <p className="mt-3 max-w-3xl leading-relaxed text-gray-600 break-words">
            {profile.personal.profile_text}
          </p>
        )}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <DetailCard label="Height" value={`${profile.personal.height} cm`} />
          <DetailCard label="Weight" value={`${profile.personal.weight} kg`} />
          <DetailCard label="Body Type" value={profile.personal.body_type} />
          <DetailCard label="Eye Color" value={profile.personal.eye_color} />
          <DetailCard label="Hair Color" value={profile.personal.hair_color} />
          <DetailCard
            label="Hair Length"
            value={profile.personal.hair_length}
          />
          <DetailCard
            label="Orientation"
            value={profile.personal.orientation}
          />
          <DetailCard label="Smoker" value={profile.personal.smoker} />
        </div>
      </section>

      {/* Photo Grid */}
      <section
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        aria-labelledby="photos-heading"
      >
        <h2 id="photos-heading" className="text-xl font-bold text-gray-900">
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
              <Image
                src={buildImageUrl(pic.url_token)}
                alt={pic.comment || `Photo of ${profile.name}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
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
        <section
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
          aria-labelledby="reviews-heading"
        >
          <h2 id="reviews-heading" className="text-xl font-bold text-gray-900">
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
                  <div className="flex items-center gap-2">
                    {review.reviewer_name && (
                      <span className="text-sm font-medium text-gray-900">
                        {review.reviewer_name}
                      </span>
                    )}
                    {!review.reviewer_name && (
                      <span className="text-sm font-medium text-gray-400">
                        Anonymous
                      </span>
                    )}
                    {review.vote !== undefined && (
                      <span
                        className={`text-sm ${
                          review.vote > 0
                            ? 'text-green-600'
                            : review.vote < 0
                              ? 'text-red-500'
                              : 'text-gray-400'
                        }`}
                      >
                        {review.vote > 0 ? '+1' : review.vote < 0 ? '-1' : '0'}
                      </span>
                    )}
                  </div>
                  <time className="text-xs text-gray-400">
                    {new Date(review.updated_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {review.comment}
                </p>
                {review.reply && (
                  <div className="mt-3 rounded-lg bg-gray-50 p-3">
                    <p className="text-xs font-medium text-indigo-600">Reply</p>
                    <p className="mt-1 text-sm text-gray-600">
                      {review.reply.text}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Social Links */}
      {profile.social_links.length > 0 && (
        <section
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
          aria-labelledby="social-heading"
        >
          <h2 id="social-heading" className="text-xl font-bold text-gray-900">
            Social
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {profile.social_links.map((link) => (
              <span
                key={link.type}
                className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
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

function DetailCard({ label, value }: { label: string; value: string }) {
  const display = value.replace(/_/g, ' ');

  return (
    <div className="rounded-lg border border-gray-200 bg-white px-4 py-3">
      <dl className="m-0">
        <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">
          {label}
        </dt>
        <dd className="mt-1 text-sm font-semibold capitalize text-gray-900">
          {display.toLowerCase()}
        </dd>
      </dl>
    </div>
  );
}
