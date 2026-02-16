import Image from 'next/image';
import { fetchProfile, buildImageUrl } from '@erasys/profile-sdk';
import type { Metadata } from 'next';

const API_BASE = 'https://www.hunqz.com';
const USERNAME = 'msescortplus';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await fetchProfile({ baseUrl: API_BASE, username: USERNAME });

  return {
    title: `${profile.name} | Profile Gallery`,
    description: profile.headline,
    openGraph: {
      title: `${profile.name} | Profile Gallery`,
      description: profile.headline,
      images: [
        {
          url: buildImageUrl(profile.preview_pic.url_token),
          width: profile.preview_pic.width,
          height: profile.preview_pic.height,
        },
      ],
    },
  };
}

export default async function HomePage() {
  const profile = await fetchProfile({ baseUrl: API_BASE, username: USERNAME });

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full">
              <Image
                src={buildImageUrl(profile.preview_pic.url_token)}
                alt={`${profile.name}'s avatar`}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                {profile.name}
              </h1>
              <p className="mt-1 text-gray-600">{profile.headline}</p>
              <p className="mt-1 text-sm text-gray-500">
                {profile.location.name}, {profile.location.country}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Photo Grid */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-6 text-xl font-semibold text-gray-900">
          Photos ({profile.pictures.length})
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {profile.pictures.map((pic) => (
            <div
              key={pic.id}
              className="group relative aspect-square overflow-hidden rounded-lg bg-gray-200"
            >
              <Image
                src={buildImageUrl(pic.url_token)}
                alt={pic.comment || `Photo of ${profile.name}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
