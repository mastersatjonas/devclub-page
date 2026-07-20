import { useEffect } from "react";

/**
 * Para esta SPA pequena, eu gerencio título e descrição sem adicionar
 * uma dependência exclusiva para o <head>. Em uma aplicação com rotas,
 * esta responsabilidade deve migrar para a camada de roteamento.
 */
export default function useDocumentMetadata({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    let descriptionElement = document.querySelector('meta[name="description"]');
    const previousDescription = descriptionElement?.getAttribute("content") ?? "";
    const createdDescription = !descriptionElement;

    document.title = title;

    if (!descriptionElement) {
      descriptionElement = document.createElement("meta");
      descriptionElement.setAttribute("name", "description");
      document.head.appendChild(descriptionElement);
    }

    descriptionElement.setAttribute("content", description);

    return () => {
      document.title = previousTitle;

      if (createdDescription) {
        descriptionElement.remove();
      } else {
        descriptionElement.setAttribute("content", previousDescription);
      }
    };
  }, [description, title]);
}
