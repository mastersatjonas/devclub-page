import { useId, useState } from "react";
import { ArrowRight, CheckCircle2, Send } from "lucide-react";
import useReveal from "../hooks/useReveal";
import { AREAS_INTERESSE } from "../data/devclubData";

const INITIAL_FORM = {
  nome: "",
  email: "",
  telefone: "",
  interesse: AREAS_INTERESSE[0],
};

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
