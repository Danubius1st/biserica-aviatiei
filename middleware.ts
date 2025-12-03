import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth/auth';
import { getCookieCache } from 'better-auth/cookies';
import {
  publicRoutes,
  loginPath
} from '@/middleware/routes';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1️⃣ Verifică dacă ruta e publică
  const isPublic = publicRoutes.some((route) => {
    if (typeof route === 'string') return pathname === route;
    return route instanceof RegExp && route.test(pathname);
  });

  if (isPublic) return NextResponse.next();

  //2️⃣ Verifică dacă utilizatorul este logat
  // https://www.better-auth.com/docs/integrations/next#for-nextjs-release-1520-and-above

  // auth.api.getSession funcționează doar local:
  const session = await auth.api.getSession({
    headers: await headers()
  });

  // Implementare manuală pentru Edge Runtime:
  // const session = await getCookieCache(req);

  if (session) {
    console.log(`proxy:\n${JSON.stringify(session)}`);
  } else {
    return NextResponse.redirect(new URL(loginPath, req.nextUrl.origin));
  }

  return NextResponse.next();
};

// middleware rulează în Edge runtime → nu are acces la toate bibliotecile Node

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|auth|sitemap.xml|sw.js|manifest.webmanifest|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|json|webmanifest|js|woff2)$).*)'
  ],
};

/*
import { NextRequest, NextResponse } from 'next/server';
import { getSessionCookie } from 'better-auth/cookies';

const protectedRoutes = [
  '/profile',
  '/admin/dashboard',
];

export async function proxy(request: NextRequest) {
const { nextUrl } = request;
const sessionCookie = getSessionCookie(request);

const isLoggedIn = !!sessionCookie;
const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname);
const isOnAuthRoute = nextUrl.pathname.startsWith('/auth');

if (isOnProtectedRoute && !isLoggedIn) {
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

if (isOnAuthRoute && isLoggedIn) {
  return NextResponse.redirect(new URL('/profile', request.url));
}

return NextResponse.next();
}
*/
