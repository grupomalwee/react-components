import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import {
  AvatarBase,
  AvatarImageBase,
  AvatarFallbackBase,
} from "../components/ui/data/AvatarBase";

interface AvatarStoryProps {
  src: string;
  alt: string;
  fallback: string;
  variant?:
    | "default"
    | "bordered"
    | "grayscale"
    | "shadow"
    | "circular"
    | "square";
  hasHoverEffect?: boolean;
}

const AvatarStory = ({
  src,
  alt,
  fallback,
  variant = "default",
  hasHoverEffect = false,
}: AvatarStoryProps) => {
  const variantClasses = {
    default: "",
    bordered: "ring-2 ring-primary",
    grayscale: "grayscale",
    shadow: "shadow-lg",
    circular: "rounded-full",
    square: "rounded-md",
  };

  const className = [
    variantClasses[variant],
    hasHoverEffect
      ? "transition-transform duration-300 hover:scale-110 hover:shadow-xl cursor-pointer"
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <AvatarBase className={className} data-testid="avatar">
        <AvatarImageBase src={src} alt={alt} data-testid="avatar-image" />
        <AvatarFallbackBase data-testid="avatar-fallback">
          {fallback}
        </AvatarFallbackBase>
      </AvatarBase>
    </div>
  );
};

const meta: Meta<typeof AvatarStory> = {
  title: "data/Avatar",
  component: AvatarStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Avatar para exibição de imagem de usuário, com fallback, agrupamento e variações visuais.",
      },
      source: {
        code: `import React from 'react';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <AvatarBase>
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>CN</AvatarFallbackBase>
    </AvatarBase>
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
    src: {
      control: "text",
      description: "URL da imagem do avatar",
    },
    alt: {
      control: "text",
      description: "Texto alternativo da imagem",
    },
    fallback: {
      control: "text",
      description: "Texto exibido quando a imagem não carregar",
    },
    variant: {
      control: "select",
      options: [
        "default",
        "bordered",
        "grayscale",
        "shadow",
        "circular",
        "square",
      ],
      description: "Variante visual do avatar",
    },
    hasHoverEffect: {
      control: "boolean",
      description: "Ativa efeito de hover com escala e sombra",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarStory>;

export const Default: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "CN",
    variant: "default",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();

    // Aguarda a imagem carregar
    await waitFor(
      () => {
        const avatarImage = canvas.getByTestId("avatar-image");
        expect(avatarImage).toBeInTheDocument();
        expect(avatarImage).toHaveAttribute(
          "src",
          "https://github.com/grupomalwee.png"
        );
        expect(avatarImage).toHaveAttribute("alt", "Avatar");
      },
      { timeout: 5000 }
    );
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

export default function Default() {
  return (
    <AvatarBase>
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>CN</AvatarFallbackBase>
    </AvatarBase>
  );
}
`,
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: 16,
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <AvatarBase data-testid="avatar-default">
          <AvatarImageBase
            src="https://github.com/grupomalwee.png"
            alt="Default"
          />
          <AvatarFallbackBase>DF</AvatarFallbackBase>
        </AvatarBase>
        <p style={{ fontSize: 12, marginTop: 8 }}>Default</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AvatarBase
          className="ring-2 ring-primary"
          data-testid="avatar-bordered"
        >
          <AvatarImageBase
            src="https://github.com/grupomalwee.png"
            alt="Bordered"
          />
          <AvatarFallbackBase>BD</AvatarFallbackBase>
        </AvatarBase>
        <p style={{ fontSize: 12, marginTop: 8 }}>Bordered</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AvatarBase className="grayscale" data-testid="avatar-grayscale">
          <AvatarImageBase
            src="https://github.com/grupomalwee.png"
            alt="Grayscale"
          />
          <AvatarFallbackBase>GS</AvatarFallbackBase>
        </AvatarBase>
        <p style={{ fontSize: 12, marginTop: 8 }}>Grayscale</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AvatarBase className="shadow-lg" data-testid="avatar-shadow">
          <AvatarImageBase
            src="https://github.com/grupomalwee.png"
            alt="Shadow"
          />
          <AvatarFallbackBase>SH</AvatarFallbackBase>
        </AvatarBase>
        <p style={{ fontSize: 12, marginTop: 8 }}>Shadow</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <AvatarBase className="rounded-md" data-testid="avatar-square">
          <AvatarImageBase
            src="https://github.com/grupomalwee.png"
            alt="Square"
          />
          <AvatarFallbackBase>SQ</AvatarFallbackBase>
        </AvatarBase>
        <p style={{ fontSize: 12, marginTop: 8 }}>Square</p>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

export default function Variants() {
  return (
    <div style={{ display: 'flex', gap: 16 }}>
      <AvatarBase variant="default">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Default" />
        <AvatarFallbackBase>DF</AvatarFallbackBase>
      </AvatarBase>

      <AvatarBase variant="bordered">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Bordered" />
        <AvatarFallbackBase>BD</AvatarFallbackBase>
      </AvatarBase>

      <AvatarBase variant="grayscale">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Grayscale" />
        <AvatarFallbackBase>GS</AvatarFallbackBase>
      </AvatarBase>

      <AvatarBase variant="shadow">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Shadow" />
        <AvatarFallbackBase>SH</AvatarFallbackBase>
      </AvatarBase>

      <AvatarBase variant="square">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Square" />
        <AvatarFallbackBase>SQ</AvatarFallbackBase>
      </AvatarBase>
    </div>
  );
}
`,
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar todas as variantes estão presentes", async () => {
      expect(canvas.getByTestId("avatar-default")).toBeInTheDocument();
      expect(canvas.getByTestId("avatar-bordered")).toBeInTheDocument();
      expect(canvas.getByTestId("avatar-grayscale")).toBeInTheDocument();
      expect(canvas.getByTestId("avatar-shadow")).toBeInTheDocument();
      expect(canvas.getByTestId("avatar-square")).toBeInTheDocument();
    });

    await step("Verificar classes das variantes", async () => {
      expect(canvas.getByTestId("avatar-bordered")).toHaveClass(
        "ring-2",
        "ring-primary"
      );
      expect(canvas.getByTestId("avatar-grayscale")).toHaveClass("grayscale");
      expect(canvas.getByTestId("avatar-shadow")).toHaveClass("shadow-lg");
      expect(canvas.getByTestId("avatar-square")).toHaveClass("rounded-md");
    });
  },
};

export const HoverEffect: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "HE",
    variant: "default",
    hasHoverEffect: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar avatar está presente", async () => {
      const avatar = canvas.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
    });

    await step("Testar hover effect", async () => {
      const avatar = canvas.getByTestId("avatar");
      await userEvent.hover(avatar);
      expect(avatar).toHaveClass(
        "hover:scale-110",
        "hover:shadow-xl",
        "cursor-pointer"
      );
    });
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

export default function HoverEffect() {
  return (
    <AvatarBase hasHoverEffect>
      <AvatarImageBase src="https://github.com/grupomalwee.png" alt="Avatar" />
      <AvatarFallbackBase>HE</AvatarFallbackBase>
    </AvatarBase>
  );
}
`,
      },
    },
  },
};

