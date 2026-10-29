import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, DetailRow, RailLink } from "@/components/app/ui";
import { ChoiceGroup } from "@/components/app/purchase";
import { DemoChip } from "@/components/ui/status";
import { Checkbox } from "@/components/ui/field";
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

export const metadata: Metadata = { title: "Premium Laundry · BAO 360" };

export default function LaundryBookingPage() {
  return (
    <>
      <PageHeader
        back="More services"
        backHref="/app/pay"
        title="Premium Laundry · BAO 360"
        lead="Build your garment-care request and choose a preferred pickup window."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Booking estimate">
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
                </div>
              </dl>
              <p className="mt-3 text-[12px] leading-relaxed text-muted">
                No wallet debit on request. A final quote and payment come after confirmation.
              </p>
            </Panel>

            {/* A requested window is not a booked slot. Saying so here stops
                someone leaving clothes out on a morning nobody is coming. */}
            <Notice tone="warning" title="Requested windows, not confirmed slots">
              Collection coverage and availability need confirmation. Dates, garment rates and
              delivery estimates are illustrative, not a pricing or delivery promise.
            </Notice>

            <Panel title="BAO 360 garment care">
              <p className="text-[13px] leading-relaxed text-muted">
                Tell us about delicate fabrics or items needing special treatment. Review any
                revised quote before accepting it.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/support">Laundry FAQs</RailLink>
            </Panel>
          </>
        }
      >
        <Panel title="Garments & care" aside={<DemoChip>Illustrative service estimate</DemoChip>}>
          <form className="flex flex-col gap-4" action="/app/services/laundry/booking" method="get">
            <ChoiceGroup
              legend="Care service"
              name="care"
              options={["Wash & iron", "Iron only", "Special care request"]}
              defaultValue="Wash & iron"
            />
            <dl className="grid gap-4 sm:grid-cols-3">
              {LAUNDRY_ITEMS.map((i) => (
                <FieldBox
                  key={i.label}
                  label={`${i.label} · ${money(i.unit)} each`}
                  value={i.qty}
                />
              ))}
            </dl>
            <p className="text-[12px] text-muted">
              {LAUNDRY_COUNT} items total · Edit quantities before submitting. Rates shown are
              demo examples only.
            </p>
            <div className="flex flex-col gap-2">
              <label htmlFor="care-notes" className="text-[13px] font-medium text-muted">
                Care instructions
              </label>
              <textarea
                id="care-notes"
                name="careNotes"
                rows={3}
                defaultValue={LAUNDRY_BOOKING.careNotes}
                className="w-full rounded-[var(--radius-field)] border border-line bg-surface p-4 text-[15px] leading-relaxed text-ink focus-visible:border-primary"
              />
            </div>
        </form>
        </Panel>

        <Panel title="Pickup & requested delivery">
          <dl className="flex flex-col gap-4">
            <FieldBox
              label="Pickup address"
              value={LAUNDRY_BOOKING.address}
              hint="Illustrative address. Confirm service coverage before collection."
            />
          </dl>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <FieldBox label="Contact name" value="Ada Okafor" />
            <FieldBox label="Contact number" value="+234 803 ••• 4421" />
            <FieldBox label="Requested pickup date" value={LAUNDRY_BOOKING.pickupDate} />
            <FieldBox label="Preferred pickup window" value={LAUNDRY_BOOKING.pickupWindow} />
          </dl>
          <div className="mt-4">
            <Checkbox name="sameAddress" defaultChecked label="Return to the same address" />
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <FieldBox label="Requested return date" value={LAUNDRY_BOOKING.returnDate} />
            <FieldBox label="Preferred return window" value={LAUNDRY_BOOKING.returnWindow} />
          </dl>
          <div className="mt-4">
            <Checkbox
              name="understand"
              required
              defaultChecked
              label="I understand pickup, delivery and the final estimate require service confirmation."
            />
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ButtonLink href="/app/services/laundry/booking" size="md">
              Continue
            </ButtonLink>
            <Button type="button" variant="ghost" size="md" className="border-line2">
              Cancel request
            </Button>
          </div>
        </Panel>
      </SplitBody>
    </>
  );
}
