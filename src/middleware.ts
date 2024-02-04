import { auth, authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";

export default authMiddleware({ 
   
  publicRoutes: ["/login"],
  afterAuth(auth, req:NextRequest, evt) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const url = new URL(req.nextUrl.clone());
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // Redirect logged in users to organization selection page if they are not active in an organization
    if (
      auth.userId &&
      req.nextUrl.pathname == "/login"
      ) {
      const url = new URL(req.nextUrl.clone());
      url.pathname = "/";
      return NextResponse.redirect(url);
    }
    // If the user is logged in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
