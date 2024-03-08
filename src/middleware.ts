import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

// The `middleware` function is an async function that takes a `req` object and returns a `res` object. The `req` object is the incoming request, and the `res` object is the response that will be sent back to the client. The `middleware` function is a Next.js middleware function, which means that it can be used to run code on every request that comes into the server. In this case, the `middleware` function is used to check if the user is logged in, and if they are not, it redirects them to the login page.
export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // create a supabase client using the createMiddlewareClient function from the @supabase/auth-helpers-nextjs package
  // The createMiddlewareClient function takes a `req` object and returns a supabase client that is configured to use the session cookie from the request. This allows the supabase client to be used in the middleware function to check if the user is logged in.
  const supabase = createMiddlewareClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  // console.log("session", session);
  // You will get `session null` if the user is not logged in, but if the user is logged in, you will get the session object.
  if (!session) {
    // If the user is not logged in, redirect them to the login page.
    return NextResponse.rewrite(new URL("/login", req.url));
  }
  // If the user is logged in, return the response object.
  return res;
}

// the matcher in config is a regex that matches all routes except for the ones that start with /api, /_next/static, /_next/image, and /favicon.ico. This is to ensure that the middleware only runs on the routes that are not part of the API or the static assets.
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
