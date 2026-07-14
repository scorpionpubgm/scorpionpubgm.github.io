import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ScorpionMark } from "./SocialIcons";

const NAV_ITEMS = [
  { label: "Főoldal", href: "#hero" },
  { label: "Rólunk", href: "#rolunk" },
  { label: "Csapat", href: "#csapat" },
  { label: "Scrim", href: "#scrim" },
  { label: "Események", href: "#esemenyek" },
  { label: "Media", href: "#media" },
  { label: "Jelentkezés", href: "#jelentkezes" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-primary/20 shadow-[0_8px_30px_-10px_oklch(0_0_0/0.6)]"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          {/* Logo placeholder */}
          <a href="#hero" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative h-10 w-10 rounded-md scorpion-border grid place-items-center overflow-hidden">
              <ScorpionMark className="h-7 w-7 transition-transform group-hover:scale-110" />
            </div>
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display font-bold text-sm tracking-[0.2em] text-foreground">SCORPION</span>
              <span className="font-display text-[0.65rem] tracking-[0.3em] text-primary">PUGBM KÖZÖSSÉG</span>
            </div>
          </a>

          {/* Desktop menu */}
          <ul className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="px-3 py-2 text-sm font-display font-medium tracking-[0.12em] uppercase text-muted-foreground hover:text-foreground transition-colors relative after:content-[''] after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px after:bg-primary after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a href="#jelentkezes" className="hidden md:inline-flex btn-primary text-xs !py-2.5 !px-4">
              Csatlakozz
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-grid place-items-center h-11 w-11 rounded-md border border-primary/40 bg-card/60 backdrop-blur text-foreground"
              aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
              aria-expanded={open}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 md:top-20 bottom-0 z-40 transition-all duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-xl"
          onClick={() => setOpen(false)}
        />
        <div className="relative h-full overflow-y-auto px-6 py-8">
          <ul className="flex flex-col gap-1">
            {NAV_ITEMS.map((item, i) => (
              <li
                key={item.href}
                style={{ animationDelay: `${i * 40}ms` }}
                className="animate-fade-in"
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 px-4 border-b border-border/50 font-display text-lg tracking-[0.15em] uppercase text-foreground hover:text-primary hover:bg-card/60 rounded-md transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#jelentkezes"
            onClick={() => setOpen(false)}
            className="btn-primary w-full mt-8"
          >
            Csatlakozz hozzánk
          </a>
        </div>
      </div>
    </header>
  );
}
