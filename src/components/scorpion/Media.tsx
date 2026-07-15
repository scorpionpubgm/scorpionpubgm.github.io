import { Play, Music, Video } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { useScorpionData, type MediaItem } from "./data/ScorpionDataContext";

/** Set to the MP3 URL once the official Scorpion track is available. */
const SCORPION_TRACK_SRC: string | undefined = undefined;

function toEmbedUrl(item: MediaItem): string | null {
  const url = item.url.trim();
  if (item.kind === "youtube") {
    // Handle youtu.be/ID and youtube.com/watch?v=ID and shorts
    let id = "";
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be")) id = u.pathname.replace(/^\//, "");
      else if (u.pathname.startsWith("/shorts/")) id = u.pathname.split("/")[2] ?? "";
      else id = u.searchParams.get("v") ?? "";
    } catch {
      return null;
    }
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }
  if (item.kind === "tiktok") {
    // TikTok URL: https://www.tiktok.com/@user/video/123
    const match = url.match(/\/video\/(\d+)/);
    if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`;
    return null;
  }
  return null;
}

export function Media() {
  const { media } = useScorpionData();
  const videos = media.filter((m) => m.kind === "youtube" || m.kind === "tiktok");
  const audios = media.filter((m) => m.kind === "audio");

  return (
    <section id="media" className="relative py-24 md:py-32 overflow-hidden">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-blood/15 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <header className="max-w-3xl mb-12">
          <div className="eyebrow mb-4">Media</div>
          <h2 className="section-title">
            Scorpion <span className="text-gradient-red">Media</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Videók, pillanatok és a Scorpion hangja.
          </p>
        </header>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          {videos.length > 0
            ? videos.map((item) => {
                const embed = toEmbedUrl(item);
                return (
                  <article
                    key={item.id}
                    className="group scorpion-border rounded-xl overflow-hidden bg-gradient-card"
                  >
                    <div className="relative aspect-video bg-background/60 overflow-hidden">
                      {embed ? (
                        <iframe
                          src={embed}
                          title={item.title ?? "Scorpion média"}
                          loading="lazy"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 h-full w-full border-0"
                        />
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute inset-0 grid place-items-center"
                        >
                          <div className="h-16 w-16 rounded-full bg-primary/20 border border-primary/60 grid place-items-center group-hover:bg-primary/40 group-hover:scale-110 transition-all">
                            <Play className="h-7 w-7 text-primary fill-primary ml-1" />
                          </div>
                        </a>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-bold text-sm tracking-[0.15em] uppercase text-foreground break-words">
                        {item.title ?? (item.kind === "youtube" ? "YouTube videó" : "TikTok videó")}
                      </h3>
                    </div>
                  </article>
                );
              })
            : ["Scorpion montázs", "TikTok kiemelt", "Promóciós videó"].map((label) => (
                <article
                  key={label}
                  className="group scorpion-border rounded-xl overflow-hidden bg-gradient-card"
                >
                  <div className="relative aspect-video bg-background/60 grid place-items-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-30"
                      style={{
                        background:
                          "radial-gradient(circle at 50% 50%, oklch(0.62 0.24 25 / 0.4), transparent 70%)",
                      }}
                    />
                    <div className="relative h-16 w-16 rounded-full bg-primary/20 border border-primary/60 grid place-items-center">
                      <Play className="h-7 w-7 text-primary fill-primary ml-1" />
                    </div>
                    <div className="absolute top-3 left-3">
                      <span className="badge-role !bg-background/70 backdrop-blur">
                        <Video className="h-3 w-3" />
                        Hamarosan
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-bold text-sm tracking-[0.15em] uppercase text-foreground">
                      {label}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      A tartalom feltöltés alatt.
                    </p>
                  </div>
                </article>
              ))}
        </div>

        {/* Music player */}
        <div className="scorpion-border rounded-2xl overflow-hidden bg-gradient-leader grain-overlay">
          <div className="p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="relative shrink-0">
              <div className="absolute inset-0 -m-2 rounded-2xl bg-primary/30 blur-2xl animate-pulse-glow" />
              <div className="relative h-32 w-32 md:h-40 md:w-40 rounded-2xl border border-primary/50 bg-gradient-to-br from-blood/40 via-background to-background grid place-items-center shadow-glow">
                <Music className="h-16 w-16 text-primary drop-shadow-[0_0_20px_oklch(0.62_0.24_25/0.8)]" />
              </div>
            </div>

            <div className="flex-1 min-w-0 w-full text-center md:text-left">
              <div className="eyebrow mb-2">Audio</div>
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-foreground tracking-wide">
                SCORPION <span className="text-gradient-red">MUSIC</span>
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {audios.length > 0
                  ? "Válaszd ki a Scorpion közösségi zenéit:"
                  : "A saját Scorpion közösségi zene hamarosan itt lesz elérhető."}
              </p>

              <AudioPlayer
                src={audios[0]?.url ?? SCORPION_TRACK_SRC}
                title={audios[0]?.title ?? "Scorpion – Hivatalos zene"}
              />

              {audios.length > 1 && (
                <ul className="mt-4 space-y-2">
                  {audios.slice(1).map((a) => (
                    <li key={a.id}>
                      <a
                        href={a.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-display tracking-[0.15em] uppercase text-primary hover:text-ember"
                      >
                        ♪ {a.title ?? "Scorpion track"}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
