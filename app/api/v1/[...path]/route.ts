import { NextResponse, type NextRequest } from "next/server";
import { api, clientForwardedFor } from "@/lib/server/api";
import { sameOrigin } from "@/lib/server/http";
import { refreshTokens } from "@/lib/server/refresh";
import { AT, DEVICE, RT, clearSession, setSession } from "@/lib/server/session";

/**
 * The browser's only door to the API. It adds the bearer token from the
 * httpOnly cookie, refreshes it once on a 401, and passes the answer back.
 *
 * Auth endpoints (/v1/auth/*) are NOT proxied: sign-up, sign-in and sign-out
 * have their own routes under /api/auth that manage the cookies. Webhooks and
 * dev endpoints are never reachable from here.
 */
const BLOCKED = [/^\/v1\/auth\//, /^\/webhooks\//, /^\/dev\//];

async function handle(req: NextRequest, ctx: { params: Promise<{ path: string[] }> }) {
  const { path } = await ctx.params;
  const target = "/v1/" + path.join("/");
  if (BLOCKED.some((b) => b.test(target)) || path.some((p) => p === ".." || p === "")) {
    return NextResponse.json({ code: "NOT_FOUND", message: "Not found." }, { status: 404 });
  }
  const write = req.method !== "GET" && req.method !== "HEAD";
  if (write && !sameOrigin(req)) return NextResponse.json({ code: "FORBIDDEN", message: "Forbidden." }, { status: 403 });

  const forwardedFor = clientForwardedFor(req);
  const search = req.nextUrl.search;
  const body = write ? await req.json().catch(() => undefined) : undefined;
  const idem = req.headers.get("idempotency-key");

  let access = req.cookies.get(AT)?.value;
  const refresh = req.cookies.get(RT)?.value;
  let renewed: Awaited<ReturnType<typeof refreshTokens>> = null;

  // The access cookie lapses with the token; mint a new one up front.
  if (!access && refresh) {
    renewed = await refreshTokens(refresh, forwardedFor, req.cookies.get(DEVICE)?.value);
    access = renewed?.access_token;
  }
  if (!access) return signedOut();

  const call = (token: string) =>
    api(target + search, { method: req.method, body, token, forwardedFor, idempotencyKey: idem });

  let r = await call(access);
  if (r.status === 401 && refresh && !renewed) {
    renewed = await refreshTokens(refresh, forwardedFor, req.cookies.get(DEVICE)?.value);
    if (renewed) r = await call(renewed.access_token);
  }
  if (r.status === 401) return signedOut();

  const res =
    r.status === 204 ? new NextResponse(null, { status: 204 }) : NextResponse.json(r.data ?? null, { status: r.status });
  if (r.retryAfter) res.headers.set("Retry-After", String(r.retryAfter));
  res.headers.set("Cache-Control", "no-store");
  if (renewed) setSession(res, renewed);
  return res;
}

function signedOut() {
  const res = NextResponse.json({ code: "SESSION_EXPIRED", message: "Please sign in again." }, { status: 401 });
  clearSession(res);
  return res;
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE };
