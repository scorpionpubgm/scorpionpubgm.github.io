import { useState } from "react";
import { Crown, Shield, Star, GraduationCap, User } from "lucide-react";
import { ScorpionMark } from "./SocialIcons";

type Player = {
  name: string;
  role: string;
  badge?: string;
  /** Optional avatar URL. When absent, the role icon is used. */
  avatar?: string;
};

const LEADER: Player = { name: "〆SCP×Zs99×", role: "Tulajdonos • Vezető" };

const LEADERSHIP: Player[] = [
  { name: "〆SCPSwanJack", role: "Vezetőség" },
  { name: "〆SCPCsernobil", role: "Vezetőség" },
  { name: "〆SCPOlivér", role: "Vezetőség" },
];

const ADMINS: Player[] = [
  { name: "〆SCPNoname", role: "Admin" },
  { name: "〆SCPSword", role: "Admin", badge: "Trainer • Mentor" },
  { name: "〆SCPÆTØM×͜×", role: "Admin" },
  { name: "〆SCPLaca", role: "Admin" },
  { name: "〆SCP×ROYALK9×", role: "Admin" },
];

const MEMBERS: Player[] = [
  { name: "〆SCPEszkobar", role: "Scorpion Tag" },
  { name: "〆SCPBandy", role: "Scorpion Tag" },
  { name: "〆SCPMark", role: "Scorpion Tag" },
  { name: "〆SCPENDLucifer", role: "Scorpion Tag" },
  { name: "〆SCP『CinThia』", role: "Scorpion Tag" },
  { name: "〆SCPHUNLucifer", role: "Scorpion Tag" },
  { name: "〆SCP《MT》DOBY", role: "Scorpion Tag" },
];

export function Team() {
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

        <LeaderCard player={LEADER} />

        <RoleGroup title="Vezetőség" subtitle="A közösség irányítói">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {LEADERSHIP.map((p) => (
              <PlayerCard key={p.name} player={p} tier="leadership" />
            ))}
          </div>
        </RoleGroup>

        <RoleGroup title="Adminok" subtitle="Moderáció és mentorálás">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {ADMINS.map((p) => (
              <PlayerCard key={p.name} player={p} tier="admin" />
            ))}
          </div>
        </RoleGroup>

        <RoleGroup title="Tagok" subtitle="A Scorpion aktív játékosai">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {MEMBERS.map((p) => (
              <PlayerCard key={p.name} player={p} tier="member" />
            ))}
          </div>
        </RoleGroup>
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

/** Circular avatar with fallback icon and role-based glow ring */
function Avatar({
  src,
  alt,
  size,
  glowClass,
  fallback,
}: {
  src?: string;
  alt: string;
  size: string;
  glowClass: string;
  fallback: React.ReactNode;
}) {
  const [failed, setFailed] = useState(false);
  const showImg = !!src && !failed;
  return (
    <div
      className={`relative shrink-0 ${size} rounded-full grid place-items-center overflow-hidden border ${glowClass}`}
    >
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
        fallback
      )}
    </div>
  );
}

function LeaderCard({ player }: { player: Player }) {
  return (
    <article className="relative group">
      <div className="absolute inset-0 rounded-2xl bg-primary/25 blur-2xl opacity-60 group-hover:opacity-100 transition-opacity" />
      <div
        className="relative rounded-2xl overflow-hidden scorpion-border grain-overlay shadow-leader"
        style={{ background: "var(--gradient-leader)" }}
      >
        <ScorpionMark className="pointer-events-none absolute -right-10 -top-10 h-[280px] w-[280px] opacity-[0.08]" />

        <div className="relative p-6 sm:p-10 md:p-12 flex flex-col md:flex-row items-center md:items-end gap-6 md:gap-10">
          <div className="relative shrink-0">
            <div className="absolute inset-0 -m-2 rounded-full bg-primary/40 blur-2xl animate-pulse-glow" />
            <Avatar
              src={player.avatar}
              alt={player.name}
              size="h-32 w-32 md:h-40 md:w-40"
              glowClass="border-2 border-primary/70 bg-gradient-to-br from-primary/30 via-background to-background shadow-glow"
              fallback={
                <Crown className="h-14 w-14 md:h-16 md:w-16 text-primary drop-shadow-[0_0_20px_oklch(0.62_0.24_25/0.8)]" />
              }
            />
          </div>

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
            <p className="mt-3 text-sm md:text-base text-muted-foreground max-w-xl">
              A Scorpion PUGBM Közösség alapítója és vezetője. A csapat iránya, a
              döntések és a közösség jövőképe az ő kezében.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function PlayerCard({
  player,
  tier,
}: {
  player: Player;
  tier: "leadership" | "admin" | "member";
}) {
  const tierConfig = {
    leadership: {
      icon: Shield,
      glow: "group-hover:shadow-glow-sm",
      iconWrap: "border-primary/60 bg-primary/15 text-primary shadow-[0_0_18px_oklch(0.62_0.24_25/0.35)]",
      iconInner: "bg-primary/15 border-primary/50 text-primary",
    },
    admin: {
      icon: Shield,
      glow: "group-hover:shadow-glow-sm",
      iconWrap: "border-ember/50 bg-ember/10 text-ember shadow-[0_0_14px_oklch(0.72_0.20_35/0.25)]",
      iconInner: "bg-ember/10 border-ember/40 text-ember",
    },
    member: {
      icon: User,
      glow: "group-hover:shadow-glow-sm",
      iconWrap: "border-border bg-muted/60 text-foreground/80",
      iconInner: "bg-muted/60 border-border text-foreground/80",
    },
  }[tier];
  const Icon = tierConfig.icon;

  return (
    <article
      className={`group relative scorpion-border rounded-xl p-5 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${tierConfig.glow}`}
    >
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/10 via-transparent to-transparent" />

      <div className="relative flex items-center gap-4">
        <Avatar
          src={player.avatar}
          alt={player.name}
          size="h-14 w-14"
          glowClass={tierConfig.iconWrap}
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
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 right-0 h-16 w-16">
        <div className="absolute top-0 right-0 h-px w-10 bg-primary/60" />
        <div className="absolute top-0 right-0 h-10 w-px bg-primary/60" />
      </div>
    </article>
  );
}
