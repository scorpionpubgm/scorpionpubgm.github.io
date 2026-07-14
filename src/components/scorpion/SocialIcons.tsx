import type { SVGProps } from "react";

export function DiscordIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.317 4.369A19.79 19.79 0 0016.558 3c-.163.29-.353.68-.484.988a18.27 18.27 0 00-5.148 0A12.51 12.51 0 0010.437 3a19.736 19.736 0 00-3.762 1.369C2.79 10.093 1.746 15.674 2.268 21.175a19.9 19.9 0 006.073 3.05c.492-.66.929-1.363 1.303-2.099-.72-.27-1.409-.6-2.062-.987.173-.128.342-.262.505-.4 3.98 1.83 8.29 1.83 12.223 0 .165.138.334.272.505.4-.655.388-1.345.719-2.066.988a13.28 13.28 0 001.303 2.098 19.84 19.84 0 006.077-3.05c.612-6.36-1.048-11.89-4.412-16.806zM9.545 17.5c-1.201 0-2.184-1.099-2.184-2.446 0-1.348.963-2.447 2.184-2.447 1.222 0 2.203 1.099 2.184 2.447.002 1.347-.962 2.446-2.184 2.446zm4.91 0c-1.201 0-2.184-1.099-2.184-2.446 0-1.348.963-2.447 2.184-2.447 1.222 0 2.203 1.099 2.184 2.447 0 1.347-.962 2.446-2.184 2.446z" />
    </svg>
  );
}

export function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43V8.87a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.3z" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function ScorpionMark({ className = "" }: { className?: string }) {
  // Custom Scorpion-inspired mark used as placeholder for the future real logo
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="scorp-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="oklch(0.72 0.20 35)" />
          <stop offset="1" stopColor="oklch(0.42 0.20 25)" />
        </linearGradient>
      </defs>
      <path
        d="M6 34c6-8 14-10 22-6 4 2 6 6 6 10 0 3-2 5-4 5s-4-1-4-4c0-2 1-3 3-3M40 20c4-3 10-3 14 0 2 2 3 5 2 8-1 2-3 3-5 2-2-1-2-3-1-4M14 22c-2-4 0-8 4-9 3-1 6 1 6 4M46 44l6 6-2 3-6-6M20 44c-3 3-7 4-11 2"
        stroke="url(#scorp-g)"
        strokeWidth="2.2"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="32" cy="32" r="1.6" fill="url(#scorp-g)" />
    </svg>
  );
}
