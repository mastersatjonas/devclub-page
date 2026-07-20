import { GitCommit, Quote } from "lucide-react";
import useReveal from "../hooks/useReveal";
import PersonAvatar from "./PersonAvatar";
import { ALUNOS } from "../data/devclubData";

/**
 * Eu escolhi o formato "git log" pra essa seção porque conecta a estrutura
 * visual ao conteúdo: cada aluno vira um "commit" na trajetória dele.
 *
 * As classes aqui (.dc-student-scroll, .dc-student-card, .dc-avatar,
 * .dc-commit-message, .dc-student-card__quote) já existem em
 * social-proof.css — eu não crio nada novo, só sigo a estrutura de
 * elementos que o CSS já espera pra herdar cor, espaçamento e hover.
 *
 * A cor de cada aluno entra como --student-color no card. Como custom
 * property herda pros filhos, isso "pinta" o avatar, o commit message e
 * o ícone da citação sem eu repetir a cor em cada elemento.
 *
 * Assim como fiz em Empresas.jsx, deixo explícito que os depoimentos são
 * fictícios — não quero que a página passe a impressão de estar inventando
 * prova social real.
 */
export default function Alunos() {
  const [sectionRef, visible] = useReveal();

  return (
    <section
      id="alunos"
      ref={sectionRef}
      className="dc-section"
      aria-labelledby="alunos-title"
    >
      <div className="dc-container">
        <div className="dc-eyebrow dc-eyebrow--green">
          <GitCommit size={14} aria-hidden="true" />
          <span>git log --alunos</span>
        </div>

        <h2 id="alunos-title" className="dc-section-title">
          histórias de quem já passou pela formação
        </h2>

        <p className="dc-disclaimer">
          Depoimentos fictícios, criados exclusivamente para demonstrar a proposta visual do
          projeto.
        </p>
      </div>

      {/*
       * role="list" / role="listitem" porque o overflow horizontal pode
       * confundir leitor de tela sobre o agrupamento dos cards — isso deixa
       * explícito que é uma lista, mesmo sem <ul>/<li>.
       */}
      <div
        className="dc-student-scroll"
        role="list"
        aria-label="Depoimentos de alunos do DevClub"
      >
        {ALUNOS.map((aluno, index) => {
          const nomeId = `${aluno.id}-nome`;

          return (
            <article
              key={aluno.id}
              role="listitem"
              aria-labelledby={nomeId}
              className={`dc-student-card dc-reveal ${visible ? "is-visible" : ""}`}
              style={{ "--delay": `${index * 100}ms`, "--student-color": aluno.cor }}
            >
              <header className="dc-student-card__header">
                <PersonAvatar src={aluno.foto} name={aluno.nome} className="dc-avatar" />

                <div>
                  <h3 id={nomeId}>{aluno.nome}</h3>
                  <span>
                    {aluno.de} → {aluno.para}
                  </span>
                </div>
              </header>

              <div className="dc-commit-message">{aluno.commitMessage}</div>

              {/*
               * dc-commit-translation ainda NÃO existe em social-proof.css.
               * Mantive porque era um requisito do briefing original
               * (linguagem acessível pra quem nunca programou), mas isso
               * precisa de uma regra nova — me avisa se preferir remover
               * em vez de estilizar.
               */}
              <p className="dc-commit-translation">{aluno.traducao}</p>

              <div className="dc-student-card__quote">
                <Quote size={13} aria-hidden="true" />
                <p>{aluno.quote}</p>
              </div>

              <small>
                contratado(a) por <strong>{aluno.empresa}</strong>
              </small>
            </article>
          );
        })}
      </div>
    </section>
  );
}