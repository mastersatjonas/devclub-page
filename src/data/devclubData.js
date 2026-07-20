/**
 * Centralizo aqui todo conteúdo estático da página.
 *
 * Minha regra de arquitetura é simples: componentes cuidam de comportamento
 * e apresentação; este módulo cuida apenas dos dados. Assim consigo revisar
 * textos, reorganizar cards ou trocar conteúdos sem tocar na estrutura JSX.
 */

// Fotos reais dos alunos demonstrativos. Importo aqui (não uso string de
// caminho solta) pra o Vite processar, otimizar e gerar hash de cache
// automaticamente — o mesmo padrão que já uso em Header.jsx pro logo.
import marinaCostaPhoto from "../assets/people/alunos/marina-costa.png";
import diegoFerrazPhoto from "../assets/people/alunos/diego-ferraz.png";
import renataAquinoPhoto from "../assets/people/alunos/renata-aquino.png";
import kaiqueNunesPhoto from "../assets/people/alunos/kaique-nunes.png";

// Fotos reais dos tutores. Mesmo padrão de import acima — mantenho os
// dois grupos (alunos/tutores) em pastas separadas dentro de assets/people
// porque são conjuntos de dados com ciclo de vida diferente.
import brunoSalgadoPhoto from "../assets/people/tutores/bruno-salgado.png";
import camilaPradoPhoto from "../assets/people/tutores/camila-prado.png";
import larissaMouraPhoto from "../assets/people/tutores/larissa-moura.png";
import thiagoVidalPhoto from "../assets/people/tutores/thiago-vidal.png";

export const COLORS = Object.freeze({
  bg: "#0a0e1a",
  panel: "#11162a",
  panelStrong: "#161c33",
  border: "#242c4a",
  text: "#c8d3f5",
  textDim: "#7d86ad",
  pink: "#ff2e88",
  cyan: "#2ee6d6",
  purple: "#9d4edd",
  yellow: "#ffd166",
  green: "#5fffa0",
  red: "#ff6b6b",
});

/**
 * Esta lista é a única fonte de verdade para o menu principal,
 * a navegação lateral e o observer de seção ativa.
 */
export const SECTIONS = Object.freeze([
  { id: "quem-somos", label: "Quem somos" },
  { id: "formacoes", label: "Formações" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "ia-devclub", label: "IA no DevClub" },
  { id: "alunos", label: "Alunos" },
  { id: "empresas", label: "Empresas" },
  { id: "tutores", label: "Tutores" },
  { id: "cta", label: "Junte-se" },
]);

export const ETAPAS = Object.freeze([
  {
    id: "aprender",
    numero: "01",
    titulo: "Aprenda",
    descricao:
      "Aulas objetivas, exercícios guiados e fundamentos aplicados desde o início.",
  },
  {
    id: "construir",
    numero: "02",
    titulo: "Construa",
    descricao:
      "Projetos completos para praticar decisões reais e fortalecer o portfólio.",
  },
  {
    id: "revisar",
    numero: "03",
    titulo: "Receba revisão",
    descricao:
      "Feedback técnico, code review e acompanhamento para corrigir o caminho rapidamente.",
  },
  {
    id: "preparar",
    numero: "04",
    titulo: "Prepare-se",
    descricao:
      "GitHub, currículo, entrevistas e posicionamento profissional para buscar oportunidades.",
  },
]);

export const FORMACOES = Object.freeze([
  {
    id: "full-stack",
    file: "formacao-fullstack.js",
    title: "Full Stack",
    desc:
      "Node.js, Express e PostgreSQL no back-end; React no front-end. A jornada percorre produto, API, banco de dados e deploy.",
    stack: ["Node.js", "Express", "PostgreSQL", "React"],
    color: COLORS.cyan,
  },
  {
    id: "front-end",
    file: "formacao-frontend.jsx",
    title: "Front-end",
    desc:
      "Interfaces rápidas, acessíveis e responsivas com React, componentização e boas práticas de experiência do usuário.",
    stack: ["React", "CSS avançado", "Acessibilidade"],
    color: COLORS.pink,
  },
  {
    id: "mobile",
    file: "formacao-mobile.tsx",
    title: "Mobile",
    desc:
      "React Native e Expo, do primeiro componente até a geração de uma versão instalável do aplicativo.",
    stack: ["React Native", "Expo", "APIs REST"],
    color: COLORS.purple,
  },
  {
    id: "dados-python",
    file: "formacao-dados.py",
    title: "Dados & Python",
    desc:
      "Automação, análise e fundamentos para transformar dados brutos em informações úteis para decisões.",
    stack: ["Python", "SQL", "Automação"],
    color: COLORS.yellow,
  },
]);

