"use client";

import { usePedido } from "@/components/order/order-provider";
import { Botao } from "@/components/ui/button";
import type { ItemDoPedido } from "@/lib/types";

/**
 * Soma o item ao pedido em vez de abrir o WhatsApp direto: a pessoa monta a
 * lista inteira e só depois manda tudo de uma vez.
 */
export function BotaoAdicionarAoPedido({ item }: { item: ItemDoPedido }) {
  const { adicionar } = usePedido();

  return (
    <Botao
      variante="tinta"
      tamanho="compacto"
      onClick={() => adicionar(item)}
      aria-label={`Adicionar ${item.nome} ao pedido`}
    >
      Pedir
    </Botao>
  );
}
