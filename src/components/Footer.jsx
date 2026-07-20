import { Code2 } from "lucide-react";

/**
 * Eu mantenho o rodapé pequeno e objetivo para não competir com o CTA.
 */
export default function Footer() {
  return (
    <footer className="dc-footer">
      <Code2 size={14} aria-hidden="true" />
      <span>
        DevClub © {new Date().getFullYear()} — projeto demonstrativo feito com código e criatividade
      </span>
    </footer>
  );
}
