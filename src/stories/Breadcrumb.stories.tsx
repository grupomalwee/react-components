import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import {
  BreadcrumbBase,
  BreadcrumbEllipsisBase,
  BreadcrumbItemBase,
  BreadcrumbLinkBase,
  BreadcrumbListBase,
  BreadcrumbPageBase,
  BreadcrumbSeparatorBase,
} from "../components/ui/BreadcrumbBase";
import {
  DropDownMenuBase,
  DropDownMenuContentBase,
  DropDownMenuItemBase,
  DropDownMenuTriggerBase,
} from "../components/ui/DropDownMenuBase";

interface BreadcrumbStoryProps {
  variant?: "simple" | "withMenu" | "withIcons";
}

const BreadcrumbStory = ({ variant = "simple" }: BreadcrumbStoryProps) => {
  if (variant === "withMenu") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <BreadcrumbBase data-testid="breadcrumb">
          <BreadcrumbListBase>
            <BreadcrumbItemBase>
              <BreadcrumbLinkBase href="#" data-testid="breadcrumb-home">
                Home
              </BreadcrumbLinkBase>
            </BreadcrumbItemBase>
            <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-1" />
            <BreadcrumbItemBase>
              <DropDownMenuBase>
                <DropDownMenuTriggerBase
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  data-testid="breadcrumb-menu-trigger"
                >
                  <BreadcrumbEllipsisBase />
                  <span className="sr-only">Abrir menu</span>
                </DropDownMenuTriggerBase>
                <DropDownMenuContentBase align="start">
                  <DropDownMenuItemBase data-testid="menu-item-docs">
                    Documentation
                  </DropDownMenuItemBase>
                  <DropDownMenuItemBase data-testid="menu-item-themes">
                    Themes
                  </DropDownMenuItemBase>
                  <DropDownMenuItemBase data-testid="menu-item-github">
                    GitHub
                  </DropDownMenuItemBase>
                </DropDownMenuContentBase>
              </DropDownMenuBase>
            </BreadcrumbItemBase>
            <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-2" />
            <BreadcrumbItemBase>
              <BreadcrumbLinkBase href="#" data-testid="breadcrumb-components">
                Components
              </BreadcrumbLinkBase>
            </BreadcrumbItemBase>
            <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-3" />
            <BreadcrumbItemBase>
              <BreadcrumbPageBase data-testid="breadcrumb-current">
                Breadcrumb
              </BreadcrumbPageBase>
            </BreadcrumbItemBase>
          </BreadcrumbListBase>
        </BreadcrumbBase>
      </div>
    );
  }

  if (variant === "withIcons") {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "32px 0",
        }}
      >
        <BreadcrumbBase data-testid="breadcrumb">
          <BreadcrumbListBase>
            <BreadcrumbItemBase>
              <BreadcrumbLinkBase
                href="#"
                className="flex items-center gap-1"
                data-testid="breadcrumb-home"
              >
                <svg width="16" height="16" fill="none" data-testid="icon-home">
                  <path
                    d="M2 8L8 2L14 8V14A2 2 0 0 1 12 16H4A2 2 0 0 1 2 14V8Z"
                    stroke="#6366f1"
                    strokeWidth="2"
                  />
                </svg>
                Home
              </BreadcrumbLinkBase>
            </BreadcrumbItemBase>
            <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-1" />
            <BreadcrumbItemBase>
              <BreadcrumbLinkBase
                href="#"
                className="flex items-center gap-1"
                data-testid="breadcrumb-docs"
              >
                <svg width="16" height="16" fill="none" data-testid="icon-docs">
                  <rect
                    x="3"
                    y="2"
                    width="10"
                    height="12"
                    rx="2"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                </svg>
                Docs
              </BreadcrumbLinkBase>
            </BreadcrumbItemBase>
            <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-2" />
            <BreadcrumbItemBase>
              <BreadcrumbLinkBase
                href="#"
                className="flex items-center gap-1"
                data-testid="breadcrumb-components"
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  data-testid="icon-components"
                >
                  <rect
                    x="4"
                    y="4"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                </svg>
                Components
              </BreadcrumbLinkBase>
            </BreadcrumbItemBase>
            <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-3" />
            <BreadcrumbItemBase>
              <BreadcrumbPageBase
                className="flex items-center gap-1"
                data-testid="breadcrumb-current"
              >
                <svg width="16" height="16" fill="none">
                  <rect
                    x="4"
                    y="4"
                    width="8"
                    height="8"
                    rx="2"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />
                </svg>
                Breadcrumb
              </BreadcrumbPageBase>
            </BreadcrumbItemBase>
          </BreadcrumbListBase>
        </BreadcrumbBase>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <BreadcrumbBase data-testid="breadcrumb">
        <BreadcrumbListBase>
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase href="#" data-testid="breadcrumb-home">
              Home
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>
          <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-1" />
          <BreadcrumbItemBase>
            <BreadcrumbLinkBase href="#" data-testid="breadcrumb-docs">
              Docs
            </BreadcrumbLinkBase>
          </BreadcrumbItemBase>
          <BreadcrumbSeparatorBase data-testid="breadcrumb-separator-2" />
          <BreadcrumbItemBase>
            <BreadcrumbPageBase data-testid="breadcrumb-current">
              Current
            </BreadcrumbPageBase>
          </BreadcrumbItemBase>
        </BreadcrumbListBase>
      </BreadcrumbBase>
    </div>
  );
};

