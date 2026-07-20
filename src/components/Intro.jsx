import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import useReducedMotion from "../hooks/useReducedMotion";

const SESSION_KEY = "devclub-intro";

/**
 * Eu exibo a intro apenas uma vez por sessão e respeito a preferência
 * por redução de movimento. Os refs impedem timers duplicados durante
 * o Strict Mode e garantem uma desmontagem limpa.
 */
export default function Intro({ onDone }) {
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const finishedRef = useRef(false);
  const progressTimerRef = useRef(null);
  const finishTimerRef = useRef(null);

  const bootMessage = useMemo(() => {
    if (progress < 25) return "montando ambiente de desenvolvimento...";
    if (progress < 50) return "conectando à comunidade...";
    if (progress < 75) return "resolvendo dependências de carreira...";
    return "compilando propósito...";
  }, [progress]);

  const finishIntro = useCallback(
    ({ animate = true } = {}) => {
      if (finishedRef.current) return;

      finishedRef.current = true;
      window.sessionStorage.setItem(SESSION_KEY, "true");
      document.body.classList.remove("dc-no-scroll");

      if (!animate || reducedMotion) {
        onDone();
        return;
      }

      setExiting(true);
      finishTimerRef.current = window.setTimeout(onDone, 650);
    },
    [onDone, reducedMotion]
  );

  useEffect(() => {
    const alreadyViewed = window.sessionStorage.getItem(SESSION_KEY) === "true";

    if (alreadyViewed || reducedMotion) {
      finishIntro({ animate: false });
      return undefined;
    }

    document.body.classList.add("dc-no-scroll");

    return () => {
      document.body.classList.remove("dc-no-scroll");
      window.clearTimeout(progressTimerRef.current);
      window.clearTimeout(finishTimerRef.current);
    };
  }, [finishIntro, reducedMotion]);

  useEffect(() => {
    if (finishedRef.current) return undefined;

    if (progress >= 100) {
      progressTimerRef.current = window.setTimeout(finishIntro, 320);
      return () => window.clearTimeout(progressTimerRef.current);
    }

    progressTimerRef.current = window.setTimeout(() => {
      setProgress((current) => Math.min(100, current + Math.random() * 7 + 3));
    }, 55);

    return () => window.clearTimeout(progressTimerRef.current);
  }, [finishIntro, progress]);

  return (
    <div
      className={`dc-intro ${exiting ? "is-exiting" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Carregando DevClub"
      aria-live="polite"
    >
      <div className="dc-intro__content">
        <span className="dc-intro__brand">DEVCLUB</span>
        <span className="dc-intro__message">{bootMessage}</span>

        <div
          className="dc-progress"
          role="progressbar"
          aria-label="Progresso do carregamento"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.floor(progress)}
        >
          <div className="dc-progress__value" style={{ width: `${progress}%` }} />
        </div>

        <small>{Math.floor(progress)}%</small>
      </div>

      <button type="button" onClick={() => finishIntro()} aria-label="Pular introdução">
        pular ›
      </button>
    </div>
  );
}
