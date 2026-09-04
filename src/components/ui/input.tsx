import type { ComponentPropsWithRef } from "react";
import { cn } from "@/lib/cn";

/** Sobre creme a linha é escura; sobre a tinta da marca, clara. */
type TomDoCampo = "claro" | "escuro";

const TONS: Record<TomDoCampo, string> = {
  claro:
    "border-superficie-borda text-tinta placeholder:text-tinta-suave/60 focus:border-marca",
  escuro:
    "border-superficie/35 text-superficie placeholder:text-superficie/55 focus:border-destaque",
};

const BASE =
  "w-full border-0 border-b-2 bg-transparent py-2 transition-colors focus:outline-none";

type CampoProps = { tom?: TomDoCampo; invalido?: boolean } & Omit<
  ComponentPropsWithRef<"input">,
  "className"
> & { className?: string };

/** Campo underline usado no formulário e na busca do cardápio. */
export function CampoDeTexto({ tom = "claro", invalido = false, className, ...props }: CampoProps) {
  return (
    <input
      className={cn(BASE, TONS[tom], invalido && "border-marca", className)}
      aria-invalid={invalido || undefined}
      {...props}
    />
  );
}

type AreaProps = { tom?: TomDoCampo; invalido?: boolean } & Omit<
  ComponentPropsWithRef<"textarea">,
  "className"
> & { className?: string };

export function AreaDeTexto({ tom = "claro", invalido = false, className, ...props }: AreaProps) {
  return (
    <textarea
      className={cn(BASE, TONS[tom], invalido && "border-marca", "min-h-22 resize-y", className)}
      aria-invalid={invalido || undefined}
      {...props}
    />
  );
}
