import Image from "next/image";
import type { NewsArticle } from "@/data/news";

interface Props {
  articles: NewsArticle[];
  title?: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Preview: "bg-crimson text-white",
  Guide:   "bg-sox-charcoal text-white",
  Rules:   "bg-sox-charcoal text-white",
  Feature: "bg-crimson text-white",
};

function categoryClass(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-sox-charcoal text-white";
}

export default function LatestNews({ articles, title = "Latest News" }: Props) {
  const [lead, ...rest] = articles;

  return (
    <section id="news">
      <div className="mb-4">
        <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-crimson mb-1">
          News
        </p>
        <h2 className="font-heading font-black text-2xl uppercase text-sox-body tracking-tight">
          {title}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Lead article — spans full height on md+ */}
        {lead && (
          <a href={lead.href} className="group block border border-sox-border hover:border-crimson transition-colors">
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={lead.imageUrl}
                alt={lead.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-4 bg-white">
              <div className="flex items-center gap-2 mb-2">
                <span className={`font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 ${categoryClass(lead.category)}`}>
                  {lead.category}
                </span>
                <span className="font-body text-[10px] text-gray-400">{lead.date}</span>
              </div>
              <h3 className="font-heading font-bold text-base text-sox-body leading-snug group-hover:text-crimson transition-colors">
                {lead.title}
              </h3>
              <p className="font-body text-sm text-gray-500 mt-2 leading-relaxed line-clamp-3">
                {lead.excerpt}
              </p>
            </div>
          </a>
        )}

        {/* Remaining articles — stacked */}
        <div className="flex flex-col gap-4">
          {rest.map((article) => (
            <a
              key={article.id}
              href={article.href}
              className="group flex gap-4 border border-sox-border hover:border-crimson transition-colors bg-white p-3"
            >
              <div className="relative w-24 h-20 flex-shrink-0 overflow-hidden">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="96px"
                />
              </div>
              <div className="flex flex-col justify-center gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`font-heading font-bold text-[9px] uppercase tracking-widest px-1.5 py-0.5 flex-shrink-0 ${categoryClass(article.category)}`}>
                    {article.category}
                  </span>
                  <span className="font-body text-[10px] text-gray-400">{article.date}</span>
                </div>
                <h3 className="font-heading font-bold text-sm text-sox-body leading-snug group-hover:text-crimson transition-colors line-clamp-2">
                  {article.title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
