import { CATEGORIAS } from "@/data/menu";
import { LINK_TELEFONE, RESTAURANTE } from "@/data/restaurant";
import type { ColunaDoRodape, LinkNavegacao } from "@/lib/types";

export const NAVEGACAO: LinkNavegacao[] = [
  { tipo: "rota", rotulo: "Início", href: "/" },
  { tipo: "rota", rotulo: "Cardápio", href: "/cardapio" },
  { tipo: "ancora", rotulo: "Promoções", href: "/#promocoes" },
  { tipo: "ancora", rotulo: "O restaurante", href: "/#salao" },
  { tipo: "ancora", rotulo: "Contato", href: "/#contato" },
];

export const RODAPE_COLUNAS: ColunaDoRodape[] = [
  {
    titulo: "Cardápio",
    // Derivado das categorias reais: rodapé e cardápio não podem divergir.
    itens: CATEGORIAS.map((categoria) => ({
      rotulo: categoria.nome,
      href: "/cardapio",
    })),
  },
  {
    titulo: "A casa",
    itens: [
      { rotulo: "Sobre nós", href: "/#salao" },
      { rotulo: "Eventos e reservas", href: "/#contato" },
      { rotulo: "Trabalhe conosco", href: "/#contato" },
      { rotulo: "Solicitar parceria", href: "/#contato" },
    ],
  },
  {
    titulo: "Contato",
    itens: [
      { rotulo: RESTAURANTE.telefone, href: LINK_TELEFONE },
      { rotulo: RESTAURANTE.instagram, href: RESTAURANTE.links.instagram },
      { rotulo: RESTAURANTE.email, href: `mailto:${RESTAURANTE.email}` },
    ],
  },
];
