import { api, type Tokens } from "./api";

/** Refresh tokens are single use, and a page often fires several requests at
 *  once. Without this, the second one would present an already-rotated token
 *  and the API would end the session. Concurrent callers share one refresh. */
const inflight = new Map<string, Promise<Tokens | null>>();
const recent = new Map<string, { at: number; tokens: Tokens | null }>();

export function refreshTokens(refreshToken: string, forwardedFor: string | null, deviceId?: string): Promise<Tokens | null> {
  const done = recent.get(refreshToken);
  // A request that raced us may arrive just after the first refresh finished,
  // still carrying the old cookie. Hand it the same new pair.
  if (done && Date.now() - done.at < 15_000) return Promise.resolve(done.tokens);

  const running = inflight.get(refreshToken);
  if (running) return running;

  const p = api<Tokens>("/v1/auth/refresh", { body: { refresh_token: refreshToken, device_id: deviceId }, forwardedFor })
    .then((r) => (r.ok ? r.data : null))
    .then((tokens) => {
      recent.set(refreshToken, { at: Date.now(), tokens });
      setTimeout(() => recent.delete(refreshToken), 15_000).unref?.();
      return tokens;
    })
    .finally(() => inflight.delete(refreshToken));
  inflight.set(refreshToken, p);
  return p;
}
