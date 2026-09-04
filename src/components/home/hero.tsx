import Image from "next/image";
import burgerHero from "@/assets/images/cardapio/hero.webp";
import { Asterisco, Pontilhado, SinalDeFuncionamento, Xadrez } from "@/components/ui/ornaments";
import { FundoInterativo } from "@/components/ui/interactive-backdrop";
import { BotaoLink } from "@/components/ui/button";
import { IconeWhatsApp } from "@/components/ui/icons";
import { Container } from "@/components/ui/layout";
import { SeloDePreco } from "@/components/ui/price-seal";
import { Chapeu, TextoDeApoio } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { ITEM_DO_HERO } from "@/data/menu";
import { LINK_WHATSAPP, PROMESSA_DA_CASA, RESTAURANTE } from "@/data/restaurant";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-8 pt-8 sm:pt-12 lg:py-0">
      {/* Camada 1 — luz e vinheta. Sem ela o recorte flutua sobre cor chapada. */}
      <div aria-hidden className="palco-hero absolute inset-0 z-1" />

      {/* Camada 1b — grade de pontos que responde ao cursor. */}
      <div aria-hidden className="absolute inset-0 z-1">
        <FundoInterativo />
      </div>

      {/* Camada 2 — chão e ornamentos, atrás do produto. */}
      <div
        aria-hidden
        className="absolute left-[63%] top-[48%] z-2 hidden size-[330px] -translate-x-1/2 -translate-y-1/2 animate-girar-lento rounded-full border-2 border-dashed border-superficie/20 motion-reduce:animate-none lg:block"
      />
      <div
        aria-hidden
        className="chao-hero absolute bottom-[17%] left-[55%] z-2 hidden h-12 w-[31%] -translate-x-1/2 lg:block"
      />
      <Xadrez className="absolute bottom-[16%] left-[2%] z-2 hidden h-14 w-[74px] animate-flutuar-lento opacity-55 motion-reduce:animate-none lg:block" />
      <Pontilhado className="absolute bottom-[6%] right-[3%] z-2 hidden h-20 w-28 animate-flutuar opacity-70 [animation-delay:-3s] motion-reduce:animate-none lg:block" />

      <Container className="relative z-3">
        <div className="grid items-center gap-8 lg:min-h-[480px] lg:grid-cols-2 lg:gap-0">
          {/* Camada 3 — o bloco de texto, que o produto vai cruzar. */}
          <div className="relative z-4 order-1 my-0 rounded-bloco bg-superficie p-8 shadow-[8px_8px_0_rgb(60_12_8_/_0.5)] sm:p-10 lg:my-11 lg:shadow-[12px_12px_0_rgb(60_12_8_/_0.55)]">
            <Chapeu>
              Chapa desde {RESTAURANTE.fundadoEm} · {RESTAURANTE.endereco.cidade}
            </Chapeu>

            <h1 className="mt-3 text-[clamp(2.6rem,6vw,4.1rem)] text-tinta">
              Grande.
              <br />
              Suculento.
              <span className="block text-marca">Sem desculpa.</span>
            </h1>

            <TextoDeApoio className="mt-4 max-w-[44ch]">{PROMESSA_DA_CASA}</TextoDeApoio>

            <div className="mt-7 flex flex-wrap gap-3">
              <BotaoLink href={LINK_WHATSAPP} externo variante="primaria">
                <IconeWhatsApp />
                Peça no WhatsApp
              </BotaoLink>
              <BotaoLink href="#cardapio" variante="contorno">
                Ver o cardápio
              </BotaoLink>
            </div>

            <p className="mt-6 flex flex-wrap items-center gap-x-2 text-sm text-tinta-suave">
              <SinalDeFuncionamento />
              <span>· entrega média de {RESTAURANTE.entrega.tempoMedioMinutos} min</span>
            </p>
          </div>

          {/* Camada 4 — o produto, sobrepondo o bloco: é o cruzamento que dá profundidade. */}
          <div className="relative order-2 flex min-h-[280px] items-center justify-center py-8 lg:min-h-[480px] lg:py-0">
            <Asterisco
              className="absolute left-[6%] top-[10%] z-4 animate-girar-lento text-[2.4rem] text-superficie/80 motion-reduce:animate-none"
            />
            <Tag
              tom="creme"
              className="absolute right-[7%] top-[3%] z-6 animate-oscilar text-[0.66rem] [--giro:6deg] motion-reduce:animate-none sm:right-[11%] sm:text-miudo lg:top-[17%]"
            >
              180&nbsp;g na chapa
            </Tag>

            <Image
              src={burgerHero}
              alt="Hambúrguer da casa com cheddar derretido, alface e tomate"
              priority
              sizes="(max-width: 1024px) 80vw, 455px"
              className="relative z-5 w-[min(86%,455px)] animate-flutuar drop-shadow-hero motion-reduce:animate-none lg:-ml-[7%]"
            />

            <SeloDePreco
              valor={ITEM_DO_HERO.preco}
              chamada="o clássico da casa"
              className="absolute bottom-[4%] right-[2%] z-7 animate-oscilar [--giro:-4deg] [animation-delay:-4.5s] scale-90 motion-reduce:animate-none sm:right-[8%] lg:bottom-[17%] lg:left-[36%] lg:right-auto lg:scale-100"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
