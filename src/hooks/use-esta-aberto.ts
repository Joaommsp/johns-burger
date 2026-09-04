"use client";

import { useSyncExternalStore } from "react";
import { estaAberto } from "@/data/restaurant";

const UM_MINUTO = 60_000;

/** Reavalia de minuto em minuto: quem deixa a página aberta vê a casa fechar. */
function inscrever(aoMudar: () => void) {
  const intervalo = setInterval(aoMudar, UM_MINUTO);
  return () => clearInterval(intervalo);
}

/**
 * `null` no servidor e no primeiro render do cliente — a página é estática e o
 * horário do visitante só existe depois da hidratação.
 */
export function useEstaAberto(): boolean | null {
  return useSyncExternalStore(
    inscrever,
    () => estaAberto(),
    () => null,
  );
}
