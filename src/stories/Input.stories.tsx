import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputBase } from '../components/ui/InputBase';
import { ButtonBase } from '../components/ui/ButtonBase';
import { MapPinLine } from 'phosphor-react';

const meta: Meta<typeof InputBase> = {
  title: 'forms/Input',
  component: InputBase,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputBase>;

export const Default: Story = {
  render: () => (
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
          leftIcon={<MapPinLine size={16} />}
        />
      </div>
      <div>
        <InputBase
          type="text"
          placeholder="Localização"
          label="Local"
          rightIcon={<MapPinLine size={16} />}
        />
      </div>
    </div>
  )
};
