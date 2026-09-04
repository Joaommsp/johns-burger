import type { Metadata, Viewport } from "next";
import { Alfa_Slab_One, Anton, Archivo } from "next/font/google";
import { CabecalhoDoSite } from "@/components/layout/site-header";
import { RodapeDoSite } from "@/components/layout/site-footer";
import { AcoesFlutuantes } from "@/components/order/floating-actions";
import { PainelDoPedido } from "@/components/order/order-drawer";
import { ProvedorDePedido } from "@/components/order/order-provider";
import { DadosEstruturados } from "@/components/seo/structured-data";
import { RESTAURANTE } from "@/data/restaurant";
import {
  AUTOR,
  DESCRICAO_PADRAO,
  PALAVRAS_CHAVE,
  REGIAO_GEO,
  SITE_URL,
  TITULO_PADRAO,
} from "@/data/seo";
import {
  dadosEstruturadosDoRestaurante,
  dadosEstruturadosDoSite,
} from "@/lib/structured-data";
import { COR_MARCA } from "@/lib/theme";
import "./globals.css";

const display = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Archivo({
  subsets: ["latin"],
  variable: "--fonte-corpo",
  display: "swap",
});

const etiqueta = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--fonte-etiqueta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITULO_PADRAO,
    template: `%s · ${RESTAURANTE.nome}`,
  },
  description: DESCRICAO_PADRAO,
  keywords: PALAVRAS_CHAVE,
  applicationName: RESTAURANTE.nome,
  authors: [{ name: AUTOR.nome, url: AUTOR.url }],
  creator: AUTOR.nome,
  publisher: RESTAURANTE.nome,
  category: "restaurant",
  // canonical, openGraph e twitter NÃO ficam aqui: seriam herdados por toda
  // rota filha, fazendo /cardapio se anunciar como a home. Cada page monta o
  // seu com metadataDaPagina().
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: true,
    address: true,
  },
  other: {
    // Ajuda a busca local a casar o site com o ponto físico.
    "geo.region": REGIAO_GEO,
    "geo.placename": `${RESTAURANTE.endereco.bairro}, ${RESTAURANTE.endereco.cidade}`,
  },
};

export const viewport: Viewport = {
  themeColor: COR_MARCA,
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${corpo.variable} ${etiqueta.variable}`}>
      <body className="min-h-dvh">
        <DadosEstruturados dados={dadosEstruturadosDoRestaurante()} />
        <DadosEstruturados dados={dadosEstruturadosDoSite()} />
        <ProvedorDePedido>
          <CabecalhoDoSite />
          {children}
          <RodapeDoSite />
          <AcoesFlutuantes />
          <PainelDoPedido />
        </ProvedorDePedido>
      </body>
    </html>
  );
}
