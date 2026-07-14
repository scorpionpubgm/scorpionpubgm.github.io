import { CalendarClock } from "lucide-react";

export function Events() {
  return (
    <section id="esemenyek" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-0 left-1/4 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <header className="max-w-3xl mb-12">
          <div className="eyebrow mb-4">Naptár</div>
          <h2 className="section-title">
            Scorpion <span className="text-gradient-red">Események</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            TikTok élő adások, közösségi játékok, scrimek, belső versenyek és
            különleges Scorpion események.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Placeholder cards */}
          {["TikTok élő adás", "Közösségi játék", "Belső verseny"].map((type) => (
            <article
              key={type}
              className="scorpion-border rounded-xl p-6 bg-gradient-card flex flex-col"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="badge-role">{type}</span>
                <span className="badge-role !bg-muted/60 !border-border !text-muted-foreground">
                  Hamarosan
                </span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8 border border-dashed border-border rounded-lg">
                <CalendarClock className="h-8 w-8 text-primary/60 mb-3" />
                <p className="font-display text-sm tracking-[0.15em] uppercase text-muted-foreground">
                  Új Scorpion események hamarosan
                </p>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>Dátum: —</span>
                <span>Időpont: —</span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Az események folyamatosan frissülnek. Kövess minket a közösségi felületeken!
          </p>
        </div>
      </div>
    </section>
  );
}
