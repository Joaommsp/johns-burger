"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const ESPACAMENTO = 26;
const RAIO_BASE = 1.6;
const RAIO_MAXIMO = 3.4;
/** Distância em que o cursor ainda mexe com o ponto. */
const ALCANCE = 130;
const DESLOCAMENTO_MAXIMO = 10;

interface Ponto {
  x: number;
  y: number;
}

/**
 * Grade de pontos que reage ao cursor. Canvas próprio em vez de biblioteca:
 * são poucas linhas de matemática de distância, e assim a cor sai dos tokens
 * da casa sem carregar um motor de partículas inteiro.
 *
 * Desliga sozinho onde não faz sentido: sem ponteiro fino (toque) não há
 * cursor para seguir, e quem pediu menos movimento não vê animação alguma.
 */
export function FundoInterativo({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const elemento = canvas.current;
    if (!elemento) {
      return;
    }

    const semPonteiro = !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const menosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (semPonteiro || menosMovimento) {
      return;
    }

    const contexto = elemento.getContext("2d");
    if (!contexto) {
      return;
    }

    let pontos: Ponto[] = [];
    let largura = 0;
    let altura = 0;
    let quadro = 0;
    const cursor = { x: -9999, y: -9999 };

    function medir() {
      const caixa = elemento!.getBoundingClientRect();
      const escala = window.devicePixelRatio || 1;

      largura = caixa.width;
      altura = caixa.height;
      elemento!.width = Math.floor(largura * escala);
      elemento!.height = Math.floor(altura * escala);
      contexto!.setTransform(escala, 0, 0, escala, 0, 0);

      pontos = [];
      for (let x = ESPACAMENTO / 2; x < largura; x += ESPACAMENTO) {
        for (let y = ESPACAMENTO / 2; y < altura; y += ESPACAMENTO) {
          pontos.push({ x, y });
        }
      }
    }

    function desenhar() {
      contexto!.clearRect(0, 0, largura, altura);

      for (const ponto of pontos) {
        const dx = ponto.x - cursor.x;
        const dy = ponto.y - cursor.y;
        const distancia = Math.hypot(dx, dy);
        const forca = distancia < ALCANCE ? 1 - distancia / ALCANCE : 0;

        const raio = RAIO_BASE + (RAIO_MAXIMO - RAIO_BASE) * forca;
        const empurrao = DESLOCAMENTO_MAXIMO * forca;
        const anguloX = distancia > 0 ? (dx / distancia) * empurrao : 0;
        const anguloY = distancia > 0 ? (dy / distancia) * empurrao : 0;

        contexto!.globalAlpha = 0.16 + 0.5 * forca;
        contexto!.beginPath();
        contexto!.arc(ponto.x + anguloX, ponto.y + anguloY, raio, 0, Math.PI * 2);
        contexto!.fill();
      }

      quadro = 0;
    }

    function agendar() {
      if (!quadro) {
        quadro = window.requestAnimationFrame(desenhar);
      }
    }

    function aoMover(evento: PointerEvent) {
      const caixa = elemento!.getBoundingClientRect();
      cursor.x = evento.clientX - caixa.left;
      cursor.y = evento.clientY - caixa.top;
      agendar();
    }

    function aoSair() {
      cursor.x = -9999;
      cursor.y = -9999;
      agendar();
    }

    // Creme da identidade: o fundo continua sendo o vermelho da marca.
    contexto.fillStyle =
      getComputedStyle(elemento).getPropertyValue("--color-superficie").trim() || "#f5e9d7";

    const observador = new ResizeObserver(() => {
      medir();
      agendar();
    });
    observador.observe(elemento);

    medir();
    agendar();

    window.addEventListener("pointermove", aoMover, { passive: true });
    document.addEventListener("pointerleave", aoSair);

    return () => {
      observador.disconnect();
      window.removeEventListener("pointermove", aoMover);
      document.removeEventListener("pointerleave", aoSair);
      if (quadro) {
        window.cancelAnimationFrame(quadro);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={cn("pointer-events-none size-full", className)}
    />
  );
}
