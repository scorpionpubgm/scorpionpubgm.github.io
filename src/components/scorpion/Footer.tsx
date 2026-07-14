import { DiscordIcon, FacebookIcon, InstagramIcon, TikTokIcon, ScorpionMark } from "./SocialIcons";
import { SOCIAL_LINKS } from "./Social";

const ICONS = [
  { label: "Discord", url: SOCIAL_LINKS.discord, Icon: DiscordIcon },
  { label: "Facebook", url: SOCIAL_LINKS.facebook, Icon: FacebookIcon },
  { label: "Instagram", url: SOCIAL_LINKS.instagram, Icon: InstagramIcon },
  { label: "TikTok", url: SOCIAL_LINKS.tiktok, Icon: TikTokIcon },
];

export function Footer() {
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
            Scorpion PUGBM <span className="text-gradient-red">Közösség</span>
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
          <p>© {new Date().getFullYear()} Scorpion PUGBM Közösség — Minden jog fenntartva.</p>
          <p className="font-display tracking-[0.2em] uppercase">Magyar PUBG Mobile közösség</p>
        </div>
      </div>
    </footer>
  );
}
