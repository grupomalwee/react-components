import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  CommandBase,
  CommandEmptyBase,
  CommandGroupBase,
  CommandInputBase,
  CommandItemBase,
  CommandListBase,
  CommandSeparatorBase,
} from "../components/ui/navigation/CommandBase";

const meta: Meta<typeof CommandBase> = {
  title: "diversos/Command",
  component: CommandBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Command para execução de ações rápidas, busca e navegação por grupos.",
      },
      source: {
        code: `import React from 'react';\nimport { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  return (\n    <Command>\n      <CommandInput placeholder="Type a command or search..." />\n      <CommandList>\n        <CommandEmpty>No results found.</CommandEmpty>\n        <CommandGroup heading="Sugestões">\n          <CommandItem>Calendar</CommandItem>\n          <CommandItem>Search Emoji</CommandItem>\n          <CommandItem>Calculator</CommandItem>\n        </CommandGroup>\n        <CommandSeparator />\n        <CommandGroup heading="Configurações">\n          <CommandItem>Profile</CommandItem>\n          <CommandItem>Billing</CommandItem>\n          <CommandItem>Settings</CommandItem>\n        </CommandGroup>\n      </CommandList>\n    </Command>\n  );\n}`,
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
type Story = StoryObj<typeof CommandBase>;

export const Exemplo: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <CommandBase>
        <CommandInputBase placeholder="Type a command or search..." />
        <CommandListBase>
          <CommandEmptyBase>No results found.</CommandEmptyBase>
          <CommandGroupBase heading="Sugestões">
            <CommandItemBase>Calendar</CommandItemBase>
            <CommandItemBase>Search Emoji</CommandItemBase>
            <CommandItemBase>Calculator</CommandItemBase>
          </CommandGroupBase>
          <CommandSeparatorBase />
          <CommandGroupBase heading="Configurações">
            <CommandItemBase>Profile</CommandItemBase>
            <CommandItemBase>Billing</CommandItemBase>
            <CommandItemBase>Settings</CommandItemBase>
          </CommandGroupBase>
        </CommandListBase>
      </CommandBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';\nimport { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandSeparator } from '@mlw-packages/react-components';\n\nexport default function Example() {\n  return (\n    <Command>\n      <CommandInput placeholder="Type a command or search..." />\n      <CommandList>\n        <CommandEmpty>No results found.</CommandEmpty>\n        <CommandGroup heading="Sugestões">\n          <CommandItem>Calendar</CommandItem>\n          <CommandItem>Search Emoji</CommandItem>\n          <CommandItem>Calculator</CommandItem>\n        </CommandGroup>\n        <CommandSeparator />\n        <CommandGroup heading="Configurações">\n          <CommandItem>Profile</CommandItem>\n          <CommandItem>Billing</CommandItem>\n          <CommandItem>Settings</CommandItem>\n        </CommandGroup>\n      </CommandList>\n    </Command>\n  );\n}`,
      },
    },
  },
};
