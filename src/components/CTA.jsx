import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import useReveal from "../hooks/useReveal";
import useReducedMotion from "../hooks/useReducedMotion";
import { AREAS_INTERESSE } from "../data/devclubData";

const INITIAL_FORM = {
  nome: "",
  email: "",
  telefone: "",
  interesse: AREAS_INTERESSE[0],
};

/**
 * A trilha de marcos por que um aluno passa — não é texto genérico, é a
 * jornada que a página inteira vem contando desde o Hero ("você não
 * nasce dev, você compila"). Cada partícula de destaque carrega uma dessas
 * frases em sequência, criando uma pequena narrativa de evolução profissional.
 */
const MILESTONES = [
 
];

const CONSTELLATION_COLORS = ["#2ee6d6", "#ff2e88", "#9d4edd", "#ffd166", "#5fffa0"];

const DESKTOP_LANES = 12;
const TABLET_LANES = 8;
const MOBILE_LANES = 5;

const DESKTOP_PARTICLES = 105;
const TABLET_PARTICLES = 90;
const MOBILE_PARTICLES = 55;

const MERGE_DISTANCE = 105;
const MAX_DEVICE_PIXEL_RATIO = 2;

/**
 * Fundo da seção final: partículas ("commits") atravessam toda a seção em
 * trilhas semelhantes a branches de Git. Quando duas ficam próximas, desenho
 * uma ligação entre elas para sugerir um merge. Algumas partículas exibem
 * marcos de carreira, conectando a animação ao conteúdo da página.
 *
 * Uso canvas porque as partículas nascem, se movem e desaparecem continuamente.
 * Isso evita dezenas de elementos extras no DOM e mantém a animação leve.
 */
function CareerConstellation() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.parentElement;

    if (!canvas || !section) return undefined;

    const context = canvas.getContext("2d");
    if (!context) return undefined;

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationFrame = null;
    let particles = [];
    let spawnCounter = 0;
    let milestoneCursor = 0;
    let isVisible = true;
    let lastTimestamp = 0;

    function getConfiguration() {
      if (width <= 620) {
        return {
          lanes: MOBILE_LANES,
          maxParticles: MOBILE_PARTICLES,
          initialParticles: 34,
          spawnInterval: 24,
          mergeDistance: 82,
        };
      }

      if (width <= 1000) {
        return {
          lanes: TABLET_LANES,
          maxParticles: TABLET_PARTICLES,
          initialParticles: 56,
          spawnInterval: 18,
          mergeDistance: 94,
        };
      }

      return {
        lanes: DESKTOP_LANES,
        maxParticles: DESKTOP_PARTICLES,
        initialParticles: 82,
        spawnInterval: 21,
        mergeDistance: MERGE_DISTANCE,
      };
    }

    function laneCenterX(lane, lanes) {
      return ((lane + 0.5) / lanes) * width;
    }

    function resizeCanvas() {
      const sectionRect = section.getBoundingClientRect();

      width = Math.max(1, Math.floor(sectionRect.width));
      height = Math.max(1, Math.floor(sectionRect.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);

      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function createParticle({ distributed = false } = {}) {
      const configuration = getConfiguration();

      if (particles.length >= configuration.maxParticles) return;

      const lane = Math.floor(Math.random() * configuration.lanes);
      const isMilestone = Math.random() < 0.1;
      const horizontalVariation = Math.min(72, width * 0.06);

      particles.push({
        x:
          laneCenterX(lane, configuration.lanes) +
          (Math.random() - 0.5) * horizontalVariation,
        y: distributed ? Math.random() * height : height + 20 + Math.random() * 45,
        speed: 0.12 + Math.random() * 0.18,
        drift: (Math.random() - 0.5) * 0.16,
        size: isMilestone ? 3.4 : 1.4 + Math.random() * 1.5,
        color: CONSTELLATION_COLORS[Math.floor(Math.random() * CONSTELLATION_COLORS.length)],
        label: isMilestone ? MILESTONES[milestoneCursor % MILESTONES.length] : null,
      });

      if (isMilestone) milestoneCursor += 1;
    }

    function seedParticles() {
      const configuration = getConfiguration();
      particles = [];

      for (let index = 0; index < configuration.initialParticles; index += 1) {
        createParticle({ distributed: true });
      }
    }

    function getLabelOpacity(y) {
      const fadeDistance = 90;
      const opacityFromBottom = Math.min(1, Math.max(0, (height - y) / fadeDistance));
      const opacityFromTop = Math.min(1, Math.max(0, y / fadeDistance));

      return Math.min(opacityFromBottom, opacityFromTop);
    }

    function drawConnections() {
      const { mergeDistance } = getConfiguration();
      context.lineWidth = 1;

      for (let firstIndex = 0; firstIndex < particles.length; firstIndex += 1) {
        for (
          let secondIndex = firstIndex + 1;
          secondIndex < particles.length;
          secondIndex += 1
        ) {
          const firstParticle = particles[firstIndex];
          const secondParticle = particles[secondIndex];
          const distanceX = firstParticle.x - secondParticle.x;
          const distanceY = firstParticle.y - secondParticle.y;
          const distance = Math.hypot(distanceX, distanceY);

          if (distance >= mergeDistance) continue;

          const opacity = (1 - distance / mergeDistance) * 0.18;
          const alpha = Math.round(opacity * 255)
            .toString(16)
            .padStart(2, "0");

          context.strokeStyle = `${firstParticle.color}${alpha}`;
          context.beginPath();
          context.moveTo(firstParticle.x, firstParticle.y);
          context.lineTo(secondParticle.x, secondParticle.y);
          context.stroke();
        }
      }
    }

    function drawParticles(frameScale = 1) {
      particles.forEach((particle) => {
        particle.y -= particle.speed * frameScale;
        particle.x += particle.drift * frameScale;

        if (particle.x < -30) particle.x = width + 30;
        if (particle.x > width + 30) particle.x = -30;

        context.beginPath();
        context.fillStyle = particle.color;
        context.shadowColor = particle.color;
        context.shadowBlur = particle.label ? 14 : 6;
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;

        if (!particle.label) return;

        const opacity = getLabelOpacity(particle.y) * 0.82;
        if (opacity <= 0.02) return;

        context.fillStyle = `rgba(200, 211, 245, ${opacity})`;
        context.font = "11px 'JetBrains Mono', monospace";
        context.textAlign = "center";
        context.fillText(particle.label, particle.x, particle.y - 14);
      });
    }

    function renderScene({ moveParticles = true, frameScale = 1 } = {}) {
      context.clearRect(0, 0, width, height);
      drawConnections();
      drawParticles(moveParticles ? frameScale : 0);
    }

    function drawFrame(timestamp) {
      if (!isVisible) {
        animationFrame = null;
        lastTimestamp = 0;
        return;
      }

      const configuration = getConfiguration();
      const elapsed = lastTimestamp ? timestamp - lastTimestamp : 16.67;
      const frameScale = Math.min(elapsed / 16.67, 2);
      lastTimestamp = timestamp;

      spawnCounter += frameScale;

      if (spawnCounter >= configuration.spawnInterval) {
        spawnCounter = 0;
        createParticle();
      }

      renderScene({ frameScale });
      particles = particles.filter((particle) => particle.y > -60);

      animationFrame = window.requestAnimationFrame(drawFrame);
    }

    function startAnimation() {
      if (reducedMotion || animationFrame || !isVisible) return;
      animationFrame = window.requestAnimationFrame(drawFrame);
    }

    function stopAnimation() {
      if (!animationFrame) return;
      window.cancelAnimationFrame(animationFrame);
      animationFrame = null;
      lastTimestamp = 0;
    }

    function handleResize() {
      resizeCanvas();
      seedParticles();
      renderScene({ moveParticles: false });
    }

    resizeCanvas();
    seedParticles();
    renderScene({ moveParticles: false });

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(section);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (reducedMotion) {
          stopAnimation();
          renderScene({ moveParticles: false });
          return;
        }

        if (isVisible) startAnimation();
        else stopAnimation();
      },
      { rootMargin: "160px 0px" },
    );

    visibilityObserver.observe(section);

    if (!reducedMotion) startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [reducedMotion]);

  return <canvas ref={canvasRef} className="dc-cta-constellation" aria-hidden="true" />;
}

