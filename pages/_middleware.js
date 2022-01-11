import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  if ((req.nextUrl.pathname === "/admin")||(req.nextUrl.pathname.includes("/adm_location/"))||(req.nextUrl.pathname.includes("/api/admin"))) {
    const session = await getToken({ req, secret: process.env.SECRET })
    if ((!session)||(session.status!=='admin')) return NextResponse.redirect("/login")
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/profile") {
    const session = await getToken({ req, secret: process.env.SECRET })
    if ((req.nextUrl.pathname === "/profile")&& !session) return NextResponse.redirect("/login")
    // If user is authenticated, continue.
  }
}
