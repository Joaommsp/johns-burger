type Classe = string | false | null | undefined;

/** Junta classes ignorando o que for falso — o mesmo helper para todo componente. */
export function cn(...classes: Classe[]): string {
  return classes.filter(Boolean).join(" ");
}
