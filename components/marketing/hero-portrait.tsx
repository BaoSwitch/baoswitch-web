"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PORTRAIT_INTERVAL = 6000;

export function HeroPortrait() {
  const [activePortrait, setActivePortrait] = useState(0);

  useEffect(() => {
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let interval: number | undefined;

    const updateInterval = () => {
      if (interval !== undefined) window.clearInterval(interval);
      interval = motionPreference.matches
        ? undefined
        : window.setInterval(() => {
            setActivePortrait((active) => (active === 0 ? 1 : 0));
          }, PORTRAIT_INTERVAL);
    };

    updateInterval();
    motionPreference.addEventListener("change", updateInterval);

    return () => {
      if (interval !== undefined) window.clearInterval(interval);
      motionPreference.removeEventListener("change", updateInterval);
    };
  }, []);

  return (
    <>
      <Image
        src="/assets/photos/hero-portrait.png"
        alt="A BAOSWITCH customer paying a bill on her phone"
        width={2000}
        height={1333}
        priority
        sizes="(max-width: 1024px) 190vw, 76vw"
        aria-hidden={activePortrait !== 0}
        className="absolute max-w-none transition-opacity duration-1000 ease-in-out motion-reduce:transition-none"
        style={{
          width: "228.06%",
          left: "-57.44%",
          top: "0.3%",
          height: "auto",
          opacity: activePortrait === 0 ? 1 : 0,
        }}
      />
      <Image
        src="/assets/photos/hero-potrait-man.png"
        alt="A BAOSWITCH customer paying with his phone"
        fill
        priority
        sizes="(max-width: 1024px) 82vw, 32vw"
        aria-hidden={activePortrait !== 1}
        className="object-fill transition-opacity duration-1000 ease-in-out motion-reduce:transition-none"
        style={{ opacity: activePortrait === 1 ? 1 : 0 }}
      />
    </>
  );
}
