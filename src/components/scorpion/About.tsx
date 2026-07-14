import { Handshake, Users, TrendingUp } from "lucide-react";

const VALUES = [
  {
    icon: Handshake,
    title: "Összetartás",
    desc: "Egymás támogatása és a közös célok építik a Scorpion közösséget minden nap.",
  },
  {
    icon: Users,
    title: "Csapatmunka",
    desc: "A kommunikáció, az együttműködés és a tiszta szerepek adják az erőnket.",
  },
  {
    icon: TrendingUp,
    title: "Fejlődés",
    desc: "Scrimek, elemzés és közös gyakorlás — mindig egy szinttel feljebb.",
  },
];

export function About() {
  return (
    <section id="rolunk" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="eyebrow mb-4">Kik vagyunk</div>
          <h2 className="section-title">
            A <span className="text-gradient-red">SCORPION</span> Közösség
          </h2>
          <div className="mt-8 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              A <span className="text-foreground font-medium">Scorpion PUGBM Közösség</span> több
              mint egy egyszerű PUBG Mobile csapat.
            </p>
            <p>
              Egy olyan magyar játékosközösséget építünk, ahol az aktív játék, a
              kommunikáció és az összetartás valódi értéket képvisel.
            </p>
            <p>
              Nálunk nem csak a statisztikák számítanak. A célunk egy aktív, fejlődő és
              hosszú távon működő közösség létrehozása, ahol minden tag megtalálhatja a helyét.
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group relative scorpion-border rounded-xl p-6 md:p-8 bg-gradient-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-sm"
            >
              <div className="relative h-14 w-14 rounded-lg bg-primary/10 border border-primary/40 grid place-items-center mb-5 group-hover:bg-primary/20 transition-colors">
                <Icon className="h-6 w-6 text-primary" />
                <div className="absolute inset-0 rounded-lg blur-xl bg-primary/30 opacity-0 group-hover:opacity-60 transition-opacity" />
              </div>
              <h3 className="font-display font-bold text-xl tracking-[0.15em] uppercase text-foreground mb-3">
                {title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
