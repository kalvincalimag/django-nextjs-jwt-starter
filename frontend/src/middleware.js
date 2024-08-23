import { NextResponse } from 'next/server'

export function middleware(request) {
  const isAuthenticated = request.cookies.get('auth_token')
  
  if (!isAuthenticated && !['/login', '/register'].includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
