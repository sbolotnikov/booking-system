import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"

export async function middleware(req) {
  const session = await getToken({ req, secret: process.env.SECRET })
  if ((req.nextUrl.pathname === "/admin")||(req.nextUrl.pathname === "/user_screen")||(req.nextUrl.pathname.includes("/adm_location/"))||(req.nextUrl.pathname.includes("/api/admin"))||(req.nextUrl.pathname.includes("/api/supervise"))) {
    if ((!session)||((session.status!=='super')&&(session.status!=='admin'))) return NextResponse.redirect("/login");

    if (((req.nextUrl.pathname === "/user_screen")||(req.nextUrl.pathname.includes("/api/supervise")))&&(session.status=='admin')) return NextResponse.redirect("/login")
    // If user is authenticated, continue.
  }

  if (req.nextUrl.pathname === "/profile") {
    if ((req.nextUrl.pathname === "/profile")&& !session) return NextResponse.redirect("/login")
    // If user is authenticated, continue.
  }
}
