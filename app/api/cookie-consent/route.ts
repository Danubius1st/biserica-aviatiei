import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { consent } = await request.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set('cookieConsent', consent ? 'true' : 'false', {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });

  return response;
}
