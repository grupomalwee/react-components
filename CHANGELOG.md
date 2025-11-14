# Changelog

<p align="center">
	<a href="https://www.npmjs.com/package/@mlw-packages/react-components">
		<img alt="npm version" src="https://img.shields.io/npm/v/@mlw-packages/react-components?style=for-the-badge&label=npm&logo=npm&color=CB3837" />
	</a>
	<a href="https://main--68e80310a069c2f10b546ef3.chromatic.com">
		<img alt="storybook" src="https://img.shields.io/badge/storybook-live-ff4785?style=for-the-badge&logo=storybook" />
	</a>
</p>

> Histórico de alterações do pacote `@mlw-packages/react-components` — formato seguindo "Keep a Changelog" e SemVer.

## Índice

- [1.7.5 — 2025-11-13](#175---2025-11-13)
- [1.7.4 — 2025-11-10](#174---2025-11-10)
- [1.7.3 — 2025-11-04](#173---2025-11-04)
- [1.7.2 — 2025-10-31](#172---2025-10-31)
- [1.7.1 — 2025-10-29](#171---2025-10-29)

---



## 1.7.5 — 2025-11-13

### Added

- Suporte à formatação de datas (locale `pt-BR`) no `RangePicker` e melhorias de formatação no `DatePicker` / `DateTimePicker`.
- Permite abrir o `DateTimePicker` no mês dos limites (`fromDate` / `toDate`).
- `children` no `ButtonBase`; suporte a estado de _loading_ e melhor posicionamento de ícones.
- Novo componente `CodeBlock` para exibir trechos de código com realce de sintaxe e abas.
- Aprimoramentos nas classes e estrutura do `Combobox` e ajustes em `FilterItem` para comportamento consistente.

### Fixed

- Ajustes de estilos no `DateTimePicker` e `RangePicker`.
- Aprimoramentos em `ProgressBase` e correções no layout do `Calendar`.
- Removida a propriedade `disabled` de `Combobox` e `ComboboxBase` (ajuste de API).
- Ajuste da posição do rótulo do eixo Y para `leftTop` no componente `Chart`.

---

## 1.7.4 — 2025-11-10

### Added

- Novos exemplos de gráficos e melhorias no guia de instalação.
- Refatoração dos estilos do label de gráficos.
- Novas props para formatação (pt-BR) em componentes de `Chart`.
- Novas props de formatação de data para `DatePicker` e `RangePicker`.

---

## 1.7.3 — 2025-11-04

### Added

- Suporte a formatadores de valor personalizados nos componentes de gráficos.

### Fixed

- Corrigido erro de tipagem no `LineChart`.

### Notes

- Bumped package version to `1.7.3`.

---

## 1.7.2 — 2025-10-31

### Added

- Script de verificação de build: `scripts/check-dist-build.js`.

### Fixed

- Corrigidos exports faltantes (index / export fixes).

---

## 1.7.1 — 2025-10-29

### Fixed

- Ajustes em exports (`index.ts`) e seção de contato no `README`.
- Correções relacionadas à versão npm e workflow de publicação.

---

## Links úteis

- Storybook: https://main--68e80310a069c2f10b546ef3.chromatic.com
- Pacote no npm: https://www.npmjs.com/package/@mlw-packages/react-components
- Releases (GitHub): https://github.com/grupo-malwee/react-components/releases

---