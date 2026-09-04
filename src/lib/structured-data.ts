import { CARDAPIO, CATEGORIAS } from "@/data/menu";
import {
  ENDERECO_COMPLETO,
  HORARIO_ABERTURA,
  HORARIO_FECHAMENTO,
  LINK_WHATSAPP,
  RESTAURANTE,
} from "@/data/restaurant";
import { AUTOR, CAMINHO_IMAGEM_OG, DESCRICAO_PADRAO, SITE_URL } from "@/data/seo";
import { formatarBRL } from "@/lib/format";

/** Faixa real do cardápio — nunca um intervalo escrito à mão que envelhece. */
function faixaDePrecos(): string {
  const precos = CARDAPIO.map((item) => item.preco);
  return `${formatarBRL(Math.min(...precos))} - ${formatarBRL(Math.max(...precos))}`;
}

const DIAS_DA_SEMANA_SCHEMA = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

/** O crédito de autoria pertence ao site (CreativeWork), não ao estabelecimento. */
export function dadosEstruturadosDoSite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: RESTAURANTE.nome,
    inLanguage: "pt-BR",
    author: { "@type": "Person", name: AUTOR.nome, url: AUTOR.url },
    publisher: { "@id": `${SITE_URL}/#restaurante` },
  };
}

/**
 * Dados estruturados de restaurante. É o que faz o Google mostrar horário,
 * faixa de preço e avaliação direto no resultado da busca.
 */
export function dadosEstruturadosDoRestaurante() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurante`,
    name: RESTAURANTE.nome,
    description: DESCRICAO_PADRAO,
    url: SITE_URL,
    telephone: RESTAURANTE.telefoneE164,
    email: RESTAURANTE.email,
    image: `${SITE_URL}${CAMINHO_IMAGEM_OG}`,
    servesCuisine: ["Hambúrguer", "Comida americana", "Lanches"],
    priceRange: faixaDePrecos(),
    currenciesAccepted: "BRL",
    paymentAccepted: "Dinheiro, Cartão de crédito, Cartão de débito, Pix",
    address: {
      "@type": "PostalAddress",
      streetAddress: RESTAURANTE.endereco.logradouro,
      addressLocality: RESTAURANTE.endereco.bairro,
      addressRegion: RESTAURANTE.endereco.uf,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: RESTAURANTE.horario.diasAbertos.map((dia) => DIAS_DA_SEMANA_SCHEMA[dia]),
        opens: HORARIO_ABERTURA,
        closes: HORARIO_FECHAMENTO,
      },
    ],
    // Sem aggregateRating: marcar nota e número de avaliações que não vêm de
    // uma fonte real é violação da política de rich results do Google e sujeita
    // o domínio a ação manual. Voltar só quando houver integração com o Google
    // Business Profile.
    hasMenu: {
      "@type": "Menu",
      url: `${SITE_URL}/cardapio`,
      hasMenuSection: CATEGORIAS.map((categoria) => ({
        "@type": "MenuSection",
        name: categoria.nome,
      })),
    },
    acceptsReservations: "True",
    potentialAction: {
      "@type": "OrderAction",
      target: LINK_WHATSAPP,
      deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet",
    },
    sameAs: [RESTAURANTE.links.instagram],
    hasMap: `https://www.google.com/maps/search/${encodeURIComponent(ENDERECO_COMPLETO)}`,
  };
}
