# DevClub — Página Institucional

> "Você não nasce dev. Você compila."

Esse README documenta as decisões técnicas do projeto — não é só um "como rodar",
é a explicação de **por que** cada coisa está do jeito que está. Escrevi pensando
em mim mesmo daqui a alguns meses (ou num entrevistador abrindo o código): se uma
escolha está aqui, é porque eu sei justificar ela.

---

## A ideia por trás do projeto

O desafio pedia uma página institucional disruptiva pro DevClub — formações, quem
somos, alunos, empresas parceiras, tutores — só que sem parecer "mais uma
landing page de curso". A saída que encontrei foi parar de tratar "código" como
assunto da página e passar a tratar como **a própria linguagem visual** dela.

Por isso a paleta é a paleta de um editor de código (syntax highlight, não neon
genérico), a seção "Quem somos" é estruturada como um `git diff`, os alunos
aparecem como `git log`, os tutores como `team.json`, as tecnologias como
`stack.config`. Não é decoração em cima do conteúdo — a estrutura visual **é**
o conteúdo.

Isso também é a razão do nome de cada eyebrow (`quem-somos.md`, `formacoes/`,
`stack.config`...): a página inteira é montada como se fosse um repositório,
e cada seção é um arquivo desse repositório.

---

## Arquitetura de componentes

Separei por responsabilidade — `components/` cuida de comportamento e
apresentação, `data/` cuida só de conteúdo, `hooks/` cuida de lógica reutilizável,
`styles/` cuida só de CSS. A regra que segui: se eu quiser trocar um texto ou
adicionar um aluno novo, eu nunca deveria precisar tocar em JSX.

- **`hooks/useReveal`** — encapsula o `IntersectionObserver` que dispara a
  animação de entrada de cada seção. Fiz um hook único porque toda seção
  precisa exatamente do mesmo comportamento (aparecer quando entra na
  viewport), e eu não queria sete implementações levemente diferentes de
  observer espalhadas pelo código.
- **`hooks/useReducedMotion`** — centraliza a checagem de
  `prefers-reduced-motion`. Uso ele no Hero e na Intro pra desligar a
  encenação (terminal digitando, decodificação de texto) pra quem desativou
  animação no sistema, sem duplicar a lógica de `matchMedia` em cada lugar.
- **`PersonAvatar`** — um componente só pra foto de pessoa (aluno ou tutor),
  com fallback automático pras iniciais se a imagem falhar. Centralizei
  porque eu não queria que uma foto quebrada em produção derrubasse a
  integridade visual de um card inteiro.

---

## Por que cada arquivo CSS existe

O `devclub.css` só importa os módulos, na ordem de dependência: tokens e
utilitários primeiro, depois cada seção na ordem em que aparece na página,
animações centralizadas, e responsividade por último — pra ela poder sobrescrever
qualquer regra anterior sem eu precisar aumentar especificidade a força de
`!important`.

### `tokens.css`
Aqui mora toda variável (`--dc-*`): cores, espaçamento, tipografia, altura do
header. É a única fonte de verdade da identidade visual — se eu decidir mudar
o tom do ciano amanhã, mudo uma linha aqui e a página inteira acompanha. Também
guardo o reset mínimo (`box-sizing`, `touch-action`, `::selection`) e a
estrutura base da página (`.dc-page`, `.dc-container`, `.dc-section`), porque
esses três são usados por praticamente todo módulo depois dele — faz sentido
que sejam a fundação, não parte de uma seção específica.

### `utilities.css`
Classes de apoio reutilizáveis entre seções (esconder visualmente pra leitor
de tela, truncar texto, esse tipo de utilitário). Separado dos tokens porque
uma coisa é "variável de design", outra é "classe pronta pra usar" — misturar
os dois deixaria o arquivo de fundação maior do que precisa ser.

### `header.css`
Isolei o header porque ele é o único elemento com `position: fixed` que
precisa se comportar de forma **independente** do resto da página — inclusive
durante a animação de entrada do conteúdo (`.dc-page__content`), que usa
`transform: scale()`. Se o header estivesse dentro do fluxo normal do
conteúdo, ele também escalaria durante a intro, o que ia parecer bug, não
efeito. Por isso Header e SideNav ficam fora de `.dc-page__content` no JSX —
essa divisão de CSS espelha uma decisão estrutural do componente, não é
coincidência.

### `intro.css`
A tela de carregamento (decodificação de texto tipo hacker + barra de
progresso + cortina abrindo) fica em módulo próprio porque ela só existe por
alguns segundos e nunca coexiste com o resto do layout depois de terminar —
é um estado da aplicação, não uma seção da página, então não faz sentido
misturar com `about.css` ou qualquer módulo de conteúdo.

