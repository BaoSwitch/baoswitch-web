"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether a node is near the viewport, so animations can idle while
 * they are off screen. A marquee that never stops keeps the compositor busy
 * through every scroll, which is what actually costs battery on a mid-range
 * Android phone — not the bytes.
 *
 * Starts `true` so anything depending on it still runs where
 * `IntersectionObserver` is missing; the first callback corrects it at once.
 */
export function useInView<T extends HTMLElement>(rootMargin = "200px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      rootMargin,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return [ref, inView] as const;
}
