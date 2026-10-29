import Link from "next/link";
import { ArrowUpRight, Shirt } from "lucide-react";
import { Band, SectionHeading } from "@/components/marketing/section";
import { DesignIcon } from "@/components/ui/design-icon";
import { Reveal } from "@/components/motion/reveal";
import { SERVICES, type Service } from "@/lib/content";

/**
 * The service catalogue.
 *
 * The frame draws eight identical green tiles in three absolutely-positioned
 * rows. Two problems with that: a wall of eight equal tiles gives a scanning
 * reader no entry point, and it flattens two genuinely different offers —
 * hiring an architect is a quote, not a ₦100 top-up — into the same gesture.
 *
 * So the six bill services keep the green tile and lead, and the two BAO
 * Group businesses sit under their own heading in a lighter treatment. The
 * green is now carrying meaning: green means "pay this now".
 */
function BillTile({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal as="li" delay={(index % 3) * 80}>
      <Link
        href={service.href}
        className="bs-tile bs-lift group flex h-full flex-col items-center gap-4 rounded-[var(--radius-tile)] p-8 text-center text-white"
      >
        {service.icon ? (
          <DesignIcon
            art={service.icon}
            className="size-[4.5rem] transition-transform duration-300 group-hover:-translate-y-0.5"
          />
        ) : null}
        <h3 className="text-xl font-semibold">{service.title}</h3>
        <p className="max-w-[18rem] text-[15px] leading-relaxed text-white/90">{service.blurb}</p>
        <ArrowUpRight
          aria-hidden
          className="mt-auto size-5 translate-y-1 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        />
      </Link>
    </Reveal>
  );
}

function GroupCard({ service, index }: { service: Service; index: number }) {
  return (
    <Reveal as="li" delay={index * 80}>
      <Link
        href={service.href}
        className="bs-card bs-edge bs-lift group flex h-full items-start gap-5 rounded-[var(--radius-card)] p-6 sm:p-7"
      >
        <span
          aria-hidden
          className="bs-raise flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary"
        >
          {service.icon ? (
            <DesignIcon art={service.icon} className="size-9" />
          ) : (
            <Shirt className="size-8 text-white" strokeWidth={1.6} />
          )}
        </span>
        <span className="bs-raise flex min-w-0 flex-col gap-1.5">
          <span className="flex items-center gap-1.5 font-semibold text-primary-text">
            {service.title}
            <ArrowUpRight
              aria-hidden
              className="size-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
            />
          </span>
          <span className="text-[15px] leading-relaxed text-muted">{service.blurb}</span>
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesSection() {
  const bills = SERVICES.filter((s) => s.kind === "bills");
  const group = SERVICES.filter((s) => s.kind === "group");

  return (
    <Band id="services" tone="raised" className="scroll-mt-28 py-20 lg:py-28">
      <div className="bs-wrap flex flex-col gap-12 lg:gap-16">
        <Reveal>
          <SectionHeading
            title="Everything essential, all in one place"
            lead="Access the digital services you need without moving between multiple platforms."
          />
        </Reveal>

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {bills.map((service, i) => (
            <BillTile key={service.slug} service={service} index={i} />
          ))}
        </ul>

        <div className="flex flex-col gap-6">
          <Reveal className="flex items-center gap-4">
            <h3 className="text-sm font-bold tracking-[0.2em] text-muted uppercase">
              More from BAO Group
            </h3>
            <span aria-hidden className="bs-rule flex-1" />
          </Reveal>
          <ul className="grid gap-5 md:grid-cols-2">
            {group.map((service, i) => (
              <GroupCard key={service.slug} service={service} index={i} />
            ))}
          </ul>
        </div>
      </div>
    </Band>
  );
}
