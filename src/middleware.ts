import { authMiddleware } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/login"],
  afterAuth(auth, req:NextRequest){
        if (auth.userId && req.nextUrl.pathname === '/login'){
          const url = req.nextUrl.clone()
          url.pathname = '/'
          return NextResponse.redirect(url)
        }
  }
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};