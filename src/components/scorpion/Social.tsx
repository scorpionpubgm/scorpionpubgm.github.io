import { ArrowUpRight } from "lucide-react";
import { DiscordIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "./SocialIcons";

export const SOCIAL_LINKS = {
  discord: "https://discord.gg/24btAFTsPD",
  facebook: "https://www.facebook.com/share/19Yg7g8bwu/",
  instagram: "https://www.instagram.com/scorpion.pubg.kozosseg?igsh=Nmx3Z2EzcDFkNWU4",
  tiktok: "https://www.tiktok.com/@scorpion.pugbm.kz?_r=1&_t=ZN-981TGSUcEHH",
} as const;

const PLATFORMS = [
  {
    key: "discord",
    title: "Scorpion Discord",
    desc: "Csatlakozz a közösséghez, beszélgess a tagokkal és maradj naprakész a Scorpion eseményeivel kapcsolatban.",
    cta: "Csatlakozás a Discordhoz",
    url: SOCIAL_LINKS.discord,
    Icon: DiscordIcon,
  },
  {
    key: "facebook",
    title: "Scorpion Facebook",
    desc: "Kövesd a Scorpion PUGBM Közösség híreit és bejegyzéseit Facebookon.",
    cta: "Scorpion a Facebookon",
    url: SOCIAL_LINKS.facebook,
    Icon: FacebookIcon,
  },
  {
    key: "instagram",
    title: "Scorpion Instagram",
    desc: "Nézd meg a Scorpion közösség képeit, pillanatait és legújabb tartalmait.",
    cta: "Kövess Instagramon",
    url: SOCIAL_LINKS.instagram,
    Icon: InstagramIcon,
  },
  {
    key: "tiktok",
    title: "Scorpion TikTok",
    desc: "Kövesd a Scorpion PUGBM videóit, promócióit és TikTok élő adásait.",
    cta: "Scorpion a TikTokon",
    url: SOCIAL_LINKS.tiktok,
    Icon: TikTokIcon,
  },
];

export function Social() {
  return (
    <section id="social" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <header className="max-w-3xl mb-12">
          <div className="eyebrow mb-4">Közösségi platformok</div>
          <h2 className="section-title">
            Kövess minket • <span className="text-gradient-red">Csatlakozz</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Légy részese a Scorpion PUGBM Közösségnek. Csatlakozz Discord szerverünkhöz, és
            kövesd a közösség legújabb tartalmait, eseményeit és videóit.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {PLATFORMS.map(({ key, title, desc, cta, url, Icon }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group scorpion-border rounded-xl p-6 sm:p-7 bg-gradient-card hover:-translate-y-1 hover:shadow-glow-sm transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-primary/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative flex items-start gap-5">
                <div className="shrink-0 h-14 w-14 rounded-lg border border-primary/40 bg-primary/10 grid place-items-center text-primary group-hover:bg-primary/20 group-hover:scale-105 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display font-bold text-lg sm:text-xl tracking-[0.12em] uppercase text-foreground">
                      {title}
                    </h3>
                    <ArrowUpRight className="h-5 w-5 text-primary/70 shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  <div className="mt-4">
                    <span className="inline-flex items-center gap-2 font-display text-xs tracking-[0.2em] uppercase text-primary group-hover:text-ember transition-colors">
                      {cta}
                      <span className="h-px w-8 bg-primary group-hover:w-12 transition-all" />
                    </span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
