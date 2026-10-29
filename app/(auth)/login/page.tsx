import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Field, PasswordField } from "@/components/ui/field";
import { PROVIDERS } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your BAOSWITCH account to pay bills, buy airtime and data.",
};

/** The brand panel's provider row — the same logos as the landing strip,
 *  at the frame's ~45px height. */
const STRIP = ["GOtv", "MTN", "Glo", "9mobile", "Airtel", "BAO 360 Laundry"];

export default function LoginPage() {
  const strip = STRIP.map((name) => PROVIDERS.find((p) => p.name === name)!).filter(Boolean);

  return (
    <AuthShell
      photo="/assets/photos/auth-signin.png"
      photoOpacity={0.4}
      brand={
        <div className="flex flex-col gap-5">
          <h1 className="text-[clamp(2rem,1.2rem+2.2vw,3rem)] leading-[1.3] font-semibold">
            Everything you need in one platform
          </h1>
          <p className="text-[clamp(1rem,0.9rem+0.3vw,1.25rem)] leading-[1.5] text-white/90">
            Top up airtime, data bundles, TV cable subscriptions, electricity bills, exam pins,
            bulk SMS, laundry booking, hire an architect.
          </p>
          <ul className="mt-2 flex flex-wrap items-center gap-4">
            {strip.map((p) => (
              <li
                key={p.name}
                className={`flex h-11 items-center rounded-lg px-2.5 shadow-sm ${
                  p.tint ? "bg-accent" : "bg-white/95"
                }`}
              >
                <Image
                  src={p.src}
                  alt={p.name}
                  width={p.w}
                  height={p.h}
                  className="h-7 w-auto max-w-none object-contain"
                />
              </li>
            ))}
          </ul>
        </div>
      }
    >
      <div className="flex flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-[clamp(2.25rem,1.5rem+2.4vw,3.75rem)] leading-[1.2] font-semibold text-primary-text">
            Welcome back
          </h1>
          <p className="text-[clamp(1rem,0.9rem+0.4vw,1.5rem)] text-muted">
            Sign in to your account
          </p>
        </header>

        <form className="flex flex-col gap-7" action="/api/auth/login" method="post">
          <Field
            label="Email or username"
            name="identifier"
            type="text"
            autoComplete="username"
            required
            placeholder="Enter your mail or username"
          />
          <PasswordField
            label="Password"
            name="password"
            autoComplete="current-password"
            required
            placeholder="Enter your Password"
            action={
              <Link
                href="/forgot-password"
                className="text-[15px] text-accent underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            }
          />
          <Button type="submit" size="lg" className="h-14 w-full rounded-[var(--radius-field)] text-base">
            <Image
              src="/assets/icons/sign-in-circle.svg"
              alt=""
              width={21}
              height={22}
              className="h-[22px] w-[21px]"
            />
            Sign in
          </Button>
          <p className="text-center text-base text-muted">
            Don&rsquo;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-accent underline-offset-4 hover:underline">
              Create one
            </Link>
          </p>
        </form>
      </div>
    </AuthShell>
  );
}
