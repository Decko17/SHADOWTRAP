import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === '/beat-profile') {
    return NextResponse.redirect(new URL('/beat-profile-fixed', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/beat-profile'],
};
