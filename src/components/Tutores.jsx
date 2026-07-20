import { Users } from "lucide-react";
import useReveal from "../hooks/useReveal";
import PersonAvatar from "./PersonAvatar";
import { TUTORES } from "../data/devclubData";

/**
 * A estrutura interna do card segue exatamente os seletores que já existem
 * em social-proof.css (.dc-tutor-card > strong, > small, > p) — não criei
 * classe nova aqui, só uso os elementos HTML que o CSS já mira.
 *
 * A cor de cada tutor entra como --tutor-color no card, e o PersonAvatar
 * herda essa cor via .dc-avatar { color: var(--student-color, var(--tutor-color)) }
 * — por isso não preciso repetir a cor no avatar manualmente.
 */
export default function Tutores() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      id="tutores"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="tutores-title"
    >
      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--purple">
          <Users size={14} aria-hidden="true" />
          <span>team.json</span>
        </div>

        <h2 id="tutores-title" className="dc-section-title">
          quem acompanha você durante a formação
        </h2>

        <p className="dc-disclaimer">
          Perfis fictícios, criados exclusivamente para demonstrar a proposta visual do projeto.
        </p>

        <div className="dc-card-grid dc-card-grid--four">
          {TUTORES.map((tutor, index) => {
            const nomeId = `${tutor.id}-nome`;

            return (
              <article
                key={tutor.id}
                aria-labelledby={nomeId}
                className={`dc-tutor-card dc-reveal ${visible ? "is-visible" : ""}`}
                style={{ "--delay": `${index * 90}ms`, "--tutor-color": tutor.cor }}
              >
                <PersonAvatar src={tutor.foto} name={tutor.nome} className="dc-avatar" />

                <h3 id={nomeId}>{tutor.nome}</h3>
                <strong>{tutor.role}</strong>

                <small>
                  especialidade: {tutor.especialidade}
                  <br />
                  commits: {tutor.commits} (contribuições)
                </small>

                <p>&ldquo;{tutor.frase}&rdquo;</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}