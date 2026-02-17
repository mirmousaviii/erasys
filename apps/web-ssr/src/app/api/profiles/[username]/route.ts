import { NextResponse } from 'next/server';
import { fetchProfile } from '@erasys/profile-sdk';

const API_BASE = process.env.API_BASE_URL || 'https://www.hunqz.com';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
} as const;

function jsonWithCors(
  data: unknown,
  init: { status?: number; headers?: HeadersInit } = {},
) {
  return NextResponse.json(data, {
    ...init,
    headers: { ...CORS_HEADERS, ...init.headers },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ username: string }> },
) {
  const { username } = await params;

  try {
    const profile = await fetchProfile({ baseUrl: API_BASE, username });
    return jsonWithCors(profile);
  } catch (err) {
    const message =
      err instanceof Error ? err.message : 'Failed to fetch profile';
    const isNotFound =
      message.includes('404') || message.includes('not found');
    return jsonWithCors(
      { error: message },
      { status: isNotFound ? 404 : 502 },
    );
  }
}
