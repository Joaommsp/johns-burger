import { ROTULO_SELO, TOM_DO_SELO } from "@/data/menu";
import { cn } from "@/lib/cn";
import type { SeloItem } from "@/lib/types";

const CLASSE_DO_TOM = {
  destaque: "bg-destaque text-tinta",
  positivo: "bg-positivo text-superficie",
} as const;

/** Selo curto ao lado do nome do item (mais pedido, novo, vegetariano). */
export function SeloDoItem({ selo, className }: { selo: SeloItem; className?: string }) {
  return (
    <span
      className={cn(
        "ml-2 inline-block rounded-aresta px-1.5 py-0.5 align-[2px] text-[0.62rem] font-bold uppercase tracking-controle",
        CLASSE_DO_TOM[TOM_DO_SELO[selo]],
        className,
      )}
    >
      {ROTULO_SELO[selo]}
    </span>
  );
}
