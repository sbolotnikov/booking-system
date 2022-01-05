import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
// import Users from '../models/userModel';
import db from '../utils/db';
/** @param {import("next/server").NextRequest} req */
export async function middleware(req) {
  if ((req.nextUrl.pathname === "/admin")||(req.nextUrl.pathname.includes("/adm_location/"))||(req.nextUrl.pathname.includes("/api/admin"))) {
    const session = await getToken({ req, secret: process.env.SECRET })
  //   await db.connect(); 
  //   const result = await Users.findOne({
  //     email: session.email,
  // });
  //   await db.disconnect(); 
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    // console.log("session in middleware", session.status)
    if ((!session)||(session.status!=='admin')) return NextResponse.redirect("/login")
    // If user is authenticated, continue.
  }
}
