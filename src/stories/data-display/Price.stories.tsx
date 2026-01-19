import { Price } from "@/components/ui/data/";
import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import React from "react";
import { ButtonBase } from "@/components/ui/form/ButtonBase";

const meta: Meta<typeof Price> = {
  title: "data/Price",
  component: Price,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente de exibição de preço animado com diferença percentual. Mostra valores monetários com animações suaves e indicadores visuais de alta (verde) ou queda (vermelho).",
      },
      source: {
        code: `import React from 'react';
import { Price } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <Price value={124.23} diff={0.0564} />
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
  argTypes: {
    value: {
      control: "number",
      description: "Valor do preço em número decimal",
    },
    diff: {
      control: "number",
      description: "Diferença percentual (ex: 0.0564 para 5.64%)",
    },
    className: {
      control: "text",
      description: "Classe CSS personalizada para o container principal",
    },
    valueClassName: {
      control: "text",
      description: "Classe CSS personalizada para o valor do preço",
    },
    diffClassName: {
      control: "text",
      description:
        "Classe CSS personalizada para a badge de diferença percentual",
    },
    textClassName: {
      control: "text",
      description:
        "Classe CSS personalizada para o texto (aplicada ao container)",
    },
    valueFormat: {
      control: "object",
      description: "Opções de formatação Intl.NumberFormat para o valor",
    },
    diffFormat: {
      control: "object",
      description:
        "Opções de formatação Intl.NumberFormat para a diferença percentual",
    },
  },
  args: {
    value: 124.23,
    diff: 0.0564,
  },
};

export default meta;
type Story = StoryObj<typeof Price>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Price } from '@mlw-packages/react-components';

export default function Default() {
  return <Price value={124.23} diff={0.0564} />;
}
`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const priceElement = canvas.getByText(/\$/);
    expect(priceElement).toBeInTheDocument();
  },
};

export const PositiveDiff: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Price } from '@mlw-packages/react-components';

export default function PositiveDiff() {
  return <Price value={2125.95} diff={0.0029} />;
}
`,
      },
    },
  },
  args: {
    value: 2125.95,
    diff: 0.0029,
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <Price {...args} />
    </div>
  ),
};

export const NegativeDiff: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Price } from '@mlw-packages/react-components';

export default function NegativeDiff() {
  return <Price value={89.50} diff={-0.0342} />;
}
`,
      },
    },
  },
  args: {
    value: 89.5,
    diff: -0.0342,
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <Price {...args} />
    </div>
  ),
};

export const CurrencyVariations: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { Price } from '@mlw-packages/react-components';

export default function CurrencyVariations() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Price 
        value={999.99} 
        diff={0.0234}
        valueFormat={{ style: 'currency', currency: 'EUR' }}
      />
      <Price 
        value={4599.50} 
        diff={-0.0156}
        valueFormat={{ style: 'currency', currency: 'USD' }}
      />
      <Price 
        value={89990.00} 
        diff={0.0089}
        valueFormat={{ style: 'currency', currency: 'JPY', minimumFractionDigits: 0 }}
      />
    </div>
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
        flexDirection: "column",
        gap: "2rem",
        padding: "32px 0",
        alignItems: "center",
      }}
    >
      <Price
        value={999.99}
        diff={0.0234}
        valueFormat={{ style: "currency", currency: "EUR" }}
      />
      <Price
        value={4599.5}
        diff={-0.0156}
        valueFormat={{ style: "currency", currency: "USD" }}
      />
      <Price
        value={89990.0}
        diff={0.0089}
        valueFormat={{
          style: "currency",
          currency: "JPY",
          minimumFractionDigits: 0,
        }}
      />
    </div>
  ),
};

export const InteractiveDemonstration: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { Price } from '@mlw-packages/react-components';

export default function InteractiveDemonstration() {
  const [value, setValue] = useState(124.23);
  const [diff, setDiff] = useState(0.0564);

  const randomize = () => {
    setValue(Math.random() * 10000);
    setDiff((Math.random() - 0.5) * 0.2);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Price value={value} diff={diff} />
      <button onClick={randomize} style={{ marginTop: '2rem' }}>
        Ver Animação de Roleta
      </button>
    </div>
  );
}
`,
      },
    },
  },
  render: () => {
    const [value, setValue] = React.useState(124.23);
    const [diff, setDiff] = React.useState(0.0564);

    const randomize = () => {
      setValue(Math.random() * 10000);
      setDiff((Math.random() - 0.5) * 0.2);
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <Price value={value} diff={diff} />
        <ButtonBase onClick={randomize}>clica</ButtonBase>
      </div>
    );
  },
};
