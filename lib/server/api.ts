/**
 * Server-side client for the Baoswitch Go API.
 *
 * Browsers never talk to the API directly: they call this app's /api routes,
 * which hold the tokens in httpOnly cookies. That keeps tokens out of
 * JavaScript and removes the need for CORS on the API.
 */
export const API_URL = (process.env.API_URL ?? "http://localhost:8080").replace(/\/$/, "");

export type ApiResult<T = unknown> = {
  ok: boolean;
  status: number;
  data: T;
  retryAfter?: number;
};

export type ApiErrorBody = { code: string; message: string };

export type ApiUser = {
  id: string;
  phone: string;
  email?: string;
  first_name: string;
  last_name: string;
  tier: number;
  pin_set?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
};

export type Tokens = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
  user: ApiUser;
};

type Opts = {
  method?: string;
  body?: unknown;
  token?: string;
  /** The caller's address, forwarded so the API rate-limits the person, not us. */
  forwardedFor?: string | null;
  idempotencyKey?: string | null;
  signal?: AbortSignal;
};

export async function api<T = unknown>(path: string, opts: Opts = {}): Promise<ApiResult<T>> {
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.token) headers.Authorization = `Bearer ${opts.token}`;
  if (opts.forwardedFor) headers["X-Forwarded-For"] = opts.forwardedFor;
  if (opts.idempotencyKey) headers["Idempotency-Key"] = opts.idempotencyKey;

  try {
    const res = await fetch(`${API_URL}${path}`, {
      method: opts.method ?? (opts.body !== undefined ? "POST" : "GET"),
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      cache: "no-store",
      signal: opts.signal ?? AbortSignal.timeout(35_000),
    });
    const text = await res.text();
    let data: unknown = undefined;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = { code: "BAD_GATEWAY", message: "Unexpected response from the server." };
      }
    }
    const retry = Number(res.headers.get("Retry-After"));
    return {
      ok: res.ok,
      status: res.status,
      data: data as T,
      retryAfter: Number.isFinite(retry) && retry > 0 ? retry : undefined,
    };
  } catch {
    return {
      ok: false,
      status: 503,
      data: { code: "SERVICE_UNREACHABLE", message: "We couldn't reach the server. Try again shortly." } as T,
    };
  }
}

export function errorOf(r: ApiResult): ApiErrorBody {
  const d = r.data as Partial<ApiErrorBody> | undefined;
  return {
    code: d?.code ?? "ERROR",
    message: d?.message ?? "Something went wrong. Please try again.",
  };
}

/** The first address in X-Forwarded-For, which is the original caller. */
export function clientForwardedFor(req: Request): string | null {
  return req.headers.get("x-forwarded-for");
}
