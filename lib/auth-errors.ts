/** What a person reads for each error code the API (or this app) can return.
 *  Pages look the message up by code, so nothing from the URL is rendered. */
const MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: "That phone number and password don't match.",
  ACCOUNT_LOCKED: "Too many attempts. Wait a few minutes and try again.",
  RATE_LIMITED: "Too many requests. Please wait a moment and try again.",
  OTP_INVALID: "That code isn't right. Check it and try again.",
  OTP_EXPIRED: "That code has expired. Start again to get a new one.",
  SIGNUP_FAILED: "We couldn't create that account. If you already have one, sign in instead.",
  EMAIL_REQUIRED: "Enter your email address.",
  VALIDATION_FAILED: "Check the details you entered and try again.",
  PASSWORD_MISMATCH: "The two passwords don't match.",
  TERMS_REQUIRED: "Please accept the terms to continue.",
  NO_PENDING: "Your session expired. Please start again.",
  SERVICE_UNREACHABLE: "We couldn't reach the server. Try again shortly.",
  BAD_GATEWAY: "We couldn't reach the server. Try again shortly.",
  SESSION_EXPIRED: "Your session ended. Please sign in again.",
};

export const FALLBACK = "Something went wrong. Please try again.";

export function authMessage(code: string | string[] | undefined): string | null {
  const c = Array.isArray(code) ? code[0] : code;
  if (!c) return null;
  return MESSAGES[c] ?? FALLBACK;
}
