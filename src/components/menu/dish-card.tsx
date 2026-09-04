import { FotoDoItem } from "@/components/menu/item-photo";
import { BotaoAdicionarAoPedido } from "@/components/order/add-to-order-button";
import { Preco } from "@/components/ui/price";
import { Tag } from "@/components/ui/tag";
import { ROTULO_SELO, TOM_DO_SELO, paraItemDoPedido } from "@/data/menu";
import type { ItemCardapio } from "@/lib/types";

/** Card de vitrine — usado na home. No cardápio completo a forma é de linha. */
export function CardDoPrato({ item }: { item: ItemCardapio }) {
  return (
    <article className="relative flex flex-col rounded-bloco bg-superficie-alta p-5 shadow-relevo transition-[transform,box-shadow] duration-200 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-relevo-alto">
      {item.selo ? (
        <Tag tom={TOM_DO_SELO[item.selo]} className="absolute -top-2.5 right-3 z-1 rotate-[4deg]">
          {ROTULO_SELO[item.selo]}
        </Tag>
      ) : null}

      <FotoDoItem item={item} formato="card" />

      <h3 className="mt-4 text-xl text-tinta">{item.nome}</h3>
      <p className="mt-1.5 flex-1 text-sm text-tinta-suave">{item.descricao}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t-[1.5px] border-superficie-borda pt-3.5">
        <Preco valor={item.preco} className="text-2xl" />
        <BotaoAdicionarAoPedido item={paraItemDoPedido(item)} />
      </div>
    </article>
  );
}