### `hero.css`
Primeira coisa que a pessoa vê, e a única seção com imagem de fundo em tela
cheia + o terminal simulado por cima. Separei do resto porque tem regras que
não se repetem em nenhum outro lugar da página (overlay sobre imagem, glow de
fundo, a "janela" de terminal com barra de título e três bolinhas coloridas).

### `shared-components.css`
Aqui ficam os padrões que se repetem entre seções diferentes: o grid de
cards (`.dc-card-grid`), a estrutura visual comum entre `.dc-card`,
`.dc-project-card`, `.dc-tech-card`, `.dc-student-card`, `.dc-tutor-card` (
borda, gradiente de fundo, hover com `translateY` + sombra na cor de acento),
e as tags de tecnologia (`.dc-tags`). A ideia é: se eu fosse duplicar essa
regra em cinco arquivos de seção, é sinal de que ela pertence aqui, não lá.

### `about.css`
"Quem somos" e a metodologia. Deixei os dois no mesmo módulo porque
compartilham o mesmo raciocínio visual — a narrativa de transformação (o
`git diff` com linhas riscadas em vermelho e adicionadas em verde) e os
quatro passos da metodologia são, na prática, a mesma história contada de
duas formas: uma em "antes/depois", outra em "01/02/03/04".

### `formations.css`
Fica curto de propósito. A maior parte do visual dos cards de formação já
vem de `shared-components.css` — aqui só entram os ajustes que são
**específicos** dessa seção (o gradiente radial de fundo sutil atrás da
`#formacoes`, a altura mínima do card, o espaçamento do grid de projetos).
Não dupliquei a regra de card inteira aqui.

### `technologies.css`
Cada tecnologia tem sua própria cor oficial (o azul do TypeScript, o amarelo
do Python) puxada via `--tech-color`, então o card, o ícone, o glow no hover
e o indicador de "incluída na formação" pegam essa cor automaticamente por
herdar a custom property — não preciso escrever uma variação de card por
tecnologia.

### `ai.css`
Tratei como uma experiência visual à parte porque é a seção mais "cinematográfica"
da página — tem imagem em destaque com efeito 3D sutil (`perspective` +
`rotateY`), badges flutuantes animadas, brilho radial de fundo pulsando. Isolei
porque nenhuma dessas técnicas (glassmorphism com `backdrop-filter`, grid de
fundo mascarado) se repete em nenhuma outra seção da página.

### `social-proof.css`
Alunos, empresas e tutores — os três "provam" a mesma coisa (que o DevClub
funciona de verdade), só que de formas diferentes: depoimento, logo de
empresa, perfil de quem ensina. Juntei os três porque, mesmo com HTML
diferente, compartilham o mesmo raciocínio de design: usar a cor de acento
herdada via custom property (`--student-color` / `--tutor-color`) pra colorir
avatar, badge e ícone sem repetir a cor em cada elemento filho.

### `cta.css`
A conversão final, o formulário e o rodapé. Separado por ser o único lugar
da página com `<input>`, `<select>` e estado de formulário (sucesso/erro) —
nenhuma outra seção tem esse tipo de elemento interativo.

### `animations.css`
Ver seção própria abaixo — mas a razão de existir separado é auditoria: se eu
quiser saber todas as animações que rodam na página, ou desligar movimento
pra alguém com `prefers-reduced-motion`, eu quero um lugar só pra olhar, não
sete arquivos.

### `responsive.css`
Deixei por último de propósito na ordem de import — assim, na cascata CSS,
qualquer regra aqui tem prioridade natural sobre a regra "desktop" equivalente
sem eu precisar de `!important`. Organizei os breakpoints do maior pro menor
(1220px → 1080px → 820px → 620px → 420px → 360px) porque é assim que a
pessoa realmente experimenta a página encolhendo — regra geral primeiro,
exceção específica depois.

---

## As animações, uma por uma

### `dc-blink`
O cursor piscando no terminal do Hero (`❯ █`). Uso `opacity` alternando entre
1 e 0 em vez de `visibility` porque `opacity` anima suave se eu decidir dar
transição nele depois — `visibility` não anima.

### `dc-marquee`
A faixa infinita de empresas. O truque é duplicar a lista de empresas duas
vezes no JSX e mover a faixa `translateX(-50%)` — como a segunda cópia é
idêntica à primeira, quando a faixa termina de andar 50% do caminho, ela
"reseta" pro início sem ninguém perceber o corte. `aria-hidden` na faixa
animada porque ela é puramente decorativa; a lista real de empresas fica
acessível separadamente pra leitor de tela.