/**
 * Este formulário é propositalmente local. Eu deixo a limitação explícita
 * porque um protótipo profissional não deve fingir integração com backend.
 */
export default function CTA() {
  const [sectionRef, visible] = useReveal();
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const formId = useId();

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));

    if (feedback.text) {
      setFeedback({ type: "", text: "" });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedName = formData.nome.trim();
    const normalizedEmail = formData.email.trim();

    if (!normalizedName || !normalizedEmail) {
      setFeedback({
        type: "error",
        text: "Preencha seu nome e e-mail para continuar.",
      });
      return;
    }

    setFeedback({
      type: "success",
      text: `Interesse registrado para demonstração. Obrigado, ${normalizedName}!`,
    });
    setFormData(INITIAL_FORM);
  }

  return (
    <section
      id="cta"
      ref={sectionRef}
      className="dc-cta-section"
      aria-labelledby="cta-title"
    >
      <div className="dc-cta-glow" aria-hidden="true" />
      <CareerConstellation />

      <div className={`dc-cta-content dc-reveal ${visible ? "is-visible" : ""}`}>
        <div className="dc-cta-copy">
          <h2 id="cta-title">$ git clone sua-nova-carreira</h2>
          <p>
            Preencha os dados para demonstrar como funcionaria uma área de captação de interesse.
          </p>

          <a className="dc-primary-button" href={`#${formId}-nome`}>
            Quero fazer parte
            <ArrowRight size={18} aria-hidden="true" />
          </a>

          <div className="dc-benefits" aria-label="Benefícios da formação">
            {["aprendizado prático", "comunidade ativa", "foco em projetos"].map((item) => (
              <span key={item}>
                <CheckCircle2 size={13} aria-hidden="true" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <form className="dc-form" onSubmit={handleSubmit} noValidate>
          <h3>manifest.json</h3>

          <label htmlFor={`${formId}-nome`}>
            Nome
            <input
              id={`${formId}-nome`}
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              autoComplete="name"
              required
            />
          </label>

          <label htmlFor={`${formId}-email`}>
            E-mail
            <input
              id={`${formId}-email`}
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
            />
          </label>

          <label htmlFor={`${formId}-telefone`}>
            Telefone
            <input
              id={`${formId}-telefone`}
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              autoComplete="tel"
              inputMode="tel"
            />
          </label>

          <label htmlFor={`${formId}-interesse`}>
            Área de interesse
            <select
              id={`${formId}-interesse`}
              name="interesse"
              value={formData.interesse}
              onChange={handleChange}
            >
              {AREAS_INTERESSE.map((area) => (
                <option key={area} value={area}>
                  {area}
                </option>
              ))}
            </select>
          </label>

          <button type="submit" className="dc-submit-button">
            Enviar interesse
            <Send size={16} aria-hidden="true" />
          </button>

          {feedback.text && (
            <p className={`dc-form-message is-${feedback.type}`} role="status">
              {feedback.text}
            </p>
          )}

          <small>Formulário demonstrativo. Nenhum dado é enviado para um servidor.</small>
        </form>
      </div>
    </section>
  );
}
