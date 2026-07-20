import { useCallback, useState } from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import SideNav from "./components/SideNav";
import Hero from "./components/Hero";
import QuemSomos from "./components/QuemSomos";
import Formacoes from "./components/Formacoes";
import Tecnologias from "./components/Tecnologias";
import IADevClub from "./components/IADevClub";
import Alunos from "./components/Alunos";
import Empresas from "./components/Empresas";
import Tutores from "./components/Tutores";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import useActiveSection from "./hooks/useActiveSection";
import useDocumentMetadata from "./hooks/useDocumentMetadata";
import { SECTIONS } from "./data/devclubData";
import "./styles/devclub.css";

const INTRO_SESSION_KEY = "devclub-intro";

function shouldSkipIntro() {
  if (typeof window === "undefined") return false;

  const alreadyViewed = window.sessionStorage.getItem(INTRO_SESSION_KEY) === "true";
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  return alreadyViewed || Boolean(reducedMotion);
}

/**
 * Eu uso esta página apenas como camada de composição. Cada seção mantém
 * sua própria responsabilidade, enquanto navegação e metadados ficam em
 * hooks dedicados. Isso reduz acoplamento e facilita manutenção futura.
 */
export default function DevClubPage() {
  const [introDone, setIntroDone] = useState(shouldSkipIntro);
  const activeSection = useActiveSection(SECTIONS);

  useDocumentMetadata({
    title: "DevClub — Formação prática em tecnologia",
    description:
      "Página demonstrativa de uma formação prática em desenvolvimento web, mobile, dados e Inteligência Artificial.",
  });

  const handleIntroDone = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <div className="dc-page">
      {!introDone && <Intro onDone={handleIntroDone} />}

      {/*
       * Header e SideNav ficam fora do conteúdo transformado. Assim eu
       * preservo position: fixed em relação à viewport durante a intro.
       */}
      <Header sections={SECTIONS} activeSection={activeSection} />
      <SideNav sections={SECTIONS} activeSection={activeSection} />

      <div className={`dc-page__content ${introDone ? "is-visible" : ""}`}>
        <main className="dc-main">
          <Hero />
          <QuemSomos />
          <Formacoes />
          <Tecnologias />
          <IADevClub />
          <Alunos />
          <Empresas />
          <Tutores />
          <CTA />
        </main>

        <Footer />
      </div>
    </div>
  );
}
