import arrozTemperado from "@/assets/images/cardapio/arroz-temperado.webp";
import barbecueDefumado from "@/assets/images/cardapio/barbecue-defumado.webp";
import batataRustica from "@/assets/images/cardapio/batata-rustica.webp";
import bigDuploCostela from "@/assets/images/cardapio/big-duplo-costela.webp";
import bigSalada from "@/assets/images/cardapio/big-salada.webp";
import bigXEgg from "@/assets/images/cardapio/big-x-egg.webp";
import brownieComSorvete from "@/assets/images/cardapio/brownie-com-sorvete.webp";
import burgerKids from "@/assets/images/cardapio/burger-kids.webp";
import cheddarMelt from "@/assets/images/cardapio/cheddar-melt.webp";
import cheesecake from "@/assets/images/cardapio/cheesecake.webp";
import cheeseburger from "@/assets/images/cardapio/cheeseburger.webp";
import chorizoNaChapa from "@/assets/images/cardapio/chorizo-na-chapa.webp";
import duploCheddar from "@/assets/images/cardapio/duplo-cheddar.webp";
import duploOnionRings from "@/assets/images/cardapio/duplo-onion-rings.webp";
import fraldinhaDePanela from "@/assets/images/cardapio/fraldinha-de-panela.webp";
import frangoAoMolho from "@/assets/images/cardapio/frango-ao-molho.webp";
import frangoCrocante from "@/assets/images/cardapio/frango-crocante.webp";
import limonadaSuica from "@/assets/images/cardapio/limonada-suica.webp";
import macarraoComQueijo from "@/assets/images/cardapio/macarrao-com-queijo.webp";
import mandiocaFrita from "@/assets/images/cardapio/mandioca-frita.webp";
import maxBacon from "@/assets/images/cardapio/max-bacon.webp";
import milkShake from "@/assets/images/cardapio/milk-shake.webp";
import nuggetsDeFrango from "@/assets/images/cardapio/nuggets-de-frango.webp";
import nuggetsKids from "@/assets/images/cardapio/nuggets-kids.webp";
import onionRings from "@/assets/images/cardapio/onion-rings.webp";
import petitGateau from "@/assets/images/cardapio/petit-gateau.webp";
import refrigerante from "@/assets/images/cardapio/refrigerante.webp";
import saladaCompleta from "@/assets/images/cardapio/salada-completa.webp";
import smashSimples from "@/assets/images/cardapio/smash-simples.webp";
import smashTriplo from "@/assets/images/cardapio/smash-triplo.webp";
import sucoNatural from "@/assets/images/cardapio/suco-natural.webp";
import vegetarianoGraoDeBico from "@/assets/images/cardapio/vegetariano-grao-de-bico.webp";
import type {
  Categoria,
  CategoriaId,
  ItemCardapio,
  ItemDoPedido,
  SeloItem,
} from "@/lib/types";

/**
 * Record (e não array) para o compilador cobrar toda CategoriaId: um item de
 * categoria sem entrada aqui sumiria do agrupamento sem erro nenhum.
 */
const NOME_DA_CATEGORIA: Record<CategoriaId, string> = {
  classicos: "Clássicos",
  especiais: "Especiais da casa",
  pratos: "Pratos",
  acompanhamentos: "Acompanhamentos",
  kids: "Menu kids",
  bebidas: "Bebidas",
  sobremesas: "Sobremesas",
};

/** Ordem em que as categorias aparecem no cardápio e nos filtros. */
export const CATEGORIAS: Categoria[] = (
  [
    "classicos",
    "especiais",
    "pratos",
    "acompanhamentos",
    "kids",
    "bebidas",
    "sobremesas",
  ] as const
).map((id) => ({ id, nome: NOME_DA_CATEGORIA[id] }));