const meta: Meta<typeof BreadcrumbStory> = {
  title: "navigation/Breadcrumb",
  component: BreadcrumbStory,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Breadcrumb para navegação hierárquica, com suporte a ícones, menus e customização.",
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
      options: ["simple", "withMenu", "withIcons"],
      description: "Variante do breadcrumb",
    },
  },
};

export default meta;
type Story = StoryObj<typeof BreadcrumbStory>;

export const ComMenu: Story = {
  args: {
    variant: "withMenu",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar breadcrumb renderizado", async () => {
      const breadcrumb = canvas.getByTestId("breadcrumb");
      expect(breadcrumb).toBeInTheDocument();
    });

    await step("Verificar links presentes", async () => {
      const homeLink = canvas.getByTestId("breadcrumb-home");
      const componentsLink = canvas.getByTestId("breadcrumb-components");
      const currentPage = canvas.getByTestId("breadcrumb-current");

      expect(homeLink).toBeInTheDocument();
      expect(homeLink).toHaveTextContent("Home");
      expect(componentsLink).toHaveTextContent("Components");
      expect(currentPage).toHaveTextContent("Breadcrumb");
    });

    await step("Verificar separadores presentes", async () => {
      const separator1 = canvas.getByTestId("breadcrumb-separator-1");
      const separator2 = canvas.getByTestId("breadcrumb-separator-2");
      const separator3 = canvas.getByTestId("breadcrumb-separator-3");

      expect(separator1).toBeInTheDocument();
      expect(separator2).toBeInTheDocument();
      expect(separator3).toBeInTheDocument();
    });

    await step("Testar menu dropdown", async () => {
      const menuTrigger = canvas.getByTestId("breadcrumb-menu-trigger");
      expect(menuTrigger).toBeInTheDocument();

      await userEvent.click(menuTrigger);

      await waitFor(() => {
        const docsItem = document.querySelector(
          '[data-testid="menu-item-docs"]'
        );
        expect(docsItem).toBeInTheDocument();
      });
    });
  },
};

export const Simples: Story = {
  args: {
    variant: "simple",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar breadcrumb simples renderizado", async () => {
      const breadcrumb = canvas.getByTestId("breadcrumb");
      expect(breadcrumb).toBeInTheDocument();
    });

    await step("Verificar estrutura de links", async () => {
      const homeLink = canvas.getByTestId("breadcrumb-home");
      const docsLink = canvas.getByTestId("breadcrumb-docs");
      const currentPage = canvas.getByTestId("breadcrumb-current");

      expect(homeLink).toHaveTextContent("Home");
      expect(docsLink).toHaveTextContent("Docs");
      expect(currentPage).toHaveTextContent("Current");
    });

    await step("Verificar separadores", async () => {
      const separator1 = canvas.getByTestId("breadcrumb-separator-1");
      const separator2 = canvas.getByTestId("breadcrumb-separator-2");

      expect(separator1).toBeInTheDocument();
      expect(separator2).toBeInTheDocument();
    });

    await step("Testar hover nos links", async () => {
      const homeLink = canvas.getByTestId("breadcrumb-home");
      await userEvent.hover(homeLink);
      expect(homeLink).toBeInTheDocument();
    });
  },
};

