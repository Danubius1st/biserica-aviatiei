import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: Request) {
  const location = request.headers.get('x-vercel-ip-city') || 'home';

  return NextResponse.json({ location });
}
