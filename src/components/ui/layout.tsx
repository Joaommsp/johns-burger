import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Gutter e largura máxima do site — um lugar só para ajustar o respiro lateral. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-pagina px-6", className)}>{children}</div>;
}

type TomDaSecao = "marca" | "superficie" | "tinta";

const FUNDO_DA_SECAO: Record<TomDaSecao, string> = {
  marca: "",
  superficie: "bg-superficie",
  tinta: "bg-marca-tinta text-superficie",
};

interface SecaoProps {
  children: ReactNode;
  id?: string;
  /** "marca" mantém o vermelho do corpo; os outros pintam o próprio fundo. */
  tom?: TomDaSecao;
  className?: string;
}

/** Ritmo vertical padrão das seções da página. */
export function Secao({ children, id, tom = "marca", className }: SecaoProps) {
  return (
    <section id={id} className={cn("py-16 sm:py-24", FUNDO_DA_SECAO[tom], className)}>
      <Container>{children}</Container>
    </section>
  );
}