### `dc-intro-out`
A "cortina abrindo" no fim da tela de carregamento. Uso `clip-path: inset()`
crescendo até cobrir 100% da altura por baixo — isso faz a camada preta
"recolher" de baixo pra cima, como se fosse puxada pra fora da tela, revelando
o site por trás. Escolhi `clip-path` em vez de `opacity` porque queria um corte
com direção, não um fade genérico — reforça a ideia de "abertura", que era
literalmente o que você pediu.

### `dc-ai-glow`
O brilho radial pulsando atrás do preview de IA. `scale` + `opacity` alternando
num ciclo de 5 segundos, `ease-in-out` pra não ter início/fim abrupto — o
objetivo é simular "respiração", não chamar atenção agressivamente.

### `dc-ai-float`
As duas badges flutuantes (`AI Engine`, `Code review`) da seção de IA. As duas
usam a mesma animação, mas uma roda em `reverse` e com duração levemente
diferente (4.2s vs 4.8s) — se as duas flutuassem em sincronia perfeita, ia
parecer padrão repetitivo em vez de movimento orgânico.

### Reveal on scroll (`useReveal` + `.dc-reveal.is-visible`)
Não é um `@keyframes` — é `opacity`/`transform` combinados com `transition` e
disparados via `IntersectionObserver` quando o elemento entra na viewport.
Escolhi isso em vez de keyframe porque preciso que o estado inicial e final
sejam controlados por **classe React**, não por tempo fixo — cada seção só
anima quando a pessoa realmente rola até ela, não todas de uma vez no
carregamento da página.

### Hover com elevação (`dc-card`, `dc-tech-card`, `dc-ai-resource-card`...)
`translateY(-Npx)` + sombra na cor de acento do card, com `transition` em
`transform`, `border-color` e `box-shadow`. É a mesma linguagem de "o card
reage a você" repetida em toda seção — parte da consistência visual da
página inteira, não um efeito isolado.

### Efeito duotone nas fotos (`.dc-avatar.is-photo::after`)
Tecnicamente é uma técnica estática, não uma animação — mas documento aqui
porque é uma decisão de movimento visual importante: a foto real de cada
aluno/tutor recebe `filter: grayscale()` + um `::after` com
`mix-blend-mode: color` puxando a cor de acento do próprio card via
`currentColor`. A intenção não é só estética: como os depoimentos são
fictícios, eu não queria fotos "cruas" de pessoas reais parecendo prova
social genuína — o tratamento visual deixa claro que é estilizado.

---

## De onde isso veio

Esse projeto não nasceu do zero. Comecei olhando referências de sites que já
tinha construído ou admirava — a estrutura de abertura de um (efeito de
"cortina" revelando o conteúdo), a esfera de partículas e o cartão de IA
flutuante de outro, o layout de badges de habilidade com barra de progresso
de um terceiro. Usei IA pra acelerar a geração de cada um desses pedaços — isso
está declarado desde a primeira regra do desafio, não é segredo.

Mas nenhum desses pedaços entrou "como estava". Cada um passou pelo mesmo
filtro: **isso faz sentido dentro da metáfora de código que eu escolhi pro
DevClub, ou é só um efeito bonito emprestado?** A esfera de partículas virou
fundo ambiente da página inteira. O cartão de IA flutuante virou uma seção
editorial sobre como a formação usa IA com responsabilidade — o que é,
literalmente, a regra 2 do próprio desafio ("gere com IA, mas entenda o que
a IA gerou"). O badge de habilidade com barra de progresso virou `stack.config`,
com a barra representando não "minha habilidade" mas "o nível médio de domínio
dos alunos ao final da formação" — muda o sentido de autopromoção pra prova
social.

É por isso que a frase que abre a página — **"Você não nasce dev. Você
compila."** — não é só uma headline bonita. É literalmente o que aconteceu na
construção desse projeto: peguei referências soltas, prontas, de fora, e
compilei elas em alguma coisa com identidade própria, que eu entendo linha
por linha e sei explicar decisão por decisão. O produto final não é a soma
das partes que usei de referência — é o resultado de compilar elas através
de um critério meu.
## Executando o projeto

```bash
npm install
npm run dev
```

## Validação antes do deploy

```bash
npm run check
```

## Estrutura principal

```text
src/
├── assets/
├── components/
├── data/
├── hooks/
├── styles/
├── DevClubPage.jsx
├── app.jsx
└── main.jsx
```

> Os nomes de alunos, empresas e tutores são fictícios e existem apenas para demonstrar a interface.
