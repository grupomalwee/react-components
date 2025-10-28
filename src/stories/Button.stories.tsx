import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { ButtonBase, ButtonGroupBase } from "../components/ui/form/ButtonBase";
import {
  AddButton,
  BackButton,
  ChangeButton,
  CheckButton,
  CloseButton,
  CopyButton,
  DeleteButton,
  DownloadButton,
  EditButton,
  FavoriteButton,
  FilterButton,
  LikeButton,
  LockButton,
  MoreButton,
  NotificationButton,
  RefreshButton,
  SaveButton,
  SearchButton,
  SettingsButton,
  UploadButton,
  VisibilityButton,
} from "@/components/ui/form/SmallButtons";

const meta: Meta<typeof ButtonBase> = {
  title: "forms/Button",
  component: ButtonBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Botão base para ações primárias, secundárias e de destaque. Personalizável por variante, tamanho e estado.",
      },
      source: {
        code: `import React from 'react';
import { ButtonBase, ButtonGroupBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <div>
      <ButtonBase variant="default">Default</ButtonBase>
      <ButtonBase variant="destructive">Destructive</ButtonBase>
      <ButtonGroupBase>
        <ButtonBase>Ok</ButtonBase>
        <ButtonBase variant="outline">Cancel</ButtonBase>
      </ButtonGroupBase>
    </div>
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
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    children: "ButtonBase",
    variant: "default",
    size: "default",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof ButtonBase>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { ButtonBase } from '@mlw-packages/react-components';

export default function Default() {
  return <ButtonBase>ButtonBase</ButtonBase>;
}
`,
      },
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("ButtonBase");
    expect(button).not.toBeDisabled();
  },
};

export const Variants: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { ButtonBase } from '@mlw-packages/react-components';

export default function Variants() {
  return (
    <div>
      <ButtonBase variant="default">Default</ButtonBase>
      <ButtonBase variant="destructive">Destructive</ButtonBase>
      <ButtonBase variant="outline">Outline</ButtonBase>
      <ButtonBase variant="secondary">Secondary</ButtonBase>
      <ButtonBase variant="ghost">Ghost</ButtonBase>
      <ButtonBase variant="link">Link</ButtonBase>
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <ButtonBase {...args} variant="default" data-testid="btn-default">
        Default
      </ButtonBase>
      <ButtonBase {...args} variant="destructive" data-testid="btn-destructive">
        Destructive
      </ButtonBase>
      <ButtonBase {...args} variant="outline" data-testid="btn-outline">
        Outline
      </ButtonBase>
      <ButtonBase {...args} variant="secondary" data-testid="btn-secondary">
        Secondary
      </ButtonBase>
      <ButtonBase {...args} variant="ghost" data-testid="btn-ghost">
        Ghost
      </ButtonBase>
      <ButtonBase {...args} variant="link" data-testid="btn-link">
        Link
      </ButtonBase>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar todas as variantes estão presentes", async () => {
      expect(canvas.getByTestId("btn-default")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-destructive")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-outline")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-secondary")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-ghost")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-link")).toBeInTheDocument();
    });

    await step("Verificar textos corretos", async () => {
      expect(canvas.getByTestId("btn-default")).toHaveTextContent("Default");
      expect(canvas.getByTestId("btn-destructive")).toHaveTextContent(
        "Destructive"
      );
      expect(canvas.getByTestId("btn-outline")).toHaveTextContent("Outline");
      expect(canvas.getByTestId("btn-secondary")).toHaveTextContent(
        "Secondary"
      );
      expect(canvas.getByTestId("btn-ghost")).toHaveTextContent("Ghost");
      expect(canvas.getByTestId("btn-link")).toHaveTextContent("Link");
    });

    await step("Testar hover em variante destructive", async () => {
      const destructiveBtn = canvas.getByTestId("btn-destructive");
      await userEvent.hover(destructiveBtn);
      expect(destructiveBtn).toBeInTheDocument();
    });
  },
};

export const Sizes: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { ButtonBase } from '@mlw-packages/react-components';