export const CARDAPIO: ItemCardapio[] = [
  // ---------- clássicos ----------
  {
    id: "duplo-cheddar",
    nome: "Duplo Cheddar",
    descricao:
      "Dois blends de 180 g, cheddar inglês derretido na chapa, cebola caramelizada e molho da casa.",
    preco: 25.99,
    categoria: "classicos",
    imagem: duploCheddar,
    enquadramento: "recorte",
    selo: "mais-pedido",
    destaque: true,
  },
  {
    id: "big-salada",
    nome: "Big Salada",
    descricao:
      "Blend de 180 g, alface americana, tomate, picles em conserva própria e maionese verde.",
    preco: 21.99,
    categoria: "classicos",
    imagem: bigSalada,
    enquadramento: "recorte",
    destaque: true,
  },
  {
    id: "big-x-egg",
    nome: "Big X-Egg",
    descricao: "Blend de 180 g, dois ovos fritos com a gema mole, queijo prato e salada da casa.",
    preco: 28.99,
    categoria: "classicos",
    imagem: bigXEgg,
    enquadramento: "recorte",
    destaque: true,
  },
  {
    id: "max-bacon",
    nome: "Max Bacon",
    descricao: "Blend de 180 g, quatro fatias de bacon defumado, parmesão curado e barbecue de café.",
    preco: 25.99,
    categoria: "classicos",
    imagem: maxBacon,
    enquadramento: "recorte",
    selo: "novo",
    destaque: true,
  },
  {
    id: "cheeseburger",
    nome: "Cheeseburger",
    descricao: "Blend de 180 g, queijo prato, picles, ketchup e mostarda.",
    preco: 18.99,
    categoria: "classicos",
    imagem: cheeseburger,
    enquadramento: "recorte",
  },
  {
    id: "smash-simples",
    nome: "Smash Simples",
    descricao: "Um smash de 90 g com a borda crocante, queijo americano e pão de batata.",
    preco: 17.99,
    categoria: "classicos",
    imagem: smashSimples,
    enquadramento: "recorte",
  },
  {
    id: "frango-crocante",
    nome: "Frango Crocante",
    descricao: "Filé de frango empanado na hora, coleslaw da casa, picles e pão brioche.",
    preco: 24.99,
    categoria: "classicos",
    imagem: frangoCrocante,
    enquadramento: "recorte",
  },
  {
    id: "vegetariano-grao-de-bico",
    nome: "Vegetariano de Grão-de-Bico",
    descricao: "Hambúrguer de grão-de-bico e beterraba, rúcula, tomate seco e pão integral.",
    preco: 23.99,
    categoria: "classicos",
    imagem: vegetarianoGraoDeBico,
    enquadramento: "recorte",
    selo: "vegetariano",
  },

  // ---------- especiais da casa ----------
  {
    id: "big-duplo-costela",
    nome: "Big Duplo Costela",
    descricao: "Costela desfiada por 12 horas, blend de 180 g, queijo coalho e cebola roxa.",
    preco: 39.99,
    categoria: "especiais",
    imagem: bigDuploCostela,
    enquadramento: "recorte",
  },
  {
    id: "smash-triplo",
    nome: "Smash Triplo",
    descricao: "Três smashes de 90 g, cheddar duplo entre as carnes, molho especial e pão de batata.",
    preco: 34.99,
    categoria: "especiais",
    imagem: smashTriplo,
    enquadramento: "recorte",
  },
  {
    id: "cheddar-melt",
    nome: "Cheddar Melt",
    descricao: "Blend de 180 g coberto na hora por molho cheddar quente e cebola caramelizada.",
    preco: 31.99,
    categoria: "especiais",
    imagem: cheddarMelt,
    enquadramento: "recorte",
    selo: "mais-pedido",
  },
  {
    id: "barbecue-defumado",
    nome: "Barbecue Defumado",
    descricao: "Blend de 180 g, glaze barbecue defumado, cebola crispy e provolone.",
    preco: 32.99,
    categoria: "especiais",
    imagem: barbecueDefumado,
    enquadramento: "recorte",
  },
  {
    id: "duplo-onion-rings",
    nome: "Duplo Onion Rings",
    descricao: "Dois blends de 180 g, cheddar, três anéis de cebola empanados e molho ranch.",
    preco: 36.99,
    categoria: "especiais",
    imagem: duploOnionRings,
    enquadramento: "recorte",
  },

  // ---------- pratos ----------
  {
    id: "chorizo-na-chapa",
    nome: "Chorizo na Chapa",
    descricao: "Contrafilé chorizo selado, molho à arrabiata, arroz, salada e farofa.",
    preco: 55.99,
    categoria: "pratos",
    imagem: chorizoNaChapa,
    enquadramento: "ambiente",
  },
  {
    id: "fraldinha-de-panela",
    nome: "Fraldinha de Panela",
    descricao: "Corte fraldinha cozido lentamente, legumes na manteiga, arroz, salada e farofa.",
    preco: 45.99,
    categoria: "pratos",
    imagem: fraldinhaDePanela,
    enquadramento: "ambiente",
  },
  {
    id: "frango-ao-molho",
    nome: "Frango ao Molho",
    descricao: "Asinha, coxa e peito de frango assados no molho romesco, com salada fresca.",
    preco: 35.99,
    categoria: "pratos",
    imagem: frangoAoMolho,
    enquadramento: "ambiente",
  },
  {
    id: "arroz-temperado",
    nome: "Arroz Temperado",
    descricao: "Arroz da casa com frango assado desfiado, cebola frita e salada.",
    preco: 29.99,
    categoria: "pratos",
    imagem: arrozTemperado,
    enquadramento: "ambiente",
  },
  {
    id: "salada-completa",
    nome: "Salada Completa",
    descricao: "Folhas do dia, tomate, pepino e molho de ervas finas da casa.",
    preco: 21.99,
    categoria: "pratos",
    imagem: saladaCompleta,
    enquadramento: "ambiente",
    selo: "vegetariano",
  },

  // ---------- acompanhamentos ----------
  {
    id: "batata-rustica",
    nome: "Batata Rústica",
    descricao: "Batata em gomos com casca, sal grosso e ervas. Porção para dividir.",
    preco: 22.9,
    categoria: "acompanhamentos",
    imagem: batataRustica,
    enquadramento: "ambiente",
  },
  {
    id: "onion-rings",
    nome: "Onion Rings",
    descricao: "Anéis de cebola empanados na hora, crocantes por fora e macios por dentro.",
    preco: 24.9,
    categoria: "acompanhamentos",
    imagem: onionRings,
    enquadramento: "ambiente",
  },
  {
    id: "nuggets-de-frango",
    nome: "Nuggets de Frango",
    descricao: "Doze nuggets de peito de frango empanados, com molho da casa.",
    preco: 26.9,
    categoria: "acompanhamentos",
    imagem: nuggetsDeFrango,
    enquadramento: "ambiente",
  },
  {
    id: "mandioca-frita",
    nome: "Mandioca Frita",
    descricao: "Mandioca cozida e frita na hora, crocante por fora e macia por dentro.",
    preco: 21.9,
    categoria: "acompanhamentos",
    imagem: mandiocaFrita,
    enquadramento: "ambiente",
    selo: "vegetariano",
  },

  // ---------- menu kids ----------
  {
    id: "burger-kids",
    nome: "Burger Kids",
    descricao: "Blend de 90 g, queijo prato, batata palito e suco natural de 300 ml.",
    preco: 19.99,
    categoria: "kids",
    imagem: burgerKids,
    enquadramento: "ambiente",
  },
  {
    id: "macarrao-com-queijo",
    nome: "Macarrão com Queijo",
    descricao: "Massa italiana ao molho bolonhesa com parmesão ralado na hora.",
    preco: 25.99,
    categoria: "kids",
    imagem: macarraoComQueijo,
    enquadramento: "ambiente",
  },
  {
    id: "nuggets-kids",
    nome: "Nuggets Kids",
    descricao: "Seis nuggets, batata palito e ketchup. Vem com brinde da casa.",
    preco: 21.99,
    categoria: "kids",
    imagem: nuggetsKids,
    enquadramento: "ambiente",
  },

  // ---------- bebidas ----------
  {
    id: "suco-natural",
    nome: "Suco Natural 500 ml",
    descricao: "Laranja, abacaxi com hortelã, maracujá, morango, limão ou uva.",
    preco: 12.9,
    categoria: "bebidas",
    imagem: sucoNatural,
    enquadramento: "ambiente",
  },
  {
    id: "milk-shake",
    nome: "Milk-shake 400 ml",
    descricao: "Chocolate belga, morango ou baunilha, com chantilly e calda da casa.",
    preco: 18.9,
    categoria: "bebidas",
    imagem: milkShake,
    enquadramento: "ambiente",
  },
  {
    id: "refrigerante",
    nome: "Refrigerante 350 ml",
    descricao: "Linha tradicional e versões sem açúcar, servido com gelo e limão.",
    preco: 7.5,
    categoria: "bebidas",
    imagem: refrigerante,
    enquadramento: "ambiente",
  },
  {
    id: "limonada-suica",
    nome: "Limonada Suíça 500 ml",
    descricao: "Limão batido com gelo e leite condensado, coado na hora.",
    preco: 14.9,
    categoria: "bebidas",
    imagem: limonadaSuica,
    enquadramento: "ambiente",
  },

  // ---------- sobremesas ----------
  {
    id: "brownie-com-sorvete",
    nome: "Brownie com Sorvete",
    descricao: "Brownie de chocolate meio amargo servido quente com sorvete de baunilha.",
    preco: 19.9,
    categoria: "sobremesas",
    imagem: brownieComSorvete,
    enquadramento: "ambiente",
  },
  {
    id: "petit-gateau",
    nome: "Petit Gâteau",
    descricao: "Bolo de chocolate com recheio cremoso, servido com sorvete de baunilha.",
    preco: 22.9,
    categoria: "sobremesas",
    imagem: petitGateau,
    enquadramento: "ambiente",
    selo: "mais-pedido",
  },
  {
    id: "cheesecake",
    nome: "Cheesecake de Frutas Vermelhas",
    descricao: "Fatia de cheesecake com calda de frutas vermelhas feita na casa.",
    preco: 20.9,
    categoria: "sobremesas",
    imagem: cheesecake,
    enquadramento: "ambiente",
  },
];

