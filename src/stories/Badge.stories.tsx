import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { BadgeBase } from "../components/ui/BadgeBase";

interface BadgeStoryProps {
  text: string;
  variant?: "default" | "success" | "warning" | "error" | "info";
}

const BadgeStory = ({ text, variant = "default" }: BadgeStoryProps) => {
  const variantClasses = {
    default: "",
    success: "bg-green-100 text-green-800",
    warning: "bg-yellow-100 text-yellow-800",
    error: "bg-red-100 text-red-800",
    info: "bg-blue-100 text-blue-800",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <BadgeBase className={variantClasses[variant]} data-testid="badge">
        {text}
      </BadgeBase>
    </div>
  );
};

const meta: Meta<typeof BadgeStory> = {
  title: "data/Badge",
  component: BadgeStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Badge para exibir status, categorias ou informações rápidas. Várias cores e estilos.",
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
    text: {
      control: "text",
      description: "Texto exibido no badge",
    },
    variant: {
      control: "select",
      options: ["default", "success", "warning", "error", "info"],
      description: "Variante visual do badge",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BadgeStory>;

export const Default: Story = {
  args: {
    text: "Badge padrão",
    variant: "default",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const badge = canvas.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Badge padrão");
  },
};

export const Success: Story = {
  args: {
    text: "Sucesso",
    variant: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const badge = canvas.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Sucesso");
    expect(badge).toHaveClass("bg-green-100", "text-green-800");
  },
};

export const Warning: Story = {
  args: {
    text: "Aviso",
    variant: "warning",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const badge = canvas.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Aviso");
    expect(badge).toHaveClass("bg-yellow-100", "text-yellow-800");
  },
};

export const Error: Story = {
  args: {
    text: "Erro",
    variant: "error",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const badge = canvas.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Erro");
    expect(badge).toHaveClass("bg-red-100", "text-red-800");
  },
};

export const Info: Story = {
  args: {
    text: "Info",
    variant: "info",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const badge = canvas.getByTestId("badge");
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent("Info");
    expect(badge).toHaveClass("bg-blue-100", "text-blue-800");
  },
};

export const TesteTextoLongo: Story = {
  args: {
    text: "Badge com texto muito longo para testar overflow",
    variant: "info",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar badge está presente", async () => {
      const badge = canvas.getByTestId("badge");
      expect(badge).toBeInTheDocument();
    });

    await step("Verificar texto longo", async () => {
      const badge = canvas.getByTestId("badge");
      expect(badge).toHaveTextContent(
        "Badge com texto muito longo para testar overflow"
      );
    });
  },
};

export const TesteHoverInteraction: Story = {
  args: {
    text: "Hover me",
    variant: "success",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar badge inicial", async () => {
      const badge = canvas.getByTestId("badge");
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveTextContent("Hover me");
    });

    await step("Testar hover", async () => {
      const badge = canvas.getByTestId("badge");
      await userEvent.hover(badge);
      expect(badge).toHaveClass("bg-green-100", "text-green-800");
    });
  },
};

export const TesteTodasVariantes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "8px",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
        flexWrap: "wrap",
      }}
    >
      <BadgeBase data-testid="badge-default">Padrão</BadgeBase>
      <BadgeBase
        className="bg-green-100 text-green-800"
        data-testid="badge-success"
      >
        Sucesso
      </BadgeBase>
      <BadgeBase
        className="bg-yellow-100 text-yellow-800"
        data-testid="badge-warning"
      >
        Aviso
      </BadgeBase>
      <BadgeBase className="bg-red-100 text-red-800" data-testid="badge-error">
        Erro
      </BadgeBase>
      <BadgeBase className="bg-blue-100 text-blue-800" data-testid="badge-info">
        Info
      </BadgeBase>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar todas as variantes estão presentes", async () => {
      expect(canvas.getByTestId("badge-default")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-success")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-warning")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-error")).toBeInTheDocument();
      expect(canvas.getByTestId("badge-info")).toBeInTheDocument();
    });

    await step("Verificar textos corretos", async () => {
      expect(canvas.getByTestId("badge-default")).toHaveTextContent("Padrão");
      expect(canvas.getByTestId("badge-success")).toHaveTextContent("Sucesso");
      expect(canvas.getByTestId("badge-warning")).toHaveTextContent("Aviso");
      expect(canvas.getByTestId("badge-error")).toHaveTextContent("Erro");
      expect(canvas.getByTestId("badge-info")).toHaveTextContent("Info");
    });

    await step("Verificar classes CSS", async () => {
      expect(canvas.getByTestId("badge-success")).toHaveClass(
        "bg-green-100",
        "text-green-800"
      );
      expect(canvas.getByTestId("badge-warning")).toHaveClass(
        "bg-yellow-100",
        "text-yellow-800"
      );
      expect(canvas.getByTestId("badge-error")).toHaveClass(
        "bg-red-100",
        "text-red-800"
      );
      expect(canvas.getByTestId("badge-info")).toHaveClass(
        "bg-blue-100",
        "text-blue-800"
      );
    });
  },
};
