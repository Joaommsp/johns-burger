"use client";

import { useEffect, type RefObject } from "react";

/**
 * O que uma camada sobreposta precisa fazer para ser modal de verdade:
 * receber o foco, devolvê-lo ao fechar, fechar no Escape, travar a rolagem do
 * fundo e tornar inerte todo o resto da página. `aria-modal` só descreve isso;
 * quem cumpre é este hook — e ele existe para o painel de pedido e o menu não
 * implementarem a mesma coisa de dois jeitos diferentes.
 */
export function useCamadaModal({
  aberto,
  camada,
  foco,
  aoFechar,
}: {
  aberto: boolean;
  /** Envolve overlay e painel: é o que NÃO fica inerte. */
  camada: RefObject<HTMLElement | null>;
  /** Elemento que recebe o foco ao abrir. */
  foco: RefObject<HTMLElement | null>;
  aoFechar: () => void;
}) {
  useEffect(() => {
    if (!aberto) {
      return;
    }

    const focoAnterior = document.activeElement as HTMLElement | null;
    foco.current?.focus();

    const rolagemAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const foraDaCamada = Array.from(document.body.children).filter(
      (elemento): elemento is HTMLElement =>
        elemento instanceof HTMLElement && elemento !== camada.current,
    );
    foraDaCamada.forEach((elemento) => elemento.setAttribute("inert", ""));

    function aoTeclar(evento: KeyboardEvent) {
      if (evento.key === "Escape") {
        aoFechar();
      }
    }

    document.addEventListener("keydown", aoTeclar);
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = rolagemAnterior;
      foraDaCamada.forEach((elemento) => elemento.removeAttribute("inert"));
      focoAnterior?.focus();
    };
  }, [aberto, camada, foco, aoFechar]);
}
