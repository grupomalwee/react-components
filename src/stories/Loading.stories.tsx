import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { LoadingBase } from "@/components/ui/feedback/LoadingBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

const meta: Meta<typeof LoadingBase> = {
  title: "feedback/Loading",
  component: LoadingBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para indicar estados de carregamento com spinner animado. Suporte a mensagens, overlay e diferentes tamanhos e variantes.",
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
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Tamanho do spinner",
    },
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse"],
      description: "Variante do loading",
    },
    message: {
      control: "text",
      description: "Mensagem a ser exibida",
    },
    overlay: {
      control: "boolean",
      description: "Exibir como overlay de tela cheia",
    },
  },
  args: {
    size: "md",
    variant: "spinner",
    overlay: false,
  },
};

export default meta;
type Story = StoryObj<typeof LoadingBase>;

export const Default: Story = {};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LoadingBase, ButtonBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <div style={{ padding: 24 }}>
      <LoadingBase size="lg" message="Carregando..." />
    </div>
  );
}`,
    },
  },
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LoadingBase } from '@mlw-packages/react-components';

export const Default = () => (
  <div style={{ padding: 24 }}>
    <LoadingBase size="md" />
  </div>
);`,
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 32,
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <LoadingBase size="sm" />
        <p style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Small
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <LoadingBase size="md" />
        <p style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Medium
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <LoadingBase size="lg" />
        <p style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Large
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <LoadingBase size="xl" />
        <p style={{ fontSize: "12px", marginTop: "8px", color: "#666" }}>
          Extra Large
        </p>
      </div>
    </div>
  ),
};

Sizes.parameters = {
  ...Sizes.parameters,
  docs: {
    ...Sizes.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LoadingBase } from '@mlw-packages/react-components';

export const Sizes = () => (
  <div style={{ display: 'flex', gap: 32, justifyContent: 'center', padding: 32 }}>
    <LoadingBase size="sm" />
    <LoadingBase size="md" />
    <LoadingBase size="lg" />
    <LoadingBase size="xl" />
  </div>
);`,
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 64,
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <LoadingBase variant="spinner" size="lg" />
        <p
          style={{
            fontSize: "14px",
            marginTop: "12px",
            color: "#666",
            fontWeight: "500",
          }}
        >
          Spinner
        </p>
      </div>
      <div style={{ textAlign: "center" }}>
        <LoadingBase variant="dots" size="lg" />
        <p
          style={{
            fontSize: "14px",
            marginTop: "12px",
            color: "#666",
            fontWeight: "500",
          }}
        >
          Dots
        </p>
      </div>
    </div>
  ),
};

Variants.parameters = {
  ...Variants.parameters,
  docs: {
    ...Variants.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LoadingBase } from '@mlw-packages/react-components';

export const Variants = () => (
  <div style={{ display: 'flex', gap: 64, justifyContent: 'center', padding: 32 }}>
    <LoadingBase variant="spinner" size="lg" />
    <LoadingBase variant="dots" size="lg" />
  </div>
);`,
    },
  },
};

export const WithMessage: Story = {
  args: {
    message: "Carregando dados...",
    size: "lg",
  },
};

WithMessage.parameters = {
  ...WithMessage.parameters,
  docs: {
    ...WithMessage.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LoadingBase } from '@mlw-packages/react-components';

export const WithMessage = () => (
  <LoadingBase size="lg" message="Carregando dados..." />
);`,
    },
  },
};

export const DotsWithMessage: Story = {
  args: {
    variant: "dots",
    message: "Processando...",
    size: "lg",
  },
};

DotsWithMessage.parameters = {
  ...DotsWithMessage.parameters,
  docs: {
    ...DotsWithMessage.parameters?.docs,
    source: {
      code: `import React from 'react';
import { LoadingBase } from '@mlw-packages/react-components';

export const DotsWithMessage = () => (
  <LoadingBase variant="dots" size="lg" message="Processando..." />
);`,
    },
  },
};

export const LoadingOverlay: Story = {
  render: () => {
    const [showSpinnerOverlay, setShowSpinnerOverlay] = React.useState(false);
    const [showDotsOverlay, setShowDotsOverlay] = React.useState(false);

    const handleShowSpinnerOverlay = () => {
      setShowSpinnerOverlay(true);
      setTimeout(() => setShowSpinnerOverlay(false), 3000);
    };

    const handleShowDotsOverlay = () => {
      setShowDotsOverlay(true);
      setTimeout(() => setShowDotsOverlay(false), 3000);
    };

    return (
      <div
        style={{ position: "relative", padding: "32px", textAlign: "center" }}
      >
        {showSpinnerOverlay && (
          <LoadingBase
            overlay
            variant="spinner"
            message="Carregando dados..."
            size="lg"
          />
        )}

        {showDotsOverlay && (
          <LoadingBase
            overlay
            variant="dots"
            message="Processando informações..."
            size="lg"
          />
        )}

        <div>
          <div
            style={{ display: "flex", gap: "16px", justifyContent: "center" }}
          >
            <ButtonBase onClick={handleShowSpinnerOverlay}>
              Spinner Overlay
            </ButtonBase>
            <ButtonBase onClick={handleShowDotsOverlay} variant="outline">
              Dots Overlay
            </ButtonBase>
          </div>
        </div>
      </div>
    );
  },
};

LoadingOverlay.parameters = {
  ...LoadingOverlay.parameters,
  docs: {
    ...LoadingOverlay.parameters?.docs,
    source: {
      code: `import React, { useState } from 'react';
import { LoadingBase, ButtonBase } from '@mlw-packages/react-components';

export const LoadingOverlay = () => {
  const [showSpinner, setShowSpinner] = useState(false);
  const [showDots, setShowDots] = useState(false);

  return (
    <div style={{ position: 'relative', padding: 24 }}>
      {showSpinner && <LoadingBase overlay variant="spinner" size="lg" message="Carregando dados..." />}
      {showDots && <LoadingBase overlay variant="dots" size="lg" message="Processando informações..." />}

      <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
        <ButtonBase onClick={() => { setShowSpinner(true); setTimeout(() => setShowSpinner(false), 3000); }}>
          Spinner Overlay
        </ButtonBase>
        <ButtonBase onClick={() => { setShowDots(true); setTimeout(() => setShowDots(false), 3000); }} variant="outline">
          Dots Overlay
        </ButtonBase>
      </div>
    </div>
  );
};`,
    },
  },
};
