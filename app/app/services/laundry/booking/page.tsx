import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, Notice, DetailRow, RailLink, Timeline } from "@/components/app/ui";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  LAUNDRY_BOOKING,
  LAUNDRY_COUNT,
  LAUNDRY_DELIVERY,
  LAUNDRY_ITEMS,
  LAUNDRY_SUBTOTAL,
  LAUNDRY_TOTAL,
} from "@/lib/services-data";
import { money } from "@/lib/app-data";

export const metadata: Metadata = { title: "Laundry booking details" };

export default function LaundryBookingDetailsPage() {
  return (
    <>
      <PageHeader
        back="Premium laundry"
        backHref="/app/services/laundry"
        title="Laundry booking details"
      />

      <SplitBody
        rail={
          <>
            <Panel title="Order progress">
              <Timeline
                steps={[
                  { label: "Request submitted", detail: LAUNDRY_BOOKING.submitted, state: "done" },
                  { label: "Confirming collection", state: "current" },
                  { label: "Collection & garment check", state: "upcoming" },
                  { label: "Care in progress", state: "upcoming" },
                  { label: "Return delivery", state: "upcoming" },
                ]}
              />
            </Panel>

            <Panel title="Requested schedule">
              <dl>
                <DetailRow
                  label="Pickup requested"
                  value={`${LAUNDRY_BOOKING.pickupDate.slice(0, 6)} · ${LAUNDRY_BOOKING.pickupWindow}`}
                />
                <DetailRow label="Pickup confirmed" value="Not yet confirmed" />
                <DetailRow
                  label="Return requested"
                  value={`${LAUNDRY_BOOKING.returnDate.slice(0, 6)} · ${LAUNDRY_BOOKING.returnWindow}`}
                />
                <DetailRow label="Return confirmed" value="Not yet confirmed" />
              </dl>
              <p className="mt-2 text-[12px] text-muted">
                Updates appear here and in your notification inbox.
              </p>
            </Panel>
          </>
        }
      >
        <Panel title="BAO 360 · Booking request">
          <dl>
            <DetailRow label="Request reference" value={LAUNDRY_BOOKING.reference} />
            <DetailRow label="Submitted" value={LAUNDRY_BOOKING.submitted} />
            <DetailRow
              label="Care service"
              value={`${LAUNDRY_BOOKING.service} · ${LAUNDRY_COUNT} items`}
            />
          </dl>

          <hr className="bs-rule my-4" />

          <dl>
            {LAUNDRY_ITEMS.map((i) => (
              <DetailRow
                key={i.label}
                label={`${i.qty} ${i.label.toLowerCase()} × ${money(i.unit)}`}
                value={money(i.unit * i.qty)}
              />
            ))}
            <div className="mt-2 border-t border-line pt-2">
              <DetailRow label="Garment care subtotal" value={money(LAUNDRY_SUBTOTAL)} />
              <DetailRow label="Demo pickup & delivery" value={money(LAUNDRY_DELIVERY)} />
              <DetailRow label="Estimated total" value={money(LAUNDRY_TOTAL)} strong />
              <DetailRow label="Payment" value="Not requested · no wallet debit" />
            </div>
          </dl>

          <Notice className="mt-5" title="Estimate awaiting confirmation">
            The service team must confirm coverage, item care and the final quote. No collection
            or return time has been guaranteed.
          </Notice>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ButtonLink href="/app/pay" size="md">
              Make payment
            </ButtonLink>
            <Button type="button" variant="ghost" size="md" className="border-line2">
              Request cancellation
            </Button>
          </div>
        </Panel>

        <Panel title="Address & care notes">
          <dl>
            <DetailRow label="Pickup / return address" value={LAUNDRY_BOOKING.address} />
            <DetailRow label="Contact" value={LAUNDRY_BOOKING.contact} />
          </dl>
          <p className="mt-3 text-[14px] leading-relaxed text-muted">
            {LAUNDRY_BOOKING.careNotes}
          </p>
          <hr className="bs-rule my-4" />
          <RailLink href="/app/support">Contact in-app support</RailLink>
        </Panel>
      </SplitBody>
    </>
  );
}
