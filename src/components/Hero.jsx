import { useEffect, useState } from "react";
import { ArrowDown, GitBranch } from "lucide-react";
import { COLORS } from "../data/devclubData";
import useReducedMotion from "../hooks/useReducedMotion";
import heroBackground from "../assets/devclub-city.webp";

const TERMINAL_LINES = [
  { prompt: true, text: "whoami" },
  { prompt: false, text: "> desenvolvedor(a) em construção", color: COLORS.textDim },
  { prompt: true, text: "devclub instalar --carreira" },
  { loader: true },
  { prompt: false, text: "> sucesso: propósito.exe encontrado", color: COLORS.green },
];

/**
 * Eu deixo a animação do terminal isolada neste componente. Quando o
 * usuário prefere menos movimento, renderizo imediatamente o estado final.
 */
export default function Hero() {
  const reducedMotion = useReducedMotion();
  const [step, setStep] = useState(reducedMotion ? TERMINAL_LINES.length : 0);
  const [charIndex, setCharIndex] = useState(0);
  const [loaderProgress, setLoaderProgress] = useState(reducedMotion ? 100 : 0);

  useEffect(() => {
    if (reducedMotion) {
      setStep(TERMINAL_LINES.length);
      setLoaderProgress(100);
      return undefined;
    }

    if (step >= TERMINAL_LINES.length) return undefined;

    const currentLine = TERMINAL_LINES[step];

    if (currentLine.loader) {
      if (loaderProgress >= 100) {
        const timeout = window.setTimeout(() => setStep((value) => value + 1), 220);
        return () => window.clearTimeout(timeout);
      }

      const timeout = window.setTimeout(
        () => setLoaderProgress((value) => Math.min(100, value + 4)),
        18
      );
      return () => window.clearTimeout(timeout);
    }

    if (charIndex < currentLine.text.length) {
      const timeout = window.setTimeout(
        () => setCharIndex((value) => value + 1),
        currentLine.prompt ? 36 : 14
      );
      return () => window.clearTimeout(timeout);
    }

    const timeout = window.setTimeout(() => {
      setStep((value) => value + 1);
      setCharIndex(0);
    }, currentLine.prompt ? 320 : 400);

    return () => window.clearTimeout(timeout);
  }, [charIndex, loaderProgress, reducedMotion, step]);

  const visibleLines = reducedMotion
    ? TERMINAL_LINES
    : TERMINAL_LINES.slice(0, step + 1);

  return (
    <section id="topo" className="dc-hero" aria-labelledby="hero-title">
      <img
        src={heroBackground}
        alt=""
        className="dc-hero__background"
        width="1254"
        height="1254"
        fetchPriority="high"
        decoding="async"
      />
      <div className="dc-hero__overlay" aria-hidden="true" />
      <div className="dc-hero__glow" aria-hidden="true" />

      <div className="dc-hero__content">
        <div className="dc-eyebrow-pill">
          <GitBranch size={13} aria-hidden="true" />
          ramo: sua-carreira
        </div>

        <h1 id="hero-title" className="dc-hero__title">
          Você não nasce dev.
          <br />
          <span>Você compila.</span>
        </h1>

        <p className="dc-hero__description">
          DevClub é onde iniciantes desenvolvem habilidades profissionais por meio de
          formação prática, comunidade e projetos que aproximam o aprendizado do mercado.
        </p>

        <div className="dc-hero__actions">
          <a href="#formacoes" className="dc-primary-button">
            Explorar formações
            <ArrowDown size={17} aria-hidden="true" />
          </a>
          <a href="#quem-somos" className="dc-secondary-button">
            Conhecer a metodologia
          </a>
        </div>
      </div>

      <div className="dc-terminal" aria-hidden="true">
        <div className="dc-terminal__bar" aria-hidden="true">
          <span className="dc-terminal__dot dc-terminal__dot--red" />
          <span className="dc-terminal__dot dc-terminal__dot--yellow" />
          <span className="dc-terminal__dot dc-terminal__dot--green" />
          <span className="dc-terminal__name">zsh — clube de desenvolvedores</span>
        </div>

        <div className="dc-terminal__body">
          {visibleLines.map((line, index) => {
              if (line.loader) {
                const progress = reducedMotion || index < step ? 100 : loaderProgress;

                return (
                  <div key={`loader-${index}`} className="dc-terminal__loader">
                    <div className="dc-progress" aria-hidden="true">
                      <div className="dc-progress__value" style={{ width: `${progress}%` }} />
                    </div>
                    <span>{Math.floor(progress)}% — instalando confiança...</span>
                  </div>
                );
              }

              const isCurrentLine = !reducedMotion && index === step;
              const visibleText =
                isCurrentLine && line.prompt ? line.text.slice(0, charIndex) : line.text;

              return (
                <div
                  key={`${line.text}-${index}`}
                  className="dc-terminal__line"
                  style={{ color: line.prompt ? COLORS.text : line.color }}
                >
                  {line.prompt && <span className="dc-terminal__prompt">❯ </span>}
                  {visibleText}
                  {isCurrentLine && line.prompt && <span className="dc-caret" />}
                </div>
              );
          })}
        </div>
      </div>

      <p className="dc-sr-only">
        Simulação de terminal concluída: carreira instalada e propósito encontrado.
      </p>
    </section>
  );
}
