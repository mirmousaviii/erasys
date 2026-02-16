import { NextResponse } from 'next/server';

const API_BASE = 'https://www.hunqz.com';

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
      return NextResponse.json(
        { error: `Profile not found: ${username}` },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
      },
    });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch profile' },
      { status: 502 },
    );
  }
}
