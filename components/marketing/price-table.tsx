import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * A price table.
 *
 * `<caption>` names the table for a screen reader reaching it out of context,
 * and `scope` on the header cells binds each column to its values. Numeric
 * columns are right-aligned and tabular so the digits line up down the
 * column. The wrapper scrolls on its own below `sm` rather than letting a
 * four-column table stretch the page sideways.
 */
export function PriceTable({
  caption,
  columns,
  rows,
  className,
}: {
  caption: ReactNode;
  columns: { key: string; label: ReactNode; numeric?: boolean }[];
  rows: Record<string, ReactNode>[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "bs-card bs-edge overflow-hidden rounded-[var(--radius-card)]",
        className,
      )}
    >
      <div className="bs-raise overflow-x-auto">
        <table className="w-full border-collapse text-left text-[15px]">
          <caption className="px-6 pt-6 pb-4 text-left text-lg font-semibold text-primary-text">
            {caption}
          </caption>
          <thead>
            <tr className="border-b border-line">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={cn(
                    "px-6 py-3 text-[13px] font-semibold tracking-wide text-muted uppercase",
                    col.numeric && "text-right",
                  )}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i} className="border-b border-line last:border-0 even:bg-bg2/50">
                {columns.map((col, j) => {
                  const content = row[col.key];
                  // The first column is the row's name, so it is a header for
                  // that row rather than another anonymous cell.
                  return j === 0 ? (
                    <th
                      key={col.key}
                      scope="row"
                      className="px-6 py-3.5 font-medium text-ink"
                    >
                      {content}
                    </th>
                  ) : (
                    <td
                      key={col.key}
                      className={cn(
                        "px-6 py-3.5 text-muted",
                        col.numeric && "num text-right whitespace-nowrap text-ink",
                      )}
                    >
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