export default function Sizes() {
  return (
    <div>
      <ButtonBase size="sm">Small</ButtonBase>
      <ButtonBase size="default">Default</ButtonBase>
      <ButtonBase size="lg">Large</ButtonBase>
      <ButtonBase size="icon" aria-label="icon only"><span>★</span></ButtonBase>
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => (
    <div
      style={{
        display: "flex",
        gap: 12,
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <ButtonBase {...args} size="sm" data-testid="btn-small">
        Small
      </ButtonBase>
      <ButtonBase {...args} size="default" data-testid="btn-default">
        Default
      </ButtonBase>
      <ButtonBase {...args} size="lg" data-testid="btn-large">
        Large
      </ButtonBase>
      <ButtonBase
        {...args}
        size="icon"
        aria-label="icon only"
        data-testid="btn-icon"
      >
        <span className="material-icons">star</span>
      </ButtonBase>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar todos os tamanhos estão presentes", async () => {
      expect(canvas.getByTestId("btn-small")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-default")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-large")).toBeInTheDocument();
      expect(canvas.getByTestId("btn-icon")).toBeInTheDocument();
    });

    await step("Verificar textos dos botões", async () => {
      expect(canvas.getByTestId("btn-small")).toHaveTextContent("Small");
      expect(canvas.getByTestId("btn-default")).toHaveTextContent("Default");
      expect(canvas.getByTestId("btn-large")).toHaveTextContent("Large");
    });

    await step("Verificar botão icon tem aria-label", async () => {
      const iconBtn = canvas.getByTestId("btn-icon");
      expect(iconBtn).toHaveAttribute("aria-label", "icon only");
    });

    await step("Testar clique no botão small", async () => {
      const smallBtn = canvas.getByTestId("btn-small");
      await userEvent.click(smallBtn);
      expect(smallBtn).toBeInTheDocument();
    });
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { ButtonBase } from '@mlw-packages/react-components';

export default function Disabled() {
  return <ButtonBase disabled>Disabled</ButtonBase>;
}
`,
      },
    },
  },
  args: {
    disabled: true,
    children: "Disabled",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar botão desabilitado", async () => {
      const button = canvas.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent("Disabled");
      expect(button).toBeDisabled();
    });

    await step("Verificar que botão tem pointer-events: none", async () => {
      const button = canvas.getByRole("button");
      const styles = window.getComputedStyle(button);
      expect(styles.pointerEvents).toBe("none");
    });

    await step("Verificar que botão não responde a clique", async () => {
      const button = canvas.getByRole("button");
      expect(button).toBeDisabled();
    });
  },
};

export const Group: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { ButtonBase, ButtonGroupBase } from '@mlw-packages/react-components';

export default function Group() {
  return (
    <ButtonGroupBase>
      <ButtonBase>Aceitar</ButtonBase>
      <ButtonBase variant="outline">Talvez</ButtonBase>
      <ButtonBase variant="destructive">Recusar</ButtonBase>
    </ButtonGroupBase>
  );
}
`,
      },
    },
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
      <ButtonGroupBase data-testid="button-group">
        <ButtonBase {...args} data-testid="btn-aceitar">
          Aceitar
        </ButtonBase>
        <ButtonBase {...args} variant="outline" data-testid="btn-talvez">
          Talvez
        </ButtonBase>
        <ButtonBase {...args} variant="destructive" data-testid="btn-recusar">
          Recusar
        </ButtonBase>
      </ButtonGroupBase>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar grupo de botões renderizado", async () => {
      const buttonGroup = canvas.getByTestId("button-group");
      expect(buttonGroup).toBeInTheDocument();
    });

    await step(
      "Verificar todos os botões do grupo estão presentes",
      async () => {
        expect(canvas.getByTestId("btn-aceitar")).toBeInTheDocument();
        expect(canvas.getByTestId("btn-talvez")).toBeInTheDocument();
        expect(canvas.getByTestId("btn-recusar")).toBeInTheDocument();
      }
    );

    await step("Verificar textos dos botões no grupo", async () => {
      expect(canvas.getByTestId("btn-aceitar")).toHaveTextContent("Aceitar");
      expect(canvas.getByTestId("btn-talvez")).toHaveTextContent("Talvez");
      expect(canvas.getByTestId("btn-recusar")).toHaveTextContent("Recusar");
    });

    await step("Testar clique no botão Aceitar", async () => {
      const aceitarBtn = canvas.getByTestId("btn-aceitar");
      await userEvent.click(aceitarBtn);
      expect(aceitarBtn).toBeInTheDocument();
    });

    await step("Testar hover no botão Recusar", async () => {
      const recusarBtn = canvas.getByTestId("btn-recusar");
      await userEvent.hover(recusarBtn);
      expect(recusarBtn).toBeInTheDocument();
    });
  },
};
export const Small: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { EditButton, SaveButton, ChangeButton, AddButton } from '@mlw-packages/react-components';

export default function Small() {
  return (
    <div>
      <EditButton />
      <SaveButton />
      <ChangeButton />
      <AddButton />
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
      <div className="grid grid-cols-6 gap-3">
        <EditButton />
        <SaveButton />
        <ChangeButton />
        <AddButton />
        <CloseButton />
        <DeleteButton />
        <DeleteButton
          destructiveTitle="retttt"
          destructiveDescription="Tem certeza de que deseja excluir este item?"
        />
        <DownloadButton />
        <UploadButton />
        <CopyButton />
        <RefreshButton />
        <SearchButton />
        <BackButton />
        <SettingsButton />
        <NotificationButton />
        <MoreButton />
        <CheckButton />
        <FilterButton />
        <LikeButton />
        <LockButton />
        <VisibilityButton />
        <FavoriteButton />
      </div>
    </div>
  ),
};
