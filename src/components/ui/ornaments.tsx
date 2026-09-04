"use client";

import { cn } from "@/lib/cn";
import { useEstaAberto } from "@/hooks/use-esta-aberto";
import { HORARIO_FECHAMENTO } from "@/data/restaurant";

/**
 * Ornamentos da identidade retro-diner. São decorativos: ficam fora da
 * árvore de acessibilidade e nunca carregam informação.
 */

export function Xadrez({ className }: { className?: string }) {
  return <div aria-hidden className={cn("xadrez", className)} />;
}

export function Pontilhado({ className }: { className?: string }) {
  return <div aria-hidden className={cn("pontilhado", className)} />;
}

export function Asterisco({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("select-none leading-none", className)}>
      ✳
    </span>
  );
}

/**
 * Estado real de funcionamento. A página é estática, então o cálculo roda
 * depois da hidratação — até lá mostra o horário, que é verdade em qualquer hora.
 */
export function SinalDeFuncionamento({ className }: { className?: string }) {
  const aberto = useEstaAberto();

  if (aberto === null) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 text-miudo font-bold uppercase tracking-controle text-tinta-suave",
          className,
        )}
      >
        Hoje até as {HORARIO_FECHAMENTO}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-miudo font-bold uppercase tracking-controle",
        aberto ? "text-positivo" : "text-marca",
        className,
      )}
    >
      <span aria-hidden className={cn("size-2 rounded-full", aberto ? "bg-positivo" : "bg-marca")} />
      {aberto ? `Aberto até as ${HORARIO_FECHAMENTO}` : "Fechado agora"}
    </span>
  );
}
