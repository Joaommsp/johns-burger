/** Quem fez o site — a vitrine no fim da página sai daqui. */
export const DESENVOLVEDOR = {
  nome: "João Marcos",
  atuacao: "Frontend & UI/UX",
  email: "jmmsp2003@hotmail.com",
  stack: ["React", "Next.js", "TypeScript", "UI/UX"],
  /** Destino do CTA principal — nomeado, para não depender da ordem da lista. */
  portfolio: "https://softwaredeveloper-jmmsp.vercel.app/",
  links: [
    { rotulo: "Portfólio", detalhe: "vercel.app", href: "https://softwaredeveloper-jmmsp.vercel.app/" },
    { rotulo: "GitHub", detalhe: "@Joaommsp", href: "https://github.com/Joaommsp" },
    { rotulo: "LinkedIn", detalhe: "joaomarcos10oficial", href: "https://www.linkedin.com/in/joaomarcos10oficial/" },
    { rotulo: "Behance", detalhe: "joaomarcos10oficial", href: "https://behance.net/joaomarcos10oficial" },
    { rotulo: "Figma", detalhe: "@joaomarcos19", href: "https://figma.com/@joaomarcos19" },
    { rotulo: "Instagram", detalhe: "@joao.mmsp", href: "https://instagram.com/joao.mmsp" },
  ],
} as const;
