import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Trash2,
  Plus,
  UserPlus,
  CalendarPlus,
  Youtube,
  Building2,
  Inbox,
  ArrowLeft,
  ExternalLink,
} from "lucide-react";
import {
  ScorpionDataProvider,
  useScorpionData,
  detectMediaKind,
  AVATAR_PRESETS,
  type TeamTier,
  type EventStatus,
} from "@/components/scorpion/data/ScorpionDataContext";

export const Route = createFileRoute("/admin-dashboard")({
  head: () => ({
    meta: [
      { title: "Scorpion Admin Dashboard — Scorpion PUBGM Közösség" },
      {
        name: "description",
        content:
          "Scorpion PUBGM Közösség belső admin felület: tagok, események, média, szponzorok és jelentkezések kezelése.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <ScorpionDataProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <AdminInner />
      </div>
    </ScorpionDataProvider>
  );
}

type Tab = "team" | "events" | "media" | "sponsors" | "applications";

function AdminInner() {
  const [tab, setTab] = useState<Tab>("team");

  const tabs: { id: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "team", label: "Tagok", icon: UserPlus },
    { id: "events", label: "Események", icon: CalendarPlus },
    { id: "media", label: "Média", icon: Youtube },
    { id: "sponsors", label: "Szponzorok", icon: Building2 },
    { id: "applications", label: "Jelentkezők", icon: Inbox },
  ];

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-primary/25 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-3 sm:px-6 py-3 flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="eyebrow">Admin Dashboard</p>
            <h1 className="font-display font-extrabold text-base sm:text-xl tracking-[0.2em] uppercase text-foreground truncate">
              SCORPION <span className="text-gradient-red">CONTROL</span>
            </h1>
          </div>
          <Link
            to="/"
            className="btn-ghost !py-2 !px-3 text-xs shrink-0 inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Vissza az oldalra</span>
            <span className="sm:hidden">Vissza</span>
          </Link>
        </div>

        {/* Tabs — horizontally scrollable on mobile */}
        <nav className="border-t border-primary/15 overflow-x-auto no-scrollbar">
          <div className="mx-auto max-w-6xl px-2 sm:px-4 flex gap-1 min-w-max">
            {tabs.map(({ id, label, icon: Icon }) => {
              const active = tab === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex items-center gap-2 px-3 py-3 text-xs sm:text-sm font-display tracking-[0.15em] uppercase whitespace-nowrap border-b-2 transition-colors ${
                    active
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" /> {label}
                </button>
              );
            })}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-3 sm:px-6 py-6 sm:py-10 space-y-8">
        {tab === "team" && <TeamAdmin />}
        {tab === "events" && <EventsAdmin />}
        {tab === "media" && <MediaAdmin />}
        {tab === "sponsors" && <SponsorsAdmin />}
        {tab === "applications" && <ApplicationsAdmin />}
      </main>

      <AdminStyles />
    </>
  );
}

/* ============= Shared UI ============= */

function AdminCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="scorpion-border rounded-xl bg-gradient-card p-4 sm:p-6">
      <h2 className="font-display font-bold text-sm sm:text-base tracking-[0.2em] uppercase text-foreground mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <span className="block text-[0.7rem] font-display tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
      {children}
    </span>
  );
}

function DeleteBtn({ onClick, label = "Törlés" }: { onClick: () => void; label?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 rounded-md border border-destructive/50 bg-destructive/10 px-3 py-2 text-xs font-display tracking-[0.15em] uppercase text-destructive hover:bg-destructive/20 transition-colors min-h-[40px]"
    >
      <Trash2 className="h-3.5 w-3.5" /> {label}
    </button>
  );
}

/* ============= Team Admin ============= */

