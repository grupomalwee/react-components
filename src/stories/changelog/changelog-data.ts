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
    version: "1.7.23",
    author: "Gabriel Glatz",
    date: "2025-12-23",
    shortTitle: "Event Agenda",
    fixed: [
      "EventAgenda: ajuste de visual e onClick.",
      "Date Time Picker: botão de limpar opções ajustado o visual.",
    ],
  },
  {
    version: "1.7.22",
    author: "Gabriel Glatz",
    date: "2025-12-22",
    shortTitle: "Event Agenda",
    added: ["Clear Button: novo componente para uso de Triggers."],
    fixed: [
      "EventAgenda: ajuste de visual e range",
      "Date Time Picker: botão de limpar opções.",
      "Export: exportação das tipagems dos Selects.",
    ],
  },
  {
    version: "1.7.21",
    author: "Gabriel Glatz",
    date: "2025-12-22",
    shortTitle: "Event Agenda",
    fixed: ["EventAgenda: ajuste de responsividade e funcionamento."],
  },
  {
    version: "1.7.20",
    author: "Gabriel Glatz",
    date: "2025-12-18",
    shortTitle: "Event Agenda",
    fixed: ["EventAgenda: arrumar uso de types e props."],
  },
  {
    version: "1.7.19",
    author: "Gabriel Glatz",
    date: "2025-12-18",
    shortTitle: "Event Agenda",
    fixed: ["EventAgenda: erro de build de componente."],
  },
  {
    version: "1.7.18",
    author: "Gabriel Glatz",
    date: "2025-12-18",
    shortTitle: "Event Agenda",
    added: ["EventaAgenda: adicionado novo componente."],
  },
  {
    version: "1.7.17",
    author: "Gabriel Glatz",
    date: "2025-12-17",
    shortTitle: "Chart",
    added: [
      "MultiSelect: adicionado novo componente.",
      "Banner: adicionado novo componente.",
    ],
    fixed: ["Chart: corrigido erros de Rotulos X e title position."],
  },
  {
    version: "1.7.16",
    author: "Gabriel Glatz",
    date: "2025-12-16",
    shortTitle: "Chart",
    fixed: ["Chart: corrigido erro de yAxis e erros de Build."],
  },
  {
    version: "1.7.15",
    author: "Gabriel Glatz",
    date: "2025-12-16",
    shortTitle: "Chart",
    fixed: ["Chart: corrigido erro de yAxis."],
  },
  {
    version: "1.7.14",
    author: "Gabriel Glatz",
    date: "2025-12-15",
    shortTitle: "Chart",
    added: [
      "Selects: adicionado prop disabled and empty.",
      "Chart: adicionado suporte a Dois eixos.",
    ],
    fixed: [
      "Chart: corrigido label negativo, title width, periodLabel and LabelPosition.",
    ],
  },
  {
    version: "1.7.13",
    author: "Gabriel Glatz",
    date: "2025-12-11",
    shortTitle: "Checkbox ",
    added: [
      "CheckboxTree: adicionado novo componente CheckboxTree para seleção hierárquica com estados de seleção completos, parciais e não selecionados.",
      "Checkbox: documentação atualizada com exemplos de uso do estado indeterminado.",
    ],
    fixed: [
      "Checkbox: corrigido erro de nao mostras icons de Check e Minus.",
      "Chromatic: ajusta versão outdated do Chromatic.",
    ],
  },
  {
    version: "1.7.12",
    author: "Gabriel Glatz",
    date: "2025-12-08",
    shortTitle: "Combobox e DateTimePicker",
    added: [
      "Combobox:Nova props Empty para customizar a mensagem quando não houver itens.",
      "Selects: Adicionado melhor navegação via teclado para acessibilidade.",
    ],
    fixed: ["DateTimePicker: corrigido a animacao de fechar."],
  },
  {
    version: "1.7.11",
    author: "Gabriel Glatz",
    date: "2025-12-05",
    shortTitle: "Select, Label e DateTimePicker",

    fixed: [
      "DateTimePicker: corrigido a falta de um botão de fechar.",
      "Select: ajustes no Generics.",
      "Select: ajustado espacamento desnecessario entre Label e Componente.",
    ],
  },
  {
    version: "1.7.10",
    author: "Gabriel Glatz",
    date: "2025-12-03",
    shortTitle: "RangePicker, Checkbox e Calendar",
    added: [
      "Checkbox: suporte a estado indeterminado e atualização da documentação.",
      "DebouncedInput: exportação do componente no módulo de formulários.",
      "Event Calendar: suporte a localização e melhoria na formatação de tempo.",
    ],
    fixed: [
      "Filter: correção no import de estilos globais nas stories.",
      "RangePicker: ajuste na exibição do placeholder quando nenhum intervalo é selecionado.",
      "AvatarCombobox: correção na esquematização de cores padrão a aplicação e nova prop.",
    ],
  },
  {
    version: "1.7.9",
    author: "Gabriel Glatz",
    date: "2025-12-02",
    shortTitle: "Stories e Select",
    fixed: [
      "Select: refatoração da estrutura das stories para melhor usabilidade.",
      "Select: arrumado import de Select no propio componente.",
      "Stories: estruturação de arquivos e pastas.",
    ],
  },
  {
    version: "1.7.8",
    author: "Gabriel Glatz",
    date: "2025-12-01",
    shortTitle: "Event Calendar e AvatarCombobox",
    added: [
      "AvatarCombobox: novo componente para seleção de usuários com avatar.",
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
