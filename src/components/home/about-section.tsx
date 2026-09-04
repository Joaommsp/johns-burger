import Image from "next/image";
import salao from "@/assets/images/restaurant-img-01.png";
import { Secao } from "@/components/ui/layout";
import { Chapeu, TextoDeApoio } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { PROVAS_DA_CASA, RESTAURANTE } from "@/data/restaurant";

export function SobreACasa() {
  return (
    <Secao>
      <div className="grid items-center gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12">
        <div className="relative">
          <Image
            src={salao}
            alt="Salão do restaurante com mesas ocupadas"
            sizes="(max-width: 1024px) 90vw, 520px"
            className="max-h-[420px] w-full rounded-bloco object-cover shadow-bloco"
          />
          <Tag className="absolute -left-3.5 bottom-6 -rotate-[4deg]">
            Salão para {RESTAURANTE.salao.lugares} pessoas
          </Tag>
        </div>

        <div>
          <Chapeu sobre="marca">Quem faz</Chapeu>
          <h2 className="mt-2.5 text-[clamp(2.2rem,5vw,3.6rem)] text-superficie">
            Uma hamburgueria de bairro que não terceiriza nada
          </h2>
          <TextoDeApoio sobre="marca" className="mt-4">
            A carne chega inteira e é moída aqui. O molho da casa é feito na segunda para a semana
            toda. A batata é cortada de manhã e frita só quando o pedido entra. É mais trabalho — e é
            exatamente por isso que o sabor não oscila entre uma visita e outra.
          </TextoDeApoio>

          <dl className="mt-8 grid grid-cols-2 gap-6 border-t-2 border-superficie/30 pt-6 sm:grid-cols-3">
            {PROVAS_DA_CASA.map((prova) => (
              <div key={prova.rotulo}>
                <dd className="font-display text-4xl tabular-nums leading-none text-destaque">
                  {prova.valor()}
                  {prova.unidade ? <span className="text-lg">{prova.unidade}</span> : null}
                </dd>
                <dt className="mt-1.5 text-[0.78rem] uppercase tracking-controle text-superficie/75">
                  {prova.rotulo}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </Secao>
  );
}
