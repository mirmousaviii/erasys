import { NextResponse } from 'next/server';

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
    const response = await fetch(
      `${API_BASE}/api/opengrid/profiles/${encodeURIComponent(username)}`,
    );

    if (!response.ok) {
      return jsonWithCors(
        { error: `Profile not found: ${username}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return jsonWithCors(data);
  } catch {
    return jsonWithCors({ error: 'Failed to fetch profile' }, { status: 502 });
  }
}
