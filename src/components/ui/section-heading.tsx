import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Sobre o vermelho o texto inverte; sobre o creme fica na tinta escura. */
export type FundoDaSecao = "marca" | "superficie";

/** Linha curta acima do título. Usada solta nas seções sem TituloSecao inteiro. */
export function Chapeu({
  children,
  sobre = "superficie",
  className,
}: {
  children: ReactNode;
  sobre?: FundoDaSecao;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-miudo font-bold uppercase tracking-chapeu",
        sobre === "marca" ? "text-destaque" : "text-marca",
        className,
      )}
    >
      {children}
    </p>
  );
}

/** Parágrafo de apoio das seções — corpo maior e medida de leitura curta. */
export function TextoDeApoio({
  children,
  sobre = "superficie",
  className,
}: {
  children: ReactNode;
  sobre?: FundoDaSecao;
  className?: string;
}) {
  return (
    <p className={cn("apoio", sobre === "marca" ? "text-superficie/85" : "text-tinta-suave", className)}>
      {children}
    </p>
  );
}

interface TituloSecaoProps {
  chapeu: string;
  titulo: ReactNode;
  apoio?: ReactNode;
  sobre?: FundoDaSecao;
  className?: string;
}

export function TituloSecao({
  chapeu,
  titulo,
  apoio,
  sobre = "superficie",
  className,
}: TituloSecaoProps) {
  return (
    <div className={cn("mb-10 flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        <Chapeu sobre={sobre}>{chapeu}</Chapeu>
        <h2
          className={cn(
            "mt-2.5 text-[clamp(2.3rem,5.4vw,4rem)]",
            sobre === "marca" ? "text-superficie" : "text-tinta",
          )}
        >
          {titulo}
        </h2>
      </div>
      {apoio ? <TextoDeApoio sobre={sobre}>{apoio}</TextoDeApoio> : null}
    </div>
  );
}
