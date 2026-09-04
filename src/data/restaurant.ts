/** Fonte única dos dados da casa — nada de telefone ou endereço solto no JSX. */
export const RESTAURANTE = {
  nome: "John's Burgers",
  fundadoEm: 2019,
  endereco: {
    logradouro: "Rua das Palmeiras, 401",
    bairro: "Vila Mariana",
    cidade: "São Paulo",
    uf: "SP",
  },
  telefone: "(11) 4002-8922",
  /** Mesmo número em E.164 — origem dos links tel: e wa.me. */
  telefoneE164: "+551140028922",
  email: "contato@johnsburgers.com.br",
  instagram: "@johnsburgers",
  cnpj: "00.000.000/0001-00",
  horario: {
    /** 0 = domingo. A casa abre todos os dias, inclusive na segunda da promoção. */
    diasAbertos: [0, 1, 2, 3, 4, 5, 6],
    abreEm: 11,
    fechaEm: 23,
  },
  entrega: {
    tempoMedioMinutos: 32,
    raioKm: 5,
  },
  /**
   * Números de exibição do projeto — NÃO são fonte verificada. Por isso não
   * entram no JSON-LD como aggregateRating: nota inventada em rich results
   * viola a política do Google. Ao ligar o Google Business Profile, trocar por
   * dado real e só então marcar.
   */
  reputacao: {
    nota: "4,9",
    avaliacoes: 1240,
    plataforma: "Google",
  },
  salao: {
    lugares: 60,
  },
  links: {
    ifood: "https://www.ifood.com.br",
    instagram: "https://instagram.com/johnsburgers",
  },
} as const;

/** Uma promessa, um lugar: hero e metadata leem a mesma frase. */
export const PROMESSA_DA_CASA =
  "Blend de 180 g moído na casa toda manhã, selado a 250 °C em chapa de ferro e fechado no pão brioche assado no mesmo dia.";

function horaCheia(hora: number): string {
  return `${String(hora).padStart(2, "0")}:00`;
}

export const HORARIO_ABERTURA = horaCheia(RESTAURANTE.horario.abreEm);

export const HORARIO_FECHAMENTO = horaCheia(RESTAURANTE.horario.fechaEm);

export const TODOS_OS_DIAS = RESTAURANTE.horario.diasAbertos.length === 7;

export const HORARIO_RESUMO = `${TODOS_OS_DIAS ? "Todos os dias" : "Confira os dias"}, ${HORARIO_ABERTURA} às ${HORARIO_FECHAMENTO}`;

export const DESCRICAO_CURTA = `Hambúrguer artesanal de bairro, moído e grelhado no mesmo dia. ${RESTAURANTE.endereco.bairro}, ${RESTAURANTE.endereco.cidade}.`;

export const ENDERECO_COMPLETO = `${RESTAURANTE.endereco.logradouro} — ${RESTAURANTE.endereco.bairro}, ${RESTAURANTE.endereco.cidade}`;

export const LINK_TELEFONE = `tel:${RESTAURANTE.telefoneE164}`;

export const LINK_WHATSAPP = `https://wa.me/${RESTAURANTE.telefoneE164.replace("+", "")}`;

/** Monta o link do WhatsApp já com a mensagem digitada pelo cliente. */
export function linkWhatsAppCom(mensagem: string): string {
  return `${LINK_WHATSAPP}?text=${encodeURIComponent(mensagem)}`;
}

/**
 * Calculado no render, não no import: a página é pré-renderizada e um valor
 * congelado no build passaria a mentir depois da virada do ano.
 */
export function anosDeCasa(hoje: Date = new Date()): number {
  return hoje.getFullYear() - RESTAURANTE.fundadoEm;
}

/** Aberto de verdade segundo o horário da casa — nunca uma afirmação fixa. */
export function estaAberto(agora: Date = new Date()): boolean {
  const { diasAbertos, abreEm, fechaEm } = RESTAURANTE.horario;
  const dia = agora.getDay();

  if (!diasAbertos.some((aberto) => aberto === dia)) {
    return false;
  }

  const hora = agora.getHours() + agora.getMinutes() / 60;
  return hora >= abreEm && hora < fechaEm;
}

/** Diferenciais que rodam na faixa animada da home. */
export const SELOS_DA_CASA = [
  "Carne moída na casa",
  "Pão do dia",
  "Batata frita na hora",
  `Entrega em ${RESTAURANTE.entrega.tempoMedioMinutos} min`,
  "Sem conservante",
  "Chapa de ferro",
] as const;

export const PASSOS_DO_PEDIDO = [
  {
    titulo: "Sem cadastro, sem app.",
    texto: "Escolha os itens e mande a lista.",
  },
  {
    titulo: "Pix, cartão na entrega ou dinheiro.",
    texto: "Confirmamos o valor e o tempo.",
  },
  {
    titulo: `Média de ${RESTAURANTE.entrega.tempoMedioMinutos} minutos no raio de ${RESTAURANTE.entrega.raioKm} km.`,
    texto: "Saiu da chapa, saiu para entrega.",
  },
] as const;

/** Provas de reputação da seção "quem faz" — valor calculado no render. */
export const PROVAS_DA_CASA = [
  { valor: () => String(anosDeCasa()), unidade: "", rotulo: "anos de casa" },
  {
    valor: () => RESTAURANTE.reputacao.nota,
    unidade: "",
    rotulo: `no ${RESTAURANTE.reputacao.plataforma} · ${RESTAURANTE.reputacao.avaliacoes.toLocaleString("pt-BR")} avaliações`,
  },
  {
    valor: () => String(RESTAURANTE.entrega.tempoMedioMinutos),
    unidade: " min",
    rotulo: "entrega média",
  },
] as const;
