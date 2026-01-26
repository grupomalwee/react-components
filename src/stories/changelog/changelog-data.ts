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
    version: "1.8.6",
    author: "Gabriel Glatz",  
    date: "2026-01-26",
    shortTitle: "TimeSeries, Leaderboard e Sonner",
    added: [
      "TimeSeries: nova propriedade `timeSeries` para visualização de intervalos de tempo no gráfico.",
    ],
    changed: [
      "Sonner: corrigido o style inconsistente.",
    ],
  },
  {
    version: "1.8.5",
    author: "Gabriel Glatz",
    date: "2026-01-23",
    shortTitle: "ThemeColorTest, MultiSelect, Chart, Dialog e Selects",
    added: [
      "ThemeColorTest: nova página dedicada para visualização e validação de tokens de cores do design system, permitindo testes rápidos de contraste e consistência em diferentes temas.",
    ],
    changed: [
      "MultiSelect: corrigido o comportamento do Trigger para garantir que os valores exibidos estejam sempre sincronizados com o estado interno da seleção, evitando inconsistências visuais após limpezas rápidas.",
      "Chart, Dialog e Selects: padronização das cores de borda para alinhar com as diretrizes atualizadas do design system, garantindo harmonia visual entre componentes complexos.",
    ],
  },
  {
    version: "1.8.4",
    author: "Gabriel Glatz",
    date: "2026-01-19",
    shortTitle: "TimeScrollPicker e Price",
    added: [
      "Price: novo componente especializado para exibição de valores monetários, com suporte a localização automática, prefixos/sufixos customizáveis e formatação de decimais otimizada para leitura financeira.",
    ],
    changed: [
      "TimeScrollPicker: redesign da interface de rolagem para melhorar a precisão da seleção e a experiência do usuário em dispositivos touch e desktop.",
    ],
  },
  {
    version: "1.8.3",
    author: "Gabriel Glatz",
    date: "2026-01-16",
    shortTitle: "ButtonBase e Tooltips",
    added: [
      "ButtonBase: adicionado suporte nativo à prop Tooltip para exibir dicas contextuais ao passar o mouse sobre botões, melhorando a descoberta de funcionalidades e acessibilidade ao fornecer informações adicionais sem ocupar espaço visual permanente.",
    ],
    fixed: [
      "TooltipBase: ajustado intervalo de exibição do tooltip para garantir tempo adequado de leitura antes de desaparecer, com delay de entrada configurável para evitar tooltips intrusivos durante navegação rápida do mouse.",
      "Selects: implementados tooltips informativos nos botões de paginação (anterior/próximo/primeira/última página) para clarificar ações disponíveis, especialmente útil para novos usuários e conformidade com padrões de acessibilidade.",
      "DateTimePicker: adicionados tooltips descritivos em todos os botões de ação para melhorar usabilidade e reduzir curva de aprendizado ao interagir com o componente pela primeira vez.",
    ],
  },
  {
    version: "1.8.2",
    author: "Gabriel Glatz",
    date: "2026-01-16",
    shortTitle: "Chart, Selects e Tooltip",
    added: [
      "Chart: implementada tela de loading integrada para feedback visual durante o processamento de grandes volumes de dados e ajuste automático de labels em barras de tamanho reduzido para evitar sobreposição.",
      "Tooltip: implementado novo comportamento de posicionamento inteligente para evitar que o tooltip saia dos limites da viewport em telas pequenas.",
    ],
    changed: [
      "Selects: refatoração profunda do sistema de estilos e ícones para garantir paridade visual e funcional entre os componentes Select, Combobox e MultiSelect.",
      "DateTimePicker: atualizado o sistema de temas para utilizar os mesmos tokens dos selects, fortalecendo a consistência visual do pacote de formulários.",
    ],
  },
  {
    version: "1.8.1",
    author: "Gabriel Glatz",
    date: "2026-01-14",
    shortTitle: "Selects e MultiCombobox",

    changed: [
      "Selects: padronização dos ícones de busca e chevron em toda a família de seletores, utilizando a biblioteca Phosphor para maior consistência estética.",
      "MultiCombobox: adicionada a propriedade `searchPlaceholder`, permitindo a customização do texto de dica no campo de pesquisa interna.",
      "Tipos e props: revisão completa da tipagem TypeScript para eliminar redundâncias e melhorar o suporte a IntelliSense em IDEs, especialmente em props genéricas.",
    ],
    fixed: [
      "Selects: resolvidos conflitos de nomenclatura de propriedades que causavam avisos de compilação e instabilidade em formulários controlados.",
      "MultiSelect / MultiCombobox: corrigido fallback de renderização quando a busca é desativada, garantindo que o `emptyMessage` seja respeitado em todos os cenários.",
    ],
  },
  {
    version: "1.8.0",
    author: "Gabriel Glatz",
    date: "2026-01-12",
    shortTitle: "Chart e Selects",
    added: [
      "Selects: adicionado funcionalidade de limpar seleção usando um ícone X no trigger dos componentes Select, Combobox e MultiSelect, permitindo reset rápido do valor selecionado com feedback visual claro e suporte a teclado (Escape).",
    ],
    fixed: [
      "Chart: corrigido bug crítico do formatador de legenda que não aplicava corretamente a função customizada de formatação, resultando em exibição incorreta de labels no eixo e tooltips interativos, afetando principalmente gráficos com valores monetários e percentuais.",
    ],
  },
  {
    version: "1.7.28",
    author: "Gabriel Glatz",
    date: "2026-01-09",
    shortTitle: "React Day Picker e Selects",
    fixed: [
      "DateTimePicker: corrigido uso de propriedades deprecadas 'from' e 'to', para compatibilidade com versões mais recentes do react-day-picker, garantindo funcionamento adequado do seletor de datas.",
      "RangePicker: atualizado para remover propriedades 'from' e 'to' deprecadas, evitando warnings de depreciação e mantendo estabilidade futura.",
      "Selects: resolvidos problemas de altura inconsistente que causavam renderização incorreta do dropdown em diferentes contextos, padronizando cálculos de height para garantir alinhamento adequado do menu de opções.",
    ],
  },
  {
    version: "1.7.27",
    author: "Gabriel Glatz",
    date: "2026-01-08",
    shortTitle: "React Day Picker e Pickers",
    fixed: [
      "DateTimePicker: corrigido bug visual de alinhamento e espaçamento causado pela atualização do react-day-picker para versão 9.9.0, garantindo consistência visual entre os calendários.",
      "RangePicker: resolvido problema de renderização do calendário introduzido na versão 9.9.0 do react-day-picker, incluindo correções no comportamento de seleção de intervalos.",
      "Selects: corrigido comportamento errático do scroll ao navegar entre opções usando teclado e mouse, melhorando a acessibilidade e experiência do usuário.",
    ],
  },
  {
    version: "1.7.26",
    author: "Gabriel Glatz",
    date: "2026-01-08",
    shortTitle: "DateTimePicker",
    added: [
      "DateTimePicker: implementado novo seletor de horários com interface intuitiva, permitindo seleção de horas e minutos através de dropdown ou input direto, com validação automática de formato.",
    ],
    fixed: [
      "React-day-picker: resolvido aviso de versão desatualizada, atualizando dependência e garantindo compatibilidade com as últimas correções de segurança.",
      "DateTimePicker: padronizado tipagem de valores vazios de undefined para null, melhorando consistência com formulários controlados e evitando comportamentos inesperados.",
      "Selects: eliminado comportamento errático de scroll que impedia navegação fluida entre opções, especialmente em listas longas.",
    ],
  },
  {
    version: "1.7.25",
    author: "Gabriel Glatz",
    date: "2026-01-06",
    shortTitle: "DateTimePicker",
    added: [
      "DateTimePicker: adicionado callback onConfirm que é disparado quando o usuário confirma a seleção de data/hora, permitindo validação customizada e integração mais robusta com formulários antes de fechar o picker.",
    ],
  },
  {
    version: "1.7.24",
    author: "Gabriel Glatz",
    date: "2025-12-26",
    shortTitle: "DateTimePicker e MultiSelect",
    fixed: [
      "MultiSelect: corrigido problema visual onde ícones de chevron e clear se moviam durante interações, causando layout shift indesejado. Agora mantêm posição fixa e estável.",
      "DateTimePicker: ajustado estado hover do botão cancelar que não estava exibindo feedback visual adequado, melhorando clareza das ações disponíveis.",
    ],
  },
  {
    version: "1.7.23",
    author: "Gabriel Glatz",
    date: "2025-12-23",
    shortTitle: "Event Agenda",
    fixed: [
      "EventAgenda: refinado layout de eventos para melhor alinhamento e espaçamento, além de corrigir propagação incorreta do evento onClick em eventos aninhados.",
      "DateTimePicker: redesenhado botão de limpar com ícone mais visível e estados hover/active mais distintos, melhorando affordance da ação de limpeza.",
    ],
  },
  {
    version: "1.7.22",
    author: "Gabriel Glatz",
    date: "2025-12-22",
    shortTitle: "Event Agenda",
    added: [
      "ClearButton: novo componente reutilizável que pode ser usado como trigger em Popovers e Dialogs, oferecendo UI consistente para ações de limpeza em diferentes contextos.",
    ],
    fixed: [
      "EventAgenda: aprimorado sistema de cores e indicadores visuais de eventos, além de corrigir cálculo de ranges que causava sobreposição incorreta de eventos adjacentes.",
      "DateTimePicker: implementado botão de limpar que reseta tanto data quanto hora para valores padrão, com confirmação visual do estado limpo.",
      "Exports: adicionado exports de tipos TypeScript (SelectOption, SelectProps, ComboboxProps) para permitir tipagem forte em projetos consumidores.",
    ],
  },
  {
    version: "1.7.21",
    author: "Gabriel Glatz",
    date: "2025-12-22",
    shortTitle: "Event Agenda",
    fixed: [
      "EventAgenda: implementado design responsivo com breakpoints para mobile, tablet e desktop, além de corrigir lógica de renderização de eventos que falhava em timezones diferentes.",
    ],
  },
  {
    version: "1.7.20",
    author: "Gabriel Glatz",
    date: "2025-12-18",
    shortTitle: "Event Agenda",
    fixed: [
      "EventAgenda: refatorado sistema de tipos para maior type-safety, tornando props obrigatórias explícitas e removendo any types, além de padronizar nomenclatura de propriedades.",
    ],
  },
  {
    version: "1.7.19",
    author: "Gabriel Glatz",
    date: "2025-12-18",
    shortTitle: "Event Agenda",
    fixed: [
      "EventAgenda: resolvido erro crítico de build causado por import circular de dependências, impedindo compilação TypeScript e geração do bundle de produção.",
    ],
  },
  {
    version: "1.7.18",
    author: "Gabriel Glatz",
    date: "2025-12-18",
    shortTitle: "Event Agenda",
    added: [
      "EventAgenda: novo componente para visualização de eventos em formato de agenda diária/semanal/mensal, com suporte a drag-and-drop, categorização por cores e filtros customizáveis.",
    ],
  },
  {
    version: "1.7.17",
    author: "Gabriel Glatz",
    date: "2025-12-17",
    shortTitle: "Chart",
    added: [
      "MultiSelect: novo componente de seleção múltipla com busca integrada, suporte a seleção em massa (select all/none), badges de itens selecionados e keyboard navigation completa.",
      "Banner: novo componente para exibição de mensagens importantes em topo de página, com variantes de sucesso, aviso, erro e informação, além de ação de dismiss opcional.",
    ],
    fixed: [
      "Chart: corrigido posicionamento de rótulos do eixo X que sobrepunham em datasets grandes, além de ajustar centralização do título do gráfico para diferentes tamanhos de container.",
    ],
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
      "CheckboxTree: novo componente para seleção hierárquica em árvores de dados, com propagação automática de estados (checked/indeterminate/unchecked) entre pais e filhos, suporte a lazy loading e customização de ícones de expansão.",
      "Checkbox: documentação expandida com exemplos práticos do estado indeterminado, casos de uso em formulários complexos e integração com form libraries como React Hook Form.",
    ],
    fixed: [
      "Checkbox: resolvido bug crítico onde ícones de check e minus não renderizavam devido a conflito de z-index e problema de importação de ícones do Phosphor.",
      "Chromatic: atualizado para versão mais recente para corrigir vulnerabilidades de segurança e melhorar performance de visual regression testing.",
    ],
  },
  {
    version: "1.7.12",
    author: "Gabriel Glatz",
    date: "2025-12-08",
    shortTitle: "Combobox e DateTimePicker",
    added: [
      "Combobox: nova prop Empty que aceita React.ReactNode para customizar completamente a mensagem exibida quando a busca não retorna resultados, permitindo ilustrações e ações customizadas.",
      "Selects: implementado suporte completo a navegação via teclado (Arrow Up/Down, Enter, Escape, Home, End) seguindo padrões ARIA para melhor acessibilidade e conformidade com WCAG 2.1.",
    ],
    fixed: [
      "DateTimePicker: corrigido problema onde animação de fechamento era interrompida abruptamente, agora completando transição suave de fade-out antes de desmontar o componente.",
    ],
  },
  {
    version: "1.7.11",
    author: "Gabriel Glatz",
    date: "2025-12-05",
    shortTitle: "Select, Label e DateTimePicker",

    fixed: [
      "DateTimePicker: adicionado botão de fechar (X) no canto superior direito do popover para melhorar usabilidade, permitindo dismiss explícito sem precisar clicar fora.",
      "Select: refatorado sistema de tipos genéricos para melhor inferência de tipos quando usado com TypeScript, eliminando necessidade de type assertions manuais.",
      "Select: removido margin-top desnecessário entre Label e componente que causava inconsistência visual em formulários, padronizando espaçamento para 4px.",
    ],
  },
  {
    version: "1.7.10",
    author: "Gabriel Glatz",
    date: "2025-12-03",
    shortTitle: "RangePicker, Checkbox e Calendar",
    added: [
      "Checkbox: implementado suporte completo ao estado indeterminado (tri-state) com exemplo de uso em seleção de grupos, incluindo API para controle programático e documentação de padrões de UX.",
      "DebouncedInput: agora exportado no módulo principal de formulários, permitindo reutilização em campos de busca e inputs de alta frequência com debounce configurável.",
      "EventCalendar: adicionado suporte a múltiplos idiomas (pt-BR, en-US, es-ES) com localização automática de formatos de data/hora usando Intl API, além de timezone awareness.",
    ],
    fixed: [
      "Filter: corrigido caminho de import de estilos globais nas stories que causava falha no carregamento de CSS no Storybook, garantindo rendering correto de exemplos.",
      "RangePicker: ajustado placeholder para exibir texto apropriado ('Selecione um período') quando nenhum intervalo está selecionado, em vez de mostrar valores undefined.",
      "AvatarCombobox: padronizado esquema de cores para seguir design system da aplicação, adicionando prop customColor para permitir override quando necessário.",
    ],
  },
  {
    version: "1.7.9",
    author: "Gabriel Glatz",
    date: "2025-12-02",
    shortTitle: "Stories e Select",
    fixed: [
      "Select: reestruturação completa das stories do Storybook organizando por casos de uso (Basic, With Search, Multi-select, Async) com controles interativos e documentação inline de props.",
      "Select: removido import circular que causava erro onde o componente importava a si mesmo, corrigindo build em modo produção e eliminando warnings de bundle.",
      "Stories: reorganização da estrutura de pastas seguindo padrão Atomic Design (atoms/molecules/organisms) para melhor navegabilidade e descoberta de componentes.",
    ],
  },
  {
    version: "1.7.8",
    author: "Gabriel Glatz",
    date: "2025-12-01",
    shortTitle: "Event Calendar e AvatarCombobox",
    added: [
      "AvatarCombobox: novo componente especializado para seleção de usuários com preview de avatar circular/quadrado, suporte a status indicators (online/offline/away), busca por nome e email, e integração com APIs de usuários.",
      "EventCalendar: suite completa de componentes para calendário de eventos incluindo views diária/semanal/mensal, hooks customizados (useCalendarNavigation, useEventFilters), drag-and-drop de eventos, e suporte a eventos recorrentes.",
      "Calendar: documentação expandida com 15+ exemplos interativos cobrindo casos de uso comuns: disabled dates, range selection, multi-date, custom day rendering, e integração com formulários.",
      "Select: adicionada prop className que é aplicada ao container principal, permitindo customização de largura, margens e outros estilos sem precisar wrapper adicional.",
      "DestructiveDialog: adicionada prop className para customização do container do diálogo, facilitando ajustes de posição e dimensões em contextos específicos.",
    ],
    changed: [
      "Calendar: redesign completo do layout com espaçamento otimizado, tamanhos de fonte ajustados para melhor legibilidade, e estados hover/selected mais distintos. DateTimePicker atualizado para refletir novo design.",
      "Select: migração das stories para formato CSF 3.0 com uso de controls automáticos, actions para eventos, e organização por categorias para facilitar exploração no Storybook.",
      "Stories: padronização de títulos seguindo convenção Components/Category/ComponentName para melhor hierarquia e busca no Storybook.",
    ],
  },
  {
    version: "1.7.7",
    author: "Gabriel Glatz",
    date: "2025-11-26",
    shortTitle: "Novo Dashboard e HoverCard",
    added: [
      "Dashboard Template: novo template completo de dashboard responsivo com sidebar colapsável, header com breadcrumbs, grid system flexível, widgets de estatísticas, e área de conteúdo adaptativa para acelerar desenvolvimento de paineis administrativos.",
      "HoverCard: integração de HoverCard nos exemplos de Status para exibir informações adicionais on-hover, demonstrando padrões de progressive disclosure e tooltip complexos.",
      "GitHub Copilot Agents: configuração de agents especializados para geração automática de documentação de componentes, testes unitários, e stories do Storybook baseados em código existente.",
      "Storybook Controls: implementação completa de controls interativos para Select (placeholder, disabled, error states), Combobox (search behavior, async loading), e MultiCombobox (max selections, custom rendering).",
      "Tabs: novas props de animação (animationDuration, animationType) para controlar transições entre tabs, incluindo fade, slide e none.",
    ],
    changed: [
      "Badge: padronização do uso em todas as stories removendo importações duplicadas e aplicando nomenclatura consistente. DateTimePicker ajustado para exibir data atual como padrão em vez de null.",
      "CI/CD: migração para pnpm v9 com novo algoritmo de resolução de dependências, uso de flag --frozen-lockfile em CI para garantir builds determinísticos, e otimização de cache entre workflows para reduzir tempo de build em 40%.",
      "Badge: renomeação global de BadgeBase para Badge em todos os arquivos (84 ocorrências) para simplificar API e melhorar descoberta do componente.",
      "Modal: expansão de exemplos no Storybook incluindo modais aninhados, modais com formulários complexos, confirmação multi-step, e integração com validação assíncrona.",
    ],
    fixed: [
      "Chart: resolvido erro TypeScript no componente Highlight onde tipo ChartConfig não era corretamente propagado, causando warnings em builds strict mode e IDEs.",
      "DateTimePicker: corrigido tipo de retorno que alternava incorretamente entre Date | undefined, agora padronizado para Date | null para consistência com padrões de formulários controlados.",
      "Carousel: posicionamento fixado dos botões de navegação para manter posição consistente independente do conteúdo, com ajustes de z-index para garantir clicabilidade sobre imagens.",
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
