import { useMemo } from "react";
import { Trophy, Target, Activity, Crown, Medal, Award, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { SCRIM_ENTRIES, type ScrimEntry } from "./data/scrim";

type Ranked = ScrimEntry & { rank: number };

export function Scrim() {
  const ranked: Ranked[] = useMemo(() => {
    return [...SCRIM_ENTRIES]
      .sort((a, b) => b.points - a.points)
      .map((e, i) => ({ ...e, rank: i + 1 }));
  }, []);

  const hasData = ranked.length > 0;
  const totalScrims = ranked.reduce((max, r) => Math.max(max, r.scrims), 0);
  const totalMatches = ranked.reduce((sum, r) => sum + r.scrims, 0);

  return (
    <section id="scrim" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.62 0.24 25) 1px, transparent 1px), linear-gradient(90deg, oklch(0.62 0.24 25) 1px, transparent 1px)",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <StatCard
            icon={Trophy}
            label="Aktív scrimek"
            value={hasData ? String(totalScrims) : "—"}
            hint={hasData ? "Élő szezon" : "Hamarosan"}
          />
          <StatCard
            icon={Target}
            label="Lejátszott mérkőzések"
            value={hasData ? String(totalMatches) : "—"}
            hint={hasData ? "Összesen" : "Hamarosan"}
          />
          <StatCard
            icon={Activity}
            label="Ranglista státusz"
            value={hasData ? "Aktív" : "Épül"}
            hint={hasData ? "Élőben frissül" : "Első szezon indul"}
          />
        </div>

        <div className="scorpion-border rounded-xl overflow-hidden bg-gradient-card">
          <div className="px-5 sm:px-6 py-4 border-b border-border flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-display font-bold text-lg tracking-[0.15em] uppercase">
                Scrim Ranglista
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {hasData
                  ? "Összpontszám alapján rendezve, élőben frissül."
                  : "A ranglista élőben frissül, ahogy megkezdődnek a scrimek."}
              </p>
            </div>
            <span className="badge-role">{hasData ? "Aktív" : "Beta"}</span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left font-display tracking-[0.15em] uppercase text-xs text-muted-foreground bg-muted/40">
                  <th className="px-6 py-3 w-16">#</th>
                  <th className="px-6 py-3">Csapat</th>
                  <th className="px-6 py-3">Pontszám</th>
                  <th className="px-6 py-3">Scrimek</th>
                  <th className="px-6 py-3">Forma</th>
                </tr>
              </thead>
              <tbody>
                {hasData
                  ? ranked.map((r) => (
                      <tr
                        key={`${r.rank}-${r.team}`}
                        className={`border-t border-border/60 ${rowTint(r.rank)}`}
                      >
                        <td className="px-6 py-4">
                          <RankBadge rank={r.rank} />
                        </td>
                        <td className="px-6 py-4 font-display font-semibold text-foreground break-words">
                          {r.team}
                        </td>
                        <td className="px-6 py-4 text-foreground/90">{r.points}</td>
                        <td className="px-6 py-4 text-muted-foreground">{r.scrims}</td>
                        <td className="px-6 py-4">
                          <ChangePill change={r.change} />
                        </td>
                      </tr>
                    ))
                  : Array.from({ length: 5 }).map((_, i) => (
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
            {hasData
              ? ranked.map((r) => (
                  <div
                    key={`${r.rank}-${r.team}`}
                    className={`flex items-center gap-4 p-4 ${rowTint(r.rank)}`}
                  >
                    <RankBadge rank={r.rank} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-display font-semibold text-foreground truncate">
                        {r.team}
                      </div>
                      <div className="text-xs text-muted-foreground/80">
                        Pontszám: {r.points} · Scrimek: {r.scrims}
                      </div>
                    </div>
                    <ChangePill change={r.change} />
                  </div>
                ))
              : Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <div className="h-9 w-9 rounded-md grid place-items-center bg-primary/10 border border-primary/40 text-primary font-display font-bold">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-muted-foreground">Hamarosan</div>
                      <div className="text-xs text-muted-foreground/70">
                        Pontszám: — · Scrimek: —
                      </div>
                    </div>
                    <span className="badge-role !text-[0.6rem]">Várakozás</span>
                  </div>
                ))}
          </div>

          <div className="px-5 sm:px-6 py-5 text-center border-t border-border bg-background/40">
            <p className="text-sm text-muted-foreground">
              {hasData
                ? "A Scorpion scrim szezon élőben zajlik. Hajrá csapatok!"
                : "Az első hivatalos Scorpion scrim szezon indulásakor a ranglista valós eredményekkel töltődik fel."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function rowTint(rank: number): string {
  if (rank === 1) return "bg-primary/[0.07]";
  if (rank === 2) return "bg-primary/[0.04]";
  if (rank === 3) return "bg-primary/[0.02]";
  return "";
}

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) {
    return (
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-primary/70 bg-primary/20 text-primary shadow-glow-sm">
        <Crown className="h-4 w-4" />
      </span>
    );
  }
  if (rank === 2) {
    return (
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-ember/50 bg-ember/15 text-ember">
        <Medal className="h-4 w-4" />
      </span>
    );
  }
  if (rank === 3) {
    return (
      <span className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-primary/30 bg-primary/10 text-primary/80">
        <Award className="h-4 w-4" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center justify-center h-9 w-9 rounded-md border border-border bg-muted/50 text-muted-foreground font-display font-bold">
      {rank}
    </span>
  );
}

function ChangePill({ change }: { change?: number }) {
  if (change === undefined) {
    return (
      <span className="badge-role !bg-muted/60 !border-border !text-muted-foreground">—</span>
    );
  }
  if (change > 0) {
    return (
      <span className="badge-role !bg-primary/15 !border-primary/50 !text-primary">
        <ArrowUp className="h-3 w-3" /> +{change}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="badge-role !bg-muted/60 !border-border !text-muted-foreground">
        <ArrowDown className="h-3 w-3" /> {change}
      </span>
    );
  }
  return (
    <span className="badge-role !bg-muted/60 !border-border !text-muted-foreground">
      <Minus className="h-3 w-3" /> 0
    </span>
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
