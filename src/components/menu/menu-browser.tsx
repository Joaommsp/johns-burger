"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { LinhaDoCardapio } from "@/components/menu/menu-item-row";
import { Botao } from "@/components/ui/button";
import { CampoDeTexto } from "@/components/ui/input";
import { Container } from "@/components/ui/layout";
import { CARDAPIO, CATEGORIAS } from "@/data/menu";
import { cn } from "@/lib/cn";
import { normalizarBusca } from "@/lib/format";
import type { CategoriaId } from "@/lib/types";

const TODAS = "todas" as const;

type FiltroCategoria = typeof TODAS | CategoriaId;

function contagem(quantidade: number): string {
  return `${quantidade} ${quantidade === 1 ? "item" : "itens"}`;
}

interface NavegadorDoCardapioProps {
  /** Cabeçalho estático da página, renderizado no servidor. */
  cabecalho: React.ReactNode;
}

export function NavegadorDoCardapio({ cabecalho }: NavegadorDoCardapioProps) {
  const [categoria, setCategoria] = useState<FiltroCategoria>(TODAS);
  const [busca, setBusca] = useState("");
  const buscaAdiada = useDeferredValue(busca);

  const itensFiltrados = useMemo(() => {
    const termo = normalizarBusca(buscaAdiada);

    return CARDAPIO.filter((item) => {
      if (categoria !== TODAS && item.categoria !== categoria) {
        return false;
      }
      if (!termo) {
        return true;
      }
      return (
        normalizarBusca(item.nome).includes(termo) ||
        normalizarBusca(item.descricao).includes(termo)
      );
    });
  }, [categoria, buscaAdiada]);

  const grupos = useMemo(
    () =>
      CATEGORIAS.map((cat) => ({
        categoria: cat,
        itens: itensFiltrados.filter((item) => item.categoria === cat.id),
      })).filter((grupo) => grupo.itens.length > 0),
    [itensFiltrados],
  );

  const termoExibido = buscaAdiada.trim();
  const nenhumResultado = itensFiltrados.length === 0;

  return (
    <>
      <header className="bg-marca-tinta py-10 text-superficie sm:py-14">
        <Container>
          {cabecalho}

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por categoria">
              <Chip ativo={categoria === TODAS} aoClicar={() => setCategoria(TODAS)}>
                Tudo
              </Chip>
              {CATEGORIAS.map((cat) => (
                <Chip key={cat.id} ativo={categoria === cat.id} aoClicar={() => setCategoria(cat.id)}>
                  {cat.nome}
                </Chip>
              ))}
            </div>

            <div className="relative min-w-[230px] flex-1 sm:max-w-[280px] sm:flex-none">
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="pointer-events-none absolute left-0 top-1/2 size-4 -translate-y-1/2 opacity-60"
              >
                <circle cx="7" cy="7" r="5" />
                <path d="M11 11l4 4" />
              </svg>
              <CampoDeTexto
                type="search"
                tom="escuro"
                value={busca}
                onChange={(evento) => setBusca(evento.target.value)}
                placeholder="Buscar no cardápio"
                aria-label="Buscar no cardápio"
                className="pl-6"
              />
            </div>
          </div>
        </Container>
      </header>

      <div className="bg-superficie py-12 sm:py-14">
        <Container>
          {/* Fora do ramo condicional: uma live region desmontada não anuncia. */}
          <p className="sr-only" aria-live="polite">
            {nenhumResultado ? "Nenhum item encontrado" : `${contagem(itensFiltrados.length)} no cardápio`}
          </p>

          {nenhumResultado ? (
            <div className="rounded-bloco border-2 border-dashed border-superficie-borda px-6 py-12 text-center">
              <h2 className="text-2xl text-tinta">
                {termoExibido ? "Nada com esse nome por aqui" : "Categoria sem itens no momento"}
              </h2>
              <p className="mx-auto mt-2 max-w-[46ch] text-sm text-tinta-suave">
                {termoExibido ? (
                  <>
                    Nenhum item do cardápio combina com{" "}
                    <strong className="text-tinta">“{termoExibido}”</strong>
                    {categoria !== TODAS ? " dentro dessa categoria" : ""}. Tente outro termo ou volte
                    a ver o cardápio inteiro.
                  </>
                ) : (
                  "Essa categoria está sem itens agora. Veja o cardápio inteiro enquanto isso."
                )}
              </p>
              <Botao
                variante="primaria"
                className="mt-6"
                onClick={() => {
                  setBusca("");
                  setCategoria(TODAS);
                }}
              >
                Limpar filtros
              </Botao>
            </div>
          ) : (
            grupos.map((grupo) => (
              <section key={grupo.categoria.id} className="mb-12">
                <div className="mb-6 flex items-baseline gap-4">
                  <h2 className="text-[clamp(1.8rem,3.6vw,2.6rem)] text-tinta">
                    {grupo.categoria.nome}
                  </h2>
                  <span aria-hidden className="flex-1 border-b-2 border-dashed border-superficie-borda" />
                  <span className="text-miudo font-bold uppercase tracking-[0.12em] text-tinta-suave">
                    {contagem(grupo.itens.length)}
                  </span>
                </div>

                <div className="grid gap-x-10 md:grid-cols-2">
                  {grupo.itens.map((item) => (
                    <LinhaDoCardapio key={item.id} item={item} />
                  ))}
                </div>
              </section>
            ))
          )}
        </Container>
      </div>
    </>
  );
}

function Chip({
  ativo,
  aoClicar,
  children,
}: {
  ativo: boolean;
  aoClicar: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={aoClicar}
      aria-pressed={ativo}
      className={cn(
        "min-h-11 cursor-pointer rounded-full border-2 px-4 py-2 text-miudo font-bold uppercase tracking-controle transition-colors",
        ativo
          ? "border-superficie bg-superficie text-marca-tinta"
          : "border-superficie/35 text-superficie hover:border-superficie",
      )}
    >
      {children}
    </button>
  );
}
