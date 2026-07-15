import { ExternalLink } from "lucide-react";
import { useScorpionData } from "./data/ScorpionDataContext";

export function Sponsors() {
  const { sponsors } = useScorpionData();
  if (sponsors.length === 0) return null;

  return (
    <section
      id="szponzorok"
      aria-label="Szponzorok"
      className="relative py-10 md:py-14 border-y border-primary/15 bg-background/50"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <span className="eyebrow">Szponzoraink</span>
          <div className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {sponsors.map((s) => {
            const inner = (
              <>
                <div className="h-14 w-24 sm:h-16 sm:w-28 shrink-0 rounded-md bg-background/60 border border-border grid place-items-center overflow-hidden">
                  <img
                    src={s.logo}
                    alt={s.name}
                    loading="lazy"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <span className="text-sm font-display tracking-[0.15em] uppercase text-foreground/90">
                  {s.name}
                </span>
                {s.url && <ExternalLink className="h-3.5 w-3.5 text-primary/80" />}
              </>
            );

            const className =
              "group inline-flex items-center gap-3 rounded-lg border border-border/70 bg-card/60 px-3 py-2 hover:border-primary/50 hover:shadow-glow-sm transition-all";

            return (
              <li key={s.id}>
                {s.url ? (
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className={className}>
                    {inner}
                  </a>
                ) : (
                  <div className={className}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
