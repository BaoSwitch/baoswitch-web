import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * The layout About, Our Services and Contact Us all share: a column of text
 * beside a full-bleed photograph under a green wash.
 *
 * The frames place the photo absolutely, overhanging the artboard, with a
 * separate `rgba(0,200,83,.65)` rectangle laid on top. Here the wash is a
 * gradient on the same element, which keeps the two from drifting apart at
 * sizes the frame never covered. Below `lg` the photo becomes a short banner
 * above the text rather than a column — a half-height portrait beside a
 * paragraph is unreadable on a phone.
 */
export function SplitPage({
  photo,
  photoAlt,
  side = "end",
  /** Matches the frames: .65 on About and Our Services, .6 on Contact. */
  wash = 0.65,
  children,
}: {
  photo: string;
  photoAlt?: string;
  /** Which side the photograph sits on at `lg` and up. */
  side?: "start" | "end";
  wash?: number;
  children: ReactNode;
}) {
  return (
    <div className="relative isolate grid items-stretch lg:min-h-[calc(100dvh-7rem)] lg:grid-cols-2">
      <div
        className={cn(
          "relative isolate h-56 overflow-hidden sm:h-72 lg:h-auto",
          side === "start" ? "lg:order-first" : "lg:order-last",
        )}
      >
        <Image
          src={photo}
          alt={photoAlt ?? ""}
          aria-hidden={photoAlt ? undefined : true}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
        <span
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: `rgb(0 200 83 / ${wash})` }}
        />
      </div>

      <div className="flex flex-col justify-center px-5 py-14 sm:px-10 lg:px-14 xl:px-20 xl:py-20">
        <div className="mx-auto w-full max-w-[44rem]">{children}</div>
      </div>
    </div>
  );
}

/** The tracked-out emerald eyebrow the marketing frames use above a block. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-sm font-bold tracking-[0.2em] text-primary-text uppercase",
        className,
      )}
    >
      {children}
    </p>
  );
}
