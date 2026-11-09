import type { NextRequest } from "next/server";
import { api, clientForwardedFor, errorOf } from "@/lib/server/api";
import { e, redirectTo, sameOrigin } from "@/lib/server/http";
import { setPending } from "@/lib/server/session";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return new Response("Forbidden", { status: 403 });
  const f = await req.formData();
  const s = (k: string) => String(f.get(k) ?? "").trim();

  const [first, ...rest] = s("name").split(/\s+/).filter(Boolean);
  const password = String(f.get("password") ?? "");
  const phone = s("phone");
  const email = s("email");

  if (!first || !rest.length || !phone || !email) return redirectTo(req, e("/signup", "VALIDATION_FAILED"));
  if (password !== String(f.get("passwordConfirm") ?? "")) return redirectTo(req, e("/signup", "PASSWORD_MISMATCH"));
  if (!f.get("terms")) return redirectTo(req, e("/signup", "TERMS_REQUIRED"));

  const r = await api<{ sent_to?: string }>("/v1/auth/signup/start", {
    body: { phone, email, channel: "email" },
    forwardedFor: clientForwardedFor(req),
  });
  if (!r.ok) return redirectTo(req, e("/signup", errorOf(r).code));

  const res = redirectTo(req, "/verify");
  await setPending(res, {
    kind: "signup",
    phone,
    email,
    first_name: first,
    last_name: rest.join(" "),
    password,
    sent_to: r.data?.sent_to,
  });
  return res;
}
