import type { Sponsor } from "@/data/sponsors";

interface Props {
  sponsors: Sponsor[];
  title?: string;
}

export default function Clients({ sponsors, title = "Presented By" }: Props) {
  return (
    <section className="border-t border-sox-border py-8">
      <div className="mb-6 text-center">
        <p className="font-heading font-bold text-[10px] uppercase tracking-[0.25em] text-gray-400">
          {title}
        </p>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10">
        {sponsors.map((sponsor) => (
          <a
            key={sponsor.id}
            href={sponsor.href}
            title={sponsor.name}
            className="group flex items-center gap-2 opacity-40 hover:opacity-80 transition-opacity"
          >
            {/* Circular text badge — replace with <Image> once real logos are provided */}
            <span className="w-10 h-10 rounded-full bg-sox-charcoal flex items-center justify-center font-heading font-black text-xs text-white group-hover:bg-crimson transition-colors">
              {sponsor.logoText}
            </span>
            <span className="font-heading font-bold text-xs uppercase tracking-widest text-sox-body">
              {sponsor.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
