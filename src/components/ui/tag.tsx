import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type TomTag = "marca" | "destaque" | "positivo" | "creme";

const TONS: Record<TomTag, string> = {
  marca: "bg-marca text-superficie",
  destaque: "bg-destaque text-tinta",
  positivo: "bg-positivo text-superficie",
  /** Sobre o vermelho da marca, o creme é o par de maior contraste da paleta. */
  creme: "bg-superficie text-marca-tinta",
};

interface TagProps {
  children: ReactNode;
  tom?: TomTag;
  className?: string;
}

/** Etiqueta impressa — o adesivo torto da identidade de lanchonete. */
export function Tag({ children, tom = "marca", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-etiqueta px-3 py-1.5 font-etiqueta text-miudo uppercase tracking-[0.02em] shadow-etiqueta",
        TONS[tom],
        className,
      )}
    >
      {children}
    </span>
  );
}
