import type { ReactNode, ElementType } from "react";
import { useReveal } from "@/hooks/use-reveal";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  id?: string;
};

export function Reveal({ children, as, delay = 0, className = "", id }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const { ref, visible } = useReveal<HTMLElement>();
  return (
    <Tag
      ref={ref as never}
      id={id}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`reveal ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
