import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputBase } from "../components/ui/form/InputBase";
import { ButtonBase } from "../components/ui/form/ButtonBase";
import { MapPinLineIcon } from "@phosphor-icons/react";

const meta: Meta<typeof InputBase> = {
  title: "forms/Input",
  component: InputBase,
  tags: ["autodocs"],
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
    <div style={{ width: 400 }}>
      <InputBase id='email' label='E-mail' placeholder='seu@email.com' />
      <InputBase id='picture' type='file' label='Picture' />
      <div style={{ display: 'flex', gap: 8 }}>
        <InputBase type='email' placeholder='Email' />
        <ButtonBase type='submit'>Subscribe</ButtonBase>
      </div>
      <InputBase disabled type='email' placeholder='Email' />
      <InputBase type='text' placeholder='Localização' label='Local' leftIcon={<MapPinLineIcon size={16} />} />
      <InputBase type='text' placeholder='Localização' label='Local' rightIcon={<MapPinLineIcon size={16} />} />
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
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <InputBase id="picture" type="file" label="Picture" />
        </div>
        <div className="flex w-full max-w-sm items-center space-x-2">
          <InputBase type="email" placeholder="Email" />
          <ButtonBase type="submit">Subscribe</ButtonBase>
        </div>
        <div>
          <InputBase disabled type="email" placeholder="Email" />
        </div>
        <div>
          <InputBase
            type="text"
            placeholder="Localização"
            label="Local"
            leftIcon={<MapPinLineIcon size={16} />}
          />
        </div>
        <div>
          <InputBase
            type="text"
            placeholder="Localização"
            label="Local"
            rightIcon={<MapPinLineIcon size={16} />}
          />
        </div>
      </div>
    </div>
  ),
};

export const WithError: Story = {
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
