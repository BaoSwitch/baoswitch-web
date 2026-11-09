import type { NextRequest } from "next/server";
import { api, clientForwardedFor } from "@/lib/server/api";
import { redirectTo, sameOrigin } from "@/lib/server/http";
import { AT, clearSession } from "@/lib/server/session";

export async function POST(req: NextRequest) {
  if (!sameOrigin(req)) return new Response("Forbidden", { status: 403 });
  const token = req.cookies.get(AT)?.value;
  // Best effort: the cookies are cleared whether or not the API answers.
  if (token) await api("/v1/auth/logout", { method: "POST", token, forwardedFor: clientForwardedFor(req) });
  const res = redirectTo(req, "/login");
  clearSession(res);
  return res;
}
