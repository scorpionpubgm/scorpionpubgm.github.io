import { Trophy, Target, Activity } from "lucide-react";

export function Scrim() {
  return (
    <section id="scrim" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(oklch(0.62 0.24 25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.24 25) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <header className="max-w-3xl mb-12">
          <div className="eyebrow mb-4">Kompetitív játék</div>
          <h2 className="section-title">
            Scrim • Verseny • <span className="text-gradient-red">Fejlődés</span>
          </h2>
          <div className="mt-6 space-y-4 text-base sm:text-lg text-muted-foreground">
            <p>A Scorpion közösségben a fejlődés közös cél.</p>
            <p>
              Scrimek, közösségi játékok és versenyhelyzetek segítségével folyamatosan
              fejlesztjük a kommunikációt, a csapatmunkát és a taktikai gondolkodást.
            </p>
          </div>
        </header>

        {/* Stat cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <StatCard icon={Trophy} label="Aktív scrimek" value="—" hint="Hamarosan" />
          <StatCard icon={Target} label="Lejátszott mérkőzések" value="—" hint="Hamarosan" />
          <StatCard icon={Activity} label="Ranglista státusz" value="Épül" hint="Első szezon indul" />
        </div>

        {/* Leaderboard */}
        <div className="scorpion-border rounded-xl overflow-hidden bg-gradient-card">
          <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-lg tracking-[0.15em] uppercase">
                Scrim Ranglista
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                A ranglista élőben frissül, ahogy megkezdődnek a scrimek.
              </p>
            </div>
            <span className="badge-role">Beta</span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-display tracking-[0.15em] uppercase text-xs text-muted-foreground bg-muted/40">
                  <th className="px-6 py-3 w-16">#</th>
                  <th className="px-6 py-3">Játékos</th>
                  <th className="px-6 py-3">Pontszám</th>
                  <th className="px-6 py-3">Scrimek</th>
                  <th className="px-6 py-3">Forma</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-t border-border/60">
                    <td className="px-6 py-4 font-display text-primary/70">{i + 1}</td>
                    <td className="px-6 py-4 text-muted-foreground">Hamarosan</td>
                    <td className="px-6 py-4 text-muted-foreground">—</td>
                    <td className="px-6 py-4 text-muted-foreground">—</td>
                    <td className="px-6 py-4">
                      <span className="badge-role !bg-muted/60 !border-border !text-muted-foreground">
                        Várakozás
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile list */}
          <div className="md:hidden divide-y divide-border/60">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4">
                <div className="h-9 w-9 rounded-md grid place-items-center bg-primary/10 border border-primary/40 text-primary font-display font-bold">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-muted-foreground">Hamarosan</div>
                  <div className="text-xs text-muted-foreground/70">Pontszám: — · Scrimek: —</div>
                </div>
                <span className="badge-role !text-[0.6rem]">Várakozás</span>
              </div>
            ))}
          </div>

          <div className="px-5 sm:px-6 py-5 text-center border-t border-border bg-background/40">
            <p className="text-sm text-muted-foreground">
              Az első hivatalos Scorpion scrim szezon indulásakor a ranglista valós
              eredményekkel töltődik fel.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  hint,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="scorpion-border rounded-xl p-5 bg-gradient-card flex items-center gap-4">
      <div className="h-12 w-12 rounded-lg bg-primary/10 border border-primary/40 grid place-items-center text-primary shrink-0">
        <Icon className="h-6 w-6" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-display tracking-[0.2em] uppercase text-muted-foreground">
          {label}
        </div>
        <div className="font-display text-2xl font-bold text-foreground mt-0.5">{value}</div>
        <div className="text-xs text-primary/80 mt-0.5">{hint}</div>
      </div>
    </div>
  );
}
