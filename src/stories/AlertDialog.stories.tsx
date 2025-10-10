import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import {
  AlertDialogBase,
  AlertDialogActionBase,
  AlertDialogCancelBase,
  AlertDialogContentBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogTriggerBase,
} from "../components/ui/AlertDialogBase";

interface AlertDialogStoryProps {
  triggerText: string;
  title: string;
  description: string;
  cancelText?: string;
  actionText: string;
  variant?: "destructive" | "warning" | "success" | "info";
}

const AlertDialogStory = ({
  triggerText,
  title,
  description,
  cancelText,
  actionText,
  variant = "info",
}: AlertDialogStoryProps) => {
  const variantStyles = {
    destructive: {
      iconColor: "#ef4444",
      textColor: "text-destructive",
      buttonClass: "bg-destructive hover:bg-destructive/90",
      icon: (
        <svg width="20" height="20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#ef4444" strokeWidth="2" />
          <line
            x1="7"
            y1="7"
            x2="13"
            y2="13"
            stroke="#ef4444"
            strokeWidth="2"
          />
          <line
            x1="13"
            y1="7"
            x2="7"
            y2="13"
            stroke="#ef4444"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    warning: {
      iconColor: "#f59e0b",
      textColor: "text-yellow-500",
      buttonClass: "bg-yellow-500 hover:bg-yellow-600 text-black",
      icon: (
        <svg width="20" height="20" fill="none">
          <polygon
            points="10,2 18,18 2,18"
            stroke="#f59e0b"
            strokeWidth="2"
            fill="none"
          />
          <circle cx="10" cy="14" r="1" fill="#f59e0b" />
          <rect x="9" y="7" width="2" height="5" fill="#f59e0b" />
        </svg>
      ),
    },
    success: {
      iconColor: "#10b981",
      textColor: "text-emerald-600",
      buttonClass: "bg-emerald-600 hover:bg-emerald-700",
      icon: (
        <svg width="20" height="20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#10b981" strokeWidth="2" />
          <polyline
            points="6,11 9,14 14,7"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
        </svg>
      ),
    },
    info: {
      iconColor: "#3b82f6",
      textColor: "text-blue-600",
      buttonClass: "bg-blue-600 hover:bg-blue-700",
      icon: (
        <svg width="20" height="20" fill="none">
          <circle cx="10" cy="10" r="9" stroke="#3b82f6" strokeWidth="2" />
          <rect x="9" y="7" width="2" height="2" fill="#3b82f6" />
          <rect x="9" y="10" width="2" height="5" fill="#3b82f6" />
        </svg>
      ),
    },
  };

  const style = variantStyles[variant];

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <AlertDialogBase>
        <AlertDialogTriggerBase data-testid="alert-trigger">
          {triggerText}
        </AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className={`flex items-center gap-2 ${style.textColor}`}>
              {style.icon}
              <AlertDialogTitleBase data-testid="alert-title">
                {title}
              </AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase data-testid="alert-description">
              {description}
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            {cancelText && (
              <AlertDialogCancelBase data-testid="alert-cancel">
                {cancelText}
              </AlertDialogCancelBase>
            )}
            <AlertDialogActionBase
              className={style.buttonClass}
              data-testid="alert-action"
            >
              {actionText}
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>
    </div>
  );
};

const meta: Meta<typeof AlertDialogStory> = {
  title: "feedback/AlertDialog",
  component: AlertDialogStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "AlertDialog para avisos, confirmações e feedbacks visuais.",
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
    triggerText: {
      control: "text",
      description: "Texto do botão que abre o dialog",
    },
    title: {
      control: "text",
      description: "Título do dialog",
    },
    description: {
      control: "text",
      description: "Descrição do dialog",
    },
    cancelText: {
      control: "text",
      description: "Texto do botão cancelar (opcional)",
    },
    actionText: {
      control: "text",
      description: "Texto do botão de ação",
    },
    variant: {
      control: "select",
      options: ["destructive", "warning", "success", "info"],
      description: "Variante visual do dialog",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialogStory>;

export const ExcluirConta: Story = {
  args: {
    triggerText: "Excluir Conta",
    title: "Tem certeza absoluta?",
    description:
      "Essa ação não pode ser desfeita. Isso vai excluir permanentemente sua conta e remover seus dados dos nossos servidores.",
    cancelText: "Cancelar",
    actionText: "Excluir",
    variant: "destructive",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByTestId("alert-trigger");
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const dialogTitle = document.querySelector('[data-testid="alert-title"]');
      expect(dialogTitle).toBeInTheDocument();
    });

    const dialogTitle = document.querySelector('[data-testid="alert-title"]');
    expect(dialogTitle?.textContent).toBe("Tem certeza absoluta?");

    const dialogDescription = document.querySelector(
      '[data-testid="alert-description"]'
    );
    expect(dialogDescription).toBeInTheDocument();

    const cancelButton = document.querySelector('[data-testid="alert-cancel"]');
    const deleteButton = document.querySelector('[data-testid="alert-action"]');
    expect(cancelButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(deleteButton?.textContent).toBe("Excluir");
  },
};

export const Aviso: Story = {
  args: {
    triggerText: "Aviso",
    title: "Olha, preste atenção!",
    description:
      "Você está prestes a fazer uma alteração que pode impactar outros usuários.",
    cancelText: "Cancelar",
    actionText: "Prosseguir",
    variant: "warning",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByTestId("alert-trigger");
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const warningTitle = document.querySelector(
        '[data-testid="alert-title"]'
      );
      expect(warningTitle?.textContent).toBe("Olha, preste atenção!");
    });

    const warningDescription = document.querySelector(
      '[data-testid="alert-description"]'
    );
    expect(warningDescription).toBeInTheDocument();
  },
};

export const Sucesso: Story = {
  args: {
    triggerText: "Ação Concluída",
    title: "Operação bem-sucedida!",
    description: "Sua ação foi concluída com sucesso. Pode fechar essa janela.",
    actionText: "Fechar",
    variant: "success",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByTestId("alert-trigger");
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const successTitle = document.querySelector(
        '[data-testid="alert-title"]'
      );
      expect(successTitle?.textContent).toBe("Operação bem-sucedida!");
    });

    const actionButton = document.querySelector('[data-testid="alert-action"]');
    expect(actionButton?.textContent).toBe("Fechar");

    const cancelButton = document.querySelector('[data-testid="alert-cancel"]');
    expect(cancelButton).not.toBeInTheDocument();
  },
};

export const Informacao: Story = {
  args: {
    triggerText: "Informação",
    title: "Importante saber!",
    description:
      "O sistema passará por manutenção amanhã das 00h às 04h. Alguns serviços poderão ficar indisponíveis.",
    actionText: "Entendi",
    variant: "info",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const triggerButton = canvas.getByTestId("alert-trigger");
    await userEvent.click(triggerButton);

    await waitFor(() => {
      const infoTitle = document.querySelector('[data-testid="alert-title"]');
      expect(infoTitle?.textContent).toBe("Importante saber!");
    });

    const infoDescription = document.querySelector(
      '[data-testid="alert-description"]'
    );
    expect(infoDescription).toBeInTheDocument();
    expect(infoDescription?.textContent).toContain("manutenção");
  },
};