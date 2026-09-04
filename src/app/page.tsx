import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FaixaDaCasa } from "@/components/home/ticker-strip";
import { VitrineDoCardapio } from "@/components/home/menu-showcase";
import { SobreACasa } from "@/components/home/about-section";
import { PromocoesDaSemana } from "@/components/home/promos-section";
import { OSalao } from "@/components/home/dining-room-section";
import { Delivery } from "@/components/home/delivery-section";
import { Contato } from "@/components/home/contact-section";
import { VitrineDoDesenvolvedor } from "@/components/marketing/developer-section";
import { RESTAURANTE } from "@/data/restaurant";
import { metadataDaPagina } from "@/lib/page-metadata";

export const metadata: Metadata = metadataDaPagina({
  titulo: `Hambúrguer artesanal em ${RESTAURANTE.endereco.bairro}`,
  caminho: "/",
});

/** Diária: "anos de casa" e o ano do rodapé não podem congelar no build. */
export const revalidate = 86400;

export default function PaginaInicial() {
  return (
    <main>
      <Hero />
      <FaixaDaCasa />
      <VitrineDoCardapio />
      <SobreACasa />
      <PromocoesDaSemana />
      <OSalao />
      <Delivery />
      <Contato />
      <VitrineDoDesenvolvedor />
    </main>
  );
}
