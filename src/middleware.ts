import { NextResponse, NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup';
  const token = request.cookies.get('token')?.value || "";

  // If user is logged in and tries to access login/signup, redirect to home
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // If user is not logged in and tries to access protected routes, redirect to login
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  // Otherwise, continue
  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup'],
};
  