import { NextResponse, type NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  if (url.pathname.startsWith('/app')) {
    const hasSession = req.cookies.has('sb-access-token')
    if (!hasSession) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }
  return NextResponse.next()
}
