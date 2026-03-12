import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // FIRST: Redirect authenticated users away from signin
  if (token && pathname === '/signin') {
    return NextResponse.redirect(new URL('/getting-started', request.url));
  }

  // THEN: Check public routes
  const publicPaths = ['/home', '/signin', '/register', '/about', '/api'];
  const isPublic = publicPaths.some((path) => pathname.startsWith(path));
  
  if (isPublic) {
    return NextResponse.next();
  }

  // Protected route logic...
  const protectedPaths = ['/playground', '/getting-started'];
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if (isProtected && !token) {
    const signInUrl = new URL('/signin', request.url);
    signInUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}