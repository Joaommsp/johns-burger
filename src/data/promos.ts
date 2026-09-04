import type { Promocao } from "@/lib/types";

export const PROMOCOES: Promocao[] = [
  {
    id: "segunda-em-dobro",
    diaDaSemana: "Segunda-feira",
    titulo: "Segunda em dobro",
    descricao: "Compre um hambúrguer da linha clássica e leve o segundo por nossa conta.",
    chamada: "2 por 1",
    regra: "O de menor valor é a cortesia",
  },
  {
    id: "terca-das-fritas",
    diaDaSemana: "Terça-feira",
    titulo: "Terça das fritas",
    descricao: "Porção G de batata rústica com o tempero da casa, pela metade do preço.",
    chamada: "50% off",
    regra: "Limite de 2 por mesa",
  },
  {
    id: "quinta-do-suco",
    diaDaSemana: "Quinta-feira",
    titulo: "Quinta do suco",
    descricao: "Na compra de uma refeição completa, o suco natural de 500 ml sai por conta da casa.",
    chamada: "Grátis",
    regra: "6 sabores disponíveis",
  },
  {
    id: "sexta-da-costela",
    diaDaSemana: "Sexta-feira",
    titulo: "Sexta da costela",
    descricao: "Big Duplo Costela com porção de batata premium, no combo com desconto.",
    chamada: "25% off",
    regra: "Após as 18:00",
  },
];
