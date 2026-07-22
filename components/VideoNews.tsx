import Image from "next/image";
import type { VideoItem } from "@/data/videos";

interface Props {
  videos: VideoItem[];
  title?: string;
}

export default function VideoNews({ videos, title = "Video" }: Props) {
  return (
    <section>
      <div>
        <div className="mb-6">
          <p className="font-heading font-bold text-[10px] uppercase tracking-[0.2em] text-crimson mb-1">
            Watch
          </p>
          <h2 className="font-heading font-black text-2xl uppercase text-white tracking-tight">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {videos.map((video, i) => (
            <a
              key={video.id}
              href={video.href}
              className="group block relative"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={video.thumbnailUrl}
                  alt={video.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-crimson flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Duration badge */}
                <div className="absolute bottom-2 right-2 bg-sox-black/80 px-2 py-0.5">
                  <span className="font-heading font-bold text-[10px] text-white tabular-nums">
                    {video.duration}
                  </span>
                </div>

                {/* Featured stripe on first card */}
                {i === 0 && (
                  <div className="absolute top-0 left-0 bg-crimson px-3 py-1">
                    <span className="font-heading font-bold text-[10px] uppercase tracking-widest text-white">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Meta */}
              <div className="pt-3">
                <p className="font-body text-[10px] text-white/40 mb-1">{video.date}</p>
                <h3 className="font-heading font-bold text-sm text-white leading-snug group-hover:text-crimson transition-colors">
                  {video.title}
                </h3>
                <p className="font-body text-xs text-white/50 mt-1 leading-relaxed line-clamp-2">
                  {video.excerpt}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
