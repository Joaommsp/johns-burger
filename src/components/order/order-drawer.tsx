"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { usePedido } from "@/components/order/order-provider";
import { useCamadaModal } from "@/hooks/use-camada-modal";
import { Botao, BotaoLink } from "@/components/ui/button";
import { IconeWhatsApp } from "@/components/ui/icons";
import { Preco } from "@/components/ui/price";
import { linkWhatsAppCom } from "@/data/restaurant";
import { cn } from "@/lib/cn";
import { formatarBRL } from "@/lib/format";
import type { LinhaDoPedido } from "@/lib/types";

function mensagemDoPedido(linhas: LinhaDoPedido[], total: number): string {
  const itens = linhas
    .map(
      (linha) =>
        `• ${linha.quantidade}x ${linha.item.nome} — ${formatarBRL(linha.quantidade * linha.item.preco)}`,
    )
    .join("\n");

  return `Olá! Meu pedido:\n\n${itens}\n\nTotal: ${formatarBRL(total)}`;
}

/**
 * Entra e sai pela mesma borda de onde o botão flutuante vive — o painel vem
 * de onde foi chamado, em vez de aparecer do nada no meio da tela.
 */
export function PainelDoPedido() {
  const { linhas, totalDeItens, valorTotal, aberto, alterarQuantidade, limpar, fechar } =
    usePedido();
  const camada = useRef<HTMLDivElement>(null);
  const painel = useRef<HTMLDivElement>(null);
  const [confirmandoLimpeza, setConfirmandoLimpeza] = useState(false);

  useCamadaModal({ aberto, camada, foco: painel, aoFechar: fechar });

  const vazio = linhas.length === 0;

  // Qualquer ação sobre a lista cancela uma confirmação pendente: ninguém
  // volta de mexer nas quantidades e encontra um "limpar tudo?" armado.
  function alterar(id: string, delta: number) {
    setConfirmandoLimpeza(false);
    alterarQuantidade(id, delta);
  }

  function fecharPainel() {
    setConfirmandoLimpeza(false);
    fechar();
  }

  // Só monta a mensagem quando há o que mandar: encodeURIComponent a cada
  // render geraria um link com "Total: R$ 0,00" mesmo com o painel fechado.
  const linkDoPedido = useMemo(
    () => (vazio ? "#" : linkWhatsAppCom(mensagemDoPedido(linhas, valorTotal))),
    [vazio, linhas, valorTotal],
  );

  return (
    <div ref={camada}>
      <div
        aria-hidden
        onClick={fecharPainel}
        className={cn(
          "fixed inset-0 z-50 bg-marca-tinta/50 transition-opacity duration-300 ease-out",
          aberto ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <div
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-label="Meu pedido"
        tabIndex={-1}
        inert={!aberto}
        className={cn(
          "fixed right-0 top-0 z-50 flex h-dvh w-[min(var(--container-painel),88vw)] flex-col bg-superficie shadow-painel",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none",
          aberto ? "translate-x-0" : "translate-x-full",
        )}
      >
        <header className="flex items-center justify-between gap-3 border-b-2 border-superficie-borda px-5 py-4">
          <div>
            <h2 className="text-2xl text-tinta">Meu pedido</h2>
            <p className="mt-0.5 text-miudo font-bold uppercase tracking-rotulo text-tinta-suave">
              {totalDeItens} {totalDeItens === 1 ? "item" : "itens"}
            </p>
          </div>
          <button
            type="button"
            onClick={fecharPainel}
            aria-label="Fechar o pedido"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-aresta text-2xl leading-none text-tinta-suave transition-colors hover:bg-superficie-borda hover:text-tinta"
          >
            ×
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-3">
          {vazio ? (
            <div className="px-2 py-10 text-center">
              <p className="font-display text-xl uppercase text-tinta">Seu pedido está vazio</p>
              <p className="mx-auto mt-1.5 max-w-[32ch] text-sm text-tinta-suave">
                Toque em <strong className="text-tinta">Pedir</strong> em qualquer item do cardápio
                para montar a lista aqui.
              </p>
            </div>
          ) : (
            linhas.map((linha) => (
              <article
                key={linha.item.id}
                className="grid grid-cols-[44px_1fr_auto] items-center gap-3 border-b-[1.5px] border-superficie-borda py-3"
              >
                <Image
                  src={linha.item.imagemSrc}
                  alt=""
                  width={44}
                  height={44}
                  className="size-11 rounded-etiqueta bg-superficie-borda object-contain"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-tinta">{linha.item.nome}</p>
                  <p className="text-xs tabular-nums text-tinta-suave">
                    {linha.quantidade > 1
                      ? `${linha.quantidade} × ${formatarBRL(linha.item.preco)} = ${formatarBRL(linha.quantidade * linha.item.preco)}`
                      : formatarBRL(linha.item.preco)}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-superficie-alta p-1">
                  <BotaoQuantidade
                    rotulo={`Remover um ${linha.item.nome}`}
                    onClick={() => alterar(linha.item.id, -1)}
                  >
                    −
                  </BotaoQuantidade>
                  <span className="min-w-4 text-center text-sm font-bold tabular-nums">
                    {linha.quantidade}
                  </span>
                  <BotaoQuantidade
                    rotulo={`Adicionar um ${linha.item.nome}`}
                    onClick={() => alterar(linha.item.id, 1)}
                  >
                    +
                  </BotaoQuantidade>
                </div>
              </article>
            ))
          )}
        </div>

        <footer className="border-t-2 border-superficie-borda bg-superficie-alta px-5 pb-5 pt-4">
          {confirmandoLimpeza ? (
            <div role="alertdialog" aria-label="Confirmar limpeza do pedido" className="animate-surgir">
              <p className="text-sm font-semibold text-tinta">Tirar todos os itens do pedido?</p>
              <p className="mt-1 text-xs text-tinta-suave">
                A lista some e você monta de novo do zero.
              </p>
              <div className="mt-3 flex gap-2">
                <Botao
                  variante="primaria"
                  tamanho="compacto"
                  onClick={() => {
                    limpar();
                    setConfirmandoLimpeza(false);
                  }}
                >
                  Limpar pedido
                </Botao>
                <Botao
                  variante="contorno"
                  tamanho="compacto"
                  onClick={() => setConfirmandoLimpeza(false)}
                >
                  Cancelar
                </Botao>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-1.5 flex items-baseline justify-between text-sm text-tinta-suave">
                <span>Entrega</span>
                <span>a combinar no WhatsApp</span>
              </div>
              <div className="mb-3.5 flex items-baseline justify-between">
                <span className="text-miudo font-bold uppercase tracking-rotulo text-tinta-suave">
                  Total
                </span>
                <Preco valor={valorTotal} className="text-3xl" />
              </div>

              <BotaoLink
                href={linkDoPedido}
                externo
                variante="primaria"
                desabilitado={vazio}
                className="w-full"
              >
                <IconeWhatsApp />
                Fechar pedido no WhatsApp
              </BotaoLink>

              <div className="mt-2.5 flex items-center justify-between gap-3">
                <p className="text-[0.72rem] text-tinta-suave">
                  A lista vira uma mensagem pronta. Quem confirma é a cozinha.
                </p>
                {vazio ? null : (
                  <button
                    type="button"
                    onClick={() => setConfirmandoLimpeza(true)}
                    className="shrink-0 cursor-pointer text-[0.72rem] font-bold uppercase tracking-controle text-tinta-suave underline-offset-4 transition-colors hover:text-marca hover:underline"
                  >
                    Limpar
                  </button>
                )}
              </div>
            </>
          )}
        </footer>
      </div>
    </div>
  );
}

function BotaoQuantidade({
  children,
  rotulo,
  onClick,
}: {
  children: React.ReactNode;
  rotulo: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={rotulo}
      className="size-6.5 cursor-pointer rounded-full bg-superficie-borda font-bold leading-none text-tinta transition-[transform,background-color,color] duration-150 ease-out hover:bg-marca hover:text-superficie active:scale-90"
    >
      {children}
    </button>
  );
}
