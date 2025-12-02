import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { within, expect } from "storybook/test";
import { CodeBlock } from "../components/ui/CodeBlock";

const exampleTsx = `import React from 'react';

type Props = { message?: string };

export function Hello({ message = 'Hello, world!' }: Props) {
  return <div>{message}</div>;
}
`;

const exampleJs = `function sum(a, b) {
  return a + b;
}

console.log(sum(2, 3));
`;

const exampleCss = `.card {
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
`;

const exampleLarge = Array.from({ length: 120 })
  .map((_, i) => `// linha ${i + 1} - exemplo grande`)
  .join("\n");

const meta: Meta<typeof CodeBlock> = {
  title: "feedback/CodeBlock",
  component: CodeBlock,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    backgrounds: { default: "light" },
  },
  argTypes: {
    showStats: { control: "boolean" },
    language: { control: "text" },
    filename: { control: "text" },
  },
  args: {
    language: "tsx",
    filename: "Example.tsx",
    showStats: true,
  },
};

export default meta;
type Story = StoryObj<typeof CodeBlock>;

export const Default: Story = {
  args: {
    code: exampleTsx,
    language: "tsx",
    filename: "Hello.tsx",
    showStats: true,
  },
  parameters: {
    docs: {
      source: {
        code: `import { CodeBlock } from '@mlw-packages/react-components';\n\n<CodeBlock language="tsx" filename="Hello.tsx" code={\`...\`} />`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // Verifica se o botão de copiar existe
    const copyBtn = canvas.getByTitle("Copy code");
    expect(copyBtn).toBeInTheDocument();
  },
};

export const WithTabsIncludingTSX: Story = {
  render: () => (
    <CodeBlock
      language="tsx"
      filename="Hello.tsx"
      showStats={true}
      tabs={[
        { name: "Hello.tsx", code: exampleTsx, language: "tsx" },
        { name: "index.js", code: exampleJs, language: "javascript" },
        { name: "styles.css", code: exampleCss, language: "css" },
      ]}
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `// Exemplo com múltiplas tabs incluindo um arquivo TSX\n<CodeBlock tabs={[{ name: 'Hello.tsx', code: '...'}, { name: 'styles.css', code: '...'}]} />`,
      },
    },
  },
};

export const HighlightLines: Story = {
  args: {
    language: "javascript",
    filename: "sum.js",
    showStats: true,
    code: exampleJs,
    highlightLines: [2],
  },
  parameters: {
    docs: {
      source: {
        code: `// Destaque de linha\n<CodeBlock code={code} highlightLines={[2]} />`,
      },
    },
  },
};

export const LightTheme: Story = {
  args: {
    language: "tsx",
    filename: "Example.tsx",
    code: exampleTsx,
    showStats: true,
  },
  parameters: {
    docs: {
      source: {
        code: `<CodeBlock theme="light" code={...} />`,
      },
    },
  },
};

export const LargeSnippet: Story = {
  args: {
    language: "text",
    filename: "big.log",
    code: exampleLarge,
    showStats: true,
  },
  parameters: {
    docs: {
      source: {
        code: `// Snippet grande para testar rolagem e performance\n<CodeBlock code={large} />`,
      },
    },
  },
};

export const InteractivePlay: Story = {
  render: () => (
    <CodeBlock
      language="tsx"
      filename="Hello.tsx"
      showStats={true}
      tabs={[
        { name: "Hello.tsx", code: exampleTsx, language: "tsx" },
        { name: "index.js", code: exampleJs, language: "javascript" },
      ]}
    />
  ),
};
