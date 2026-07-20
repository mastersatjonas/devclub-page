# Arquitetura de estilos

Eu dividi o CSS por responsabilidade para evitar um arquivo monolítico e reduzir conflitos de cascata.

## Ordem de importação

O arquivo `devclub.css` é o único importado pelo React. Ele carrega os módulos nesta ordem:

1. `tokens.css` — variáveis, reset mínimo e estrutura global;
2. `utilities.css` — tipografia compartilhada, acessibilidade e reveal;
3. `header.css` — header fixo, menu e SideNav;
4. `intro.css` — tela de carregamento;
5. `hero.css` — primeira dobra e terminal;
6. `shared-components.css` — grids, cards, tags e botões reutilizáveis;
7. `about.css` — Quem Somos e metodologia;
8. `formations.css` — formações e projetos;
9. `technologies.css` — ícones e cards da stack;
10. `ai.css` — seção de Inteligência Artificial;
11. `social-proof.css` — alunos, empresas e tutores;
12. `cta.css` — CTA, formulário e rodapé;
13. `animations.css` — keyframes centralizados;
14. `responsive.css` — breakpoints, touch e movimento reduzido.

## Regra de manutenção

Eu evito criar seletores paralelos para o mesmo componente. Ao alterar o header, por exemplo, edito somente `header.css`; ajustes de tamanho por breakpoint permanecem em `responsive.css`.

## Breakpoints validados no código

- 1220 px — redução de grids e densidade do header;
- 1080 px — ativação do menu mobile;
- 820 px — grids com duas colunas;
- 620 px — composição em uma coluna;
- 420 px — compactação adicional;
- 360 px — ajuste final para celulares estreitos.

O layout parte do desktop atual e reduz progressivamente sem esconder conteúdo ou introduzir rolagem horizontal.
