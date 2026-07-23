import { useEffect, useRef } from "react";
import {
  FaCss3Alt,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaReact,
} from "react-icons/fa";
import {
  SiJavascript,
  SiPostgresql,
  SiTypescript,
  SiVite,
} from "react-icons/si";
import { Braces } from "lucide-react";
import useReveal from "../hooks/useReveal";
import useReducedMotion from "../hooks/useReducedMotion";
import { TECNOLOGIAS } from "../data/devclubData";

const TECHNOLOGY_ICONS = {
  html: FaHtml5,
  css: FaCss3Alt,
  javascript: SiJavascript,
  react: FaReact,
  typescript: SiTypescript,
  node: FaNodeJs,
  postgresql: SiPostgresql,
  "react-native": FaReact,
  python: FaPython,
  git: FaGitAlt,
  github: FaGithub,
  vite: SiVite,
};

const ICON_ORDER = [
  "html",
  "css",
  "javascript",
  "react",
  "typescript",
  "node",
  "postgresql",
  "python",
  "git",
  "github",
  "vite",
];

const TECHNOLOGY_BY_ID = Object.fromEntries(
  TECNOLOGIAS.map((technology) => [technology.id, technology]),
);

function seededRandom(seed) {
  let state = seed;

  return () => {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;

    let value = Math.imul(state ^ (state >>> 15), 1 | state);
    value =
      (value + Math.imul(value ^ (value >>> 7), 61 | value)) ^ value;

    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTechnologyParticles() {
  const random = seededRandom(2026);

  return Array.from({ length: 64 }, (_, index) => {
    const id = ICON_ORDER[index % ICON_ORDER.length];
    const technology = TECHNOLOGY_BY_ID[id];

    return {
      key: `technology-particle-${index}`,
      id,
      color: technology?.cor ?? "#2ee6d6",
      x: 0.03 + random() * 0.94,
      y: random(),
      speed: 0.018 + random() * 0.018,
      drift: (random() - 0.5) * 0.012,
      size: 20 + Math.round(random() * 14),
      opacity: 0.28 + random() * 0.26,
      rotation: -16 + random() * 32,
      rotationSpeed: (random() - 0.5) * 9,
      respawnShift: 0.17 + random() * 0.56,
    };
  });
}

const TECHNOLOGY_PARTICLES = buildTechnologyParticles();

function getResponsiveConfiguration(width) {
  if (width <= 620) {
    return {
      count: 24,
      connectionDistance: 105,
      sizeMultiplier: 0.78,
      speedMultiplier: 0.78,
      lineOpacity: 0.7,
    };
  }

  if (width <= 1000) {
    return {
      count: 40,
      connectionDistance: 120,
      sizeMultiplier: 0.9,
      speedMultiplier: 0.9,
      lineOpacity: 0.82,
    };
  }

  return {
    count: TECHNOLOGY_PARTICLES.length,
    connectionDistance: 145,
    sizeMultiplier: 1,
    speedMultiplier: 1,
    lineOpacity: 1,
  };
}

function hexToRgb(color) {
  if (typeof color !== "string" || !color.startsWith("#")) {
    return { red: 46, green: 230, blue: 214 };
  }

  const normalized =
    color.length === 4
      ? color
          .slice(1)
          .split("")
          .map((character) => character + character)
          .join("")
      : color.slice(1, 7);

  const value = Number.parseInt(normalized, 16);

  if (Number.isNaN(value)) {
    return { red: 46, green: 230, blue: 214 };
  }

  return {
    red: (value >> 16) & 255,
    green: (value >> 8) & 255,
    blue: value & 255,
  };
}

function TechnologyConstellation({ reducedMotion }) {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(null);
  const iconRefs = useRef([]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;

    if (!wrapper || !canvas) {
      return undefined;
    }

    const context = canvas.getContext("2d");

    if (!context) {
      return undefined;
    }

    const particles = TECHNOLOGY_PARTICLES.map((particle) => ({
      ...particle,
    }));

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let animationFrame = null;
    let lastTimestamp = performance.now();
    let isVisible = true;
    let configuration = getResponsiveConfiguration(width);

    function resizeCanvas() {
      const bounds = wrapper.getBoundingClientRect();

      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      configuration = getResponsiveConfiguration(width);

      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function positionIcons(deltaSeconds = 0) {
      const activeParticles = [];

      particles.forEach((particle, index) => {
        const icon = iconRefs.current[index];

        if (!icon) {
          return;
        }

        const isActive = index < configuration.count;
        icon.hidden = !isActive;

        if (!isActive) {
          return;
        }

        if (!reducedMotion && deltaSeconds > 0) {
          particle.y -=
            particle.speed *
            deltaSeconds *
            configuration.speedMultiplier;

          particle.x +=
            particle.drift *
            deltaSeconds *
            configuration.speedMultiplier;

          particle.rotation +=
            particle.rotationSpeed *
            deltaSeconds *
            configuration.speedMultiplier;

          if (particle.y < -0.08) {
            particle.y = 1.08;
            particle.x =
              (particle.x + particle.respawnShift) % 1;
          }

          if (particle.x < -0.08) {
            particle.x = 1.08;
          } else if (particle.x > 1.08) {
            particle.x = -0.08;
          }
        }

        const renderedSize =
          particle.size * configuration.sizeMultiplier;

        const x = particle.x * width;
        const y = particle.y * height;

        icon.style.width = `${renderedSize}px`;
        icon.style.height = `${renderedSize}px`;
        icon.style.opacity = String(particle.opacity);
        icon.style.transform = `translate3d(${
          x - renderedSize / 2
        }px, ${y - renderedSize / 2}px, 0) rotate(${
          particle.rotation
        }deg)`;

        activeParticles.push({
          ...particle,
          xInPixels: x,
          yInPixels: y,
        });
      });

      return activeParticles;
    }

    function drawConnections(activeParticles) {
      context.clearRect(0, 0, width, height);
      context.lineWidth = 0.85;
      context.globalCompositeOperation = "lighter";

      for (
        let firstIndex = 0;
        firstIndex < activeParticles.length;
        firstIndex += 1
      ) {
        for (
          let secondIndex = firstIndex + 1;
          secondIndex < activeParticles.length;
          secondIndex += 1
        ) {
          const firstParticle = activeParticles[firstIndex];
          const secondParticle = activeParticles[secondIndex];

          const distanceX =
            firstParticle.xInPixels - secondParticle.xInPixels;
          const distanceY =
            firstParticle.yInPixels - secondParticle.yInPixels;

          const distance = Math.sqrt(
            distanceX * distanceX + distanceY * distanceY,
          );

          if (distance >= configuration.connectionDistance) {
            continue;
          }

          const proximity =
            1 - distance / configuration.connectionDistance;

          const alpha =
            proximity *
            0.16 *
            configuration.lineOpacity;

          const { red, green, blue } = hexToRgb(
            firstParticle.color,
          );

          context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${alpha})`;
          context.beginPath();
          context.moveTo(
            firstParticle.xInPixels,
            firstParticle.yInPixels,
          );
          context.lineTo(
            secondParticle.xInPixels,
            secondParticle.yInPixels,
          );
          context.stroke();
        }
      }

      context.globalCompositeOperation = "source-over";
    }

    function renderStaticScene() {
      const activeParticles = positionIcons();
      drawConnections(activeParticles);
    }

    function animate(timestamp) {
      if (!isVisible || reducedMotion) {
        animationFrame = null;
        return;
      }

      const deltaSeconds = Math.min(
        (timestamp - lastTimestamp) / 1000,
        0.05,
      );

      lastTimestamp = timestamp;

      const activeParticles = positionIcons(deltaSeconds);
      drawConnections(activeParticles);

      animationFrame = window.requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (
        reducedMotion ||
        !isVisible ||
        animationFrame !== null
      ) {
        return;
      }

      lastTimestamp = performance.now();
      animationFrame = window.requestAnimationFrame(animate);
    }

    function stopAnimation() {
      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = null;
      }
    }

    function handleResize() {
      resizeCanvas();
      renderStaticScene();
    }

    resizeCanvas();
    renderStaticScene();

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(wrapper);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;

        if (isVisible) {
          renderStaticScene();
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.04 },
    );

    intersectionObserver.observe(wrapper);

    if (!reducedMotion) {
      startAnimation();
    }

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, [reducedMotion]);

  return (
    <div
      ref={wrapperRef}
      className="dc-tech-constellation"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="dc-tech-constellation__connections"
      />

      <div className="dc-tech-constellation__icons">
        {TECHNOLOGY_PARTICLES.map((particle, index) => {
          const Icon = TECHNOLOGY_ICONS[particle.id];

          if (!Icon) {
            return null;
          }

          return (
            <span
              key={particle.key}
              ref={(element) => {
                iconRefs.current[index] = element;
              }}
              className="dc-tech-constellation__icon"
              style={{
                color: particle.color,
                opacity: particle.opacity,
              }}
            >
              <Icon />
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Tecnologias() {
  const [sectionRef, visible] = useReveal();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="tecnologias"
      ref={sectionRef}
      className="dc-section dc-technologies-section"
      aria-labelledby="tecnologias-title"
    >
      <TechnologyConstellation reducedMotion={reducedMotion} />

      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--yellow">
          <Braces size={15} aria-hidden="true" />
          <span>stack.config</span>
        </div>

        <h2
          id="tecnologias-title"
          className="dc-section-title"
        >
          tecnologias presentes na formação
        </h2>

        <p className="dc-section-text dc-technologies-description">
          Uma stack moderna para desenvolver interfaces,
          aplicações web, sistemas completos, APIs, aplicativos
          mobile e soluções orientadas por dados.
        </p>

        <div className="dc-tech-grid">
          {TECNOLOGIAS.map((technology, index) => {
            const TechnologyIcon =
              TECHNOLOGY_ICONS[technology.id] ?? Braces;

            return (
              <article
                key={technology.id}
                className={`dc-tech-card dc-reveal ${
                  visible ? "is-visible" : ""
                }`}
                style={{
                  "--tech-color": technology.cor,
                  "--delay": `${index * 55}ms`,
                }}
              >
                <div
                  className="dc-tech-card__icon"
                  aria-hidden="true"
                >
                  <TechnologyIcon />
                </div>

                <h3>{technology.nome}</h3>
                <p>{technology.descricao}</p>

                <span className="dc-tech-card__status">
                  <span aria-hidden="true" />
                  incluída na formação
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}