import { CardDoPrato } from "@/components/menu/dish-card";
import { BotaoLink } from "@/components/ui/button";
import { Secao } from "@/components/ui/layout";
import { TituloSecao } from "@/components/ui/section-heading";
import { CATEGORIAS, TOTAL_DE_ITENS, itensDaCategoria } from "@/data/menu";

/**
 * O cardápio inteiro na home, como vitrine: agrupado por categoria, sem filtro
 * nem busca — a pessoa desce e vê tudo. A rota /cardapio é a ferramenta, com
 * busca e lista compacta para quem já sabe o que quer.
 */
export function VitrineDoCardapio() {
  return (
    <Secao id="cardapio" tom="superficie">
      <TituloSecao
        chapeu={`As ${CATEGORIAS.length} categorias, os ${TOTAL_DE_ITENS} itens`}
        titulo={
          <>
            O cardápio inteiro,
            <br />
            aqui mesmo
          </>
        }
        apoio="Tudo o que sai da nossa chapa, com preço atualizado. Toque em pedir para montar a sua lista e mande tudo de uma vez pelo WhatsApp."
      />

      <nav aria-label="Categorias do cardápio" className="mb-12 flex flex-wrap gap-2">
        {CATEGORIAS.map((categoria) => (
          <a
            key={categoria.id}
            href={`#categoria-${categoria.id}`}
            className="flex min-h-11 items-center rounded-full border-2 border-superficie-borda px-4 text-miudo font-bold uppercase tracking-controle text-tinta-suave transition-colors hover:border-marca hover:text-marca"
          >
            {categoria.nome}
          </a>
        ))}
      </nav>

      {CATEGORIAS.map((categoria) => {
        const itens = itensDaCategoria(categoria.id);

        if (itens.length === 0) {
          return null;
        }

        return (
          <section
            key={categoria.id}
            id={`categoria-${categoria.id}`}
            className="mb-14 scroll-mt-28 last:mb-0"
          >
            <div className="mb-6 flex items-baseline gap-4">
              <h3 className="text-[clamp(1.7rem,3.4vw,2.4rem)] text-tinta">{categoria.nome}</h3>
              <span aria-hidden className="flex-1 border-b-2 border-dashed border-superficie-borda" />
              <span className="text-miudo font-bold uppercase tracking-[0.12em] text-tinta-suave">
                {itens.length} {itens.length === 1 ? "item" : "itens"}
              </span>
            </div>

            {/* Celular: trilho horizontal com encaixe. Tablet em diante: grade. */}
            <div className="trilho -mx-6 select-none gap-4 px-6 pb-3 pt-5 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pt-0 lg:grid-cols-4">
              {itens.map((item) => (
                <CardDoPrato key={item.id} item={item} />
              ))}
            </div>

            <p className="mt-2 text-miudo uppercase tracking-controle text-tinta-suave sm:hidden">
              Arraste para o lado · {itens.length} {itens.length === 1 ? "item" : "itens"}
            </p>
          </section>
        );
      })}

      <div className="mt-12 flex flex-wrap items-center gap-4 border-t-2 border-dashed border-superficie-borda pt-8">
        <BotaoLink href="/cardapio" variante="primaria">
          Buscar no cardápio
        </BotaoLink>
        <span className="text-sm text-tinta-suave">
          Procurando um item específico? A página do cardápio tem busca e filtro por categoria.
        </span>
      </div>
    </Secao>
  );
}
