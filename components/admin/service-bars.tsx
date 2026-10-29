import { SERVICE_SHARE } from "@/lib/admin-data";

/**
 * Share of payment value by service.
 *
 * The frame paints each bar a different hue — green, two blue-greys, a grey,
 * a yellow. Service names have no inherent order, so hue here would be the
 * identity channel spent re-encoding what bar length already shows, and the
 * arbitrary assignment makes Exam Pins (yellow) look like a warning. One
 * series, one colour; length carries the magnitude and the value is direct-
 * labelled at the tip.
 *
 * Bars are capped under 24px with a 4px rounded data-end and a square foot at
 * the baseline, on a track that is a light step of the same surface.
 */
export function ServiceBars() {
  return (
    <section className="bs-card bs-edge flex flex-col rounded-[var(--radius-card)] p-6">
      <div className="bs-raise">
        <h2 className="font-semibold text-ink">Volume by service</h2>
        <p className="text-[13px] text-muted">Share of ₦48.62m payment attempt value</p>
      </div>

      <dl className="bs-raise mt-5 flex flex-col gap-3.5">
        {SERVICE_SHARE.map((row) => (
          <div key={row.service} className="grid grid-cols-[minmax(5.5rem,auto)_1fr_2.5rem] items-center gap-3">
            <dt className="truncate text-[13px] text-ink">{row.service}</dt>
            <div
              aria-hidden
              className="h-2.5 overflow-hidden rounded-full bg-bg2"
            >
              <div
                className="h-full rounded-r-[4px] bg-primary"
                style={{ width: `${row.share}%` }}
              />
            </div>
            <dd className="num text-right text-[13px] font-medium text-ink">{row.share}%</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
