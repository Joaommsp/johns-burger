import type { StaticImageData } from "next/image";

export type CategoriaId =
  | "classicos"
  | "especiais"
  | "pratos"
  | "acompanhamentos"
  | "kids"
  | "bebidas"
  | "sobremesas";

/**
 * Como a foto foi produzida — decide o enquadramento no card e na linha.
 * "recorte": fundo removido, o prato flutua sobre a superfície do card.
 * "ambiente": foto com mesa ou balcão no quadro, preenche o retângulo inteiro.
 */
export type EnquadramentoFoto = "recorte" | "ambiente";

export type SeloItem = "mais-pedido" | "novo" | "vegetariano";

export interface Categoria {
  id: CategoriaId;
  nome: string;
}

export interface ItemCardapio {
  id: string;
  nome: string;
  descricao: string;
  /** Sempre em reais. A formatação fica com formatarBRL, nunca no dado. */
  preco: number;
  categoria: CategoriaId;
  imagem: StaticImageData;
  enquadramento: EnquadramentoFoto;
  selo?: SeloItem;
  /** Entra na vitrine de destaques da home. */
  destaque?: boolean;
}

export interface Promocao {
  id: string;
  diaDaSemana: string;
  titulo: string;
  descricao: string;
  chamada: string;
  regra: string;
}

export interface LinkNavegacao {
  /** Rota tem estado ativo; âncora aponta para uma seção da home. */
  tipo: "rota" | "ancora";
  rotulo: string;
  href: string;
}

export interface ItemDeRodape {
  rotulo: string;
  href: string;
}

export interface ColunaDoRodape {
  titulo: string;
  itens: ItemDeRodape[];
}

/** Recorte serializável do item, para atravessar a fronteira server → client. */
export interface ItemDoPedido {
  id: string;
  nome: string;
  preco: number;
  imagemSrc: string;
}

export interface LinhaDoPedido {
  item: ItemDoPedido;
  quantidade: number;
}
