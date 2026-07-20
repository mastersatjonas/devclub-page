import { useState } from "react";

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Eu centralizo a renderização de fotos em um único componente para garantir
 * o mesmo comportamento de carregamento, acessibilidade e fallback em toda a página.
 *
 * Se um arquivo for removido, renomeado ou falhar durante o carregamento,
 * a interface continua íntegra exibindo as iniciais da pessoa.
 *
 * Adicionei o modificador `is-photo` porque preciso que o CSS aplique o
 * tratamento duotone (fotos.png + cor de acento) só quando existe uma
 * imagem de verdade — aplicar o mesmo overlay em cima das iniciais
 * esconderia o texto, já que o pseudo-elemento fica por cima de tudo.
 */
export default function PersonAvatar({
  src,
  name,
  className = "",
  decorative = false,
}) {
  const [imageFailed, setImageFailed] = useState(false);
  const initials = getInitials(name);
  const shouldRenderImage = Boolean(src) && !imageFailed;

  return (
    <div
      className={`dc-person-avatar ${shouldRenderImage ? "is-photo" : ""} ${className}`.trim()}
      aria-hidden={decorative ? "true" : undefined}
    >
      {shouldRenderImage ? (
        <img
          src={src}
          alt={decorative ? "" : `Foto de ${name}`}
          loading="lazy"
          decoding="async"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <span aria-label={decorative ? undefined : `Iniciais de ${name}`}>
          {initials}
        </span>
      )}
    </div>
  );
}