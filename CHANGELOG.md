# Changelog

<p align="center">
  <a href="https://www.npmjs.com/package/@mlw-packages/react-components">
    <img alt="npm version" src="https://img.shields.io/npm/v/@mlw-packages/react-components?style=for-the-badge&label=npm&logo=npm&color=CB3837" />
  </a>
  <a href="https://main--68e80310a069c2f10b546ef3.chromatic.com">
    <img alt="storybook" src="https://img.shields.io/badge/storybook-live-ff4785?style=for-the-badge&logo=storybook" />
  </a>
</p>

> Histórico de alterações do pacote `@mlw-packages/react-components` — formato inspirado em "Keep a Changelog" e SemVer.

## Índice

- [1.7.14 — 2025-12-15](#171714---2025-12-15)
- [1.7.13 — 2025-12-11](#171713---2025-12-11)
- [1.7.12 — 2025-12-08](#171712---2025-12-08)
- [1.7.11 — 2025-12-05](#171711---2025-12-05)
- [1.7.10 — 2025-12-03](#171710---2025-12-03)
- [1.7.9 — 2025-12-02](#17179---2025-12-02)
- [1.7.8 — 2025-12-01](#17178---2025-12-01)
- [1.7.7 — 2025-11-26](#17177---2025-11-26)
- [1.7.6 — 2025-11-18](#17176---2025-11-18)
- [1.7.5 — 2025-11-13](#17175---2025-11-13)
- [1.7.4 — 2025-11-10](#17174---2025-11-10)
- [1.7.3 — 2025-11-04](#17173---2025-11-04)
- [1.7.2 — 2025-10-31](#17172---2025-10-31)
- [1.7.1 — 2025-10-29](#17171---2025-10-29)

## 1.7.18 — 2025-12-18

**Author:** Gabriel Glatz

### Added

- EventAgenda: adicionado novo componente.
---
## 1.7.17 — 2025-12-17

**Author:** Gabriel Glatz

### Added

- MultiSelect: adicionado novo componente.
- Banner: adicionado novo componente.


### Fixed

- Chart: corrigido erros de Rotulos X e title position.

---
## 1.7.16 — 2025-12-16

**Author:** Gabriel Glatz

### Fixed

- Chart: corrigido erro de yAxis e erros de Build.

---
## 1.7.15 — 2025-12-15

**Author:** Gabriel Glatz

### Fixed

- Chart: corrigido erro de yAxis.

---
## 1.7.14 — 2025-12-15

**Author:** Gabriel Glatz

### Added

- Selects: adicionado prop disabled and empty.
- Chart: adicionado suporte a Dois eixos.

### Fixed

- Chart: corrigido label negativo, title width, periodLabel and LabelPosition.

---

## 1.7.13 — 2025-12-11

**Author:** Gabriel Glatz

### Added

- CheckboxTree: adicionado novo componente CheckboxTree para seleção hierárquica com estados de seleção completos, parciais e não selecionados.
- Checkbox: documentação atualizada com exemplos de uso do estado indeterminado.

### Fixed

- Checkbox: corrigido erro de nao mostras icons de Check e Minus.
- Chromatic: ajusta versão outdated do Chromatic.

---

## 1.7.12 — 2025-12-08

**Author:** Gabriel Glatz

### Added

- Combobox: Nova props `Empty` para customizar a mensagem quando não houver itens.
- Selects: Adicionado melhor navegação via teclado para acessibilidade.

### Fixed

- DateTimePicker: corrigido a animacao de fechar.

---

## 1.7.11 — 2025-12-05

**Author:** Gabriel Glatz

### Fixed

- DateTimePicker: corrigido a falta de um botão de fechar.
- Select: ajustes no Generics.
- Select: ajustado espacamento desnecessario entre Label e Componente.

---

## 1.7.10 — 2025-12-03

**Author:** Gabriel Glatz

### Added

- Checkbox: suporte a estado indeterminado e atualização da documentação.
- DebouncedInput: exportação do componente no módulo de formulários.
- Event Calendar: suporte a localização e melhoria na formatação de tempo.

### Fixed

- Filter: correção no import de estilos globais nas stories.
- RangePicker: ajuste na exibição do placeholder quando nenhum intervalo é selecionado.
- AvatarCombobox: correção na esquematização de cores padrão a aplicação e nova prop.

---

## 1.7.9 — 2025-12-02

**Author:** Gabriel Glatz

### Fixed

- Select: refatoração da estrutura das stories para melhor usabilidade.
- Select: arrumado import de Select no propio componente.
- Stories: estruturação de arquivos e pastas.

---

## 1.7.8 — 2025-12-01

**Author:** Gabriel Glatz

### Added

- AvatarCombobox: novo componente para seleção de usuários com avatar.
- Event Calendar: implementados componentes e views de calendário de eventos com hooks personalizados.
- Calendar: adicionada documentação melhorada e exemplos interativos nas stories.
- Select: adicionada prop `className` para maior flexibilidade de estilização.
- DestructiveDialog: adicionada prop `className` para customização de estilos.

### Changed

- Calendar: melhorias no layout e estilização do componente e DateTimePicker.
- Select: refatoração da estrutura das stories para melhor usabilidade.
- Stories: atualizados títulos para maior consistência.

---

## 1.7.7 — 2025-11-26

**Author:** Gabriel Glatz

### Added

- Adicionado Novo Dashboard no stories de Templates.
- Adicionada funcionalidade HoverCard nas stories de Status.
- Criação de Agents para melhor documentação do Projeto.
- Setup de Controls (Storybook) para componentes de Select (Combobox, MultiCombobox e Select Simple).
- Props de Animations para o Tabs.

### Changed

- Refatoração do uso do Badge nas stories e ajustes nas stories do DateTimePicker para comportamento padrão de data.
- CI: migração para pnpm v9, uso de `--frozen-lockfile` e padronização do setup de pnpm em workflows.
- Alterado o nome de `BadgeBase` para `Badge` em todas as suas ocorrências.
- Novos exemplos de Modal StoryBook.

### Fixed

- Chart: ajustado erro de tipagem que causava warnings em builds estritos no Componente Filho Highlight.
- Picker: alterado tipagem não coerente no DateTimePicker.
- Carousel: fixado os botões de navegação para melhor posicionamento e estilo.

---

## 1.7.6 — 2025-11-18

**Author:** Gabriel Glatz

### Added

- Badge: propriedades configuráveis para permitir ajustes de aparência e comportamento.
- StatusIndicator: adicionamos novas opções de configuração para personalizar estados e cores dos indicadores.
- CodeBlock: implementamos suporte a múltiplas linguagens no realce de sintaxe, com detecção mais robusta.
- Charts: incluímos novos exemplos práticos para facilitar a integração em dashboards.

### Changed

- Badge: refatoramos os estilos para garantir consistência visual entre temas e tamanhos.
- DateTimePicker: removemos as props `hideHour` e `hideMinute` e atualizamos a prop `displayFormat`.
- Tooltip: simplificamos a lógica e aplicamos otimizações para reduzir re-renders e melhorar performance.
- Configurações: limpamos itens relacionados a Docker e workflows de CI para simplificar o repositório.
- NPM: trocamos de package manager `npm` para `pnpm` para melhorar a performance e gerenciamento de dependências.

### Fixed

- Chart: ajustamos a posição do rótulo do eixo Y quando usado o modo `leftTop`.
- Pickers: aplicados pequenos ajustes de layout para evitar sobreposição de elementos.
- ProgressBase/Calendar: correções visuais que normalizam a apresentação entre temas.

### Notes

- Documentação: atualizamos o README e o changelog com instruções e exemplos mais claros.
- Exemplos: revisamos e ampliamos os exemplos para cobrir mais casos de uso.

---

## 1.7.5 — 2025-11-13

**Author:** Gabriel Glatz

### Added

- RangePicker: adicionamos suporte à formatação em pt-BR para exibir intervalos no formato local.
- DateTimePicker: agora abre no mês de borda, melhorando a navegação entre meses adjacentes.
- ButtonBase: aprimoramos o suporte a `children` e o estado de loading para comportamentos previsíveis.
- CodeBlock: introduzimos abas e melhorias no realce de sintaxe para múltiplos blocos.
- Combobox: reorganizamos a estrutura para melhorar acessibilidade e integração com formulários.

### Fixed

- Pickers: ajustes finos de estilo que corrigem alinhamentos e espaçamentos.
- ProgressBase: correções no layout para evitar que barras fiquem desalinhadas.
- Combobox: removida a prop obsoleta `disabled` e atualizada a API para o novo comportamento.
- Chart: corrigimos o posicionamento do rótulo do eixo Y em algumas configurações.

---

## 1.7.4 — 2025-11-10

**Author:** Gabriel Glatz

### Added

- Charts: adicionamos exemplos adicionais para demonstrar casos de uso comuns.
- Charts: refatoramos o estilo das labels para melhorar legibilidade em diferentes tamanhos.
- Chart: incluímos novas props de formatação voltadas para pt-BR.
- Pickers: adicionadas props para personalizar a formatação de datas.

---

## 1.7.3 — 2025-11-04

**Author:** Gabriel Glatz

### Added

- Charts: disponibilizamos formatadores de valores customizáveis para adaptar labels e tooltips aos requisitos do projeto.

### Fixed

- LineChart: corrigimos um erro de tipagem que causava warnings em builds estritos.

### Notes

- Publicação: pacote publicado na versão 1.7.3.

---

## 1.7.2 — 2025-10-31

**Author:** Gabriel Glatz

### Added

- Build: incluímos um script de verificação (`scripts/check-dist-build.js`) para validar o build de distribuição antes do publish.

### Fixed

- Exports: corrigimos pontos na exportação de módulos para garantir compatibilidade entre bundlers.

---

## 1.7.1 — 2025-10-29

**Author:** Gabriel Glatz

### Fixed

- Exports: ajustamos `index.ts` para corrigir exportações incorretas e evitar imports quebrados.
- CI: melhoramos o workflow de versionamento e publicação para reduzir falhas automáticas.

---

## Links úteis

- Storybook: https://main--68e80310a069c2f10b546ef3.chromatic.com
- Pacote no npm: https://www.npmjs.com/package/@mlw-packages/react-components
- Releases (GitHub): https://github.com/grupo-malwee/react-components/releases

---
