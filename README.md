# @mlw-packages/react-components

Biblioteca de componentes React reutilizáveis, focada em acelerar o desenvolvimento de aplicações web modernas, acessíveis e com design consistente. Construída com Tailwind CSS para máxima customização, performance e escalabilidade.

---

## Instalação

Instale via npm ou yarn:

```bash
npm install @mlw-packages/react-components
# ou
yarn add @mlw-packages/react-components
```

---

## Uso Básico

Importe os componentes que precisa e use direto no JSX:

# @mlw-packages/react-components

Biblioteca de componentes React reutilizáveis, pronta para produção. Projetada para acelerar o desenvolvimento de interfaces acessíveis, responsivas e customizáveis, usando Tailwind CSS e TypeScript.

## Visão geral

Esta biblioteca fornece um conjunto consistente de componentes UI (botões, inputs, modais, tabelas, menus, etc.) pensados para integração em aplicações modernas. Os componentes foram desenvolvidos com foco em:

- Acessibilidade (atributos ARIA e navegação por teclado);
- Customização via classes Tailwind e props;
- Compatibilidade com React 18+ e TypeScript;
- Testabilidade (suporte a data-testid configuráveis).

## Compatibilidade

- React: 18+
- TypeScript: compatível com tsconfig do projeto
- Estilos: Tailwind CSS (é necessário configurar Tailwind no projeto que consumir a lib)

## Instalação

Instale a versão publicada via npm / yarn / pnpm:

```bash
npm install @mlw-packages/react-components
# ou
yarn add @mlw-packages/react-components
# ou
pnpm add @mlw-packages/react-components
```

Observação: a biblioteca geralmente é distribuída como pacote que requer as dependências peer do projeto consumidor (por exemplo, React, Tailwind). Verifique o `package.json` publicado para a lista completa de peerDependencies.

## Uso rápido

Importe os componentes que precisa e o CSS global (se estiver usando o CSS fornecido):

```tsx
import React from "react";
import { ButtonBase, CardBase } from "@mlw-packages/react-components";
import "@mlw-packages/react-components/style/global.css"; // opcional — dep. de como você monta os estilos

export function App() {
  return (
    <CardBase className="p-6">
      <ButtonBase variant="primary">Clique aqui</ButtonBase>
    </CardBase>
  );
}
```

Para investigar os componentes disponíveis e suas props, consulte a pasta `src/pages` e `src/components/ui` no repositório fonte.

## Exemplos e documentação local

Este repositório contém stories e páginas de exemplo (Storybook / exemplos em `src/pages`). Para executar o ambiente de desenvolvimento local e ver os componentes:

```bash
# instalar dependências
npm install

# rodar storybook (se o projeto incluir) ou Vite (ex.: site de documentação)
npm run storybook
# ou
npm run dev
```

Se não houver scripts acima no `package.json`, consulte-o para os comandos disponíveis.

## Data-testid e testes automatizados

Todos os componentes suportam configuração opcional de identificadores para testes (`data-testid`) através de props `testIds` ou props específicas para cada componente. Isso facilita a escrita de testes E2E e unitários.

Exemplo (Combobox):

```tsx
<ComboboxBase
  items={items}
  renderSelected={renderSelected}
  handleSelection={handleSelection}
  testIds={{
    root: "combobox-root",
    trigger: "combobox-trigger",
    option: (v) => `combobox-option-${v}`,
  }}
/>
```

## Boas práticas de customização

- Prefira passar `className` ou `tw` (se aplicável) para ajustar estilos em vez de alterar o CSS interno.
- Use as variantes e tokens de design oferecidos pelos componentes para manter consistência.
- Se for necessário alterar comportamento interno, prefira estender o componente ou usar composição.

## Desenvolvimento e contribuição

Contribuições são bem-vindas. Siga estes passos básicos:

1. Fork o repositório e crie uma branch com um nome descritivo.
2. Faça suas mudanças e adicione testes quando aplicável.
3. Execute os checks locais:

```bash
npm install
npm run lint   # se disponível
npm run test   # se houver testes
npm run build  # opcional
```

4. Abra um Pull Request descrevendo o que foi alterado e por quê.

Dicas:

- Mantenha commits pequenos e focados.
- Documente API pública dos componentes quando adicionar ou alterar props.

## Manutenção e versionamento

Siga as regras de versionamento semântico (semver). Notifique breaking changes no changelog e nas notas da release.

## Problemas comuns / Troubleshooting

- Se os estilos do Tailwind não aparecerem, verifique se o Tailwind está configurado no projeto consumidor e se o arquivo global de estilos da biblioteca está importado.
- Caso haja conflito de versões do React ou de dependências peer, alinhe as versões no `package.json` do projeto consumidor.

## Contato e Licença

Mantido por Grupo Malwee — veja o repositório para detalhes de contato e histórico.

Licença: MIT — sinta-se livre para usar, modificar e distribuir.

---

Se quiser, posso também:

- gerar um sumário de componentes automaticamente a partir de `src/components/ui`;
- adicionar um arquivo CONTRIBUTING.md com checklist e template de PR;
- ou criar um badge/quickstart no topo do README.
