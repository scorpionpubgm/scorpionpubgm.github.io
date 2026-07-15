import { useState } from "react";
import { ScorpionMark } from "./SocialIcons";

type LogoProps = {
  src?: string;
  alt?: string;
  className?: string;
  imgClassName?: string;
  rounded?: "full" | "md" | "lg" | "xl" | "2xl";
};

/**
 * Reusable Scorpion PUBGM logo component.
 * - If `src` is provided (transparent PNG/WebP/SVG), renders <img> with object-contain.
 * - Falls back to the built-in ScorpionMark vector when no src or on load error.
 * - Works for circular and square containers, mobile & desktop crisp.
 */
export function Logo({
  src,
  alt = "Scorpion PUBGM Közösség logó",
  className = "",
  imgClassName = "",
  rounded = "md",
}: LogoProps) {
  const [failed, setFailed] = useState(false);
  const radiusCls = {
    full: "rounded-full",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  }[rounded];

  const showImg = !!src && !failed;

  return (
    <div className={`relative grid place-items-center overflow-hidden ${radiusCls} ${className}`}>
      {showImg ? (
        <img
          src={src}
          alt={alt}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className={`h-full w-full object-contain ${imgClassName}`}
          draggable={false}
        />
      ) : (
        <ScorpionMark className="h-[70%] w-[70%]" />
      )}
    </div>
  );
}
