import type { Metadata } from "next";
import { RESTAURANTE } from "@/data/restaurant";
import { CAMINHO_IMAGEM_OG, DESCRICAO_PADRAO, SITE_URL } from "@/data/seo";

interface MetadataDaPaginaProps {
  /** Sem o nome da casa: o template do layout já o acrescenta. */
  titulo: string;
  descricao?: string;
  /** Caminho absoluto da rota, começando em "/". */
  caminho: string;
}

/**
 * Canonical e Open Graph são herdados pelas rotas filhas quando declarados só
 * no layout — o que faria toda página se anunciar como a home. Cada rota monta
 * o seu bloco por aqui, para título, canonical e card social sempre casarem.
 */
export function metadataDaPagina({
  titulo,
  descricao = DESCRICAO_PADRAO,
  caminho,
}: MetadataDaPaginaProps): Metadata {
  const tituloCompleto = `${titulo} · ${RESTAURANTE.nome}`;
  const url = `${SITE_URL}${caminho}`;

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: caminho },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      url,
      siteName: RESTAURANTE.nome,
      title: tituloCompleto,
      description: descricao,
      images: [{ url: CAMINHO_IMAGEM_OG, width: 1200, height: 630, alt: tituloCompleto }],
    },
    twitter: {
      card: "summary_large_image",
      title: tituloCompleto,
      description: descricao,
      images: [CAMINHO_IMAGEM_OG],
    },
  };
}
