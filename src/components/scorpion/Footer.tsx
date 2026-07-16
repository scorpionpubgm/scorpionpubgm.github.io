import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { DiscordIcon, FacebookIcon, InstagramIcon, TikTokIcon, ScorpionMark } from "./SocialIcons";
import { SOCIAL_LINKS } from "./Social";

const ADMIN_PIN = "ScorpionAdmin2026";


const ICONS = [
  { label: "Discord", url: SOCIAL_LINKS.discord, Icon: DiscordIcon },
  { label: "Facebook", url: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: "Instagram", url: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "TikTok", url: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
];

export function Footer() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setOpen(false);
      setPin("");
      setError(false);
      navigate({ to: "/admin-dashboard" });
    } else {
      setError(true);
    }
  };

  return (

    <footer className="relative pt-20 pb-10 border-t border-primary/20 overflow-hidden">
      <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-[300px] w-[900px] rounded-full bg-primary/10 blur-[120px]" />
      <ScorpionMark className="pointer-events-none absolute -right-20 top-10 h-[400px] w-[400px] opacity-[0.04]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 -m-3 rounded-full bg-primary/25 blur-2xl" />
            <div className="relative h-20 w-20 rounded-full scorpion-border grid place-items-center bg-background/60">
              <ScorpionMark className="h-14 w-14" />
            </div>
          </div>

          <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-[0.2em] uppercase text-foreground">
            Scorpion PUBGM <span className="text-gradient-red">Közösség</span>
          </h3>
          <p className="font-display text-base text-muted-foreground tracking-wide">
            „Egy közösség. Egy csapat. Egy Scorpion.”
          </p>

          <ul className="flex items-center gap-3 sm:gap-4 mt-2">
            {ICONS.map(({ label, url, Icon }) => (
              <li key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group h-12 w-12 rounded-lg border border-primary/40 bg-card/60 backdrop-blur grid place-items-center text-foreground hover:text-primary hover:border-primary hover:shadow-glow-sm hover:-translate-y-0.5 transition-all"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Scorpion PUBGM Közösség — Minden jog fenntartva.</p>
          <div className="flex items-center gap-4">
            <p className="font-display tracking-[0.2em] uppercase">Magyar PUBG Mobile közösség</p>
            <button
              type="button"
              onClick={() => { setError(false); setPin(""); setOpen(true); }}
              className="font-display tracking-[0.2em] uppercase text-primary/70 hover:text-primary transition-colors"
            >
              Admin
            </button>

          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <form
            onSubmit={submit}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-2xl border border-primary/60 bg-background/95 p-6 shadow-[0_0_40px_oklch(0.62_0.24_25/0.45)]"
          >
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-primary/30" />
            <h3 className="font-display font-extrabold text-xl tracking-[0.2em] uppercase text-foreground mb-1">
              Admin <span className="text-gradient-red">Belépés</span>
            </h3>
            <p className="text-xs text-muted-foreground mb-5">Add meg a hozzáférési kódot.</p>

            <input
              type="password"
              autoFocus
              value={pin}
              onChange={(e) => { setPin(e.target.value); setError(false); }}
              placeholder="PIN kód"
              className="w-full rounded-lg bg-black/60 border border-primary/40 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 px-4 py-3 text-foreground placeholder:text-muted-foreground/60 font-mono tracking-widest"
            />

            {error && (
              <p className="mt-3 text-sm font-semibold text-primary animate-pulse">
                Hibás hozzáférés!
              </p>
            )}

            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-lg border border-border/60 bg-transparent px-4 py-2.5 text-sm font-display tracking-[0.15em] uppercase text-muted-foreground hover:text-foreground hover:border-foreground/40 transition"
              >
                Mégse
              </button>
              <button
                type="submit"
                className="flex-1 rounded-lg bg-primary/90 hover:bg-primary px-4 py-2.5 text-sm font-display tracking-[0.15em] uppercase text-primary-foreground shadow-[0_0_20px_oklch(0.62_0.24_25/0.5)] transition"
              >
                Belépés
              </button>
            </div>
          </form>
        </div>
      )}
    </footer>
  );
}
