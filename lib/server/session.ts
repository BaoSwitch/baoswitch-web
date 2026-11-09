import { cookies } from "next/headers";
import type { NextResponse } from "next/server";
import type { Tokens } from "./api";

export const AT = "bs_at"; // access token, ~15 minutes
export const RT = "bs_rt"; // refresh token, single use
export const DEVICE = "bs_dev"; // stable per-browser id the API uses to trust a device
export const PENDING = "bs_pending"; // sealed sign-up / sign-in state between steps

const prod = process.env.NODE_ENV === "production";

const base = { httpOnly: true, sameSite: "lax" as const, secure: prod, path: "/" };

/** Writes the token pair onto a response. Refresh tokens rotate on every use. */
export function setSession(res: NextResponse, t: Pick<Tokens, "access_token" | "expires_in" | "refresh_token" | "refresh_expires_in">) {
  res.cookies.set(AT, t.access_token, { ...base, maxAge: Math.max(t.expires_in - 15, 1) });
  res.cookies.set(RT, t.refresh_token, { ...base, maxAge: t.refresh_expires_in });
}

export function clearSession(res: NextResponse) {
  res.cookies.set(AT, "", { ...base, maxAge: 0 });
  res.cookies.set(RT, "", { ...base, maxAge: 0 });
  res.cookies.set(PENDING, "", { ...base, maxAge: 0 });
}

/** The browser's device id and whether it was just minted. Pass the result to
 *  keepDevice() on the response you return so a new id is actually stored. */
export async function getDevice(): Promise<{ id: string; fresh: boolean }> {
  const existing = (await cookies()).get(DEVICE)?.value;
  return existing ? { id: existing, fresh: false } : { id: crypto.randomUUID(), fresh: true };
}

export function keepDevice<R extends NextResponse>(res: R, d: { id: string; fresh: boolean }): R {
  if (d.fresh) res.cookies.set(DEVICE, d.id, { ...base, maxAge: 60 * 60 * 24 * 365 });
  return res;
}

/* ── Sealed cookie ─────────────────────────────────────────────────────────
   Sign-up needs the password at the verify step, after the code is sent. It
   cannot sit in the page, so it is sealed (AES-256-GCM) into an httpOnly
   cookie that lives for the length of the code. SESSION_SECRET must be set in
   production; losing it only invalidates in-flight sign-ups. */

async function key(): Promise<CryptoKey> {
  const secret = process.env.SESSION_SECRET;
  if (!secret && prod) throw new Error("SESSION_SECRET is required in production");
  const raw = new TextEncoder().encode(secret ?? "dev-only-insecure-session-secret");
  const digest = await crypto.subtle.digest("SHA-256", raw);
  return crypto.subtle.importKey("raw", digest, "AES-GCM", false, ["encrypt", "decrypt"]);
}

const b64 = (u: Uint8Array) => Buffer.from(u).toString("base64url");
const unb64 = (s: string) => new Uint8Array(Buffer.from(s, "base64url"));

export async function seal(value: unknown): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = new TextEncoder().encode(JSON.stringify(value));
  const ct = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await key(), data));
  return `${b64(iv)}.${b64(ct)}`;
}

export async function unseal<T>(token: string | undefined): Promise<T | null> {
  if (!token) return null;
  const [iv, ct] = token.split(".");
  if (!iv || !ct) return null;
  try {
    const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv: unb64(iv) }, await key(), unb64(ct));
    return JSON.parse(new TextDecoder().decode(pt)) as T;
  } catch {
    return null;
  }
}

export type Pending =
  | { kind: "signup"; phone: string; email: string; first_name: string; last_name: string; password: string; sent_to?: string }
  | { kind: "login"; challenge_id: string; sent_to?: string };

export async function setPending(res: NextResponse, p: Pending) {
  res.cookies.set(PENDING, await seal(p), { ...base, maxAge: 15 * 60 });
}

export async function getPending(): Promise<Pending | null> {
  return unseal<Pending>((await cookies()).get(PENDING)?.value);
}
