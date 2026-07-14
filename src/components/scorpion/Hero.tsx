import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Users } from "lucide-react";
import { ScorpionMark } from "./SocialIcons";

export function Hero() {
  const [reduced, setReduced] = useState(false);
  const [parallax, setParallax] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setParallax(Math.min(window.scrollY, 400));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  // Fewer particles on small screens (perf)
  const emberCount = typeof window !== "undefined" && window.innerWidth < 640 ? 14 : 22;
  const embers = useMemo(
    () =>
      Array.from({ length: emberCount }).map((_, i) => ({
        left: `${(i * 4.7) % 100}%`,
        size: 2 + ((i * 7) % 5),
        duration: 10 + ((i * 3) % 10),
        delay: (i * 0.6) % 12,
        opacity: 0.35 + ((i % 5) / 12),
      })),
    [emberCount]
  );

  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-hero grain-overlay"
    >
      {/* Cinematic smoke */}
      <div className="hero-smoke" aria-hidden />
      <div className="hero-smoke-2" aria-hidden />

      {/* Ambient red glows */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[500px] rounded-full bg-ember/15 blur-[100px]" />

      {/* Scanlines */}
      <div className="pointer-events-none absolute inset-0 scanlines opacity-25" />

      {/* Ember particles */}
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {embers.map((e, i) => (
            <span
              key={i}
              className="animate-ember absolute bottom-0 rounded-full"
              style={{
                left: e.left,
                width: e.size,
                height: e.size,
                background:
                  "radial-gradient(circle, oklch(0.75 0.22 35), oklch(0.55 0.22 25 / 0))",
                boxShadow: "0 0 8px oklch(0.72 0.20 35)",
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
                opacity: e.opacity,
              }}
            />
          ))}
        </div>
      )}

      {/* Faint scorpion watermark with subtle parallax */}
      <ScorpionMark
        className="pointer-events-none absolute -right-10 -bottom-10 h-[500px] w-[500px] opacity-[0.06]"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{ transform: `translate3d(0, ${parallax * 0.15}px, 0)` }}
        aria-hidden
      >
        <ScorpionMark className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[70vmin] w-[70vmin] opacity-[0.035]" />
      </div>

      {/* Vignette */}
      <div className="vignette" aria-hidden />

      <div
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32 w-full"
        style={{ transform: `translate3d(0, ${parallax * -0.05}px, 0)` }}
      >
        <div className="flex flex-col items-center text-center gap-8 md:gap-10">
          {/* Logo placeholder */}
          <div className="relative">
         <img src="/logo.jpg" alt="Scorpion PUBG M" className="w-32 h-32 md:w-40 md:h-40 object-contain rounded-full border-2 border-red-600 shadow-lg shadow-red-900/50 mx-auto mb-4" />
            
          </div>

          <div className="eyebrow">Magyar PUBG Mobile közösség</div>

          <h1 className="section-title !text-4xl sm:!text-6xl md:!text-7xl lg:!text-8xl font-extrabold">
            <span className="block text-foreground animate-title-glow">
              SCORPION PUGBM
            </span>
            <span className="block text-gradient-red mt-1">KÖZÖSSÉG</span>
          </h1>

          <p className="font-display text-lg sm:text-xl md:text-2xl text-foreground/90 tracking-wide max-w-3xl">
            „Nem csak együtt játszunk. <span className="text-primary">Egy közösséget építünk.</span>”
          </p>

          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl leading-relaxed">
            Egy magyar PUBG Mobile közösség, ahol a csapatjáték, az összetartás és a
            közös élmények állnak a középpontban.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto pt-2">
            <a href="#jelentkezes" className="btn-primary btn-shine">
              Csatlakozz hozzánk
            </a>
            <a href="#csapat" className="btn-ghost">
              <Users className="h-4 w-4" />
              Ismerd meg a csapatot
            </a>
          </div>
        </div>

        <a
          href="#rolunk"
          className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          aria-label="Görgess lejjebb"
        >
          <span className="text-[0.65rem] tracking-[0.3em] font-display uppercase">Görgess</span>
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
