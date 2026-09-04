import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/images/logo-johns-burgers.webp";
import { Container } from "@/components/ui/layout";
import { RODAPE_COLUNAS } from "@/data/navigation";
import { DESCRICAO_CURTA, HORARIO_RESUMO, RESTAURANTE } from "@/data/restaurant";

export function RodapeDoSite() {
  // Calculado no render; a rota revalida diariamente para não congelar no build.
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-marca-tinta pt-12 pb-6 text-superficie">
      <Container>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <span className="flex items-center gap-2.5 font-display text-xl tracking-[0.03em]">
              <Image src={logo} alt="" width={34} height={34} className="size-[34px] object-contain" />
              {RESTAURANTE.nome}
            </span>
            <p className="mt-3 max-w-[34ch] text-sm text-superficie/75">
              {DESCRICAO_CURTA}
            </p>
          </div>

          {RODAPE_COLUNAS.map((coluna) => (
            <div key={coluna.titulo}>
              <h4 className="mb-3.5 font-sans text-[0.78rem] font-bold uppercase tracking-[0.14em] text-destaque">
                {coluna.titulo}
              </h4>
              <ul className="grid gap-2 text-sm text-superficie/80">
                {coluna.itens.map((item) => (
                  <li key={`${coluna.titulo}-${item.rotulo}`}>
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center underline-offset-4 hover:text-superficie hover:underline"
                    >
                      {item.rotulo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-4 border-t border-superficie/20 pt-5 text-[0.78rem] text-superficie/60">
          <span>
            © {ano} {RESTAURANTE.nome} · CNPJ {RESTAURANTE.cnpj}
          </span>
          <span>{HORARIO_RESUMO}</span>
        </div>
      </Container>
    </footer>
  );
}
