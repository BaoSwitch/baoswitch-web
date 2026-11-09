import { NextResponse, type NextRequest } from "next/server";

/** Sends signed-out visitors to /login before an /app page renders. This only
 *  checks that a session cookie exists; the API is what actually decides
 *  whether the token is good, and a dead one is cleared on the next call. */
export function proxy(req: NextRequest) {
  if (req.cookies.has("bs_rt")) return NextResponse.next();
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = { matcher: ["/app/:path*"] };