export const Grouped: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div className="flex -space-x-3">
        {["CN", "LR", "ER"].map((initials, i) => (
          <AvatarBase
            key={i}
            className="ring-2 ring-background border border-white dark:border-gray-900"
            data-testid={`avatar-grouped-${i}`}
          >
            <AvatarImageBase
              src="https://github.com/grupomalwee.png"
              alt="Avatar"
            />
            <AvatarFallbackBase>{initials}</AvatarFallbackBase>
          </AvatarBase>
        ))}
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar0 = canvas.getByTestId("avatar-grouped-0");
    const avatar1 = canvas.getByTestId("avatar-grouped-1");
    const avatar2 = canvas.getByTestId("avatar-grouped-2");

    expect(avatar0).toBeInTheDocument();
    expect(avatar1).toBeInTheDocument();
    expect(avatar2).toBeInTheDocument();
  },
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { AvatarBase, AvatarImageBase, AvatarFallbackBase } from '@mlw-packages/react-components';

export default function Grouped() {
  return (
    <div className="flex -space-x-3">
      <AvatarBase variant="bordered">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="A" />
        <AvatarFallbackBase>CN</AvatarFallbackBase>
      </AvatarBase>
      <AvatarBase variant="shadow">
        <AvatarImageBase src="https://github.com/grupomalwee.png" alt="B" />
        <AvatarFallbackBase>LR</AvatarFallbackBase>
      </AvatarBase>
    </div>
  );
}`,
      },
    },
  },
};
