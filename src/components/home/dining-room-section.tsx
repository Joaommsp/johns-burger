import Image from "next/image";
import { Secao } from "@/components/ui/layout";
import { Chapeu, TextoDeApoio } from "@/components/ui/section-heading";
import { Tag } from "@/components/ui/tag";
import { AMBIENTES } from "@/data/gallery";

export function OSalao() {
  return (
    <Secao id="salao" tom="superficie">
      <div className="mb-10 grid items-start gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div>
          <Chapeu>O salão</Chapeu>
          <h2 className="mt-2.5 text-[clamp(2.2rem,5vw,3.6rem)] text-tinta">
            Relaxe e
            <br />
            fique um pouco
          </h2>
        </div>
        <TextoDeApoio>
          Mesas grandes para dividir, cadeirinha para as crianças e uma fila que anda. Você pede no
          balcão ou pelo QR code da mesa — o que for mais rápido para você.
        </TextoDeApoio>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {AMBIENTES.map((ambiente) => (
          <figure
            key={ambiente.etiqueta}
            className="relative m-0 overflow-hidden rounded-bloco shadow-bloco-sm"
          >
            <Image
              src={ambiente.imagem}
              alt={ambiente.alt}
              sizes="(max-width: 640px) 90vw, 360px"
              className="h-[230px] w-full object-cover"
            />
            <figcaption className="absolute bottom-3 left-3">
              <Tag className="-rotate-2">{ambiente.etiqueta}</Tag>
            </figcaption>
          </figure>
        ))}
      </div>
    </Secao>
  );
}
