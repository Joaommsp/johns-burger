import { FormularioDeContato } from "@/components/home/contact-form";
import { Secao } from "@/components/ui/layout";
import { SinalDeFuncionamento, Xadrez } from "@/components/ui/ornaments";
import { Chapeu, TextoDeApoio } from "@/components/ui/section-heading";
import { ENDERECO_COMPLETO, HORARIO_RESUMO, LINK_TELEFONE, RESTAURANTE } from "@/data/restaurant";

export function Contato() {
  return (
    <Secao id="contato" tom="superficie">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <div>
          <Chapeu>Fale conosco</Chapeu>
          <h2 className="mt-2.5 text-[clamp(2rem,4.4vw,3rem)] text-tinta">
            Reserva, evento
            <br />
            ou elogio à cozinha
          </h2>
          <TextoDeApoio className="mt-4">
            A mensagem abre no WhatsApp já preenchida — é por onde respondemos mais rápido.
          </TextoDeApoio>

          <FormularioDeContato />
        </div>

        <div>
          <div className="rounded-bloco bg-superficie-alta p-6 shadow-relevo">
            <h3 className="text-2xl text-tinta">Onde nos achar</h3>
            <dl className="mt-5 grid gap-4">
              <Informacao rotulo="Endereço">{ENDERECO_COMPLETO}</Informacao>
              <Informacao rotulo="Telefone">
                <a
                  href={LINK_TELEFONE}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                >
                  {RESTAURANTE.telefone}
                </a>
              </Informacao>
              <Informacao rotulo="E-mail">
                <a
                  href={`mailto:${RESTAURANTE.email}`}
                  className="inline-flex min-h-11 items-center underline-offset-4 hover:underline"
                >
                  {RESTAURANTE.email}
                </a>
              </Informacao>
              <Informacao rotulo="Horário" sufixo={<SinalDeFuncionamento />}>
                {HORARIO_RESUMO}
              </Informacao>
            </dl>
          </div>
          <Xadrez className="mt-5 h-14 rounded-etiqueta bg-marca" />
        </div>
      </div>
    </Secao>
  );
}

function Informacao({
  rotulo,
  children,
  sufixo,
}: {
  rotulo: string;
  children: React.ReactNode;
  /** Vai para a borda direita da linha, sem disputar espaço com o valor. */
  sufixo?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 items-baseline gap-x-4 gap-y-1 border-b-[1.5px] border-superficie-borda pb-3.5 last:border-0 last:pb-0 sm:grid-cols-[5.5rem_1fr]">
      <dt className="text-miudo font-bold uppercase tracking-rotulo text-tinta-suave">{rotulo}</dt>
      <dd className="m-0 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-semibold break-words text-tinta">
        <span className="[overflow-wrap:anywhere]">{children}</span>
        {sufixo}
      </dd>
    </div>
  );
}
