import { cn } from "@/lib/cn";
import { partesDoPrecoBRL } from "@/lib/format";

interface SeloDePrecoProps {
  valor: number;
  /** Linha curta acima do número: o que esse preço compra. */
  chamada: string;
  className?: string;
}

/**
 * Cupom recortado com o preço, para sobrepor a foto. Substitui o valor que
 * antes vinha queimado na imagem: aqui ele muda no dado, escala com a tela e
 * é lido por leitor de tela.
 */
export function SeloDePreco({ valor, chamada, className }: SeloDePrecoProps) {
  const { simbolo, numero } = partesDoPrecoBRL(valor);

  return (
    <span
      className={cn(
        "cupom inline-block rounded-aresta bg-superficie px-5 py-3 text-center text-marca shadow-[5px_5px_0_rgb(60_12_8_/_0.6)]",
        className,
      )}
    >
      <span className="block text-[0.66rem] font-bold uppercase tracking-[0.14em] text-tinta-suave">
        {chamada}
      </span>
      <span className="mt-0.5 flex items-baseline justify-center gap-[3px] font-display text-3xl leading-none tabular-nums">
        <span className="text-base">{simbolo}</span>
        {numero}
      </span>
    </span>
  );
}
