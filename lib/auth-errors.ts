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
  ACCOUNT_RESTRICTED: "This account can't sign in right now. Contact support.",
  PHONE_INVALID: "Enter a valid Nigerian phone number.",
  EMAIL_IN_USE: "That email is already linked to an account. Sign in instead.",
  PASSWORD_TOO_SHORT: "Use a longer password.",
  PASSWORD_TOO_LONG: "That password is too long.",
  PASSWORD_BREACHED: "That password has appeared in a data breach. Choose another.",
  PASSWORD_PERSONAL: "Don't use your name, phone or email in your password.",
  OTP_SEND_FAILED: "We couldn't send your code just now. Try again in a minute.",
  OTP_COOLDOWN: "We just sent a code. Wait a moment before asking for another.",
  OTP_THROTTLED: "Too many codes requested. Try again later.",
  OTP_ATTEMPTS_EXCEEDED: "Too many wrong codes. Start again to get a new one.",
  CHALLENGE_INVALID: "That sign-in attempt expired. Please start again.",
  NO_VERIFIED_CONTACT: "We have no verified email or phone to send a code to. Contact support.",
  CHANNEL_UNAVAILABLE: "We can't send codes that way yet. Try email.",
  SERVICE_BUSY: "We're busy right now. Try again in a moment.",
  SERVICE_TEMPORARILY_UNAVAILABLE: "We're having a problem right now. Try again shortly.",
  SESSION_REVOKED: "Your session ended. Please sign in again.",
};

export const FALLBACK = "Something went wrong. Please try again.";

export function authMessage(code: string | string[] | undefined): string | null {
  const c = Array.isArray(code) ? code[0] : code;
  if (!c) return null;
  return MESSAGES[c] ?? FALLBACK;
}
