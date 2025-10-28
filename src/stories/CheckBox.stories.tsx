import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, waitFor } from "storybook/test";
import { CheckboxBase } from "../components/ui/form/CheckBoxBase";
import LabelBase from "../components/ui/form/LabelBase";

const meta: Meta<typeof CheckboxBase> = {
  title: "forms/CheckBox",
  component: CheckboxBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Checkbox para seleção única ou múltipla, com grupo, desabilitado e label.",
      },
      source: {
        code: `import React from 'react';
import { CheckboxBase } from '@mlw-packages/react-components';
import LabelBase from '@mlw-packages/react-components';

export default function Example() {
  return (
    <div>
      <CheckboxBase id="terms" />
      <LabelBase htmlFor="terms">Aceito os termos e condições</LabelBase>
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
};

export default meta;
type Story = StoryObj<typeof CheckboxBase>;

export const Simples: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CheckboxBase } from '@mlw-packages/react-components';
import LabelBase from '@mlw-packages/react-components';

export default function Simples() {
  return (
    <div>
      <CheckboxBase id="terms" data-testid="checkbox-terms" />
      <LabelBase htmlFor="terms">Aceito os termos e condições</LabelBase>
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
      <div className="flex items-center space-x-2">
        <CheckboxBase id="terms" data-testid="checkbox-terms" />
        <LabelBase htmlFor="terms" data-testid="label-terms">
          Aceito os termos e condições
        </LabelBase>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar checkbox renderizado", async () => {
      const checkbox = canvas.getByTestId("checkbox-terms");
      expect(checkbox).toBeInTheDocument();
    });

    await step("Verificar label presente", async () => {
      const label = canvas.getByTestId("label-terms");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Aceito os termos e condições");
    });

    await step("Verificar checkbox inicialmente desmarcado", async () => {
      const checkbox = canvas.getByTestId("checkbox-terms");
      expect(checkbox).not.toBeChecked();
    });

    await step("Testar click no checkbox", async () => {
      const checkbox = canvas.getByTestId("checkbox-terms");
      await userEvent.click(checkbox);

      await waitFor(() => {
        expect(checkbox).toBeChecked();
      });
    });

    await step("Testar desmarcar checkbox", async () => {
      const checkbox = canvas.getByTestId("checkbox-terms");
      await userEvent.click(checkbox);

      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });
    });

    await step("Verificar associação label-checkbox", async () => {
      const label = canvas.getByTestId("label-terms");
      expect(label).toHaveAttribute("for", "terms");
    });
  },
};

export const Grupo: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CheckboxBase } from '@mlw-packages/react-components';
import LabelBase from '@mlw-packages/react-components';

export default function Grupo() {
  return (
    <div>
      <h4>Notificações</h4>
      <div>
        <CheckboxBase id="email" defaultChecked />
        <LabelBase htmlFor="email">Email</LabelBase>
      </div>
      <div>
        <CheckboxBase id="sms" />
        <LabelBase htmlFor="sms">SMS</LabelBase>
      </div>
      <div>
        <CheckboxBase id="push" />
        <LabelBase htmlFor="push">Push Notification</LabelBase>
      </div>
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
      <div className="flex flex-col gap-3" data-testid="checkbox-group">
        <h4 className="text-base font-medium" data-testid="group-title">
          Notificações
        </h4>
        <div className="flex items-center space-x-2">
          <CheckboxBase
            id="email"
            defaultChecked
            data-testid="checkbox-email"
          />
          <LabelBase htmlFor="email" data-testid="label-email">
            Email
          </LabelBase>
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="sms" data-testid="checkbox-sms" />
          <LabelBase htmlFor="sms" data-testid="label-sms">
            SMS
          </LabelBase>
        </div>
        <div className="flex items-center space-x-2">
          <CheckboxBase id="push" data-testid="checkbox-push" />
          <LabelBase htmlFor="push" data-testid="label-push">
            Push Notification
          </LabelBase>
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar grupo de checkboxes renderizado", async () => {
      const group = canvas.getByTestId("checkbox-group");
      expect(group).toBeInTheDocument();
    });

    await step("Verificar título do grupo", async () => {
      const title = canvas.getByTestId("group-title");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent("Notificações");
    });

    await step("Verificar todos os checkboxes presentes", async () => {
      expect(canvas.getByTestId("checkbox-email")).toBeInTheDocument();
      expect(canvas.getByTestId("checkbox-sms")).toBeInTheDocument();
      expect(canvas.getByTestId("checkbox-push")).toBeInTheDocument();
    });

    await step("Verificar todos os labels presentes", async () => {
      expect(canvas.getByTestId("label-email")).toHaveTextContent("Email");
      expect(canvas.getByTestId("label-sms")).toHaveTextContent("SMS");
      expect(canvas.getByTestId("label-push")).toHaveTextContent(
        "Push Notification"
      );
    });

    await step("Verificar checkbox Email inicialmente marcado", async () => {
      const emailCheckbox = canvas.getByTestId("checkbox-email");
      expect(emailCheckbox).toBeChecked();
    });

    await step("Verificar checkboxes SMS e Push desmarcados", async () => {
      expect(canvas.getByTestId("checkbox-sms")).not.toBeChecked();
      expect(canvas.getByTestId("checkbox-push")).not.toBeChecked();
    });

    await step("Testar marcar checkbox SMS", async () => {
      const smsCheckbox = canvas.getByTestId("checkbox-sms");
      await userEvent.click(smsCheckbox);

      await waitFor(() => {
        expect(smsCheckbox).toBeChecked();
      });
    });

    await step("Testar marcar checkbox Push", async () => {
      const pushCheckbox = canvas.getByTestId("checkbox-push");
      await userEvent.click(pushCheckbox);

      await waitFor(() => {
        expect(pushCheckbox).toBeChecked();
      });
    });

    await step("Verificar todos marcados simultaneamente", async () => {
      expect(canvas.getByTestId("checkbox-email")).toBeChecked();
      expect(canvas.getByTestId("checkbox-sms")).toBeChecked();
      expect(canvas.getByTestId("checkbox-push")).toBeChecked();
    });

    await step("Testar desmarcar Email", async () => {
      const emailCheckbox = canvas.getByTestId("checkbox-email");
      await userEvent.click(emailCheckbox);

      await waitFor(() => {
        expect(emailCheckbox).not.toBeChecked();
      });
    });

    await step("Verificar associação dos labels", async () => {
      expect(canvas.getByTestId("label-email")).toHaveAttribute("for", "email");
      expect(canvas.getByTestId("label-sms")).toHaveAttribute("for", "sms");
      expect(canvas.getByTestId("label-push")).toHaveAttribute("for", "push");
    });

    await step("Testar click no label SMS para marcar/desmarcar", async () => {
      const smsCheckbox = canvas.getByTestId("checkbox-sms");
      const smsLabel = canvas.getByTestId("label-sms");

      const wasChecked =
        smsCheckbox.getAttribute("aria-checked") === "true" ||
        smsCheckbox.getAttribute("data-state") === "checked";

      await userEvent.click(smsLabel);

      await waitFor(() => {
        const isNowChecked =
          smsCheckbox.getAttribute("aria-checked") === "true" ||
          smsCheckbox.getAttribute("data-state") === "checked";
        expect(isNowChecked).not.toBe(wasChecked);
      });
    });
  },
};

export const Desabilitado: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { CheckboxBase } from '@mlw-packages/react-components';
import LabelBase from '@mlw-packages/react-components';

export default function Desabilitado() {
  return (
    <div className="opacity-50">
      <CheckboxBase id="disabled" disabled />
      <LabelBase htmlFor="disabled">Desabilitado</LabelBase>
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
      <div
        className="flex items-center space-x-2 opacity-50"
        data-testid="disabled-container"
      >
        <CheckboxBase id="disabled" disabled data-testid="checkbox-disabled" />
        <LabelBase htmlFor="disabled" data-testid="label-disabled">
          Desabilitado
        </LabelBase>
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar checkbox desabilitado renderizado", async () => {
      const checkbox = canvas.getByTestId("checkbox-disabled");
      expect(checkbox).toBeInTheDocument();
    });

    await step("Verificar label desabilitado presente", async () => {
      const label = canvas.getByTestId("label-disabled");
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent("Desabilitado");
    });

    await step("Verificar atributo disabled", async () => {
      const checkbox = canvas.getByTestId("checkbox-disabled");
      expect(checkbox).toBeDisabled();
    });

    await step("Verificar checkbox inicialmente desmarcado", async () => {
      const checkbox = canvas.getByTestId("checkbox-disabled");
      expect(checkbox).not.toBeChecked();
    });

    await step("Verificar container com opacidade", async () => {
      const container = canvas.getByTestId("disabled-container");
      expect(container).toHaveClass("opacity-50");
    });

    await step("Verificar que click não altera estado", async () => {
      const checkbox = canvas.getByTestId("checkbox-disabled");

      // Tenta clicar no checkbox desabilitado
      await userEvent.click(checkbox);

      // Verifica que continua desmarcado
      await waitFor(() => {
        expect(checkbox).not.toBeChecked();
      });
    });

    await step("Verificar que hover não muda cursor", async () => {
      const checkbox = canvas.getByTestId("checkbox-disabled");
      await userEvent.hover(checkbox);

      // Verifica que ainda está desabilitado após hover
      expect(checkbox).toBeDisabled();
    });

    await step("Verificar associação label-checkbox desabilitado", async () => {
      const label = canvas.getByTestId("label-disabled");
      expect(label).toHaveAttribute("for", "disabled");
    });

    await step("Verificar que label click não ativa checkbox", async () => {
      const checkbox = canvas.getByTestId("checkbox-disabled");
      const label = canvas.getByTestId("label-disabled");

      await userEvent.click(label);

      // Checkbox permanece desabilitado e desmarcado
      await waitFor(() => {
        expect(checkbox).toBeDisabled();
        expect(checkbox).not.toBeChecked();
      });
    });
  },
};
