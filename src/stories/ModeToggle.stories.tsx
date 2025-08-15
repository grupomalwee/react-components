
import "../style/global.css";
import type { Meta, StoryObj } from '@storybook/react-vite';
import { ModeToggleBase } from "../components/mode-toggle";
import { ThemeProviderBase } from "../components/theme-provider";

const meta: Meta<typeof ModeToggleBase> = {
  title: "ModeToggle",
  component: ModeToggleBase,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ModeToggleBase>;



export const Default: Story = {
  render: () => (
    <ThemeProviderBase>
      <ModeToggleBase themes={["light", "dark", "system", "light-purple", "dark-purple", "light-blue", "dark-blue", "light-green", "dark-green"]} />
    </ThemeProviderBase>
  ),
};
