## @mlw-packages/react-components

Biblioteca de componentes React pronta para produção • TypeScript + Tailwind

---

<p align="center">
  <a href="https://www.npmjs.com/package/@mlw-packages/react-components">
    <img alt="npm version" src="https://img.shields.io/npm/v/@mlw-packages/react-components?style=for-the-badge&label=npm&logo=npm&color=CB3837" />
  </a>
  <a href="https://main--68e80310a069c2f10b546ef3.chromatic.com">
    <img alt="storybook" src="https://img.shields.io/badge/storybook-live-ff4785?style=for-the-badge&logo=storybook" />
  </a>
</p>

> Coleção de _building blocks_ UI — pensada para velocidade de desenvolvimento, consistência visual, acessibilidade e performance.

---

## Índice

- [Visão geral](#visão-geral)
- [Principles (princípios)](#principles-princ%C3%ADpios)
- [Instalação](#instala%C3%A7%C3%A3o)
- [Quick start](#quick-start)
- [Uso e boas práticas](#uso-e-boas-pr%C3%A1ticas)
- [Storybook (demos)](#storybook-demos)
- [Componentes principais](#componentes-principais)
- [Lista completa de componentes (stories)](#lista-completa-de-componentes-stories)
- [Desenvolvimento local](#desenvolvimento-local)
- [Testes & Quality Gates](#testes--quality-gates)
- [Problemas comuns](#problemas-comuns)
- [Contribuição](#contribui%C3%A7%C3%A3o)
- [Changelog & Releases](#changelog--releases)
- [Contato & Licença](#contato--licen%C3%A7a)

---

## Visão geral

`@mlw-packages/react-components` fornece um conjunto coeso de componentes reutilizáveis (Buttons, Cards, Inputs, Modals, Tables, etc.) com foco em:

- API simples e tipada (TypeScript) — documentação via Storybook.
- Estilos orientados a Tailwind para customização via `className`.
- Padrões de acessibilidade (aria, keyboard, focus management).
- Baixas dependências — ícones e extras como _peer deps_.

Use quando precisar padronizar UI e acelerar entregas sem sacrificar qualidade.

---

## Principles (princípios)

1. **Composição sobre herança** — componentes pequenos, combináveis.
2. **Acessibilidade primeiro** — keyboard-friendly, roles, labels.
3. **Tailwind como API** — `className` para customização limitada.
4. **Mínimas dependências** — pacote enxuto para bundles menores.
5. **Testabilidade** — props determinísticas e `data-testid` opcionais.

---

## Instalação

Compatível com npm, yarn e pnpm:

```bash
npm install @mlw-packages/react-components
# ou
yarn add @mlw-packages/react-components
# ou
pnpm add @mlw-packages/react-components
```

> **Peer deps**: React 18+ e Tailwind configurado. Se usar ícones, instale `@phosphor-icons/react` como peer-dep.

---

## Quick start

```tsx
import React from "react";
import { CardBase, ButtonBase } from "@mlw-packages/react-components";
import "@mlw-packages/react-components/style/global.css";

export function App() {
  return (
    <main className="p-6 max-w-3xl mx-auto">
      <CardBase className="p-6">
        <h3 className="text-lg font-semibold">Bem-vindo</h3>
        <p className="mt-2">Use os componentes para acelerar o layout.</p>
        <div className="mt-4">
          <ButtonBase variant="primary">Clique aqui</ButtonBase>
        </div>
      </CardBase>
    </main>
  );
}
```

**Notas rápidas**

- `className` é exposto na maioria dos componentes para customização.
- Variantes comuns: `primary`, `secondary`, `ghost`.

---

## Uso e boas práticas

- **Composição**: prefira combinar componentes ao invés de alterar internals.
- **Acessibilidade**: passe `aria-*` quando aplicável (ex.: `aria-label` em botões iconográficos).
- **SSR**: componentes são compatíveis com server-side rendering; evite acessar `window` direto.
- **Theming**: use classes utilitárias do Tailwind e tokenize valores em `tailwind.config.js` quando necessário.

---

## Storybook (demos)

Veja as demos interativas e a documentação de props no Storybook:

> [Abrir Storybook](https://main--68e80310a069c2f10b546ef3.chromatic.com)

Use **Controls** para testar props dinamicamente e **Docs** para copiar snippets.

---

### Lista completa de componentes

Abaixo está a lista completa de componentes :

- AlertDialog

- Avatar

- Badge

- BarChart

- Breadcrumb

- Button

- Calendar

- Card

- Carousel

- Chart

- CheckBox

- Collapsible

- Combobox

- ComboboxBase

- Command

- ContextMenu

- DateTimePicker

- DebouncedInput

- DestructiveDialog

- Dialog

- DraggableTooltip

- Drawer

- DropDownMenu

- FileUploader

- Filter

- Home

- HoverCard

- Input

- Input-OTP

- Label

- LineChart

- Loading

- Modal

- ModeToggle

- MultiCombobox

- NavigationMenu

- PieChart

- Popover

- rogress

- RangePicker

- Scrollarea

- Select

- Separator

- Sheet

- Sidebar

- Skeleton

- Slider

- Sonner

- Switch

- Table

- Tabs

- TextArea

- Tooltip

---

## Desenvolvimento local

```bash
git clone git@github.com:grupo-malwee/react-components.git
cd react-components
npm install
npm run storybook
# lint/test/build
npm run lint
npm run test
npm run build
```

Dica: use `pnpm` para monorepos e instalações mais rápidas.

---

## Problemas comuns & diagnóstico

Segue uma versão formatada e mais direta da seção de _Issues_ com passos para diagnóstico e ações rápidas.

### Componente não aparece / tela em branco

- Abra o console do navegador e verifique erros (ex.: export faltando, erro de runtime).
- Confirme o import na story e que todas as props obrigatórias estão sendo passadas.
- Se o componente depende de dados remotos, garanta mocks ou dados de exemplo na story.

Checklist rápido:

- [ ] Console limpo
- [ ] Import correto
- [ ] Props obrigatórias fornecidas
- [ ] Dados/mocks presentes

### Componente pisca ou muda de estado sozinho

- Verifique addons do Storybook (Controls, Interactions) que possam disparar updates automaticamente.
- Revise timers (clearInterval / clearTimeout) e efeitos (`useEffect`) com dependências corretas.
- Use Actions para inspecionar eventos que dispararam mudanças.

### Estilos incorretos entre temas

- Verifique variáveis de tema e classes condicionais.
- Confirme se o decorator de tema do Storybook está aplicado na preview.
- Atenção ao purge do Tailwind: classes dinâmicas podem ser removidas. Use `safelist` quando necessário.

### Dependências / peer deps

Conflitos de peer-deps podem quebrar o build. Para instalar localmente (workaround):

```bash
npm i @mlw-packages/react-components --legacy-peer-deps
```

(mesma abordagem pode ser necessária para ícones Phosphor em alguns ambientes.)

### Ícones (Phosphor) não renderam

Instale o pacote se estiver faltando:

```bash
npm i @phosphor-icons/react
```

Se ainda não renderizar, confirme se o bundler transpila pacotes ESM/TSX corretamente (Vite normalmente já faz isso; em setups customizados pode ser preciso configurar `optimizeDeps` ou `esbuild` / `babel` transpile).

### Dicas rápidas

- Se uma story funciona localmente mas falha no Storybook hospedado, compare environment vars e versões de dependências.
- Para problemas de Tailwind, adicione classes dinâmicas ao `safelist` do `tailwind.config.js`.
- Ao reportar um issue, inclua: versão do pacote, trecho mínimo reproduzível, saída do console e versão do Node/NPM.

## Testes & Quality Gates

- Jest + Testing Library para unit e componentes.
- ESLint com regras TypeScript estritas.
- CI deve bloquear merges sem `lint`/`test`/`build` bem-sucedidos.

---

## Problemas comuns

- **Classes Tailwind desaparecendo**: cuidado com classes dinâmicas — adicione `safelist` no `tailwind.config.js`.
- **Ícones faltando**: instale `@phosphor-icons/react` e verifique transpile ESM.
- **Peer deps**: resolver explicitamente em CI preferível a `--legacy-peer-deps`.

---

## Contribuição

Siga o fluxo padrão:

1. Fork → branch com `feature/<descrição>` → PR para `main`.
2. Inclua descrição clara, screenshots quando necessário e testes básicos.
3. Use `pnpm`/`npm` consistentemente conforme `.github/workflows`.

Sugestão de PR template: mudança, razão, passos para testar, checklist (lint/test/build).

---

## Changelog & Releases

O histórico detalhado de alterações e notas de release está disponível em `CHANGELOG.md` (seguimos o formato "Keep a Changelog" e SemVer).

Resumo do último release (destacado):

### v1.0.0 — 2025-11-14

- Lançamento inicial da biblioteca com os principais componentes e stories (Button, Card, Input, Modal, Table, Tooltip, Popover, Select, DatePicker, etc.).
- Documentação inicial adicionada no `README.md`.
- Configuração do Storybook e pipeline de build (Vite, tsup).

Para o histórico completo e notas de versões anteriores, consulte `CHANGELOG.md` no repositório.

---

## Contato

- Mantido por: **Grupo Malwee**

---

[npm]: https://www.npmjs.com/package/@mlw-packages/react-components
[ci]: https://github.com/grupo-malwee/react-components/actions
[storybook]: https://main--68e80310a069c2f10b546ef3.chromatic.com
[npm version]: https://img.shields.io/npm/v/@mlw-packages/react-components
[build status]: https://img.shields.io/github/actions/workflow/status/grupo-malwee/react-components/ci.yml
[storybook badge]: https://img.shields.io/badge/storybook-live-ff4785
