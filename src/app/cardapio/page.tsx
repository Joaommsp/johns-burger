import type { Metadata } from "next";
import { NavegadorDoCardapio } from "@/components/menu/menu-browser";
import { BotaoLink } from "@/components/ui/button";
import { IconeWhatsApp } from "@/components/ui/icons";
import { CATEGORIAS, TOTAL_DE_ITENS } from "@/data/menu";
import { Container } from "@/components/ui/layout";
import { Chapeu } from "@/components/ui/section-heading";
import { LINK_WHATSAPP, RESTAURANTE } from "@/data/restaurant";
import { metadataDaPagina } from "@/lib/page-metadata";

export const metadata: Metadata = metadataDaPagina({
  titulo: "Cardápio completo",
  descricao: `Os ${TOTAL_DE_ITENS} itens do ${RESTAURANTE.nome}: ${CATEGORIAS.map((c) => c.nome).join(", ")}. Preços atualizados e pedido pelo WhatsApp.`,
  caminho: "/cardapio",
});

function CabecalhoDoCardapio() {
  return (
    <>
      <Chapeu sobre="marca">
        {TOTAL_DE_ITENS} itens · preços atualizados
      </Chapeu>
      <h1 className="mt-3 text-[clamp(2.8rem,6.4vw,4.8rem)]">Cardápio completo</h1>
    </>
  );
}

/** Diária: o rodapé mostra o ano corrente e a home conta os anos de casa. */
export const revalidate = 86400;

export default function PaginaCardapio() {
  return (
    <main>
      <NavegadorDoCardapio cabecalho={<CabecalhoDoCardapio />} />

      <section className="bg-superficie pb-16 sm:pb-20">
        <Container>
          <div className="flex flex-wrap items-center gap-4 rounded-bloco bg-superficie-borda px-6 py-5 text-sm text-tinta-suave">
            <strong className="text-tinta">Alguma restrição alimentar?</strong>
            <span>
              Informe no pedido: temos pão sem glúten e trocamos a maionese da casa pela versão sem
              ovo em qualquer item.
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <BotaoLink href="/#cardapio" variante="primaria">
              Ver o cardápio com fotos
            </BotaoLink>
            <BotaoLink href={LINK_WHATSAPP} externo variante="contorno">
              <IconeWhatsApp />
              Falar direto com a casa
            </BotaoLink>
          </div>
        </Container>
      </section>
    </main>
  );
}
