import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const LANDING_PATH = '/';
const BLOCKED_PREFIXES = ['/private', '/admin', '/client-portal/private'];

const looksSuspicious = (pathname: string) => {
  if (pathname.includes('\\')) return true;
  if (pathname.includes('//')) return true;
  if (pathname.includes('/./') || pathname.endsWith('/.')) return true;
  if (pathname.includes('/../') || pathname.endsWith('/..')) return true;
  return false;
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname || '/';

  if (pathname === LANDING_PATH) return NextResponse.next();

  if (looksSuspicious(pathname)) {
    const dest = req.nextUrl.clone();
    dest.pathname = LANDING_PATH;
    dest.search = '';
    return NextResponse.redirect(dest);
  }

  for (const p of BLOCKED_PREFIXES) {
    if (pathname === p || pathname.startsWith(`${p}/`)) {
      const dest = req.nextUrl.clone();
      dest.pathname = LANDING_PATH;
      dest.search = '';
      return NextResponse.redirect(dest);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|sw.js).*)'
  ]
};

