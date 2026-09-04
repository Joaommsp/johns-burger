import { Asterisco } from "@/components/ui/ornaments";
import { SELOS_DA_CASA } from "@/data/restaurant";

/**
 * Uma cópia exata da lista. A animação desloca -50% da largura total, então as
 * duas cópias precisam ser irmãs diretas, sem gap entre elas: qualquer espaçamento
 * no contêiner externo faz a faixa saltar a cada volta.
 */
function Trecho({ oculto = false }: { oculto?: boolean }) {
  return (
    <span aria-hidden={oculto || undefined} className="flex shrink-0 items-center">
      {SELOS_DA_CASA.map((selo) => (
        <span key={selo} className="flex items-center gap-10 whitespace-nowrap pl-10">
          {selo}
          <Asterisco />
        </span>
      ))}
    </span>
  );
}

/** Faixa contínua com os diferenciais da casa, entre o hero e o conteúdo. */
export function FaixaDaCasa() {
  return (
    <div className="mt-10 overflow-hidden border-y-[3px] border-marca-tinta bg-superficie text-marca-tinta sm:mt-14">
      <div className="flex w-max py-2.5 font-display text-base tracking-controle animate-faixa motion-reduce:animate-none">
        <Trecho />
        <Trecho oculto />
      </div>
    </div>
  );
}
