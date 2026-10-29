import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHeader, Panel, SplitBody, FieldBox, Notice, DetailRow, RailLink } from "@/components/app/ui";
import { ValidatedNote } from "@/components/app/purchase";
import { DemoChip } from "@/components/ui/status";
import { Checkbox } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";
import { BENEFICIARIES } from "@/lib/app-data";

export function generateStaticParams() {
  return BENEFICIARIES.map((b) => ({ id: b.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const b = BENEFICIARIES.find((x) => x.id === id);
  return { title: b ? `Edit ${b.name}` : "Beneficiary" };
}

export default async function EditBeneficiaryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const b = BENEFICIARIES.find((x) => x.id === id);
  if (!b) notFound();

  const identifierLabel =
    b.kind === "electricity"
      ? "Meter / customer number"
      : b.kind === "cable"
        ? "Smartcard / IUC number"
        : b.kind === "sms"
          ? "Recipient list"
          : "Phone number";

  return (
    <>
      <PageHeader
        back="Saved beneficiaries"
        backHref="/app/beneficiaries"
        title="Add / edit beneficiary"
        lead="Save a recipient once and review their details each time you pay."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Recipient preview">
              <dl>
                <DetailRow label="Saved as" value={b.name} />
                <DetailRow label="Services" value={b.service} />
                <DetailRow label="Provider" value={b.provider} />
                <DetailRow label="Identifier" value={b.identifier} />
              </dl>
            </Panel>

            <Panel title="Saving a different service?">
              <p className="text-[13px] leading-relaxed text-muted">
                Electricity requires a meter or customer number. Cable TV requires a smartcard or
                IUC number. The form changes to match your selected service.
              </p>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/beneficiaries/new">Add a new beneficiary instead</RailLink>
            </Panel>

            <Notice title="Your changes stay in control">
              Saving edits affects future purchases only. Existing receipts keep the recipient
              details recorded at payment time.
            </Notice>
          </>
        }
      >
        <Panel title="Beneficiary details" aside={<DemoChip>Editing · {b.name}</DemoChip>}>
          <form className="flex flex-col gap-4" action="/app/beneficiaries" method="get">
            <dl className="contents">
              <FieldBox
                label="Beneficiary name"
                value={b.name}
                hint="A helpful name only you will see."
              />
              <FieldBox label="Service" value={b.service} />
              <FieldBox label="Provider / network" value={`${b.provider} · Demo option`} />
              <FieldBox
                label={identifierLabel}
                value={b.identifier}
                hint="Demo format validated · Use a full 11-digit Nigerian number in an actual form."
              />
            </dl>

            {/* Validating a format is not validating a person. The frames say
                so, and it is the difference between a typo caught and money
                sent to a stranger. */}
            <ValidatedNote title="Format checked, ownership not confirmed">
              {b.kind === "airtime-data"
                ? "This is a phone recipient, so no meter or smartcard number is required. Check the full number with the recipient before sending a payment."
                : "Check the full identifier against the provider's own statement before sending a payment."}
            </ValidatedNote>

            {b.kind === "airtime-data" ? (
              <Checkbox
                name="shared"
                defaultChecked
                label={`Use this recipient for both ${b.provider} airtime and ${b.provider} data purchases.`}
              />
            ) : null}

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Save beneficiary
              </Button>
              <ButtonLink
                href="/app/beneficiaries"
                variant="ghost"
                size="md"
                className="border-line2"
              >
                Cancel changes
              </ButtonLink>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
