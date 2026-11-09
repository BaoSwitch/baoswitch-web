import type { NextRequest } from "next/server";
import { api, clientForwardedFor, errorOf, type Tokens } from "@/lib/server/api";
import { e, redirectTo, sameOrigin } from "@/lib/server/http";
import { getDevice, keepDevice, setPending, setSession } from "@/lib/server/session";

type Challenge = { otp_required?: boolean; challenge_id?: string; sent_to?: string };

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return new Response("Forbidden", { status: 403 });
  const f = await req.formData();
  const phone = String(f.get("phone") ?? "").trim();
  const password = String(f.get("password") ?? "");
  if (!phone || !password) return redirectTo(req, e("/login", "VALIDATION_FAILED"));

  const device = await getDevice();

  const r = await api<Tokens & Challenge>("/v1/auth/login", {
    body: { phone, password, device_id: device.id, device_name: "Web browser" },
    forwardedFor: clientForwardedFor(req),
  });
  if (!r.ok) return keepDevice(redirectTo(req, e("/login", errorOf(r).code)), device);

  if (r.data.otp_required && r.data.challenge_id) {
    const res = keepDevice(redirectTo(req, "/verify"), device);
    await setPending(res, { kind: "login", challenge_id: r.data.challenge_id, sent_to: r.data.sent_to });
    return res;
  }

  const res = keepDevice(redirectTo(req, "/app"), device);
  setSession(res, r.data);
  return res;
}
