/**
 * Moeda sempre em BRL por extenso — nunca abreviada (mil/mi/bi) e nunca
 * com notation "compact". Preço de cardápio precisa ser lido de imediato.
 */
export function formatarBRL(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(valor);
}

/**
 * Mesmo formato de formatarBRL, separado em símbolo e número para o selo poder
 * dar tamanhos diferentes a cada parte sem montar a string na mão.
 */
export function partesDoPrecoBRL(valor: number): { simbolo: string; numero: string } {
  const partes = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).formatToParts(valor);

  const simbolo = partes.find((parte) => parte.type === "currency")?.value ?? "R$";
  const numero = partes
    .filter((parte) => parte.type !== "currency" && parte.type !== "literal")
    .map((parte) => parte.value)
    .join("");

  return { simbolo, numero };
}

/** Remove acento e caixa para comparar texto digitado com o cardápio. */
export function normalizarBusca(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}
