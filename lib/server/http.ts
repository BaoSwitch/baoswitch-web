import { NextResponse, type NextRequest } from "next/server";

/** An absolute redirect that survives running behind Traefik/Cloudflare,
 *  where request.url carries the container's address, not the site's. */
export function redirectTo(req: NextRequest, path: string) {
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? req.nextUrl.host;
  const proto = req.headers.get("x-forwarded-proto")?.split(",")[0] ?? req.nextUrl.protocol.replace(":", "");
  // 303 turns the form POST into a GET of the destination.
  return NextResponse.redirect(new URL(path, `${proto}://${host}`), 303);
}

/** Refuses cross-site writes. Cookies are SameSite=Lax; this is the second lock. */
export function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return req.headers.get("sec-fetch-site") !== "cross-site";
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export function e(path: string, code: string) {
  return `${path}?e=${encodeURIComponent(code)}`;
}
