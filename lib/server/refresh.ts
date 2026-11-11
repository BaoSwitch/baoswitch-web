import { api, type Tokens } from "./api";

/** Refresh tokens are single use, and a page often fires several requests at
 *  once. Without this, the second one would present an already-rotated token
 *  and the API would end the session. Concurrent callers share one refresh. */
export type Refreshed = Tokens | null | "unavailable";

const inflight = new Map<string, Promise<Refreshed>>();
const recent = new Map<string, { at: number; tokens: Tokens | null }>();

/** Returns the new pair, null when the API says the refresh token is dead
 *  (the person must sign in again), or "unavailable" when the API could not
 *  answer (timeout, 5xx, 429). Only null may end the session: a blip on our
 *  side must never log anyone out. */
export function refreshTokens(refreshToken: string, forwardedFor: string | null, deviceId?: string): Promise<Refreshed> {
  const done = recent.get(refreshToken);
  // A request that raced us may arrive just after the first refresh finished,
  // still carrying the old cookie. Hand it the same new pair.
  if (done && Date.now() - done.at < 15_000) return Promise.resolve(done.tokens);

  const running = inflight.get(refreshToken);
  if (running) return running;

  const p = api<Tokens>("/v1/auth/refresh", { body: { refresh_token: refreshToken, device_id: deviceId }, forwardedFor })
    .then((r): Refreshed => {
      if (r.ok) return r.data;
      // Only an explicit rejection of the token is a sign-out.
      return r.status === 401 || r.status === 400 || r.status === 403 ? null : "unavailable";
    })
    .then((tokens) => {
      if (tokens !== "unavailable") {
        recent.set(refreshToken, { at: Date.now(), tokens });
        setTimeout(() => recent.delete(refreshToken), 15_000).unref?.();
      }
      return tokens;
    })
    .finally(() => inflight.delete(refreshToken));
  inflight.set(refreshToken, p);
  return p;
}