export const PROJETOS = Object.freeze([
  {
    id: "sistema-vendas",
    titulo: "Sistema de vendas",
    descricao:
      "Cadastro de produtos, clientes, vendas e relatórios em uma aplicação completa.",
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    id: "app-mobilidade",
    titulo: "Aplicativo de mobilidade",
    descricao:
      "Fluxo de solicitação de corrida, autenticação e integração com mapas.",
    stack: ["React Native", "Expo", "API REST"],
  },
  {
    id: "dashboard-dados",
    titulo: "Dashboard de dados",
    descricao:
      "Painel responsivo com indicadores, filtros e visualização de informações.",
    stack: ["Python", "SQL", "React"],
  },
]);

export const TECNOLOGIAS = Object.freeze([
  {
    id: "html",
    nome: "HTML5",
    descricao:
      "Estrutura semântica, formulários, acessibilidade e boas práticas para páginas modernas.",
    cor: "#e34f26",
  },
  {
    id: "css",
    nome: "CSS3",
    descricao:
      "Layouts responsivos, Flexbox, Grid, animações e criação de interfaces profissionais.",
    cor: "#1572b6",
  },
  {
    id: "javascript",
    nome: "JavaScript",
    descricao:
      "Lógica de programação, manipulação do DOM, funções, objetos e consumo de APIs.",
    cor: "#f7df1e",
  },
  {
    id: "react",
    nome: "React",
    descricao:
      "Componentização, estados, propriedades, hooks e desenvolvimento de aplicações modernas.",
    cor: "#61dafb",
  },
  {
    id: "typescript",
    nome: "TypeScript",
    descricao:
      "Tipagem estática para criar aplicações JavaScript mais seguras, escaláveis e organizadas.",
    cor: "#3178c6",
  },
  {
    id: "node",
    nome: "Node.js",
    descricao:
      "Desenvolvimento de APIs, autenticação, regras de negócio e integração com bancos de dados.",
    cor: "#5fa04e",
  },
  {
    id: "postgresql",
    nome: "PostgreSQL",
    descricao:
      "Modelagem de dados, consultas SQL, relacionamentos, filtros e persistência de informações.",
    cor: "#4169e1",
  },
  {
    id: "react-native",
    nome: "React Native",
    descricao:
      "Criação de aplicativos móveis multiplataforma utilizando React, Expo e APIs REST.",
    cor: "#61dafb",
  },
  {
    id: "python",
    nome: "Python",
    descricao:
      "Automação, análise de dados, scripts e fundamentos aplicados à Inteligência Artificial.",
    cor: "#ffd43b",
  },
  {
    id: "git",
    nome: "Git",
    descricao:
      "Controle de versões, branches, commits e organização profissional do desenvolvimento.",
    cor: "#f05032",
  },
  {
    id: "github",
    nome: "GitHub",
    descricao:
      "Hospedagem de código, colaboração, portfólio profissional e integração de projetos.",
    cor: "#f0f3ff",
  },
  {
    id: "vite",
    nome: "Vite",
    descricao:
      "Ambiente moderno e rápido para criação, desenvolvimento e build de aplicações React.",
    cor: "#bd34fe",
  },
]);

/**
 * Estes registros são deliberadamente demonstrativos. Mantenho o aviso
 * visível na interface (via .dc-disclaimer em Alunos.jsx e Tutores.jsx)
 * para não apresentar prova social fictícia como se fosse real.
 *
 * Uso as cores de COLORS em vez de hex soltos pelo mesmo motivo que já
 * apliquei em FORMACOES e TUTORES: se a paleta mudar um dia, só preciso
 * mexer em COLORS, não em cada registro espalhado pelo arquivo.
 */
