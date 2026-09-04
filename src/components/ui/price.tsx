import { cn } from "@/lib/cn";
import { formatarBRL } from "@/lib/format";

interface PrecoProps {
  valor: number;
  className?: string;
}

/** Preço sempre em BRL completo, com dígitos tabulares para alinhar em coluna. */
export function Preco({ valor, className }: PrecoProps) {
  return <span className={cn("font-display tabular-nums text-marca", className)}>{formatarBRL(valor)}</span>;
}
