import { Secao } from "@/components/ui/layout";
import { TituloSecao } from "@/components/ui/section-heading";
import { PROMOCOES } from "@/data/promos";

export function PromocoesDaSemana() {
  return (
    <Secao id="promocoes">
      <TituloSecao
        sobre="marca"
        chapeu="Toda semana, na mesma ordem"
        titulo="Promoções da semana"
        apoio="Válidas no salão e no delivery próprio. Não acumulam com cupom do aplicativo."
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROMOCOES.map((promocao) => (
          <article
            key={promocao.id}
            className="cupom flex flex-col gap-2 rounded-bloco bg-superficie px-5 pt-6 pb-7"
          >
            <span className="font-etiqueta text-miudo uppercase tracking-[0.06em] text-marca">
              {promocao.diaDaSemana}
            </span>
            <h3 className="text-2xl text-tinta">{promocao.titulo}</h3>
            <p className="text-sm text-tinta-suave">{promocao.descricao}</p>

            <div className="mt-auto flex items-center justify-between gap-2 border-t-2 border-dashed border-superficie-borda pt-3.5">
              <span className="font-display text-2xl text-marca">{promocao.chamada}</span>
              <span className="text-right text-[0.7rem] tracking-[0.04em] text-tinta-suave">
                {promocao.regra}
              </span>
            </div>
          </article>
        ))}
      </div>
    </Secao>
  );
}
