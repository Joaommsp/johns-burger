import type { MetadataRoute } from "next";
import { RESTAURANTE } from "@/data/restaurant";
import { DESCRICAO_PADRAO } from "@/data/seo";
import { COR_MARCA, COR_MARCA_TINTA } from "@/lib/theme";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${RESTAURANTE.nome} — Hambúrguer artesanal`,
    short_name: RESTAURANTE.nome,
    description: DESCRICAO_PADRAO,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: COR_MARCA_TINTA,
    theme_color: COR_MARCA,
    icons: [
      { src: "/icons/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      {
        src: "/icons/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