export const ITENS_EM_DESTAQUE = CARDAPIO.filter((item) => item.destaque);

/** Item anunciado no hero — o preço do selo sai daqui, nunca digitado no JSX. */
export const ITEM_DO_HERO = CARDAPIO.find((item) => item.id === "duplo-cheddar") ?? CARDAPIO[0];

/** Recorte serializável do item, para atravessar a fronteira server → client. */
export function paraItemDoPedido(item: ItemCardapio): ItemDoPedido {
  return {
    id: item.id,
    nome: item.nome,
    preco: item.preco,
    imagemSrc: item.imagem.src,
  };
}

/** Itens de uma categoria, com os destaques na frente. */
export function itensDaCategoria(categoria: CategoriaId): ItemCardapio[] {
  return CARDAPIO.filter((item) => item.categoria === categoria).sort(
    (a, b) => Number(Boolean(b.destaque)) - Number(Boolean(a.destaque)),
  );
}

export const TOTAL_DE_ITENS = CARDAPIO.length;

export const ROTULO_SELO: Record<SeloItem, string> = {
  "mais-pedido": "Mais pedido",
  novo: "Novo",
  vegetariano: "Veg",
};

/** Fonte única do par selo → tom visual, consumida pelo card e pela linha. */
export const TOM_DO_SELO: Record<SeloItem, "destaque" | "positivo"> = {
  "mais-pedido": "destaque",
  novo: "destaque",
  vegetariano: "positivo",
};
