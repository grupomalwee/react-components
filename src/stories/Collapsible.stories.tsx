import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { Gear, Question, User, Star } from "@phosphor-icons/react";
import {
  CollapsibleBase,
  CollapsibleContentBase,
  CollapsibleTriggerBase,
} from "@/components/ui/form/CollapsibleBase";
import { ButtonBase } from "@/components/ui/form/ButtonBase";
import { expect, userEvent, within, waitFor } from "storybook/test";

const meta: Meta<typeof CollapsibleBase> = {
  title: "forms/Collapsible",
  component: CollapsibleBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente interativo que permite mostrar e esconder conteúdo de forma animada. Ideal para FAQs, configurações e navegação.",
      },
      source: {
        code: `import React from 'react';
import { CollapsibleBase, CollapsibleTriggerBase, CollapsibleContentBase } from '@mlw-packages/react-components';
import { ButtonBase } from '@mlw-packages/react-components';

export default function Example() {
  return (
    <CollapsibleBase className="w-[350px] border rounded-lg">
      <CollapsibleTriggerBase>@peduarte starred 3 repositories</CollapsibleTriggerBase>
      <CollapsibleContentBase>
        <div>Conteúdo</div>
      </CollapsibleContentBase>
    </CollapsibleBase>
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
    open: {
      control: "boolean",
      description: "Controla se o collapsible está aberto ou fechado",
    },
    onOpenChange: {
      action: "openChanged",
      description: "Callback chamado quando o estado de abertura muda",
    },
    defaultOpen: {
      control: "boolean",
      description: "Estado inicial de abertura do collapsible",
    },
  },
  args: {
    defaultOpen: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CollapsibleBase, CollapsibleTriggerBase, CollapsibleContentBase } from '@mlw-packages/react-components';

export default function Default() {
  return (
    <CollapsibleBase className="w-[350px] border rounded-lg">
      <CollapsibleTriggerBase>@peduarte starred 3 repositories</CollapsibleTriggerBase>
      <div className="px-4 pb-2">
        <div className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30">@radix-ui/primitives</div>
      </div>
      <CollapsibleContentBase>
        <div className="space-y-2 px-4 pb-4">
          <div className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30">@radix-ui/colors</div>
          <div className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30">@stitches/react</div>
        </div>
      </CollapsibleContentBase>
    </CollapsibleBase>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);

    return (
      <CollapsibleBase
        {...args}
        open={args.open !== undefined ? args.open : isOpen}
        onOpenChange={setIsOpen}
        className="w-[350px] border rounded-lg"
        data-testid="collapsible-default"
      >
        <CollapsibleTriggerBase data-testid="collapsible-trigger">
          @peduarte starred 3 repositories
        </CollapsibleTriggerBase>

        <div className="px-4 pb-2">
          <div
            className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30"
            data-testid="visible-repo"
          >
            @radix-ui/primitives
          </div>
        </div>

        <CollapsibleContentBase data-testid="collapsible-content">
          <div className="space-y-2 px-4 pb-4">
            <div
              className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30"
              data-testid="hidden-repo-1"
            >
              @radix-ui/colors
            </div>
            <div
              className="rounded-md border px-4 py-3 font-mono text-sm bg-muted/30"
              data-testid="hidden-repo-2"
            >
              @stitches/react
            </div>
          </div>
        </CollapsibleContentBase>
      </CollapsibleBase>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("1. Verificar renderização inicial fechada", async () => {
      const trigger = canvas.getByTestId("collapsible-trigger");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("@peduarte starred 3 repositories");

      const visibleRepo = canvas.getByTestId("visible-repo");
      expect(visibleRepo).toBeInTheDocument();
      expect(visibleRepo).toHaveTextContent("@radix-ui/primitives");
    });

    await step("2. Verificar conteúdo colapsado inicialmente", async () => {
      const content = canvas.getByTestId("collapsible-content");
      expect(content).toBeInTheDocument();
      // Conteúdo deve estar oculto inicialmente
      expect(content).toHaveAttribute("data-state", "closed");
    });

    await step("3. Clicar para abrir o collapsible", async () => {
      const trigger = canvas.getByTestId("collapsible-trigger");
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId("collapsible-content");
        expect(content).toHaveAttribute("data-state", "open");
      });
    });

    await step(
      "4. Verificar repositórios ocultos ficaram visíveis",
      async () => {
        // Aguardar a animação de abertura completar
        await waitFor(
          () => {
            const hiddenRepo1 = canvas.getByTestId("hidden-repo-1");
            const hiddenRepo2 = canvas.getByTestId("hidden-repo-2");

            expect(hiddenRepo1).toBeInTheDocument();
            expect(hiddenRepo1).toHaveTextContent("@radix-ui/colors");
            expect(hiddenRepo2).toBeInTheDocument();
            expect(hiddenRepo2).toHaveTextContent("@stitches/react");
          },
          { timeout: 1000 }
        );
      }
    );

    await step("5. Clicar novamente para fechar", async () => {
      const trigger = canvas.getByTestId("collapsible-trigger");
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId("collapsible-content");
        expect(content).toHaveAttribute("data-state", "closed");
      });
    });

    await step("6. Verificar múltiplas alternâncias", async () => {
      const trigger = canvas.getByTestId("collapsible-trigger");

      // Abrir
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(canvas.getByTestId("collapsible-content")).toHaveAttribute(
          "data-state",
          "open"
        );
      });

      // Fechar
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(canvas.getByTestId("collapsible-content")).toHaveAttribute(
          "data-state",
          "closed"
        );
      });

      // Abrir novamente
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(canvas.getByTestId("collapsible-content")).toHaveAttribute(
          "data-state",
          "open"
        );
      });
    });
  },
};

export const WithLeftIcon: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CollapsibleBase, CollapsibleTriggerBase, CollapsibleContentBase } from '@mlw-packages/react-components';
import { User } from '@phosphor-icons/react';

export default function WithLeftIcon() {
  return (
    <CollapsibleBase className="border rounded-lg">
      <CollapsibleTriggerBase leftIcon={<User />}>Perfil do Usuário</CollapsibleTriggerBase>
      <CollapsibleContentBase>
        <div>Nome: João Silva</div>
        <div>Email: joao@exemplo.com</div>
      </CollapsibleContentBase>
    </CollapsibleBase>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);

    return (
      <div
        style={{
          display: "flex",
          gap: 12,
          flexDirection: "column",
          width: "400px",
        }}
      >
        <CollapsibleBase
          open={isOpen}
          onOpenChange={setIsOpen}
          className="border rounded-lg"
          data-testid="collapsible-icon"
        >
          <CollapsibleTriggerBase
            leftIcon={<User />}
            data-testid="collapsible-icon-trigger"
          >
            Perfil do Usuário
          </CollapsibleTriggerBase>
          <CollapsibleContentBase data-testid="collapsible-icon-content">
            <div className="px-4 pb-4 space-y-2">
              <p
                className="text-sm text-muted-foreground"
                data-testid="user-name"
              >
                Nome: João Silva
              </p>
              <p
                className="text-sm text-muted-foreground"
                data-testid="user-email"
              >
                Email: joao@exemplo.com
              </p>
              <p
                className="text-sm text-muted-foreground"
                data-testid="user-role"
              >
                Cargo: Desenvolvedor
              </p>
            </div>
          </CollapsibleContentBase>
        </CollapsibleBase>
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("1. Verificar renderização com ícone", async () => {
      const trigger = canvas.getByTestId("collapsible-icon-trigger");
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveTextContent("Perfil do Usuário");

      // Verificar presença do ícone
      const icon = trigger.querySelector("svg");
      expect(icon).toBeInTheDocument();
    });

    await step("2. Verificar estado inicial fechado", async () => {
      const content = canvas.getByTestId("collapsible-icon-content");
      expect(content).toHaveAttribute("data-state", "closed");
    });

    await step("3. Abrir collapsible com ícone", async () => {
      const trigger = canvas.getByTestId("collapsible-icon-trigger");
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId("collapsible-icon-content");
        expect(content).toHaveAttribute("data-state", "open");
      });
    });

    await step("4. Verificar dados do usuário visíveis", async () => {
      await waitFor(
        () => {
          const userName = canvas.getByTestId("user-name");
          const userEmail = canvas.getByTestId("user-email");
          const userRole = canvas.getByTestId("user-role");

          expect(userName).toBeInTheDocument();
          expect(userName).toHaveTextContent("Nome: João Silva");
          expect(userEmail).toBeInTheDocument();
          expect(userEmail).toHaveTextContent("Email: joao@exemplo.com");
          expect(userRole).toBeInTheDocument();
          expect(userRole).toHaveTextContent("Cargo: Desenvolvedor");
        },
        { timeout: 1000 }
      );
    });

    await step("5. Fechar e verificar conteúdo oculto", async () => {
      const trigger = canvas.getByTestId("collapsible-icon-trigger");
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId("collapsible-icon-content");
        expect(content).toHaveAttribute("data-state", "closed");
      });
    });

    await step("6. Verificar acessibilidade do ícone", async () => {
      const trigger = canvas.getByTestId("collapsible-icon-trigger");
      const icon = trigger.querySelector("svg");

      expect(icon).toBeInTheDocument();
      expect(trigger).toHaveTextContent("Perfil do Usuário");
    });
  },
};

export const FAQ: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CollapsibleBase, CollapsibleTriggerBase, CollapsibleContentBase } from '@mlw-packages/react-components';
import { Question, Gear, Star } from '@phosphor-icons/react';

function CollapsibleFAQItem({ question, answer, icon }) {
  return (
    <CollapsibleBase className="border rounded-lg">
      <CollapsibleTriggerBase leftIcon={icon}>{question}</CollapsibleTriggerBase>
      <CollapsibleContentBase>{answer}</CollapsibleContentBase>
    </CollapsibleBase>
  );
}

export default function FAQ() {
  const items = [
    { question: 'O que é o Collapsible?', answer: 'O Collapsible é um componente...', icon: <Question /> },
    { question: 'Como usar o Collapsible?', answer: 'Importe os componentes...', icon: <Gear /> },
    { question: 'É possível customizar?', answer: 'Sim, via classes CSS', icon: <Star /> },
  ];

  return (
    <div>
      {items.map((it, i) => (
        <CollapsibleFAQItem key={i} question={it.question} answer={it.answer} icon={it.icon} />
      ))}
    </div>
  );
}
`,
      },
    },
  },
  render: () => {
    const faqItems = [
      {
        question: "O que é o Collapsible?",
        answer:
          "O Collapsible é um componente que permite mostrar e esconder conteúdo de forma animada.",
        icon: <Question />,
      },
      {
        question: "Como usar o Collapsible?",
        answer:
          "Você pode usar o Collapsible importando os componentes CollapsibleBase, CollapsibleTriggerBase e CollapsibleContentBase.",
        icon: <Gear />,
      },
      {
        question: "É possível customizar as animações?",
        answer:
          "Sim, as animações podem ser customizadas através de classes CSS ou modificando o Tailwind config.",
        icon: <Star />,
      },
    ];

    return (
      <div
        style={{
          width: "500px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
        data-testid="faq-container"
      >
        {faqItems.map((item, index) => (
          <CollapsibleFAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            icon={item.icon}
            testId={`faq-item-${index}`}
          />
        ))}
      </div>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("1. Verificar renderização de todos os itens FAQ", async () => {
      const container = canvas.getByTestId("faq-container");
      expect(container).toBeInTheDocument();

      const item0 = canvas.getByTestId("faq-item-0");
      const item1 = canvas.getByTestId("faq-item-1");
      const item2 = canvas.getByTestId("faq-item-2");

      expect(item0).toBeInTheDocument();
      expect(item1).toBeInTheDocument();
      expect(item2).toBeInTheDocument();
    });

    await step("2. Verificar perguntas visíveis", async () => {
      const trigger0 = canvas.getByTestId("faq-trigger-0");
      const trigger1 = canvas.getByTestId("faq-trigger-1");
      const trigger2 = canvas.getByTestId("faq-trigger-2");

      expect(trigger0).toHaveTextContent("O que é o Collapsible?");
      expect(trigger1).toHaveTextContent("Como usar o Collapsible?");
      expect(trigger2).toHaveTextContent("É possível customizar as animações?");
    });

    await step("3. Verificar todos fechados inicialmente", async () => {
      const content0 = canvas.getByTestId("faq-content-0");
      const content1 = canvas.getByTestId("faq-content-1");
      const content2 = canvas.getByTestId("faq-content-2");

      expect(content0).toHaveAttribute("data-state", "closed");
      expect(content1).toHaveAttribute("data-state", "closed");
      expect(content2).toHaveAttribute("data-state", "closed");
    });

    await step("4. Abrir primeiro FAQ", async () => {
      const trigger0 = canvas.getByTestId("faq-trigger-0");
      await userEvent.click(trigger0);

      await waitFor(() => {
        const content0 = canvas.getByTestId("faq-content-0");
        expect(content0).toHaveAttribute("data-state", "open");
      });

      await waitFor(
        () => {
          const answer0 = canvas.getByTestId("faq-answer-0");
          expect(answer0).toBeInTheDocument();
          expect(answer0).toHaveTextContent(
            "O Collapsible é um componente que permite mostrar e esconder conteúdo de forma animada."
          );
        },
        { timeout: 1000 }
      );
    });

    await step(
      "5. Abrir segundo FAQ enquanto primeiro está aberto",
      async () => {
        const trigger1 = canvas.getByTestId("faq-trigger-1");
        await userEvent.click(trigger1);

        await waitFor(() => {
          const content1 = canvas.getByTestId("faq-content-1");
          expect(content1).toHaveAttribute("data-state", "open");
        });

        // Primeiro deve continuar aberto (comportamento independente)
        const content0 = canvas.getByTestId("faq-content-0");
        expect(content0).toHaveAttribute("data-state", "open");

        await waitFor(
          () => {
            const answer1 = canvas.getByTestId("faq-answer-1");
            expect(answer1).toBeInTheDocument();
            expect(answer1).toHaveTextContent(
              "Você pode usar o Collapsible importando os componentes CollapsibleBase, CollapsibleTriggerBase e CollapsibleContentBase."
            );
          },
          { timeout: 1000 }
        );
      }
    );

    await step("6. Abrir terceiro FAQ", async () => {
      const trigger2 = canvas.getByTestId("faq-trigger-2");
      await userEvent.click(trigger2);

      await waitFor(() => {
        const content2 = canvas.getByTestId("faq-content-2");
        expect(content2).toHaveAttribute("data-state", "open");
      });

      await waitFor(
        () => {
          const answer2 = canvas.getByTestId("faq-answer-2");
          expect(answer2).toBeInTheDocument();
          expect(answer2).toHaveTextContent(
            "Sim, as animações podem ser customizadas através de classes CSS ou modificando o Tailwind config."
          );
        },
        { timeout: 1000 }
      );
    });

    await step(
      "7. Verificar todos os 3 FAQs abertos simultaneamente",
      async () => {
        const content0 = canvas.getByTestId("faq-content-0");
        const content1 = canvas.getByTestId("faq-content-1");
        const content2 = canvas.getByTestId("faq-content-2");

        expect(content0).toHaveAttribute("data-state", "open");
        expect(content1).toHaveAttribute("data-state", "open");
        expect(content2).toHaveAttribute("data-state", "open");
      }
    );

    await step("8. Fechar FAQs em ordem reversa", async () => {
      // Fechar terceiro
      const trigger2 = canvas.getByTestId("faq-trigger-2");
      await userEvent.click(trigger2);
      await waitFor(() => {
        expect(canvas.getByTestId("faq-content-2")).toHaveAttribute(
          "data-state",
          "closed"
        );
      });

      // Fechar segundo
      const trigger1 = canvas.getByTestId("faq-trigger-1");
      await userEvent.click(trigger1);
      await waitFor(() => {
        expect(canvas.getByTestId("faq-content-1")).toHaveAttribute(
          "data-state",
          "closed"
        );
      });

      // Fechar primeiro
      const trigger0 = canvas.getByTestId("faq-trigger-0");
      await userEvent.click(trigger0);
      await waitFor(() => {
        expect(canvas.getByTestId("faq-content-0")).toHaveAttribute(
          "data-state",
          "closed"
        );
      });
    });

    await step("9. Verificar ícones em todos os triggers", async () => {
      const trigger0 = canvas.getByTestId("faq-trigger-0");
      const trigger1 = canvas.getByTestId("faq-trigger-1");
      const trigger2 = canvas.getByTestId("faq-trigger-2");

      expect(trigger0.querySelector("svg")).toBeInTheDocument();
      expect(trigger1.querySelector("svg")).toBeInTheDocument();
      expect(trigger2.querySelector("svg")).toBeInTheDocument();
    });
  },
};

export const RichContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CollapsibleBase, CollapsibleTriggerBase, CollapsibleContentBase } from '@mlw-packages/react-components';
import { ButtonBase } from '@mlw-packages/react-components';

export default function RichContent() {
  return (
    <CollapsibleBase className="w-[450px] border rounded-lg">
      <CollapsibleTriggerBase leftIcon={<></>}>Configurações Avançadas</CollapsibleTriggerBase>
      <CollapsibleContentBase>
        <div>
          <label>API Key</label>
          <input placeholder="sk-..." />
          <label>Environment</label>
          <select>
            <option>Development</option>
            <option>Production</option>
          </select>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonBase variant="outline" size="sm">Cancelar</ButtonBase>
            <ButtonBase size="sm">Salvar</ButtonBase>
          </div>
        </div>
      </CollapsibleContentBase>
    </CollapsibleBase>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const [isOpen, setIsOpen] = React.useState(args.defaultOpen || false);

    return (
      <CollapsibleBase
        {...args}
        open={args.open !== undefined ? args.open : isOpen}
        onOpenChange={setIsOpen}
        className="w-[450px] border rounded-lg"
        data-testid="collapsible-rich"
      >
        <CollapsibleTriggerBase
          leftIcon={<Gear />}
          data-testid="collapsible-rich-trigger"
        >
          Configurações Avançadas
        </CollapsibleTriggerBase>

        <CollapsibleContentBase data-testid="collapsible-rich-content">
          <div className="p-4 pt-0 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">API Key</label>
                <input
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  placeholder="sk-..."
                  data-testid="api-key-input"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Environment</label>
                <select
                  className="w-full mt-1 px-3 py-2 border rounded-md"
                  data-testid="environment-select"
                >
                  <option>Development</option>
                  <option>Production</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <textarea
                className="w-full mt-1 px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Descrição das configurações..."
                data-testid="description-textarea"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <ButtonBase
                variant="outline"
                size="sm"
                data-testid="cancel-button"
              >
                Cancelar
              </ButtonBase>
              <ButtonBase size="sm" data-testid="save-button">
                Salvar
              </ButtonBase>
            </div>
          </div>
        </CollapsibleContentBase>
      </CollapsibleBase>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "1. Verificar renderização do collapsible com conteúdo rico",
      async () => {
        const trigger = canvas.getByTestId("collapsible-rich-trigger");
        expect(trigger).toBeInTheDocument();
        expect(trigger).toHaveTextContent("Configurações Avançadas");

        const icon = trigger.querySelector("svg");
        expect(icon).toBeInTheDocument();
      }
    );

    await step("2. Verificar estado inicial fechado", async () => {
      const content = canvas.getByTestId("collapsible-rich-content");
      expect(content).toHaveAttribute("data-state", "closed");
    });

    await step("3. Abrir collapsible", async () => {
      const trigger = canvas.getByTestId("collapsible-rich-trigger");
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId("collapsible-rich-content");
        expect(content).toHaveAttribute("data-state", "open");
      });
    });

    await step("4. Verificar campos de formulário visíveis", async () => {
      await waitFor(
        () => {
          const apiKeyInput = canvas.getByTestId("api-key-input");
          const environmentSelect = canvas.getByTestId("environment-select");
          const descriptionTextarea = canvas.getByTestId(
            "description-textarea"
          );

          expect(apiKeyInput).toBeInTheDocument();
          expect(environmentSelect).toBeInTheDocument();
          expect(descriptionTextarea).toBeInTheDocument();
        },
        { timeout: 1000 }
      );
    });

    await step("5. Verificar placeholders dos campos", async () => {
      const apiKeyInput = canvas.getByTestId("api-key-input");
      const descriptionTextarea = canvas.getByTestId("description-textarea");

      expect(apiKeyInput).toHaveAttribute("placeholder", "sk-...");
      expect(descriptionTextarea).toHaveAttribute(
        "placeholder",
        "Descrição das configurações..."
      );
    });

    await step("6. Preencher campo API Key", async () => {
      const apiKeyInput = canvas.getByTestId("api-key-input");
      await userEvent.type(apiKeyInput, "sk-test123456789");

      expect(apiKeyInput).toHaveValue("sk-test123456789");
    });

    await step("7. Selecionar ambiente Production", async () => {
      const environmentSelect = canvas.getByTestId("environment-select");
      await userEvent.selectOptions(environmentSelect, "Production");

      expect(environmentSelect).toHaveValue("Production");
    });

    await step("8. Preencher descrição", async () => {
      const descriptionTextarea = canvas.getByTestId("description-textarea");
      await userEvent.type(
        descriptionTextarea,
        "Configurações para o ambiente de produção"
      );

      expect(descriptionTextarea).toHaveValue(
        "Configurações para o ambiente de produção"
      );
    });

    await step("9. Verificar botões de ação", async () => {
      const cancelButton = canvas.getByTestId("cancel-button");
      const saveButton = canvas.getByTestId("save-button");

      expect(cancelButton).toBeInTheDocument();
      expect(cancelButton).toHaveTextContent("Cancelar");
      expect(saveButton).toBeInTheDocument();
      expect(saveButton).toHaveTextContent("Salvar");
    });

    await step("10. Verificar interação com botões", async () => {
      const cancelButton = canvas.getByTestId("cancel-button");
      const saveButton = canvas.getByTestId("save-button");

      // Verificar que botões são clicáveis
      expect(cancelButton).toBeEnabled();
      expect(saveButton).toBeEnabled();

      await userEvent.click(saveButton);
      // Botão deve processar o clique (sem erros)
    });

    await step("11. Fechar collapsible e verificar estado", async () => {
      const trigger = canvas.getByTestId("collapsible-rich-trigger");
      await userEvent.click(trigger);

      await waitFor(() => {
        const content = canvas.getByTestId("collapsible-rich-content");
        expect(content).toHaveAttribute("data-state", "closed");
      });
    });

    await step(
      "12. Reabrir e verificar valores preenchidos persistem",
      async () => {
        const trigger = canvas.getByTestId("collapsible-rich-trigger");
        await userEvent.click(trigger);

        await waitFor(() => {
          const content = canvas.getByTestId("collapsible-rich-content");
          expect(content).toHaveAttribute("data-state", "open");
        });

        // Verificar que valores persistem após fechar/abrir
        const apiKeyInput = canvas.getByTestId("api-key-input");
        const environmentSelect = canvas.getByTestId("environment-select");
        const descriptionTextarea = canvas.getByTestId("description-textarea");

        expect(apiKeyInput).toHaveValue("sk-test123456789");
        expect(environmentSelect).toHaveValue("Production");
        expect(descriptionTextarea).toHaveValue(
          "Configurações para o ambiente de produção"
        );
      }
    );

    await step("13. Testar limpeza de campo API Key", async () => {
      const apiKeyInput = canvas.getByTestId("api-key-input");
      await userEvent.clear(apiKeyInput);

      expect(apiKeyInput).toHaveValue("");
    });

    await step("14. Verificar estrutura de grid responsivo", async () => {
      const content = canvas.getByTestId("collapsible-rich-content");
      const gridContainer = content.querySelector(".grid.grid-cols-2");

      expect(gridContainer).toBeInTheDocument();
    });

    await step("15. Verificar espaçamento entre elementos", async () => {
      const content = canvas.getByTestId("collapsible-rich-content");
      const spaceContainer = content.querySelector(".space-y-4");

      expect(spaceContainer).toBeInTheDocument();
    });
  },
};

function CollapsibleFAQItem({
  question,
  answer,
  icon,
  testId,
}: {
  question: string;
  answer: string;
  icon: React.ReactNode;
  testId?: string;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <CollapsibleBase
      open={isOpen}
      onOpenChange={setIsOpen}
      className="border rounded-lg"
      data-testid={testId}
    >
      <CollapsibleTriggerBase
        leftIcon={icon}
        data-testid={
          testId ? `${testId.replace("item", "trigger")}` : undefined
        }
      >
        {question}
      </CollapsibleTriggerBase>
      <CollapsibleContentBase
        data-testid={
          testId ? `${testId.replace("item", "content")}` : undefined
        }
      >
        <div
          className="px-4 pb-4 text-sm text-muted-foreground"
          data-testid={
            testId ? `${testId.replace("item", "answer")}` : undefined
          }
        >
          {answer}
        </div>
      </CollapsibleContentBase>
    </CollapsibleBase>
  );
}
