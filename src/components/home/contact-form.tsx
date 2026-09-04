"use client";

import { useId, useRef, useState } from "react";
import { Botao } from "@/components/ui/button";
import { AreaDeTexto, CampoDeTexto } from "@/components/ui/input";
import { IconeWhatsApp } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { linkWhatsAppCom, RESTAURANTE } from "@/data/restaurant";

const LIMITE_MENSAGEM = 600;
const AVISO_CONTADOR = 80;

type CampoDoFormulario = "nome" | "email" | "mensagem";
type Situacao = "parado" | "enviado";

type Erros = Partial<Record<CampoDoFormulario | "envio", string>>;

const CAMPOS_VAZIOS: Record<CampoDoFormulario, string> = { nome: "", email: "", mensagem: "" };

const ORDEM_DOS_CAMPOS: CampoDoFormulario[] = ["nome", "email", "mensagem"];

export function FormularioDeContato() {
  const idFormulario = useId();
  const [campos, setCampos] = useState(CAMPOS_VAZIOS);
  const [erros, setErros] = useState<Erros>({});
  const [situacao, setSituacao] = useState<Situacao>("parado");
  const referencias = useRef<Partial<Record<CampoDoFormulario, HTMLElement | null>>>({});

  const restantes = LIMITE_MENSAGEM - campos.mensagem.length;

  function mudar(campo: CampoDoFormulario, valor: string) {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
    // Erro sai assim que o cliente mexe no campo — não fica vermelho enquanto corrige.
    setErros((atual) => (atual[campo] ? { ...atual, [campo]: undefined } : atual));
    setSituacao("parado");
  }

  function validar(): Erros {
    const encontrados: Erros = {};

    if (!campos.nome.trim()) {
      encontrados.nome = "Informe como podemos te chamar.";
    }
    if (!campos.email.trim()) {
      encontrados.email = "Informe um e-mail para retorno.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(campos.email.trim())) {
      encontrados.email = "Esse e-mail não parece completo — confira o @ e o domínio.";
    }
    if (!campos.mensagem.trim()) {
      encontrados.mensagem = "Escreva o que você precisa para a gente responder certo.";
    }

    return encontrados;
  }

  function enviar() {
    const encontrados = validar();
    setErros(encontrados);

    const primeiroInvalido = ORDEM_DOS_CAMPOS.find((campo) => encontrados[campo]);
    if (primeiroInvalido) {
      referencias.current[primeiroInvalido]?.focus();
      return;
    }

    const texto = `Olá! Sou ${campos.nome.trim()} (${campos.email.trim()}).\n\n${campos.mensagem.trim()}`;
    const janela = window.open(linkWhatsAppCom(texto), "_blank", "noopener,noreferrer");

    if (!janela) {
      setErros({
        envio: `O navegador bloqueou a janela do WhatsApp. Libere os pop-ups deste site ou fale direto no ${RESTAURANTE.telefone}.`,
      });
      return;
    }

    setCampos(CAMPOS_VAZIOS);
    setSituacao("enviado");
  }

  return (
    <form
      className="mt-7"
      noValidate
      onSubmit={(evento) => {
        evento.preventDefault();
        enviar();
      }}
    >
      <Campo
        id={`${idFormulario}-nome`}
        rotulo="Nome"
        erro={erros.nome}
        valor={campos.nome}
        aoMudar={(valor) => mudar("nome", valor)}
        placeholder="Como podemos te chamar"
        autoComplete="name"
        referencia={(elemento) => {
          referencias.current.nome = elemento;
        }}
      />

      <Campo
        id={`${idFormulario}-email`}
        rotulo="E-mail"
        tipo="email"
        erro={erros.email}
        valor={campos.email}
        aoMudar={(valor) => mudar("email", valor)}
        placeholder="voce@email.com"
        autoComplete="email"
        referencia={(elemento) => {
          referencias.current.email = elemento;
        }}
      />

      <Campo
        id={`${idFormulario}-mensagem`}
        rotulo="Mensagem"
        multilinha
        maxLength={LIMITE_MENSAGEM}
        erro={erros.mensagem}
        valor={campos.mensagem}
        aoMudar={(valor) => mudar("mensagem", valor)}
        placeholder="Conte o que você precisa"
        referencia={(elemento) => {
          referencias.current.mensagem = elemento;
        }}
        auxiliar={
          restantes <= AVISO_CONTADOR ? (
            <span className={restantes === 0 ? "text-marca" : "text-tinta-suave"}>
              {restantes} {restantes === 1 ? "caractere restante" : "caracteres restantes"}
            </span>
          ) : null
        }
      />

      <Botao type="submit" variante="primaria">
        <IconeWhatsApp />
        Abrir no WhatsApp
      </Botao>

      {erros.envio ? (
        <p role="alert" className="mt-4 leitura animate-surgir text-sm font-semibold text-marca">
          {erros.envio}
        </p>
      ) : null}

      {situacao === "enviado" && !erros.envio ? (
        <p role="status" className="mt-4 leitura animate-surgir text-sm font-semibold text-positivo">
          Mensagem montada e aberta no WhatsApp. É só apertar enviar por lá.
        </p>
      ) : null}
    </form>
  );
}

interface CampoProps {
  id: string;
  rotulo: string;
  valor: string;
  aoMudar: (valor: string) => void;
  referencia: (elemento: HTMLInputElement | HTMLTextAreaElement | null) => void;
  erro?: string;
  tipo?: string;
  multilinha?: boolean;
  placeholder?: string;
  maxLength?: number;
  autoComplete?: string;
  auxiliar?: React.ReactNode;
}

function Campo({
  id,
  rotulo,
  valor,
  aoMudar,
  referencia,
  erro,
  tipo = "text",
  multilinha = false,
  placeholder,
  maxLength,
  autoComplete,
  auxiliar,
}: CampoProps) {
  const idErro = `${id}-erro`;
  const comuns = {
    id,
    value: valor,
    placeholder,
    invalido: Boolean(erro),
    "aria-describedby": erro ? idErro : undefined,
  };

  return (
    <div className="mb-4 flex flex-col gap-1.5">
      <label htmlFor={id} className="text-miudo font-bold uppercase tracking-rotulo text-tinta-suave">
        {rotulo}
      </label>

      {multilinha ? (
        <AreaDeTexto
          {...comuns}
          ref={referencia}
          maxLength={maxLength}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
      ) : (
        <CampoDeTexto
          {...comuns}
          ref={referencia}
          type={tipo}
          autoComplete={autoComplete}
          onChange={(evento) => aoMudar(evento.target.value)}
        />
      )}

      {erro ? (
        <p id={idErro} className={cn("text-[0.78rem] font-semibold text-marca")}>
          {erro}
        </p>
      ) : (
        auxiliar && <p className="text-[0.78rem]">{auxiliar}</p>
      )}
    </div>
  );
}