export const ALUNOS = Object.freeze([
  {
    id: "aluno-marina",
    nome: "Marina Costa",
    de: "atendente de loja",
    para: "dev front-end júnior",
    empresa: "NubioTech",
    commitMessage: "fix: trocou plantão de loja por daily de squad",
    traducao: "trocou os plantões da loja pelas reuniões diárias do time de dev",
    quote:
      "Em 5 meses eu tava lendo código. Em 8, revisando PR de gente com mais tempo de mercado do que eu.",
    foto: marinaCostaPhoto,
    cor: COLORS.cyan,
  },
  {
    id: "aluno-diego",
    nome: "Diego Ferraz",
    de: "motoboy",
    para: "dev mobile pleno",
    empresa: "StoneWave",
    commitMessage: "feat: primeiro app na loja antes mesmo de fechar o curso",
    traducao: "lançou o primeiro aplicativo dele na loja de apps antes de terminar o curso",
    quote:
      "Todo mundo dizia 'não é pra você'. O DevClub foi o primeiro lugar que disse o contrário — e provou.",
    foto: diegoFerrazPhoto,
    cor: COLORS.pink,
  },
  {
    id: "aluno-renata",
    nome: "Renata Aquino",
    de: "estudante de pedagogia",
    para: "analista de dados",
    empresa: "DataForge",
    commitMessage: "refactor: trocou insegurança por portfólio de 6 projetos",
    traducao: "trocou a insegurança por um portfólio com 6 projetos prontos",
    quote:
      "Eu não sabia o que era terminal. Três meses depois eu tava automatizando relatório que a empresa fazia manual há anos.",
    foto: renataAquinoPhoto,
    cor: COLORS.purple,
  },
  {
    id: "aluno-kaique",
    nome: "Kaique Nunes",
    de: "vendedor autônomo",
    para: "dev full stack júnior",
    empresa: "MercadoNow",
    commitMessage: "feat: subiu primeiro produto do zero em produção",
    traducao: "colocou o primeiro sistema criado do zero no ar",
    quote:
      "O diferencial não foi o código. Foi ter gente cobrando consistência de mim toda semana.",
    foto: kaiqueNunesPhoto,
    cor: COLORS.yellow,
  },
]);

export const EMPRESAS = Object.freeze([
  "NubioTech",
  "StoneWave",
  "MercadoNow",
  "DataForge",
  "PixelBank",
  "LocaCloud",
  "ByteHouse",
  "CloudNine BR",
  "OrbitPay",
  "VectorLabs",
]);

/**
 * Removi a declaração antiga de TUTORES que ficou duplicada aqui (era um
 * stub de exemplo, só com o Bruno, sem Object.freeze). Esta é a única
 * versão agora — completa e imutável, igual ao resto do arquivo.
 */
export const TUTORES = Object.freeze([
  {
    id: "bruno-salgado",
    nome: "Bruno Salgado",
    role: "Tutor Full Stack",
    especialidade: "Node.js / PostgreSQL",
    commits: "2.140",
    cor: COLORS.cyan,
    frase:
      "Quando o aluno trava, nós investigamos o problema juntos e explicamos cada decisão.",
    foto: brunoSalgadoPhoto,
  },
  {
    id: "camila-prado",
    nome: "Camila Prado",
    role: "Tutora Front-end",
    especialidade: "React / UI Engineering",
    commits: "1.870",
    cor: COLORS.pink,
    frase:
      "Ensino a pensar em componentes, acessibilidade e experiência antes de apenas estilizar.",
    foto: camilaPradoPhoto,
  },
  {
    id: "thiago-vidal",
    nome: "Thiago Vidal",
    role: "Tutor Mobile",
    especialidade: "React Native / Expo",
    commits: "1.320",
    cor: COLORS.purple,
    frase:
      "O objetivo é levar o aplicativo além do emulador e aproximá-lo de um produto real.",
    foto: thiagoVidalPhoto,
  },
  {
    id: "larissa-moura",
    nome: "Larissa Moura",
    role: "Tutora de Dados",
    especialidade: "Python / SQL",
    commits: "1.560",
    cor: COLORS.yellow,
    frase: "Dados brutos não contam histórias. Eu ensino a fazer as perguntas certas.",
    foto: larissaMouraPhoto,
  },
]);

export const RECURSOS_IA = Object.freeze([
  {
    id: "aprendizado-personalizado",
    icon: "brain",
    title: "Aprendizado personalizado",
    text:
      "A Inteligência Artificial ajuda a identificar dificuldades, sugerir trilhas de estudo e adaptar desafios ao ritmo de evolução de cada aluno.",
  },
  {
    id: "qualidade-de-codigo",
    icon: "code",
    title: "Código com mais qualidade",
    text:
      "Os alunos aprendem a revisar lógica, identificar falhas e comparar soluções sem deixar de compreender as decisões técnicas do projeto.",
  },
  {
    id: "suporte-na-pratica",
    icon: "bot",
    title: "Suporte durante a prática",
    text:
      "Assistentes inteligentes apoiam exercícios e projetos, enquanto tutores orientam arquitetura, segurança e decisões técnicas importantes.",
  },
  {
    id: "produtividade-profissional",
    icon: "rocket",
    title: "Produtividade profissional",
    text:
      "A formação prepara o aluno para automatizar tarefas, documentar projetos e utilizar ferramentas de IA presentes no mercado de tecnologia.",
  },
]);

export const AREAS_INTERESSE = Object.freeze([
  "Front-end",
  "Full Stack",
  "Mobile",
  "Dados & Python",
]);