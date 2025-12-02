import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputBase } from "@/components/ui/form/InputBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { MapPinLineIcon } from "@phosphor-icons/react";

const meta: Meta<typeof InputBase> = {
  title: "forms/Input",
  component: InputBase,
  tags: ["autodocs"],
  args: {
    type: "text",
    label: "",
    placeholder: "",
    disabled: false,
    error: "",
    leftIcon: false,
    rightIcon: false,
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["text", "email", "password", "file", "number"],
    },
    label: { control: { type: "text" } },
    placeholder: { control: { type: "text" } },
    disabled: { control: { type: "boolean" } },
    error: { control: { type: "text" } },
    leftIcon: {
      control: { type: "boolean" },
      description: "Mostrar ícone à esquerda (apenas visual)",
    },
    rightIcon: {
      control: { type: "boolean" },
      description: "Mostrar ícone à direita (apenas visual)",
    },
    onChange: { action: "change" },
    onFocus: { action: "focus" },
  },
  parameters: {
    docs: {
      description: {
        component:
          "Input para campos de texto, email, arquivo e ícones. Personalizável e acessível.",
      },
      source: {
        code: `import { InputBase, ButtonBase } from '@mlw-packages/react-components';
import { MapPinLineIcon } from '@phosphor-icons/react';

function Example() {
  return (
    <div style={{ width: 400, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <InputBase id='email' label='E-mail' placeholder='seu@email.com' />

      <div style={{ display: 'flex', gap: 8 }}>
        <InputBase type='email' placeholder='seu@email.com' />
        <ButtonBase type='submit'>Inscrever</ButtonBase>
      </div>

      <InputBase id='picture' type='file' label='Imagem' />

      <InputBase disabled type='text' label='Nome' placeholder='Nome completo' />

      <InputBase type='text' label='Local' placeholder='Localização' leftIcon={<MapPinLineIcon size={16} />} />

      <InputBase type='text' label='Local (icone à direita)' placeholder='Localização' rightIcon={<MapPinLineIcon size={16} />} />
    </div>
  );
}

export default Example;`,
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
type Story = StoryObj<typeof InputBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { InputBase } from '@mlw-packages/react-components';

export default function Default() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <InputBase id="email" label="E-mail" placeholder="seu@email.com" />
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
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <InputBase id="email" label="E-mail" placeholder="seu@email.com" />
        </div>
      </div>
    </div>
  ),
};

export const WithButton: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { InputBase, ButtonBase } from '@mlw-packages/react-components';

export default function WithButton() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <InputBase type="email" placeholder="seu@email.com" />
      <ButtonBase type="submit">Inscrever</ButtonBase>
    </div>
  );
}
`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <InputBase type="email" placeholder="seu@email.com" />
        <ButtonBase type="submit">Inscrever</ButtonBase>
      </div>
    </div>
  ),
};

export const FileInput: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { InputBase } from '@mlw-packages/react-components';

export default function FileInput() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <InputBase id="picture" type="file" label="Imagem" />
    </div>
  );
}
`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <InputBase id="picture" type="file" label="Imagem" />
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { InputBase } from '@mlw-packages/react-components';
import { MapPinLineIcon } from '@phosphor-icons/react';

export default function WithIcon() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <InputBase
        type="text"
        label="Local"
        placeholder="Localização"
        leftIcon={<MapPinLineIcon size={16} />}
      />
      <InputBase
        type="text"
        label="Local (direita)"
        placeholder="Localização"
        rightIcon={<MapPinLineIcon size={16} />}
      />
    </div>
  );
}
`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <InputBase
          type="text"
          label="Local"
          placeholder="Localização"
          leftIcon={<MapPinLineIcon size={16} />}
        />
        <InputBase
          type="text"
          label="Local (direita)"
          placeholder="Localização"
          rightIcon={<MapPinLineIcon size={16} />}
        />
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { InputBase } from '@mlw-packages/react-components';

export default function Disabled() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <InputBase
        disabled
        type="text"
        label="Nome"
        placeholder="Nome completo"
      />
    </div>
  );
}
`,
      },
    },
  },
  render: () => (
    <div style={{ display: "flex", justifyContent: "center", padding: 32 }}>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <InputBase
          disabled
          type="text"
          label="Nome"
          placeholder="Nome completo"
        />
      </div>
    </div>
  ),
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { InputBase } from '@mlw-packages/react-components';

export default function WithError() {
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <InputBase
        id="email-error"
        label="E-mail"
        placeholder="seu@email.com"
        error="E-mail inválido. Por favor, verifique o formato."
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
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div className="mt-5 ml-5 flex flex-col gap-5 p-3 rounded-sm">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <InputBase
            id="email-error"
            label="E-mail"
            placeholder="seu@email.com"
            error="E-mail inválido. Por favor, verifique o formato."
          />
        </div>
      </div>
    </div>
  ),
};
