"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { ItemDoPedido, LinhaDoPedido } from "@/lib/types";

interface PedidoContexto {
  linhas: LinhaDoPedido[];
  totalDeItens: number;
  valorTotal: number;
  aberto: boolean;
  adicionar: (item: ItemDoPedido) => void;
  alterarQuantidade: (id: string, delta: number) => void;
  limpar: () => void;
  abrir: () => void;
  fechar: () => void;
}

/** Lista vazia com referência estável: nada de `[]` novo a cada render. */
const SEM_LINHAS: LinhaDoPedido[] = [];

const Contexto = createContext<PedidoContexto | null>(null);

/**
 * O pedido vive só na memória desta aba: não há backend, cadastro nem
 * pagamento — a lista vira uma mensagem de WhatsApp e quem confirma é a cozinha.
 */
export function ProvedorDePedido({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useState<LinhaDoPedido[]>(SEM_LINHAS);
  const [aberto, setAberto] = useState(false);

  const adicionar = useCallback((item: ItemDoPedido) => {
    setLinhas((atuais) => {
      const existente = atuais.find((linha) => linha.item.id === item.id);

      if (existente) {
        return atuais.map((linha) =>
          linha.item.id === item.id ? { ...linha, quantidade: linha.quantidade + 1 } : linha,
        );
      }

      return [...atuais, { item, quantidade: 1 }];
    });
  }, []);

  const alterarQuantidade = useCallback((id: string, delta: number) => {
    setLinhas((atuais) =>
      atuais
        .map((linha) =>
          linha.item.id === id ? { ...linha, quantidade: linha.quantidade + delta } : linha,
        )
        .filter((linha) => linha.quantidade > 0),
    );
  }, []);

  /** Fecha o ciclo: sem isto o contador fica cheio para sempre depois do envio. */
  const limpar = useCallback(() => setLinhas(SEM_LINHAS), []);

  const abrir = useCallback(() => setAberto(true), []);
  const fechar = useCallback(() => setAberto(false), []);

  const valor = useMemo<PedidoContexto>(() => {
    const totalDeItens = linhas.reduce((soma, linha) => soma + linha.quantidade, 0);
    const valorTotal = linhas.reduce(
      (soma, linha) => soma + linha.quantidade * linha.item.preco,
      0,
    );

    return {
      linhas,
      totalDeItens,
      valorTotal,
      aberto,
      adicionar,
      alterarQuantidade,
      limpar,
      abrir,
      fechar,
    };
  }, [linhas, aberto, adicionar, alterarQuantidade, limpar, abrir, fechar]);

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function usePedido(): PedidoContexto {
  const contexto = useContext(Contexto);

  if (!contexto) {
    throw new Error("usePedido precisa estar dentro de <ProvedorDePedido>.");
  }

  return contexto;
}
