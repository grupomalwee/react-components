import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import {
  AvatarBase,
  AvatarImageBase,
  AvatarFallbackBase,
} from "../components/ui/AvatarBase";

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

    const avatarImage = canvas.getByTestId("avatar-image");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://github.com/grupomalwee.png"
    );
    expect(avatarImage).toHaveAttribute("alt", "Avatar");
  },
};

export const WithBorder: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "CN",
    variant: "bordered",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("ring-2", "ring-primary");
  },
};

export const Grayscale: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "CN",
    variant: "grayscale",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("grayscale");
  },
};

export const Shadow: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "SH",
    variant: "shadow",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("shadow-lg");
  },
};

export const Circular: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "RF",
    variant: "circular",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("rounded-full");
  },
};

export const Square: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar",
    fallback: "RM",
    variant: "square",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const avatar = canvas.getByTestId("avatar");
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveClass("rounded-md");
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
};

export const TesteImagemInvalida: Story = {
  args: {
    src: "https://invalid-url.com/image.png",
    alt: "Avatar",
    fallback: "FB",
    variant: "default",
    hasHoverEffect: false,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar que o fallback é exibido", async () => {
      await waitFor(() => {
        const fallback = canvas.getByTestId("avatar-fallback");
        expect(fallback).toBeInTheDocument();
        expect(fallback).toHaveTextContent("FB");
      });
    });
  },
};

export const TesteFluxoCompleto: Story = {
  args: {
    src: "https://github.com/grupomalwee.png",
    alt: "Avatar Completo",
    fallback: "AC",
    variant: "bordered",
    hasHoverEffect: true,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar elementos básicos", async () => {
      const avatar = canvas.getByTestId("avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("ring-2", "ring-primary");
    });

    await step("Verificar imagem carregada", async () => {
      const avatarImage = canvas.getByTestId("avatar-image");
      expect(avatarImage).toBeInTheDocument();
      expect(avatarImage).toHaveAttribute(
        "src",
        "https://github.com/grupomalwee.png"
      );
    });

    await step("Testar hover effect", async () => {
      const avatar = canvas.getByTestId("avatar");
      await userEvent.hover(avatar);
      expect(avatar).toHaveClass("cursor-pointer");
    });
  },
};
