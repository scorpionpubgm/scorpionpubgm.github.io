import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

type AudioPlayerProps = {
  /** Optional audio source URL. When omitted, a "coming soon" fallback is shown. */
  src?: string;
  title?: string;
};

function formatTime(sec: number) {
  if (!Number.isFinite(sec) || sec < 0) return "--:--";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.volume = volume;
    a.muted = muted;
  }, [volume, muted]);

  // ---- Fallback (no source) ----
  if (!src) {
    return (
      <div
        className="mt-5 flex items-center gap-3 p-3 rounded-lg border border-border bg-background/60"
        aria-label="Scorpion Music – hamarosan"
      >
        <div className="h-11 w-11 rounded-full bg-primary/15 border border-primary/40 grid place-items-center text-primary/70">
          <Play className="h-5 w-5 ml-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="h-1.5 rounded-full bg-muted overflow-hidden">
            <div className="h-full w-0 bg-gradient-red" />
          </div>
          <div className="flex items-center justify-between mt-2 text-[0.7rem] font-display tracking-[0.2em] uppercase text-muted-foreground">
            <span>A Scorpion hivatalos zenéje hamarosan</span>
            <span>--:--</span>
          </div>
        </div>
      </div>
    );
  }

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      void a.play();
    } else {
      a.pause();
    }
  };

  const onSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const a = audioRef.current;
    if (!a || !duration) return;
    const t = Number(e.target.value);
    a.currentTime = (t / 100) * duration;
    setCurrent(a.currentTime);
  };

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="mt-5 p-4 rounded-lg border border-primary/25 bg-background/70 backdrop-blur-sm">
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggle}
          className="h-11 w-11 shrink-0 rounded-full bg-primary/25 border border-primary/60 grid place-items-center text-foreground hover:bg-primary/40 hover:shadow-glow-sm transition-all"
          aria-label={playing ? "Szüneteltetés" : "Lejátszás"}
        >
          {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
        </button>

        <div className="flex-1 min-w-0">
          {title && (
            <div className="mb-1.5 truncate font-display text-xs tracking-[0.2em] uppercase text-foreground/90">
              {title}
            </div>
          )}
          <div className="relative h-1.5 rounded-full bg-muted overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-red"
              style={{ width: `${pct}%` }}
            />
            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={pct}
              onChange={onSeek}
              aria-label="Lejátszási pozíció"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-[0.7rem] font-display tracking-[0.2em] uppercase text-muted-foreground">
            <span>{formatTime(current)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume (desktop) */}
        <div className="hidden sm:flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMuted((m) => !m)}
            className="h-9 w-9 rounded-md border border-border bg-background/60 grid place-items-center text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
            aria-label={muted ? "Némítás feloldása" : "Némítás"}
          >
            {muted || volume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={muted ? 0 : volume}
            onChange={(e) => {
              setVolume(Number(e.target.value));
              if (Number(e.target.value) > 0) setMuted(false);
            }}
            aria-label="Hangerő"
            className="scorpion-range w-24"
          />
        </div>
      </div>
    </div>
  );
}
