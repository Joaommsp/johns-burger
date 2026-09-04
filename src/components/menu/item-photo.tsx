import Image from "next/image";
import { cn } from "@/lib/cn";
import type { ItemCardapio } from "@/lib/types";

type Formato = "card" | "linha";

const MOLDURA: Record<Formato, string> = {
  card: "aspect-[4/3] w-full",
  linha: "size-16 shrink-0",
};

/**
 * Respiro interno do recorte. Sem ele a foto encosta na borda, e um produto
 * alto (duplo, triplo) chega a ser cortado pelo overflow da moldura.
 */
const FOLGA_DO_RECORTE: Record<Formato, string> = {
  card: "p-4",
  linha: "p-1",
};

const TAMANHO_RENDERIZADO: Record<Formato, string> = {
  card: "(max-width: 640px) 90vw, 280px",
  linha: "64px",
};

/**
 * Uma regra só para as duas formas de foto do catálogo: recorte flutua sobre a
 * superfície, ambiente preenche a moldura. Card e linha consomem daqui para a
 * decisão não se repetir — e não divergir — em dois lugares.
 */
export function FotoDoItem({
  item,
  formato,
  className,
}: {
  item: ItemCardapio;
  formato: Formato;
  className?: string;
}) {
  const recorte = item.enquadramento === "recorte";

  return (
    <div
      className={cn(
        "overflow-hidden rounded-etiqueta",
        MOLDURA[formato],
        recorte ? cn("grid place-items-center bg-superficie-borda", FOLGA_DO_RECORTE[formato]) : "",
        className,
      )}
    >
      <Image
        src={item.imagem}
        // Decorativa nos dois formatos: o nome do item é sempre o texto ao lado.
        alt=""
        sizes={TAMANHO_RENDERIZADO[formato]}
        className={
          recorte
            ? cn(
                // Limita altura E largura: dimensionar só pela largura deixava
                // o produto mais alto estourar a moldura e ser cortado.
                "max-h-full w-auto -rotate-2 object-contain drop-shadow-prato",
                formato === "card" ? "max-w-[82%]" : "max-w-[92%]",
              )
            : "size-full object-cover"
        }
      />
    </div>
  );
}
