import { NextRequest, NextResponse } from 'next/server';

// Password-protects /admin with a browser login pop-up.
export function middleware(req: NextRequest) {
  const user = process.env.ADMIN_USER;
  const pass = process.env.ADMIN_PASSWORD;
  if (!user || !pass) return new NextResponse('Admin is not configured.', { status: 503 });

  const header = req.headers.get('authorization') || '';
  if (header.startsWith('Basic ')) {
    try {
      const [u, ...rest] = atob(header.slice(6)).split(':');
      if (u === user && rest.join(':') === pass) return NextResponse.next();
    } catch {}
  }
  return new NextResponse('Login required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin"' },
  });
}

export const config = { matcher: ['/admin/:path*'] };
