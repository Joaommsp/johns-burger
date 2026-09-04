import type { StaticImageData } from "next/image";
import mesas from "@/assets/images/restaurant-img-02.png";
import areaExterna from "@/assets/images/restaurant-img-03.png";
import menuKids from "@/assets/images/cardapio/burger-kids.webp";

export interface Ambiente {
  imagem: StaticImageData;
  alt: string;
  etiqueta: string;
}

export const AMBIENTES: Ambiente[] = [
  { imagem: mesas, alt: "Mesas grandes do salão", etiqueta: "Mesa para a família" },
  { imagem: areaExterna, alt: "Área externa do restaurante", etiqueta: "Área externa" },
  { imagem: menuKids, alt: "Prato do menu kids na mesa do salão", etiqueta: "Menu kids" },
];
