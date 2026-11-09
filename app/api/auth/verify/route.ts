import type { NextRequest } from "next/server";
import { api, clientForwardedFor, errorOf, type Tokens } from "@/lib/server/api";
import { e, redirectTo, sameOrigin } from "@/lib/server/http";
import { getDevice, getPending, keepDevice, setSession, PENDING } from "@/lib/server/session";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return new Response("Forbidden", { status: 403 });
  const code = String((await req.formData()).get("code") ?? "").trim();
  const pending = await getPending();
  if (!pending) return redirectTo(req, e("/login", "NO_PENDING"));
  if (!/^[0-9]{6}$/.test(code)) return redirectTo(req, e("/verify", "OTP_INVALID"));

  const forwardedFor = clientForwardedFor(req);
  const device = await getDevice();

  const r =
    pending.kind === "signup"
      ? await api<Tokens>("/v1/auth/signup/verify", {
          body: {
            phone: pending.phone,
            email: pending.email,
            otp: code,
            password: pending.password,
            first_name: pending.first_name,
            last_name: pending.last_name,
            channel: "email",
            device_id: device.id,
            device_name: "Web browser",
          },
          forwardedFor,
        })
      : await api<Tokens>("/v1/auth/login/verify", {
          body: { challenge_id: pending.challenge_id, otp: code },
          forwardedFor,
        });

  if (!r.ok) {
    const c = errorOf(r).code;
    // A dead challenge cannot be retried; a wrong code can.
    const dead = r.status === 410 || r.status === 429;
    const res = keepDevice(redirectTo(req, dead ? e("/login", c) : e("/verify", c)), device);
    if (dead) res.cookies.set(PENDING, "", { path: "/", maxAge: 0 });
    return res;
  }

  const res = keepDevice(redirectTo(req, "/app"), device);
  setSession(res, r.data);
  res.cookies.set(PENDING, "", { path: "/", maxAge: 0 });
  return res;
}
