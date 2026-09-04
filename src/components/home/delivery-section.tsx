import { BotaoLink } from "@/components/ui/button";
import { IconeWhatsApp } from "@/components/ui/icons";
import { Secao } from "@/components/ui/layout";
import { Chapeu, TextoDeApoio } from "@/components/ui/section-heading";
import { LINK_WHATSAPP, PASSOS_DO_PEDIDO, RESTAURANTE } from "@/data/restaurant";

export function Delivery() {
  return (
    <Secao id="pedido">
      <div className="grid items-center gap-8 rounded-bloco bg-marca-tinta p-8 text-superficie sm:p-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <Chapeu sobre="marca">Delivery próprio e iFood</Chapeu>
          <h2 className="mt-2.5 text-[clamp(2.1rem,4.6vw,3.2rem)]">
            Do balcão até
            <br />a sua porta
          </h2>
          <TextoDeApoio sobre="marca" className="mt-4">
            Pelo WhatsApp o pedido vem direto para a chapa e sai sem taxa de aplicativo. Pelo iFood,
            você acompanha a entrega no mapa. Os dois saem da mesma cozinha.
          </TextoDeApoio>
          <div className="mt-7 flex flex-wrap gap-3">
            <BotaoLink href={LINK_WHATSAPP} externo variante="destaque">
              <IconeWhatsApp />
              Pedir pelo WhatsApp
            </BotaoLink>
            <BotaoLink href={RESTAURANTE.links.ifood} externo variante="creme">
              Abrir no iFood
            </BotaoLink>
          </div>
        </div>

        <ol className="grid gap-3.5">
          {PASSOS_DO_PEDIDO.map((passo, indice) => (
            <li
              key={passo.titulo}
              className="flex items-start gap-3.5 rounded-etiqueta bg-superficie/10 px-4 py-3.5"
            >
              <span className="min-w-6 font-display text-lg leading-tight text-destaque">
                {indice + 1}
              </span>
              <p className="text-sm text-superficie/85">
                {passo.texto} <strong className="text-superficie">{passo.titulo}</strong>
              </p>
            </li>
          ))}
        </ol>
      </div>
    </Secao>
  );
}
