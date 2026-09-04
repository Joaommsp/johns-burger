"use client";

import { usePedido } from "@/components/order/order-provider";
import { IconeSacola, IconeWhatsApp } from "@/components/ui/icons";
import { LINK_WHATSAPP } from "@/data/restaurant";
import { cn } from "@/lib/cn";

type TomFab = "pedido" | "whatsapp";

const BASE_FAB =
  "group relative flex size-12 cursor-pointer items-center justify-center rounded-full shadow-flutuante sm:size-14 transition-[transform,box-shadow] duration-200 ease-out hover:w-auto hover:-translate-y-0.5 hover:px-5 hover:shadow-flutuante-alto active:scale-95";

const TONS_FAB: Record<TomFab, string> = {
  pedido: "bg-destaque text-tinta",
  whatsapp: "bg-whatsapp text-whatsapp-tinta",
};

const ROTULO_FAB =
  "max-w-0 overflow-hidden whitespace-nowrap text-miudo font-bold uppercase tracking-controle opacity-0 transition-[max-width,opacity,margin] duration-200 ease-out group-hover:ml-2.5 group-hover:max-w-48 group-hover:opacity-100";

/** Atalhos fixos: falar com a casa e ver o pedido montado. */
export function AcoesFlutuantes() {
  const { totalDeItens, abrir } = usePedido();

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 print:hidden sm:bottom-5 sm:right-5 sm:gap-3">
      <button type="button" onClick={abrir} className={cn(BASE_FAB, TONS_FAB.pedido)}>
        <IconeSacola className="size-5 sm:size-6" />
        <span className={ROTULO_FAB}>Meu pedido</span>
        {totalDeItens > 0 ? (
          <span
            aria-hidden
            className="absolute -right-0.5 -top-0.5 grid size-6 min-w-6 place-items-center rounded-full bg-marca text-[0.68rem] font-bold text-superficie shadow-[0_0_0_3px_var(--color-destaque)]"
          >
            {totalDeItens}
          </span>
        ) : null}
        {/* Region viva: quem usa leitor de tela percebe o item entrando. */}
        <span className="sr-only" aria-live="polite">
          {totalDeItens === 0
            ? "Pedido vazio"
            : `${totalDeItens} ${totalDeItens === 1 ? "item" : "itens"} no pedido`}
        </span>
      </button>

      <a
        href={LINK_WHATSAPP}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar conosco pelo WhatsApp"
        className={cn(BASE_FAB, TONS_FAB.whatsapp)}
      >
        <IconeWhatsApp className="size-5 sm:size-6" />
        {/* aria-hidden: o nome acessível já vem do aria-label do link. */}
        <span aria-hidden className={ROTULO_FAB}>
          Falar conosco
        </span>
      </a>
    </div>
  );
}
