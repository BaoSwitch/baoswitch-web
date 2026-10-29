import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Plus, Search } from "lucide-react";
import { PageHeader, Panel, Notice } from "@/components/app/ui";
import { ChoiceGroup } from "@/components/app/purchase";
import { BENEFICIARIES } from "@/lib/app-data";

export const metadata: Metadata = { title: "Saved beneficiaries" };

export default function BeneficiariesPage() {
  return (
    <>
      <PageHeader back="Overview" backHref="/app" title="Saved beneficiaries" />

      <div className="flex flex-col gap-5">
        <Panel>
          <div className="flex flex-wrap items-end gap-4">
            <div className="relative min-w-[16rem] flex-1">
              <label htmlFor="b-q" className="text-[13px] font-medium text-muted">
                Find a beneficiary
              </label>
              <Search aria-hidden className="pointer-events-none absolute bottom-3 left-3.5 size-4 text-muted" />
              <input
                id="b-q"
                type="search"
                placeholder="Enter name, provider or identifier"
                className="mt-1.5 h-11 w-full rounded-[var(--radius-field)] border border-line bg-surface pr-3 pl-10 text-[14px] text-ink placeholder:text-muted focus-visible:border-primary"
              />
            </div>
            <Link
              href="/app/beneficiaries/new"
              className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-[14px] font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.2)] transition-[filter] hover:brightness-105"
            >
              <Plus aria-hidden className="size-4" />
              Add beneficiary
            </Link>
          </div>

          <ChoiceGroup
            className="mt-4"
            legend="Filter by service"
            name="kind"
            options={["All recipients", "Airtime & data", "Electricity", "Cable TV", "Bulk SMS"]}
            defaultValue="All recipients"
          />

          <div className="mt-5 overflow-x-auto">
            <table className="w-full border-collapse text-left text-[13px]">
              <caption className="sr-only">Your saved payment recipients</caption>
              <thead>
                <tr className="border-y border-line bg-surface2">
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Name / service
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Provider / identifier
                  </th>
                  <th scope="col" className="px-4 py-3 font-semibold tracking-wide text-muted uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {BENEFICIARIES.map((b) => (
                  <tr key={b.id} className="border-b border-line last:border-0 hover:bg-surface2">
                    <th scope="row" className="px-4 py-4 font-normal">
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden
                          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-[12px] font-semibold text-primary-text"
                        >
                          {b.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold text-ink">{b.name}</span>
                          <span className="block text-[12px] text-muted">{b.service}</span>
                        </span>
                      </span>
                    </th>
                    <td className="px-4 py-4">
                      <span className="block text-ink">{b.provider}</span>
                      <span className="num block text-[12px] text-muted">{b.identifier}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
                        <Link
                          href="/app/pay"
                          className="inline-flex items-center gap-1 font-semibold text-primary-text underline-offset-4 hover:underline"
                        >
                          Pay
                          <ArrowRight aria-hidden className="size-3.5" />
                          <span className="sr-only"> {b.name}</span>
                        </Link>
                        <Link
                          href={`/app/beneficiaries/${b.id}`}
                          className="font-semibold text-ink underline-offset-4 hover:underline"
                        >
                          Edit<span className="sr-only"> {b.name}</span>
                        </Link>
                        {/* Removal is destructive, so it wears the error
                            token and is confirmed on the next step rather
                            than firing straight from a table row. */}
                        <button
                          type="button"
                          className="font-semibold text-error underline-offset-4 hover:underline"
                        >
                          Remove<span className="sr-only"> {b.name}</span>
                        </button>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Notice title="Changes affect future payments only">
          Editing or removing a beneficiary does not change completed or pending transactions.
          You&rsquo;ll be asked to confirm before a saved recipient is removed.
        </Notice>
      </div>
    </>
  );
}
