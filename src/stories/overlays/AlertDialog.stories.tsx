import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
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
} from "@/components/ui/feedback/AlertDialogBase";
import {
  CheckCircleIcon,
  WarningCircleIcon,
  XCircleIcon,
  InfoIcon,
} from "@phosphor-icons/react";

const meta: Meta<typeof AlertDialogBase> = {
  title: "feedback/Alert Dialog",
  component: AlertDialogBase,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "AlertDialog para avisos, confirmações e feedbacks visuais.",
      },
      source: {
        code: `import React from 'react';
import {
  AlertDialogBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogCancelBase,
  AlertDialogActionBase,
} from '@mlw-packages/react-components';

export default function Example() {
  return (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Excluir Conta</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <AlertDialogTitleBase>Tem certeza absoluta?</AlertDialogTitleBase>
          <AlertDialogDescriptionBase>
            Essa ação não pode ser desfeita.
          </AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
          <AlertDialogActionBase className="bg-destructive">Excluir</AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
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
type Story = StoryObj<typeof AlertDialogBase>;

export const ExcluirConta: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <AlertDialogBase>
        <AlertDialogTriggerBase>Excluir Conta</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-destructive">
              <XCircleIcon />
              <AlertDialogTitleBase>Tem certeza absoluta?</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              Essa ação não pode ser desfeita. Isso vai excluir permanentemente
              sua conta e remover seus dados dos nossos servidores.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
            <AlertDialogActionBase className="bg-destructive hover:bg-destructive/90 ml-2">
              Excluir
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  AlertDialogBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogCancelBase,
  AlertDialogActionBase,
} from '@mlw-packages/react-components';

export default function ExcluirConta() {
  return (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Excluir Conta</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <AlertDialogTitleBase>Tem certeza absoluta?</AlertDialogTitleBase>
          <AlertDialogDescriptionBase>Essa ação não pode ser desfeita.</AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
          <AlertDialogActionBase className="bg-destructive">Excluir</AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  );
}
`,
      },
    },
  },
};

export const Aviso: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <AlertDialogBase>
        <AlertDialogTriggerBase>Aviso</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-yellow-500">
              <WarningCircleIcon />
              <AlertDialogTitleBase>Olha, preste atenção!</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              Você está prestes a fazer uma alteração que pode impactar outros
              usuários.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
            <AlertDialogActionBase className=" ml-2 bg-yellow-500 hover:bg-yellow-600 text-black">
              Prosseguir
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  AlertDialogBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogCancelBase,
  AlertDialogActionBase,
} from '@mlw-packages/react-components';

export default function Aviso() {
  return (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Aviso</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <AlertDialogTitleBase>Olha, preste atenção!</AlertDialogTitleBase>
          <AlertDialogDescriptionBase>Você está prestes a fazer uma alteração que pode impactar outros usuários.</AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogCancelBase>Cancelar</AlertDialogCancelBase>
          <AlertDialogActionBase className="ml-2 bg-yellow-500 text-black">Prosseguir</AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  );
}
`,
      },
    },
  },
};

export const Sucesso: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <AlertDialogBase>
        <AlertDialogTriggerBase>Ação Concluída</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-emerald-600">
              <CheckCircleIcon />
              <AlertDialogTitleBase>
                Operação bem-sucedida!
              </AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              Sua ação foi concluída com sucesso. Pode fechar essa janela.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogActionBase className="bg-emerald-600 hover:bg-emerald-700">
              Fechar
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  AlertDialogBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogActionBase,
} from '@mlw-packages/react-components';

export default function Sucesso() {
  return (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Ação Concluída</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <AlertDialogTitleBase>Operação bem-sucedida!</AlertDialogTitleBase>
          <AlertDialogDescriptionBase>Sua ação foi concluída com sucesso.</AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogActionBase className="bg-emerald-600">Fechar</AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  );
}
`,
      },
    },
  },
};

export const Informacao: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <AlertDialogBase>
        <AlertDialogTriggerBase>Informação</AlertDialogTriggerBase>
        <AlertDialogContentBase>
          <AlertDialogHeaderBase>
            <div className="flex items-center gap-2 text-blue-600">
              <InfoIcon />
              <AlertDialogTitleBase>Importante saber!</AlertDialogTitleBase>
            </div>
            <AlertDialogDescriptionBase>
              O sistema passará por manutenção amanhã das 00h às 04h. Alguns
              serviços poderão ficar indisponíveis.
            </AlertDialogDescriptionBase>
          </AlertDialogHeaderBase>
          <AlertDialogFooterBase>
            <AlertDialogActionBase className="bg-blue-600 hover:bg-blue-700">
              Entendi
            </AlertDialogActionBase>
          </AlertDialogFooterBase>
        </AlertDialogContentBase>
      </AlertDialogBase>
    </div>
  ),
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import {
  AlertDialogBase,
  AlertDialogTriggerBase,
  AlertDialogContentBase,
  AlertDialogHeaderBase,
  AlertDialogTitleBase,
  AlertDialogDescriptionBase,
  AlertDialogFooterBase,
  AlertDialogActionBase,
} from '@mlw-packages/react-components';

export default function Informacao() {
  return (
    <AlertDialogBase>
      <AlertDialogTriggerBase>Informação</AlertDialogTriggerBase>
      <AlertDialogContentBase>
        <AlertDialogHeaderBase>
          <AlertDialogTitleBase>Importante saber!</AlertDialogTitleBase>
          <AlertDialogDescriptionBase>O sistema passará por manutenção amanhã.</AlertDialogDescriptionBase>
        </AlertDialogHeaderBase>
        <AlertDialogFooterBase>
          <AlertDialogActionBase className="bg-blue-600">Entendi</AlertDialogActionBase>
        </AlertDialogFooterBase>
      </AlertDialogContentBase>
    </AlertDialogBase>
  );
}
`,
      },
    },
  },
};
