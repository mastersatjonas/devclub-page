import { ClipboardCheck, FileCode2 } from "lucide-react";
import useReveal from "../hooks/useReveal";
import useReducedMotion from "../hooks/useReducedMotion";
import { COLORS, ETAPAS } from "../data/devclubData";

/**
 * Gerador de número pseudoaleatório com seed fixa (mulberry32). Eu preciso
 * de "aleatório" que não mude a cada render — se eu usasse Math.random()
 * direto, cada QR code ia trocar de padrão em toda atualização de estado,
 * e ele ia "piscar" de forma errada mesmo sem eu ter pedido nenhuma
 * animação de piscar.
 */
function seededRandom(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const QR_SIZE = 21; // módulos por lado — o menor tamanho de QR code real (versão 1)
const QR_FINDERS = [
  [0, 0],
  [0, QR_SIZE - 7],
  [QR_SIZE - 7, 0],
];

/**
 * Os "olhos" do QR code (os três quadrados nos cantos) são o que faz
 * qualquer pessoa reconhecer "isso é um QR code" à primeira vista — sem
 * eles, seria só ruído quadriculado. Eu desenho o padrão fixo de anel +
 * miolo sólido deles, e deixo o resto da grade aleatório.
 */
function isFinderModuleOn(localRow, localCol) {
  const isOuterRing = localRow === 0 || localRow === 6 || localCol === 0 || localCol === 6;
  const isCore = localRow >= 2 && localRow <= 4 && localCol >= 2 && localCol <= 4;
  return isOuterRing || isCore;
}

function buildQrModules(seed) {
  const random = seededRandom(seed);
  const grid = [];

  for (let row = 0; row < QR_SIZE; row++) {
    const line = [];
    for (let col = 0; col < QR_SIZE; col++) {
      const finder = QR_FINDERS.find(
        ([fr, fc]) => row >= fr && row < fr + 7 && col >= fc && col < fc + 7
      );
      line.push(finder ? isFinderModuleOn(row - finder[0], col - finder[1]) : random() > 0.56);
    }
    grid.push(line);
  }

  return grid;
}

function QrGlyph({ seed, className, style }) {
  const modules = buildQrModules(seed);
  const cell = 4;
  const viewBoxSize = QR_SIZE * cell;

  return (
    <svg
      className={className}
      style={style}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
      aria-hidden="true"
    >
      {modules.map((line, row) =>
        line.map(
          (isOn, col) =>
            isOn && (
              <rect
                key={`${row}-${col}`}
                x={col * cell}
                y={row * cell}
                width={cell}
                height={cell}
              />
            )
        )
      )}
    </svg>
  );
}

/**
 * Posições, tamanhos e cores fixados manualmente em vez de gerados — eu
 * quero controlar a composição (não sobrepor o texto principal, variar
 * profundidade percebida via tamanho/opacidade) em vez de deixar isso ao
 * acaso.
 */
const QR_FIELD = [
  { seed: 11, top: "6%", left: "3%", size: 120, opacity: 0.16, color: "cyan", duration: "16s", delay: "0s" },
  { seed: 47, top: "64%", left: "8%", size: 84, opacity: 0.12, color: "purple", duration: "19s", delay: "-3s" },
  { seed: 5, top: "14%", left: "84%", size: 140, opacity: 0.13, color: "pink", duration: "17s", delay: "-7s" },
  { seed: 91, top: "72%", left: "86%", size: 96, opacity: 0.11, color: "cyan", duration: "21s", delay: "-10s" },
  { seed: 23, top: "40%", left: "48%", size: 160, opacity: 0.07, color: "purple", duration: "24s", delay: "-14s" },
];

function QrField({ reducedMotion }) {
  return (
    <div className="dc-about-qr-field" aria-hidden="true">
      {QR_FIELD.map((qr) => (
        <QrGlyph
          key={qr.seed}
          seed={qr.seed}
          className={`dc-about-qr dc-about-qr--${qr.color} ${
            reducedMotion ? "" : "is-drifting"
          }`}
          style={{
            top: qr.top,
            left: qr.left,
            width: qr.size,
            height: qr.size,
            opacity: qr.opacity,
            animationDuration: qr.duration,
            animationDelay: qr.delay,
          }}
        />
      ))}
    </div>
  );
}

function DiffLine({ children, visible, delay = 0, kind = "add" }) {
  const color = kind === "add" ? COLORS.green : COLORS.red;
  const sign = kind === "add" ? "+" : "-";

  return (
    <div
      className={`dc-diff-line dc-diff-line--${kind} ${visible ? "is-visible" : ""}`}
      style={{ "--delay": `${delay}ms`, "--diff-color": color }}
    >
      <span className="dc-diff-line__sign" aria-hidden="true">
        {sign}
      </span>
      <span>{children}</span>
    </div>
  );
}

/**
 * Eu organizo esta seção como um git diff para transformar a proposta
 * pedagógica em uma narrativa visual coerente com o universo dev. Os QR
 * codes no fundo reforçam a mesma identidade visual do logo do DevClub,
 * só que dissolvidos em movimento lento — presença ambiente, não elemento
 * que disputa atenção com o texto.
 */
export default function QuemSomos() {
  const [sectionRef, visible] = useReveal();
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="quem-somos"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="quem-somos-title"
    >
      <QrField reducedMotion={reducedMotion} />

      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--purple">
          <FileCode2 size={14} aria-hidden="true" />
          <span>quem-somos.md</span>
        </div>

        <h2 id="quem-somos-title" className="dc-section-title">
          git diff da sua trajetória
        </h2>

        <div className="dc-diff-card">
          <DiffLine kind="del" visible={visible}>
            currículo genérico, sem projeto e sem direção
          </DiffLine>
          <DiffLine kind="add" visible={visible} delay={80}>
            portfólio real com projetos compreendidos linha por linha
          </DiffLine>
          <DiffLine kind="del" visible={visible} delay={160}>
            estudar sozinho, travar sozinho e desistir sozinho
          </DiffLine>
          <DiffLine kind="add" visible={visible} delay={240}>
            comunidade, mentoria, revisão de código e acompanhamento
          </DiffLine>
          <DiffLine kind="del" visible={visible} delay={320}>
            curso que ensina sintaxe e termina sem prática
          </DiffLine>
          <DiffLine kind="add" visible={visible} delay={400}>
            formação conectada a projetos, portfólio e preparação profissional
          </DiffLine>
        </div>

        <p className={`dc-section-text dc-reveal ${visible ? "is-visible" : ""}`}>
          O DevClub apresenta uma jornada de aprendizado baseada em prática, consistência e
          acompanhamento. A proposta é reduzir a distância entre assistir aulas e conseguir
          construir soluções de verdade.
        </p>

        <div className="dc-subsection" aria-labelledby="metodologia-title">
          <div className="dc-eyebrow dc-eyebrow--green">
            <ClipboardCheck size={14} aria-hidden="true" />
            <span>metodologia.map</span>
          </div>

          <h3 id="metodologia-title" className="dc-subsection-title">
            como o aprendizado evolui
          </h3>

          <div className="dc-method-grid">
            {ETAPAS.map((etapa, index) => (
              <article
                key={etapa.id}
                className={`dc-method-card dc-reveal ${visible ? "is-visible" : ""}`}
                style={{ "--delay": `${500 + index * 90}ms` }}
              >
                <span className="dc-method-card__number" aria-hidden="true">
                  {etapa.numero}
                </span>
                <h4>{etapa.titulo}</h4>
                <p>{etapa.descricao}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}