function TeamAdmin() {
  const { team, addTeam, removeTeam } = useScorpionData();
  const [name, setName] = useState("");
  const [pubgId, setPubgId] = useState("");
  const [role, setRole] = useState("Scorpion Tag");
  const [tier, setTier] = useState<TeamTier>("member");
  const [avatarSource, setAvatarSource] = useState<"preset" | "url">("preset");
  const [preset, setPreset] = useState<string>(AVATAR_PRESETS[0]?.url ?? "");
  const [customUrl, setCustomUrl] = useState("");
  const [badge, setBadge] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    addTeam({
      name: name.trim(),
      role: role.trim() || "Scorpion Tag",
      tier,
      badge: badge.trim() || undefined,
      pubgId: pubgId.trim() || undefined,
      avatar: (avatarSource === "url" ? customUrl : preset).trim() || undefined,
    });
    setName("");
    setPubgId("");
    setBadge("");
    setCustomUrl("");
  }

  return (
    <>
      <AdminCard title="Új tag hozzáadása">
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label>Játékosnév</Label>
            <input
              className="admin-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="pl. 〆SCPNewPlayer"
              required
            />
          </div>
          <div>
            <Label>Rang / Szerep</Label>
            <input
              className="admin-input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="pl. Scorpion Tag"
            />
          </div>
          <div>
            <Label>Kategória</Label>
            <select
              className="admin-input"
              value={tier}
              onChange={(e) => setTier(e.target.value as TeamTier)}
            >
              <option value="leader">Tulajdonos / Vezető</option>
              <option value="leadership">Vezetőség</option>
              <option value="admin">Admin</option>
              <option value="member">Tag</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label>Kitüntetés (opcionális)</Label>
            <input
              className="admin-input"
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              placeholder="pl. Trainer • Mentor"
            />
          </div>

          <div className="sm:col-span-2">
            <Label>Avatar</Label>
            <div className="flex gap-2 mb-2 flex-wrap">
              <button
                type="button"
                onClick={() => setAvatarSource("preset")}
                className={`px-3 py-2 rounded-md text-xs font-display tracking-[0.15em] uppercase border transition-colors ${
                  avatarSource === "preset"
                    ? "border-primary/70 bg-primary/15 text-foreground"
                    : "border-border bg-card/60 text-muted-foreground"
                }`}
              >
                PUBG avatar
              </button>
              <button
                type="button"
                onClick={() => setAvatarSource("url")}
                className={`px-3 py-2 rounded-md text-xs font-display tracking-[0.15em] uppercase border transition-colors ${
                  avatarSource === "url"
                    ? "border-primary/70 bg-primary/15 text-foreground"
                    : "border-border bg-card/60 text-muted-foreground"
                }`}
              >
                Egyedi URL
              </button>
            </div>
            {avatarSource === "preset" ? (
              <select
                className="admin-input"
                value={preset}
                onChange={(e) => setPreset(e.target.value)}
              >
                {AVATAR_PRESETS.map((p) => (
                  <option key={p.url} value={p.url}>
                    {p.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                className="admin-input"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://..."
                inputMode="url"
              />
            )}
          </div>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="btn-primary w-full sm:w-auto inline-flex items-center gap-2"
            >
              <Plus className="h-4 w-4" /> Tag hozzáadása
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard title={`Meglévő tagok (${team.length})`}>
        <ul className="space-y-2">
          {team.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/40"
            >
              <div className="h-10 w-10 shrink-0 rounded-full overflow-hidden border border-primary/40 bg-background grid place-items-center">
                {m.avatar ? (
                  <img src={m.avatar} alt="" className="h-full w-full object-cover" />
                ) : (
                  <span className="text-xs text-primary font-bold">SCP</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold text-sm text-foreground break-words leading-tight">
                  {m.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {tierLabel(m.tier)} • {m.role}
                  {m.badge ? ` • ${m.badge}` : ""}
                </p>
              </div>
              <DeleteBtn onClick={() => removeTeam(m.id)} />
            </li>
          ))}
        </ul>
      </AdminCard>
    </>
  );
}

function tierLabel(t: TeamTier) {
  return t === "leader"
    ? "Tulajdonos"
    : t === "leadership"
      ? "Vezetőség"
      : t === "admin"
        ? "Admin"
        : "Tag";
}

/* ============= Events Admin ============= */

function EventsAdmin() {
  const { events, addEvent, removeEvent } = useScorpionData();
  const [form, setForm] = useState({
    type: "TikTok élő adás",
    title: "",
    date: "",
    time: "",
    description: "",
    status: "Hamarosan" as EventStatus,
    link: "",
  });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) return;
    addEvent({
      type: form.type.trim(),
      title: form.title.trim(),
      date: form.date || undefined,
      time: form.time || undefined,
      description: form.description || undefined,
      status: form.status,
      link: form.link || undefined,
    });
    setForm({ ...form, title: "", description: "", link: "" });
  }

  return (
    <>
      <AdminCard title="Új esemény">
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Típus</Label>
            <input
              className="admin-input"
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            />
          </div>
          <div>
            <Label>Státusz</Label>
            <select
              className="admin-input"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value as EventStatus })}
            >
              <option>Hamarosan</option>
              <option>Jelentkezés nyitva</option>
              <option>Élő</option>
              <option>Lezárult</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <Label>Cím</Label>
            <input
              className="admin-input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="pl. Scorpion belső bajnokság"
              required
            />
          </div>
          <div>
            <Label>Dátum</Label>
            <input
              className="admin-input"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              placeholder="2026-08-01"
            />
          </div>
          <div>
            <Label>Időpont</Label>
            <input
              className="admin-input"
              value={form.time}
              onChange={(e) => setForm({ ...form, time: e.target.value })}
              placeholder="20:00"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Leírás</Label>
            <textarea
              className="admin-input resize-none"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Link (opcionális)</Label>
            <input
              className="admin-input"
              value={form.link}
              onChange={(e) => setForm({ ...form, link: e.target.value })}
              placeholder="https://..."
              inputMode="url"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2">
              <Plus className="h-4 w-4" /> Esemény hozzáadása
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard title={`Események (${events.length})`}>
        {events.length === 0 ? (
          <p className="text-sm text-muted-foreground">Még nincs esemény.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((e) => (
              <li
                key={e.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-background/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-sm text-foreground break-words leading-tight">
                    {e.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {e.type} • {e.status} • {e.date ?? "—"} {e.time ?? ""}
                  </p>
                </div>
                <DeleteBtn onClick={() => removeEvent(e.id)} />
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </>
  );
}

/* ============= Media Admin ============= */

function MediaAdmin() {
  const { media, addMedia, removeMedia } = useScorpionData();
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim()) return;
    addMedia({ url: url.trim(), title: title.trim() || undefined });
    setUrl("");
    setTitle("");
  }

  return (
    <>
      <AdminCard title="Új média (YouTube / TikTok / zene URL)">
        <form onSubmit={submit} className="grid grid-cols-1 gap-4">
          <div>
            <Label>URL</Label>
            <input
              className="admin-input"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/... vagy https://tiktok.com/... vagy .mp3"
              inputMode="url"
              required
            />
            {url && (
              <p className="mt-1.5 text-[0.7rem] font-display tracking-[0.15em] uppercase text-primary">
                Felismert típus: {detectMediaKind(url)}
              </p>
            )}
          </div>
          <div>
            <Label>Cím (opcionális)</Label>
            <input
              className="admin-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="pl. Scorpion montázs #1"
            />
          </div>
          <div>
            <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2">
              <Plus className="h-4 w-4" /> Hozzáadás
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard title={`Média elemek (${media.length})`}>
        {media.length === 0 ? (
          <p className="text-sm text-muted-foreground">Még nincs média elem.</p>
        ) : (
          <ul className="space-y-2">
            {media.map((m) => (
              <li
                key={m.id}
                className="flex items-start justify-between gap-3 p-3 rounded-lg border border-border bg-background/40"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-sm text-foreground break-words leading-tight">
                    {m.title ?? "(cím nélkül)"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 break-all">
                    {m.kind.toUpperCase()} — {m.url}
                  </p>
                </div>
                <DeleteBtn onClick={() => removeMedia(m.id)} />
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </>
  );
}

/* ============= Sponsors Admin ============= */

function SponsorsAdmin() {
  const { sponsors, addSponsor, removeSponsor } = useScorpionData();
  const [form, setForm] = useState({ name: "", logo: "", url: "" });

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.logo.trim()) return;
    addSponsor({
      name: form.name.trim(),
      logo: form.logo.trim(),
      url: form.url.trim() || undefined,
    });
    setForm({ name: "", logo: "", url: "" });
  }

  return (
    <>
      <AdminCard title="Új szponzor">
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Label>Név</Label>
            <input
              className="admin-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label>Logó URL</Label>
            <input
              className="admin-input"
              value={form.logo}
              onChange={(e) => setForm({ ...form, logo: e.target.value })}
              placeholder="https://..."
              inputMode="url"
              required
            />
          </div>
          <div>
            <Label>Weboldal (opcionális)</Label>
            <input
              className="admin-input"
              value={form.url}
              onChange={(e) => setForm({ ...form, url: e.target.value })}
              placeholder="https://..."
              inputMode="url"
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="btn-primary w-full sm:w-auto inline-flex items-center gap-2">
              <Plus className="h-4 w-4" /> Szponzor hozzáadása
            </button>
          </div>
        </form>
      </AdminCard>

      <AdminCard title={`Szponzorok (${sponsors.length})`}>
        {sponsors.length === 0 ? (
          <p className="text-sm text-muted-foreground">Még nincs szponzor.</p>
        ) : (
          <ul className="space-y-2">
            {sponsors.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background/40"
              >
                <div className="h-12 w-16 shrink-0 rounded border border-border bg-background grid place-items-center overflow-hidden">
                  <img src={s.logo} alt="" className="max-h-full max-w-full object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-display font-bold text-sm text-foreground break-words">
                    {s.name}
                  </p>
                  {s.url && (
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:text-ember inline-flex items-center gap-1 break-all"
                    >
                      {s.url} <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  )}
                </div>
                <DeleteBtn onClick={() => removeSponsor(s.id)} />
              </li>
            ))}
          </ul>
        )}
      </AdminCard>
    </>
  );
}

/* ============= Applications Admin ============= */

function ApplicationsAdmin() {
  const { applications, removeApplication } = useScorpionData();

  return (
    <AdminCard title={`Beérkezett jelentkezések (${applications.length})`}>
      {applications.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Még nem érkezett jelentkezés a főoldali űrlapról.
        </p>
      ) : (
        <ul className="space-y-3">
          {applications.map((a) => (
            <li
              key={a.id}
              className="p-3 sm:p-4 rounded-lg border border-border bg-background/40"
            >
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div className="min-w-0">
                  <p className="font-display font-bold text-sm sm:text-base text-foreground break-words">
                    {a.playerName}
                  </p>
                  <p className="text-[0.7rem] text-muted-foreground tracking-wider uppercase mt-0.5">
                    {new Date(a.createdAt).toLocaleString("hu-HU")}
                  </p>
                </div>
                <DeleteBtn onClick={() => removeApplication(a.id)} />
              </div>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <Row k="Életkor" v={a.age} />
                <Row k="Rank" v={a.rank} />
                <Row k="Aktivitás" v={a.activity} />
                <Row k="Játék óta" v={a.playingSince} />
                <Row k="Discord" v={a.discord} />
              </dl>
              {a.reason && (
                <p className="mt-3 text-sm text-foreground/90 whitespace-pre-wrap break-words border-t border-border pt-2">
                  {a.reason}
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex gap-2 min-w-0">
      <dt className="text-muted-foreground tracking-wider uppercase text-[0.65rem] font-display shrink-0 pt-0.5">
        {k}:
      </dt>
      <dd className="text-foreground break-words min-w-0">{v || "—"}</dd>
    </div>
  );
}

/* ============= Local admin styles ============= */

function AdminStyles() {
  return (
    <style>{`
      .admin-input {
        width: 100%;
        min-height: 44px;
        background: oklch(0.13 0.01 20 / 0.7);
        border: 1px solid oklch(0.30 0.02 25 / 0.7);
        border-radius: 0.5rem;
        padding: 0.6rem 0.75rem;
        color: oklch(0.96 0.005 30);
        font-family: var(--font-sans);
        font-size: 1rem;
        transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
        outline: none;
        max-width: 100%;
      }
      .admin-input::placeholder { color: oklch(0.55 0.02 25); }
      .admin-input:focus {
        border-color: oklch(0.62 0.24 25 / 0.7);
        box-shadow: 0 0 0 3px oklch(0.62 0.24 25 / 0.2);
        background: oklch(0.15 0.012 20 / 0.9);
      }
      .admin-input option { background: oklch(0.13 0.01 20); color: oklch(0.96 0.005 30); }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    `}</style>
  );
}
