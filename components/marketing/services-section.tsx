import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Band, SectionHeading } from "@/components/marketing/section";
import { DesignIcon } from "@/components/ui/design-icon";
import { Reveal } from "@/components/motion/reveal";
import { SERVICES, type Service } from "@/lib/content";

/** The service catalogue: one green tile per bill service. */
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

export function ServicesSection() {
  const bills = SERVICES.filter((s) => s.kind === "bills");

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
      </div>
    </Band>
  );
}
