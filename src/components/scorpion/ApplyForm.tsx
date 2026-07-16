import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { useScorpionData } from "./data/ScorpionDataContext";

type FormState = {
  playerName: string;
  pubgId: string;
  age: string;
  activity: string;
  rank: string;
  playingSince: string;
  discord: string;
  reason: string;
  accepted: boolean;
};

const initial: FormState = {
  playerName: "",
  pubgId: "",
  age: "",
  activity: "",
  rank: "",
  playingSince: "",
  discord: "",
  reason: "",
  accepted: false,
};

export function ApplyForm() {
  const { addApplication } = useScorpionData();
  const [form, setForm] = useState<FormState>(initial);
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.accepted) return;
    const { accepted: _accepted, ...payload } = form;
    void _accepted;
    addApplication(payload);
    setSubmitted(true);
  }

  return (
    <section id="jelentkezes" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-primary/15 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative">
        <header className="text-center mb-12">
          <div className="eyebrow mb-4 justify-center">Csatlakozz</div>
          <h2 className="section-title">
            Készen <span className="text-gradient-red">állsz?</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Ha egy aktív magyar PUBG Mobile közösséget keresel, és számodra is fontos a
            kommunikáció, az összetartás és a csapatjáték, akkor lehet, hogy köztünk a helyed.
          </p>
        </header>

        {submitted ? (
          <div className="scorpion-border rounded-2xl p-8 md:p-12 bg-gradient-card text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/20 border border-primary/50 grid place-items-center mb-5 animate-pulse-glow">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-display font-bold text-2xl tracking-[0.1em] uppercase text-foreground">
              Köszönjük a jelentkezést!
            </h3>
            <p className="mt-3 text-muted-foreground max-w-lg mx-auto">
              Elmentettük a jelentkezésedet. A Scorpion admin csapat átnézi, és
              hamarosan felveszik veled a kapcsolatot a Discordon.
            </p>
            <button
              type="button"
              onClick={() => {
                setForm(initial);
                setSubmitted(false);
              }}
              className="btn-ghost mt-6"
            >
              Új jelentkezés
            </button>
          </div>
        ) : (
          <form
            onSubmit={onSubmit}
            className="scorpion-border rounded-2xl p-6 sm:p-8 md:p-10 bg-gradient-card space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field label="PUBG Mobile játékosnév" required>
                <input
                  required
                  value={form.playerName}
                  onChange={(e) => update("playerName", e.target.value)}
                  className="input-base"
                  placeholder="pl. 〆SCP..."
                />
              </Field>

              <Field label="Életkor" required>
                <input
                  required
                  type="number"
                  min={12}
                  max={99}
                  inputMode="numeric"
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  className="input-base"
                  placeholder="pl. 21"
                />
              </Field>

              <Field label="Aktivitás" required>
                <select
                  required
                  value={form.activity}
                  onChange={(e) => update("activity", e.target.value)}
                  className="input-base"
                >
                  <option value="">Válassz…</option>
                  <option>Napi több óra</option>
                  <option>Naponta 1-2 óra</option>
                  <option>Hetente többször</option>
                  <option>Hétvégén</option>
                </select>
              </Field>

              <Field label="Jelenlegi rank" required>
                <input
                  required
                  value={form.rank}
                  onChange={(e) => update("rank", e.target.value)}
                  className="input-base"
                  placeholder="pl. Ace, Conqueror…"
                />
              </Field>

              <Field label="Mióta játszol PUBG Mobile-lal?" required>
                <input
                  required
                  value={form.playingSince}
                  onChange={(e) => update("playingSince", e.target.value)}
                  className="input-base"
                  placeholder="pl. 2 éve"
                />
              </Field>

              <Field label="Használsz Discordot?" required>
                <select
                  required
                  value={form.discord}
                  onChange={(e) => update("discord", e.target.value)}
                  className="input-base"
                >
                  <option value="">Válassz…</option>
                  <option>Igen, aktívan</option>
                  <option>Igen, néha</option>
                  <option>Még nem, de vállalom</option>
                </select>
              </Field>
            </div>

            <Field label="Miért szeretnél csatlakozni a Scorpion közösséghez?" required>
              <textarea
                required
                rows={5}
                value={form.reason}
                onChange={(e) => update("reason", e.target.value)}
                className="input-base resize-none"
                placeholder="Írj néhány mondatot magadról és a motivációdról."
              />
            </Field>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                required
                checked={form.accepted}
                onChange={(e) => update("accepted", e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-primary/50 bg-input text-primary accent-[oklch(0.62_0.24_25)]"
              />
              <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                Elfogadom a{" "}
                <span className="text-primary font-medium">
                  Scorpion PUBGM Közösség szabályzatát
                </span>
                .
              </span>
            </label>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!form.accepted}
                className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              >
                Jelentkezés elküldése
                <Send className="h-4 w-4" />
              </button>
              <p className="mt-3 text-xs text-muted-foreground">
                A jelentkezésed az admin felületre kerül. A jelentkezéseket a
                Scorpion csapat átnézi és Discordon veszik fel veled a kapcsolatot.
              </p>
            </div>

            <style>{`
              .input-base {
                width: 100%;
                background: oklch(0.13 0.01 20 / 0.7);
                border: 1px solid oklch(0.30 0.02 25 / 0.7);
                border-radius: 0.5rem;
                padding: 0.75rem 0.9rem;
                color: oklch(0.96 0.005 30);
                font-family: var(--font-sans);
                font-size: 0.95rem;
                transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
                outline: none;
              }
              .input-base::placeholder { color: oklch(0.55 0.02 25); }
              .input-base:focus {
                border-color: oklch(0.62 0.24 25 / 0.7);
                box-shadow: 0 0 0 3px oklch(0.62 0.24 25 / 0.2);
                background: oklch(0.15 0.012 20 / 0.9);
              }
              .input-base option { background: oklch(0.13 0.01 20); color: oklch(0.96 0.005 30); }
            `}</style>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block min-w-0">
      <span className="block text-xs font-display tracking-[0.2em] uppercase text-muted-foreground mb-2">
        {label} {required && <span className="text-primary">*</span>}
      </span>
      {children}
    </label>
  );
}
