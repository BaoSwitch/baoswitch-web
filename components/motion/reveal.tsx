"use client";

import { useEffect, useRef, type ComponentProps, type CSSProperties, type ElementType } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveals a block once it scrolls into view, then stops observing.
 *
 * Renders `data-reveal="hidden"` on the server and flips the attribute on the
 * DOM node directly — the node is the external system here, so no re-render is
 * needed. The CSS only acts on that attribute when JS is running and motion is
 * allowed, so content is never trapped hidden.
 */
export function Reveal<T extends ElementType = "div">({
  as,
  delay = 0,
  amount = 0.15,
  className,
  children,
  ...rest
}: {
  as?: T;
  /** Stagger in ms. */
  delay?: number;
  /** Fraction visible before revealing. */
  amount?: number;
} & Omit<ComponentProps<"div">, "ref">) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.setAttribute("data-reveal", "shown");

    if (typeof IntersectionObserver === "undefined") {
      show();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          io.disconnect();
        }
      },
      { threshold: amount, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [amount]);

  return (
    <Tag
      ref={ref}
      data-reveal="hidden"
      style={delay ? ({ "--bs-delay": `${delay}ms` } as CSSProperties) : undefined}
      className={cn("bs-reveal", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
