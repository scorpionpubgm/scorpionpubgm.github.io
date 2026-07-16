import { useState } from "react";
import { Crown, Shield, Star, GraduationCap, User } from "lucide-react";
import { ScorpionMark } from "./SocialIcons";
import {
  useScorpionData,
  type TeamMember,
  type TeamTier,
} from "./data/ScorpionDataContext";

export function Team() {
  const { team } = useScorpionData();

  const leader = team.find((m) => m.tier === "leader");
  const leadership = team.filter((m) => m.tier === "leadership");
  const admins = team.filter((m) => m.tier === "admin");
  const members = team.filter((m) => m.tier === "member");

  return (
    <section id="csapat" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-blood/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-14 md:mb-20">
          <div className="eyebrow mb-4">A csapat</div>
          <h2 className="section-title">
            A <span className="text-gradient-red">Scorpion</span> Csapat
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Ismerd meg azokat, akik a Scorpion közösséget építik.
          </p>
        </header>

        {leader && <LeaderCard player={leader} />}

        {leadership.length > 0 && (
          <RoleGroup title="Vezetőség" subtitle="A közösség irányítói">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {leadership.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </RoleGroup>
        )}

        {admins.length > 0 && (
          <RoleGroup title="Adminok" subtitle="Moderáció és mentorálás">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {admins.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </RoleGroup>
        )}

        {members.length > 0 && (
          <RoleGroup title="Tagok" subtitle="A Scorpion aktív játékosai">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {members.map((p) => (
                <PlayerCard key={p.id} player={p} />
              ))}
            </div>
          </RoleGroup>
        )}
      </div>
    </section>
  );
}

function RoleGroup({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-16">
      <div className="flex items-end justify-between gap-4 mb-6 border-b border-primary/20 pb-4">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-2xl tracking-[0.2em] uppercase text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
        <div className="hidden sm:block h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent ml-6 mb-3" />
      </div>
      {children}
    </div>
  );
}

/**
 * Premium avatar frame: circular with animated neon-red glow ring,
 * ember-tone inner border and radial highlight for a gamer/esport feel.
 */
export function AvatarFrame({
  src,
  alt,
  size,
  tier,
  fallback,
}: {
  src?: string;
  alt: string;
  size: string;
  tier: TeamTier;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = !!src && !failed;

  const ringConfig: Record<TeamTier, { outer: string; inner: string }> = {
    leader: {
      outer:
        "bg-[conic-gradient(from_0deg,oklch(0.62_0.24_25),oklch(0.72_0.20_35),oklch(0.62_0.24_25))] shadow-[0_0_24px_oklch(0.62_0.24_25/0.7)]",
      inner: "bg-background",
    },
    leadership: {
      outer:
        "bg-[conic-gradient(from_0deg,oklch(0.62_0.24_25),oklch(0.42_0.20_25),oklch(0.62_0.24_25))] shadow-[0_0_18px_oklch(0.62_0.24_25/0.55)]",
      inner: "bg-background",
    },
    admin: {
      outer:
        "bg-[conic-gradient(from_0deg,oklch(0.72_0.20_35),oklch(0.62_0.24_25),oklch(0.72_0.20_35))] shadow-[0_0_16px_oklch(0.72_0.20_35/0.45)]",
      inner: "bg-background",
    },
    member: {
      outer:
        "bg-[conic-gradient(from_0deg,oklch(0.42_0.20_25),oklch(0.28_0.02_25),oklch(0.42_0.20_25))] shadow-[0_0_10px_oklch(0.62_0.24_25/0.35)]",
      inner: "bg-background",
    },
  };
  const cfg = ringConfig[tier];

  return (
    <div className={`relative shrink-0 ${size}`}>
      {/* animated glow ring */}
      <div
        className={`absolute inset-0 rounded-full p-[2px] ${cfg.outer} animate-pulse-glow`}
        aria-hidden
      >
        <div className={`h-full w-full rounded-full ${cfg.inner}`} />
      </div>
      {/* inner content */}
      <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gradient-to-br from-blood/40 via-background to-background grid place-items-center">
        {showImg ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
            draggable={false}
          />
        ) : (
          <div className="text-primary drop-shadow-[0_0_10px_oklch(0.62_0.24_25/0.8)]">
            {fallback}
          </div>
        )}
      </div>
    </div>
  );
}

function LeaderCard({ player }: { player: TeamMember }) {
  return (
    <article className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-primary/25 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <div
        className="relative rounded-2xl overflow-hidden scorpion-border grain-overlay shadow-leader"
        style={{ background: "var(--gradient-leader)" }}
      >
        <ScorpionMark className="pointer-events-none absolute -right-10 -top-10 h-[280px] w-[280px] opacity-[0.08]" />

        <div className="relative p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
          <AvatarFrame
            src={player.avatar}
            alt={player.name}
            size="h-32 w-32 md:h-40 md:w-40"
            tier="leader"
            fallback={<Crown className="h-14 w-14 md:h-16 md:w-16" />}
          />

          <div className="flex-1 min-w-0 text-center md:text-left">
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-3">
              <span className="badge-role !bg-primary/30 !border-primary/70 !text-foreground">
                <Star className="h-3 w-3" /> Tulajdonos
              </span>
              <span className="badge-role !bg-ember/20 !border-ember/50 !text-foreground">
                Vezető
              </span>
            </div>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground tracking-wide break-words">
              {player.name}
            </h3>
            {player.pubgId && (
              <p className="mt-1 text-sm font-mono tracking-wider text-primary/70">
                ID: {player.pubgId}
              </p>
            )}
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
              A Scorpion PUBGM Közösség alapítója és vezetője. A csapat iránya, a
              döntések és a közösség jövőképe az ő kezében.
            </p>


          </div>
        </div>
      </div>
    </article>
  );
}

function PlayerCard({ player }: { player: TeamMember }) {
  const Icon = player.tier === "leadership" || player.tier === "admin" ? Shield : User;

  return (
    <article
      className="group relative scorpion-border rounded-xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 group-hover:shadow-glow-sm"
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      <div className="relative flex items-center gap-4 min-w-0">
        <AvatarFrame
          src={player.avatar}
          alt={player.name}
          size="h-14 w-14"
          tier={player.tier}
          fallback={<Icon className="h-6 w-6" />}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="badge-role">{player.role}</span>
            {player.badge && (
              <span className="badge-role !bg-ember/15 !border-ember/50 !text-ember">
                <GraduationCap className="h-3 w-3" /> {player.badge}
              </span>
            )}
          </div>
          <h4 className="font-display font-bold text-base sm:text-lg text-foreground break-words leading-tight">
            {player.name}
          </h4>
          {player.pubgId && (
            <p className="mt-1 text-xs font-mono tracking-wider text-muted-foreground/80">
              ID: <span className="text-primary/70">{player.pubgId}</span>
            </p>
          )}

        </div>
      </div>

      <div className="pointer-events-none absolute top-0 right-0 h-16 w-16">
        <div className="absolute top-0 right-0 h-px w-10 bg-primary/60" />
        <div className="absolute top-0 right-0 h-10 w-px bg-primary/60" />
      </div>
    </article>
  );
}