export const ComIcones: Story = {
  args: {
    variant: "withIcons",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar breadcrumb com ícones renderizado", async () => {
      const breadcrumb = canvas.getByTestId("breadcrumb");
      expect(breadcrumb).toBeInTheDocument();
    });

    await step("Verificar ícones presentes", async () => {
      const homeIcon = canvas.getByTestId("icon-home");
      const docsIcon = canvas.getByTestId("icon-docs");
      const componentsIcon = canvas.getByTestId("icon-components");

      expect(homeIcon).toBeInTheDocument();
      expect(docsIcon).toBeInTheDocument();
      expect(componentsIcon).toBeInTheDocument();
    });

    await step("Verificar links com ícones", async () => {
      const homeLink = canvas.getByTestId("breadcrumb-home");
      const docsLink = canvas.getByTestId("breadcrumb-docs");
      const componentsLink = canvas.getByTestId("breadcrumb-components");

      expect(homeLink).toHaveTextContent("Home");
      expect(docsLink).toHaveTextContent("Docs");
      expect(componentsLink).toHaveTextContent("Components");
    });

    await step("Testar hover nos links com ícones", async () => {
      const docsLink = canvas.getByTestId("breadcrumb-docs");
      await userEvent.hover(docsLink);
      expect(docsLink).toHaveClass("flex", "items-center", "gap-1");
    });
  },
};

export const TesteNavegacao: Story = {
  args: {
    variant: "simple",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar todos os itens de navegação", async () => {
      const breadcrumb = canvas.getByTestId("breadcrumb");
      expect(breadcrumb).toBeInTheDocument();

      const homeLink = canvas.getByTestId("breadcrumb-home");
      const docsLink = canvas.getByTestId("breadcrumb-docs");

      expect(homeLink).toHaveAttribute("href", "#");
      expect(docsLink).toHaveAttribute("href", "#");
    });

    await step("Verificar página atual não é link", async () => {
      const currentPage = canvas.getByTestId("breadcrumb-current");
      expect(currentPage).not.toHaveAttribute("href");
      expect(currentPage).toHaveTextContent("Current");
    });
  },
};

export const TesteFluxoCompleto: Story = {
  args: {
    variant: "withMenu",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar estrutura completa do breadcrumb", async () => {
      const breadcrumb = canvas.getByTestId("breadcrumb");
      expect(breadcrumb).toBeInTheDocument();
    });

    await step("Verificar todos os níveis de navegação", async () => {
      const homeLink = canvas.getByTestId("breadcrumb-home");
      const componentsLink = canvas.getByTestId("breadcrumb-components");
      const currentPage = canvas.getByTestId("breadcrumb-current");

      expect(homeLink).toBeInTheDocument();
      expect(componentsLink).toBeInTheDocument();
      expect(currentPage).toBeInTheDocument();
    });

    await step("Testar interação com menu dropdown", async () => {
      const menuTrigger = canvas.getByTestId("breadcrumb-menu-trigger");
      expect(menuTrigger).toBeInTheDocument();

      await userEvent.click(menuTrigger);

      await waitFor(() => {
        const docsItem = document.querySelector(
          '[data-testid="menu-item-docs"]'
        );
        const themesItem = document.querySelector(
          '[data-testid="menu-item-themes"]'
        );
        const githubItem = document.querySelector(
          '[data-testid="menu-item-github"]'
        );

        expect(docsItem).toBeInTheDocument();
        expect(themesItem).toBeInTheDocument();
        expect(githubItem).toBeInTheDocument();
      });
    });

    await step("Verificar hover nos itens do menu", async () => {
      const docsItem = document.querySelector('[data-testid="menu-item-docs"]');
      if (docsItem) {
        await userEvent.hover(docsItem as HTMLElement);
        expect(docsItem).toHaveTextContent("Documentation");
      }
    });
  },
};
