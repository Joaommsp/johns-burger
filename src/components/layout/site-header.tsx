"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo-johns-burgers.webp";
import { MenuDoCelular } from "@/components/layout/mobile-menu";
import { BotaoLink } from "@/components/ui/button";
import { IconeWhatsApp } from "@/components/ui/icons";
import { NAVEGACAO } from "@/data/navigation";
import { LINK_WHATSAPP, RESTAURANTE } from "@/data/restaurant";
import { cn } from "@/lib/cn";
import type { LinkNavegacao } from "@/lib/types";

export function CabecalhoDoSite() {
  const rotaAtual = usePathname();

  return (
    <header className="sticky top-0 z-40 bg-marca-tinta text-superficie">
      <div className="mx-auto flex max-w-pagina items-center gap-6 px-6 py-2.5">
        <Link
          href="/"
          className="flex min-h-11 shrink-0 items-center gap-2.5 font-display text-lg tracking-[0.03em]"
        >
          <Image src={logo} alt="" width={34} height={34} className="size-[34px] object-contain" />
          {RESTAURANTE.nome}
        </Link>

        <nav aria-label="Principal" className="rolagem-discreta -mx-1 ml-auto hidden overflow-x-auto sm:block">
          <ul className="flex gap-1">
            {NAVEGACAO.map((link) => (
              <li key={link.href}>
                <LinkDeNavegacao link={link} rotaAtual={rotaAtual} />
              </li>
            ))}
          </ul>
        </nav>

        <BotaoLink
          href={LINK_WHATSAPP}
          externo
          variante="destaque"
          tamanho="compacto"
          className="ml-auto shrink-0 max-sm:hidden sm:ml-0"
        >
          <IconeWhatsApp />
          <span className="hidden sm:inline">Peça no </span>WhatsApp
        </BotaoLink>

        <MenuDoCelular rotaAtual={rotaAtual} />
      </div>

    </header>
  );
}

/**
 * Só link de rota tem estado ativo: usePathname não enxerga o fragmento, então
 * comparar âncora com a rota daria sempre falso — e às vezes falso-positivo.
 */
function LinkDeNavegacao({
  link,
  rotaAtual,
  compacto = false,
}: {
  link: LinkNavegacao;
  rotaAtual: string;
  compacto?: boolean;
}) {
  const ativo = link.tipo === "rota" && rotaAtual === link.href;

  return (
    <Link
      href={link.href}
      aria-current={ativo ? "page" : undefined}
      className={cn(
        "flex items-center whitespace-nowrap rounded-aresta text-miudo font-bold uppercase tracking-[0.14em] transition-colors",
        compacto ? "min-h-11 px-3" : "min-h-11 px-3",
        ativo
          ? "bg-superficie text-marca-tinta"
          : "text-superficie/80 hover:bg-superficie/15 hover:text-superficie",
      )}
    >
      {link.rotulo}
    </Link>
  );
}
