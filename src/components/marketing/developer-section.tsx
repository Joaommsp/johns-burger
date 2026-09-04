import { BotaoLink } from "@/components/ui/button";
import { Secao } from "@/components/ui/layout";
import { DESENVOLVEDOR } from "@/data/developer";

/**
 * Vitrine de quem fez o site. Fundo escuro e fora do fluxo das seções da casa:
 * quem lê precisa perceber na hora que esta parte fala de outra coisa.
 */
export function VitrineDoDesenvolvedor() {
  return (
    <Secao id="template" tom="tinta">
      <div className="grid overflow-hidden rounded-bloco border-2 border-superficie/15 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="p-8 sm:p-10">
          <p className="text-miudo font-bold uppercase tracking-chapeu text-destaque">
            Este site é um modelo
          </p>
          <h2 className="mt-2.5 text-[clamp(2rem,4.2vw,3rem)]">
            Sua hamburgueria
            <br />
            merece um site
            <span className="block text-destaque">desses.</span>
          </h2>
          <p className="apoio mt-4 text-superficie/85">
            Cardápio que você mesmo atualiza, pedido caindo direto no WhatsApp e página que abre
            rápido no celular do cliente. Este aqui é um projeto de demonstração — o da sua casa
            sai com o seu nome, as suas fotos e o seu cardápio.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <BotaoLink href={DESENVOLVEDOR.portfolio} externo variante="destaque">
              Quero um site assim
            </BotaoLink>
            <BotaoLink href={`mailto:${DESENVOLVEDOR.email}`} variante="creme">
              Falar por e-mail
            </BotaoLink>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2">
            {DESENVOLVEDOR.stack.map((ferramenta) => (
              <li
                key={ferramenta}
                className="rounded-full bg-superficie/12 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-controle"
              >
                {ferramenta}
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t-2 border-dashed border-superficie/20 bg-superficie/6 p-8 sm:p-10 lg:border-l-2 lg:border-t-0">
          <h3 className="mb-3.5 font-sans text-miudo font-bold uppercase tracking-chapeu text-destaque">
            {DESENVOLVEDOR.nome} · {DESENVOLVEDOR.atuacao}
          </h3>
          <ul className="grid gap-0.5">
            {DESENVOLVEDOR.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-11 items-center justify-between gap-2.5 rounded-etiqueta px-3 text-sm transition-[background-color,transform] duration-150 ease-out hover:translate-x-1 hover:bg-superficie/12"
                >
                  {link.rotulo}
                  <span className="text-xs text-superficie/50">{link.detalhe} ↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Secao>
  );
}
