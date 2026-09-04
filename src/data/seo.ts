import { PROMESSA_DA_CASA, RESTAURANTE } from "@/data/restaurant";

/**
 * Domínio do ambiente. Em preview e local o valor cai no localhost — nunca
 * canonicalize um deploy de teste para o domínio de produção.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const CAMINHO_IMAGEM_OG = "/opengraph-image.png";

export const AUTOR = {
  nome: "João Marcos",
  url: "https://github.com/Joaommsp",
} as const;

export const TITULO_PADRAO = `${RESTAURANTE.nome} — Hambúrguer artesanal em ${RESTAURANTE.endereco.bairro}`;

export const DESCRICAO_PADRAO =
  `${PROMESSA_DA_CASA} Delivery em ${RESTAURANTE.entrega.tempoMedioMinutos} minutos na ` +
  `${RESTAURANTE.endereco.bairro}, ${RESTAURANTE.endereco.cidade}. Peça pelo WhatsApp ou venha ao salão.`;

/** Termos que uma pessoa realmente digita procurando a casa. */
export const PALAVRAS_CHAVE = [
  "hamburgueria",
  `hamburgueria ${RESTAURANTE.endereco.bairro}`,
  `hambúrguer artesanal ${RESTAURANTE.endereco.cidade}`,
  "hambúrguer artesanal",
  "delivery de hambúrguer",
  "smash burger",
  "melhor hambúrguer da região",
  "lanchonete",
  RESTAURANTE.nome,
];

export const REGIAO_GEO = `BR-${RESTAURANTE.endereco.uf}`;
