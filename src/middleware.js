import { NextResponse } from "next/server";

// Define the name of the cookie flag set by the client after successful login
const AUTH_FLAG_COOKIE_NAME = "is_authenticated";

// This function runs on the server/edge before routes are accessed
export default function middleware(request) {
  // Check for the existence of the simple authentication flag cookie
  const isAuthenticated = request.cookies.get(AUTH_FLAG_COOKIE_NAME);

  // If the flag is not present, redirect the user to the home/login page
  if (!isAuthenticated) {
    // You may want to redirect to /login instead of /
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // If the flag is present, allow the request to proceed
  return NextResponse.next();
}

// Routes to apply this middleware to
export const config = {
  matcher: ["/add/:path*", "/manage/:path*"],
};
