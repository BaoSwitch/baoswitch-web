import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * An icon exported from Figma, drawn at the proportions it actually has.
 *
 * Figma centres each glyph inside a square slot — an 80x80 service-card slot,
 * a 26px chip slot — but exports the glyph cropped to its own bounds, so the
 * files are all different shapes: `svc-electricity.svg` is 46.7 x 66.7,
 * `youtube.svg` is 24 x 16. Forcing those into a square box stretches them,
 * and `object-contain` with `max-w-full` does the opposite — it scales a
 * narrow glyph *up* until it fills the slot.
 *
 * So the glyph is sized as a percentage of its slot, exactly as the design
 * nests it: a 46.7-wide glyph in an 80 slot is 58.3% wide, at every rendered
 * size. One square container, one fraction, no distortion.
 */
export type IconArt = {
  src: string;
  /** Intrinsic size of the exported file. */
  w: number;
  h: number;
  /** Side of the square slot the design centres it in. */
  slot: number;
};

export function DesignIcon({
  art,
  className,
  alt = "",
}: {
  art: IconArt;
  /** Sizes the square slot, e.g. `size-20`. */
  className?: string;
  alt?: string;
}) {
  return (
    <span className={cn("relative inline-flex shrink-0 items-center justify-center", className)}>
      <Image
        src={art.src}
        alt={alt}
        width={art.w}
        height={art.h}
        style={{ width: `${(art.w / art.slot) * 100}%`, height: `${(art.h / art.slot) * 100}%` }}
      />
    </span>
  );
}
