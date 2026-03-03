import { type NextRequest, NextResponse } from 'next/server';

const PUBLIC_PATHS = ['/login', '/onboarding'];

function isPublicPath(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`));
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname))
    // 공개 경로는 통과
    return NextResponse.next();

  const accessToken = request.cookies.get('accessToken')?.value;

  if (!accessToken) {
    // 토큰 없으면 로그인으로
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
};
