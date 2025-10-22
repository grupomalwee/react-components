import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CardBase,
  CardContentBase,
  CardDescriptionBase,
  CardHeaderBase,
  CardTitleBase,
} from "../components/ui/CardBase";

const meta: Meta<typeof CardBase> = {
  title: "data/Card",
  component: CardBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Card para agrupamento de conteúdo, com header, descrição, imagem e status.",
      },
      source: {
        code: `import React from 'react';
import { CardBase, CardHeaderBase, CardTitleBase, CardDescriptionBase, CardContentBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <CardBase className="w-full max-w-sm">
      <CardHeaderBase>
        <CardTitleBase>Exemplo</CardTitleBase>
        <CardDescriptionBase>Descrição opcional</CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <p>Conteúdo do card</p>
      </CardContentBase>
    </CardBase>
  );
}
`,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#f6f6f6" },
        { name: "dark", value: "#222" },
      ],
    },
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CardBase>;

export const Simples: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CardBase, CardHeaderBase, CardTitleBase, CardDescriptionBase, CardContentBase } from '@mlw-packages/react-components';

export default function Simples() {
  return (
    <CardBase className="w-full max-w-sm">
      <CardHeaderBase>
        <CardTitleBase>Exemplo</CardTitleBase>
        <CardDescriptionBase>Descrição opcional</CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <p>Conteúdo do card</p>
      </CardContentBase>
    </CardBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CardBase className="w-full max-w-sm">
        <CardHeaderBase>
          <CardTitleBase>Exemplo</CardTitleBase>
          <CardDescriptionBase>Descrição opcional</CardDescriptionBase>
        </CardHeaderBase>
        <CardContentBase>
          <p>Conteúdo do card</p>
        </CardContentBase>
      </CardBase>
    </div>
  ),
};

export const Outlined: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CardBase, CardHeaderBase, CardTitleBase, CardDescriptionBase, CardContentBase } from '@mlw-packages/react-components';

export default function Outlined() {
  return (
    <CardBase className="w-full max-w-sm border border-gray-300 shadow-sm">
      <CardHeaderBase>
        <CardTitleBase>Outlined card</CardTitleBase>
        <CardDescriptionBase>Simples e elegante</CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <p className="text-sm text-muted-foreground">Útil para listas, opções ou layouts com pouco destaque.</p>
      </CardContentBase>
    </CardBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CardBase className="w-full max-w-sm border border-gray-300 shadow-sm">
        <CardHeaderBase>
          <CardTitleBase>Outlined card</CardTitleBase>
          <CardDescriptionBase>Simples e elegante</CardDescriptionBase>
        </CardHeaderBase>
        <CardContentBase>
          <p className="text-sm text-muted-foreground">
            Útil para listas, opções ou layouts com pouco destaque.
          </p>
        </CardContentBase>
      </CardBase>
    </div>
  ),
};

export const ComImagem: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CardBase, CardHeaderBase, CardTitleBase, CardDescriptionBase, CardContentBase } from '@mlw-packages/react-components';

export default function ComImagem() {
  return (
    <CardBase className="w-full max-w-sm overflow-hidden">
      <img src="/pwa-512x512.png" alt="tech" className="w-full h-40 object-cover" />
      <CardHeaderBase>
        <CardTitleBase>Com imagem</CardTitleBase>
        <CardDescriptionBase>Composição visual</CardDescriptionBase>
      </CardHeaderBase>
      <CardContentBase>
        <p className="text-sm text-muted-foreground">Use como preview, produto ou artigo.</p>
      </CardContentBase>
    </CardBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CardBase className="w-full max-w-sm overflow-hidden">
        <img
          src="/pwa-512x512.png"
          alt="tech"
          className="w-full h-40 object-cover"
        />
        <CardHeaderBase>
          <CardTitleBase>Com imagem</CardTitleBase>
          <CardDescriptionBase>Composição visual</CardDescriptionBase>
        </CardHeaderBase>
        <CardContentBase>
          <p className="text-sm text-muted-foreground">
            Use como preview, produto ou artigo.
          </p>
        </CardContentBase>
      </CardBase>
    </div>
  ),
};

export const Status: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CardBase, CardHeaderBase, CardTitleBase, CardContentBase } from '@mlw-packages/react-components';

export default function Status() {
  return (
    <CardBase className="w-full max-w-sm relative border">
      <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Online</span>
      <CardHeaderBase>
        <CardTitleBase>Status do Usuário</CardTitleBase>
      </CardHeaderBase>
      <CardContentBase>
        <p className="text-sm">Usuário conectado ao sistema.</p>
      </CardContentBase>
    </CardBase>
  );
}
`,
      },
    },
  },
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CardBase className="w-full max-w-sm relative border">
        <span className="absolute top-2 right-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">
          Online
        </span>
        <CardHeaderBase>
          <CardTitleBase>Status do Usuário</CardTitleBase>
        </CardHeaderBase>
        <CardContentBase>
          <p className="text-sm">Usuário conectado ao sistema.</p>
        </CardContentBase>
      </CardBase>
    </div>
  ),
};
