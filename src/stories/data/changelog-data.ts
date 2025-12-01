export type ChangeItem = {
  version: string;
  author?: string;
  date?: string;
  added?: string[];
  fixed?: string[];
  changed?: string[];
  notes?: string[];
  shortTitle?: string;
};

export const changelogData: ChangeItem[] = [
  {
    version: "1.7.8",
    author: "Gabriel Glatz",
    date: "2025-12-01",
    shortTitle: "Event Calendar e AvatarSelect",
    added: [
      "AvatarSelect: novo componente para seleção de usuários com avatar.",
      "Event Calendar: implementados componentes e views de calendário de eventos com hooks personalizados.",
      "Calendar: adicionada documentação melhorada e exemplos interativos nas stories.",
      "Select: adicionada prop `className` para maior flexibilidade de estilização.",
      "DestructiveDialog: adicionada prop `className` para customização de estilos.",
    ],
    changed: [
      "Calendar: melhorias no layout e estilização do componente e DateTimePicker.",
      "Select: refatoração da estrutura das stories para melhor usabilidade.",
      "Stories: atualizados títulos para maior consistência.",
    ],
   
  },
  {
    version: "1.7.7",
    author: "Gabriel Glatz",
    date: "2025-11-26",
    shortTitle: "Novo Dashboard e HoverCard",
    added: [
      "Adicionado Novo Dashboard no stories de Templates.",
      "Adicionada funcionalidade HoverCard nas stories de Status.",
      "Criação de Agents para melhor documentação do Projeto.",
      "Setup de Controls (Storybook) para componentes de Select(Combobox, MultiCombobox e Select Simple).",
      "Props de Animations para o Tabs.",
    ],
    changed: [
      "Refatoração do uso do Badge nas stories e ajustes nas stories do DateTimePicker para comportamento padrão de data.",
      "CI: migração para pnpm v9, uso de --frozen-lockfile e padronização do setup de pnpm em workflows.",
      "Alterado o nome de BadgeBase para Badge em todas as suas ocorencias.",
      "Novos exemplos de Modal StoryBook.",
    ],
    fixed: [
      "Chart: ajustado erro de tipagem que causava warnings em builds estritos no Componente Filho Highlight.",
      "Picker: alterado tipagem não coerente no DateTimePicker.",
      "Carousel: fixado os botões de navegação para melhor posicionamento e estilo.",
    ],
  },
  {
    version: "1.7.6",
    author: "Gabriel Glatz",
    date: "2025-11-18",
    shortTitle: "Badge configurável e CodeBlock",
    added: [
      "Badge: propriedades configuráveis para permitir ajustes de aparência e comportamento s.",
      "StatusIndicator: adicionamos novas opções de configuração para personalizar estados e cores dos indicadores.",
      "CodeBlock: implementamos suporte a múltiplas linguagens no realce de sintaxe, com detecção mais robusta.",
      "Charts: incluímos novos exemplos práticos para facilitar a integração em dashboards.",
    ],
    changed: [
      "Badge: refatoramos os estilos para garantir consistência visual entre temas e tamanhos.",
      "DateTimePicker: Removemos as props `hideHour` e `hideMinute`. E atualizamos a prop `displayFormat`.",
      "Tooltip: simplificamos a lógica e aplicamos otimizações para reduzir re-renders e melhorar performance.",
      "Configurações: limpamos itens relacionados a Docker e workflows de CI para simplificar o repositório.",
      "NPM: Trocamos de packages manager npm para pnpm para melhorar a performance e gerenciamento de dependências.",
    ],
    fixed: [
      "Chart: ajustamos a posição do rótulo do eixo Y quando usado o modo `leftTop`.",
      "Pickers: aplicados pequenos ajustes de layout para evitar sobreposição de elementos.",
      "ProgressBase/Calendar: correções visuais que normalizam a apresentação entre temas.",
    ],
    notes: [
      "Documentação: atualizamos o README e o changelog com instruções e exemplos mais claros.",
      "Exemplos: revisamos e ampliamos os exemplos para cobrir mais casos de uso.",
    ],
  },
  {
    version: "1.7.5",
    author: "Gabriel Glatz",
    date: "2025-11-13",
    shortTitle: "RangePicker pt-BR e Combobox",
    added: [
      "RangePicker: adicionamos suporte à formatação em pt-BR para exibir intervalos no formato local.",
      "DateTimePicker: agora abre no mês de borda, melhorando a navegação entre meses adjacentes.",
      "ButtonBase: aprimoramos o suporte a `children` e o estado de loading para comportamentos previsíveis.",
      "CodeBlock: introduzimos abas e melhorias no realce de sintaxe para múltiplos blocos.",
      "Combobox: reorganizamos a estrutura para melhorar acessibilidade e integração com formulários.",
    ],
    fixed: [
      "Pickers: ajustes finos de estilo que corrigem alinhamentos e espaçamentos.",
      "ProgressBase: correções no layout para evitar que barras fiquem desalinhadas.",
      "Combobox: removida a prop obsoleta `disabled` e atualizada a API para o novo comportamento.",
      "Chart: corrigimos o posicionamento do rótulo do eixo Y em algumas configurações.",
    ],
  },
  {
    version: "1.7.4",
    author: "Gabriel Glatz",
    date: "2025-11-10",
    shortTitle: "Charts: novas props e exemplos",
    added: [
      "Charts: adicionamos exemplos adicionais para demonstrar casos de uso comuns.",
      "Charts: refatoramos o estilo das labels para melhorar legibilidade em diferentes tamanhos.",
      "Chart: incluímos novas props de formatação voltadas para pt-BR.",
      "Pickers: adicionadas props para personalizar a formatação de datas.",
    ],
  },
  {
    version: "1.7.3",
    author: "Gabriel Glatz",
    date: "2025-11-04",
    shortTitle: "Charts: formatadores customizáveis",
    added: [
      "Charts: disponibilizamos formatadores de valores customizáveis para adaptar labels e tooltips aos requisitos do projeto.",
    ],
    fixed: [
      "LineChart: corrigimos um erro de tipagem que causava warnings em builds estritos.",
    ],
    notes: ["Publicação: pacote publicado na versão 1.7.3."],
  },
  {
    version: "1.7.2",
    author: "Gabriel Glatz",
    date: "2025-10-31",
    shortTitle: "Verificação de build (script)",
    added: [
      "Build: incluímos um script de verificação (`scripts/check-dist-build.js`) para validar o build de distribuição antes do publish.",
    ],
    fixed: [
      "Exports: corrigimos pontos na exportação de módulos para garantir compatibilidade entre bundlers.",
    ],
  },
  {
    version: "1.7.1",
    author: "Gabriel Glatz",
    date: "2025-10-29",
    shortTitle: "Corrigidos exports e CI",
    fixed: [
      "Exports: ajustamos `index.ts` para corrigir exportações incorretas e evitar imports quebrados.",
      "CI: melhoramos o workflow de versionamento e publicação para reduzir falhas automáticas.",
    ],
  },
];

export default changelogData;
