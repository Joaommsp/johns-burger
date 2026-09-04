"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { BotaoLink } from "@/components/ui/button";
import { IconeWhatsApp } from "@/components/ui/icons";
import { NAVEGACAO } from "@/data/navigation";
import { LINK_WHATSAPP, RESTAURANTE } from "@/data/restaurant";
import { useCamadaModal } from "@/hooks/use-camada-modal";
import { useMontado } from "@/hooks/use-montado";
import { cn } from "@/lib/cn";

/** Menu recolhido do celular: um botão, e as seções abrem numa camada limpa. */
export function MenuDoCelular({ rotaAtual }: { rotaAtual: string }) {
  const [aberto, setAberto] = useState(false);
  const camada = useRef<HTMLDivElement>(null);
  const painel = useRef<HTMLDivElement>(null);

  const montado = useMontado();

  const fechar = useCallback(() => setAberto(false), []);
  useCamadaModal({ aberto, camada, foco: painel, aoFechar: fechar });

  // O cabeçalho é sticky com z-index próprio, o que cria contexto de
  // empilhamento: qualquer camada renderizada dentro dele fica presa abaixo
  // dos botões flutuantes. Por isso o painel vai para o body, por portal.

  return (
    <>
      <button
        type="button"
        onClick={() => setAberto(true)}
        aria-label="Abrir o menu"
        aria-expanded={aberto}
        className="ml-auto grid size-11 shrink-0 cursor-pointer place-items-center rounded-aresta text-superficie transition-colors hover:bg-superficie/15 sm:hidden"
      >
        <span aria-hidden className="flex w-5 flex-col gap-[5px]">
          <span className="h-0.5 w-full rounded-full bg-current" />
          <span className="h-0.5 w-full rounded-full bg-current" />
          <span className="h-0.5 w-3/5 rounded-full bg-current" />
        </span>
      </button>

      {montado
        ? createPortal(
            <div ref={camada} className="sm:hidden">
        <div
          aria-hidden
          onClick={fechar}
          className={cn(
            "fixed inset-0 z-60 bg-marca-tinta/60 transition-opacity duration-300 ease-out",
            aberto ? "opacity-100" : "pointer-events-none opacity-0",
          )}
        />

        <div
          ref={painel}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          tabIndex={-1}
          inert={!aberto}
          className={cn(
            "fixed right-0 top-0 z-60 flex h-dvh w-[min(20rem,86vw)] flex-col bg-marca-tinta text-superficie shadow-painel",
            "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] focus:outline-none",
            aberto ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between gap-3 border-b border-superficie/15 px-5 py-4">
            <span className="font-display text-lg tracking-[0.03em]">{RESTAURANTE.nome}</span>
            <button
              type="button"
              onClick={fechar}
              aria-label="Fechar o menu"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-aresta text-2xl leading-none text-superficie/70 transition-colors hover:bg-superficie/15 hover:text-superficie"
            >
              ×
            </button>
          </div>

          <nav aria-label="Seções do site" className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="grid gap-1">
              {NAVEGACAO.map((link) => {
                const ativo = link.tipo === "rota" && rotaAtual === link.href;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={fechar}
                      aria-current={ativo ? "page" : undefined}
                      className={cn(
                        "flex min-h-13 items-center rounded-aresta px-4 font-display text-xl uppercase tracking-[0.02em] transition-colors",
                        ativo
                          ? "bg-superficie text-marca-tinta"
                          : "text-superficie/85 hover:bg-superficie/12 hover:text-superficie",
                      )}
                    >
                      {link.rotulo}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="border-t border-superficie/15 px-5 pb-6 pt-4">
            <BotaoLink href={LINK_WHATSAPP} externo variante="destaque" className="w-full">
              <IconeWhatsApp />
              Peça no WhatsApp
            </BotaoLink>
            <p className="mt-3 text-center text-miudo uppercase tracking-controle text-superficie/60">
              {RESTAURANTE.telefone}
            </p>
          </div>
        </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
