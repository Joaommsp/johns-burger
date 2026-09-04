import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variante = "primaria" | "contorno" | "creme" | "destaque" | "tinta";
type Tamanho = "padrao" | "compacto";

const BASE =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-aresta font-bold uppercase transition-[transform,box-shadow] duration-150 ease-out active:scale-[0.97] active:duration-100 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none disabled:active:scale-100";

const RELEVO = "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-botao-alto";

const VARIANTES: Record<Variante, string> = {
  primaria: `bg-marca text-superficie shadow-botao ${RELEVO}`,
  contorno: "text-tinta shadow-[inset_0_0_0_2px_var(--color-tinta)] hover:bg-tinta hover:text-superficie",
  creme: `bg-superficie text-marca-tinta shadow-botao ${RELEVO}`,
  destaque: `bg-destaque text-tinta shadow-botao ${RELEVO}`,
  /** Sólido escuro, sem relevo: ação secundária dentro de um card claro. */
  tinta: "bg-tinta text-superficie hover:bg-marca",
};

// Altura mínima de 44px: é o alvo confortável para o dedo em tela de toque.
const TAMANHOS: Record<Tamanho, string> = {
  padrao: "min-h-12 px-6 py-3.5 text-[0.8125rem] tracking-rotulo",
  compacto: "min-h-11 px-4 py-2.5 text-miudo tracking-controle",
};

interface BotaoBaseProps {
  variante?: Variante;
  tamanho?: Tamanho;
  className?: string;
  children: ReactNode;
}

/** Link não tem `disabled`: o estado inerte é montado aqui, num lugar só. */
const INERTE = "pointer-events-none opacity-60 shadow-none";

type BotaoLinkProps = BotaoBaseProps & {
  href: string;
  externo?: boolean;
  desabilitado?: boolean;
} & Omit<ComponentPropsWithoutRef<"a">, "href" | "className" | "children">;

type BotaoAcaoProps = BotaoBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

function classes(variante: Variante, tamanho: Tamanho, className?: string) {
  return cn(BASE, VARIANTES[variante], TAMANHOS[tamanho], className);
}

export function BotaoLink({
  href,
  externo = false,
  desabilitado = false,
  variante = "primaria",
  tamanho = "padrao",
  className,
  children,
  ...props
}: BotaoLinkProps) {
  const classeFinal = cn(classes(variante, tamanho, className), desabilitado && INERTE);
  const atributosInertes = desabilitado
    ? ({ "aria-disabled": true, tabIndex: -1 } as const)
    : null;

  if (externo) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classeFinal}
        {...atributosInertes}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classeFinal} {...atributosInertes} {...props}>
      {children}
    </Link>
  );
}

export function Botao({
  variante = "primaria",
  tamanho = "padrao",
  className,
  children,
  ...props
}: BotaoAcaoProps) {
  return (
    <button type="button" className={classes(variante, tamanho, className)} {...props}>
      {children}
    </button>
  );
}
