import { Building2 } from "lucide-react";
import useReveal from "../hooks/useReveal";
import { EMPRESAS } from "../data/devclubData";

/**
 * O marquee é estritamente visual. Eu exponho a lista uma única vez para
 * leitores de tela e escondo a repetição animada para evitar duplicidade.
 */
export default function Empresas() {
  const [sectionRef, visible] = useReveal();
  const marqueeItems = [...EMPRESAS, ...EMPRESAS];

  return (
    <section
      id="empresas"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="empresas-title"
    >
      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--pink">
          <Building2 size={14} aria-hidden="true" />
          <span>empresas.import</span>
        </div>

        <h2 id="empresas-title" className="dc-section-title dc-code-title">
          <span>import</span> {"{"} vagas {"}"} <span>from</span>{" "}
          <strong>&apos;mercado-de-trabalho&apos;</strong>
        </h2>

        <p className="dc-disclaimer">
          Marcas fictícias utilizadas exclusivamente para apresentação visual do projeto.
        </p>

        <p className="dc-sr-only">Empresas demonstrativas: {EMPRESAS.join(", ")}.</p>
      </div>

      <div
        className={`dc-marquee-shell dc-reveal ${visible ? "is-visible" : ""}`}
        aria-hidden="true"
      >
        <div className="dc-marquee">
          {marqueeItems.map((empresa, index) => (
            <span key={`${empresa}-${index}`}>{empresa}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
