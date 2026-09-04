import { SeloDoItem } from "@/components/menu/item-badge";
import { FotoDoItem } from "@/components/menu/item-photo";
import { BotaoAdicionarAoPedido } from "@/components/order/add-to-order-button";
import { Preco } from "@/components/ui/price";
import { paraItemDoPedido } from "@/data/menu";
import type { ItemCardapio } from "@/lib/types";

/** Linha do cardápio completo: foto pequena, nome, descrição e preço. */
export function LinhaDoCardapio({ item }: { item: ItemCardapio }) {
  return (
    <article className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b-[1.5px] border-superficie-borda py-4">
      <FotoDoItem item={item} formato="linha" />

      <div className="min-w-0">
        <h3 className="font-sans text-base font-bold normal-case tracking-normal text-tinta">
          {item.nome}
          {item.selo ? <SeloDoItem selo={item.selo} /> : null}
        </h3>
        <p className="mt-0.5 text-[0.8125rem] text-tinta-suave">{item.descricao}</p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <Preco valor={item.preco} className="text-lg" />
        <BotaoAdicionarAoPedido item={paraItemDoPedido(item)} />
      </div>
    </article>
  );
}
