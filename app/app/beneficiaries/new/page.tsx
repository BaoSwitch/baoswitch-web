import type { Metadata } from "next";
import { PageHeader, Panel, SplitBody, Notice, RailLink } from "@/components/app/ui";
import { ChoiceGroup, ValidatedNote } from "@/components/app/purchase";
import { Field } from "@/components/ui/field";
import { Button, ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = { title: "Add beneficiary" };

/** The empty half of frame 25 — the same form with nothing filled in yet. */
export default function NewBeneficiaryPage() {
  return (
    <>
      <PageHeader
        back="Saved beneficiaries"
        backHref="/app/beneficiaries"
        title="Add a beneficiary"
        lead="Save a recipient once and review their details each time you pay."
      />

      <SplitBody
        rail={
          <>
            <Panel title="Which identifier do I need?">
              <ul className="flex list-disc flex-col gap-2 pl-5 text-[13px] leading-relaxed text-muted">
                <li>Airtime &amp; data — an 11-digit Nigerian mobile number.</li>
                <li>Electricity — the meter or customer number on your bill.</li>
                <li>Cable TV — the smartcard or IUC number on the decoder.</li>
                <li>Bulk SMS — a list of consented recipients.</li>
              </ul>
              <hr className="bs-rule my-4" />
              <RailLink href="/app/beneficiaries">Back to saved beneficiaries</RailLink>
            </Panel>

            <Notice title="Saved details are yours alone">
              A beneficiary name is only visible to you. Identifiers are masked wherever they are
              displayed.
            </Notice>
          </>
        }
      >
        <Panel title="Beneficiary details">
          <form className="flex flex-col gap-4" action="/app/beneficiaries" method="get">
            <Field
              label="Beneficiary name"
              name="name"
              required
              placeholder="My MTN line"
              hint="A helpful name only you will see."
            />
            <ChoiceGroup
              legend="Service"
              name="service"
              options={["Airtime & data", "Electricity", "Cable TV", "Bulk SMS"]}
              defaultValue="Airtime & data"
            />
            <Field
              label="Provider / network"
              name="provider"
              required
              placeholder="MTN"
            />
            <Field
              label="Identifier"
              name="identifier"
              required
              placeholder="08030000000"
              hint="The form changes to match the service you selected above."
            />

            <ValidatedNote title="Format is checked, ownership is not">
              Confirm the full identifier with the recipient, or against the provider&rsquo;s own
              statement, before you send a payment to it.
            </ValidatedNote>

            <div className="mt-1 flex flex-wrap items-center gap-3">
              <Button type="submit" size="md">
                Save beneficiary
              </Button>
              <ButtonLink href="/app/beneficiaries" variant="ghost" size="md" className="border-line2">
                Cancel
              </ButtonLink>
            </div>
          </form>
        </Panel>
      </SplitBody>
    </>
  );
}
