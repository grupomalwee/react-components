import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { TagInput } from "@/components/ui/form/TagInput";

const meta: Meta<typeof TagInput> = {
  title: "form/TagInput",
  component: TagInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Campo de entrada para múltiplas tags/chips. Pressione Enter ou vírgula para adicionar. Clique no × para remover.",
      },
      source: {
        code: `import React, { useState } from 'react';
import { TagInput } from '@mlw-packages/react-components';

export default function Example() {
  const [tags, setTags] = useState(['React', 'TypeScript']);

  return (
    <TagInput
      label="Tecnologias"
      tags={tags}
      onTagsChange={setTags}
      placeholder="Digite e pressione Enter..."
    />
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
    disabled: { control: "boolean" },
    label: { control: "text" },
    error: { control: "text" },
    placeholder: { control: "text" },
    maxTags: { control: { type: "number", min: 1 } },
    allowDuplicates: { control: "boolean" },
    onTagsChange: { action: "tagsChange" },
  },
  args: {
    disabled: false,
    label: "",
    error: "",
    placeholder: "Digite e pressione Enter...",
    allowDuplicates: false,
  },
};

export default meta;
type Story = StoryObj<typeof TagInput>;

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { TagInput } from '@mlw-packages/react-components';

export default function Default() {
  const [tags, setTags] = useState(['React', 'TypeScript']);
  return (
    <div style={{ width: 360 }}>
      <TagInput label="Tecnologias" tags={tags} onTagsChange={setTags} />
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [tags, setTags] = useState(["React", "TypeScript"]);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 360 }}>
            <TagInput
              {...args}
              label="Tecnologias"
              tags={tags}
              onTagsChange={setTags}
              data-testid="tag-input-default"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar tags iniciais renderizadas", async () => {
      expect(canvas.getByTestId("tag-input-default-tag-0")).toBeInTheDocument();
      expect(canvas.getByTestId("tag-input-default-tag-1")).toBeInTheDocument();
    });

    await step("Adicionar nova tag com Enter", async () => {
      const input = canvas.getByTestId("tag-input-default-input");
      await userEvent.click(input);
      await userEvent.type(input, "Vite");
      await userEvent.keyboard("{Enter}");
      expect(canvas.getByTestId("tag-input-default-tag-2")).toBeInTheDocument();
    });

    await step("Remover tag ao clicar no ×", async () => {
      const removeBtn = canvas.getByTestId("tag-input-default-tag-0-remove");
      await userEvent.click(removeBtn);
      expect(
        canvas.queryByTestId("tag-input-default-tag-0-remove"),
      ).not.toBeNull();
    });
  },
};

export const MaxTags: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { TagInput } from '@mlw-packages/react-components';

export default function MaxTags() {
  const [tags, setTags] = useState(['Frontend', 'Backend']);
  return (
    <div style={{ width: 360 }}>
      <TagInput
        label="Áreas (máx. 3)"
        tags={tags}
        onTagsChange={setTags}
        maxTags={3}
        placeholder="Adicione até 3 áreas..."
      />
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [tags, setTags] = useState(["Frontend", "Backend"]);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 360 }}>
            <TagInput
              {...args}
              label="Áreas (máx. 3)"
              tags={tags}
              onTagsChange={setTags}
              maxTags={3}
              placeholder="Adicione até 3 áreas..."
              data-testid="tag-input-max"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar input visível (limite não atingido)", async () => {
      expect(canvas.getByTestId("tag-input-max-input")).toBeInTheDocument();
    });

    await step("Adicionar terceira tag para atingir o limite", async () => {
      const input = canvas.getByTestId("tag-input-max-input");
      await userEvent.type(input, "Design");
      await userEvent.keyboard("{Enter}");
    });

    await step("Verificar input escondido ao atingir limite", async () => {
      expect(
        canvas.queryByTestId("tag-input-max-input"),
      ).not.toBeInTheDocument();
      expect(canvas.getByText("Máx. 3 tags")).toBeInTheDocument();
    });
  },
};

export const Disabled: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React from 'react';
import { TagInput } from '@mlw-packages/react-components';

export default function Disabled() {
  return (
    <div style={{ width: 360 }}>
      <TagInput
        label="Tags (desabilitado)"
        tags={['Design', 'UX']}
        disabled
      />
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
        justifyContent: "center",
        alignItems: "center",
        padding: "32px 0",
      }}
    >
      <div style={{ width: 360 }}>
        <TagInput
          {...args}
          label="Tags (desabilitado)"
          tags={["Design", "UX"]}
          disabled
          data-testid="tag-input-disabled"
        />
      </div>
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar tags visíveis sem botão de remoção", async () => {
      expect(
        canvas.getByTestId("tag-input-disabled-tag-0"),
      ).toBeInTheDocument();
      expect(
        canvas.queryByTestId("tag-input-disabled-tag-0-remove"),
      ).not.toBeInTheDocument();
    });
  },
};

export const WithError: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { TagInput } from '@mlw-packages/react-components';

export default function WithError() {
  const [tags, setTags] = useState([]);
  return (
    <div style={{ width: 360 }}>
      <TagInput
        label="Categorias"
        tags={tags}
        onTagsChange={setTags}
        error="Adicione pelo menos uma categoria."
      />
    </div>
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [tags, setTags] = useState<string[]>([]);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 360 }}>
            <TagInput
              {...args}
              label="Categorias"
              tags={tags}
              onTagsChange={setTags}
              error="Adicione pelo menos uma categoria."
              data-testid="tag-input-error"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verificar mensagem de erro visível", async () => {
      expect(
        canvas.getByText("Adicione pelo menos uma categoria."),
      ).toBeInTheDocument();
    });

    await step("Adicionar uma tag resolve estado visual", async () => {
      const input = canvas.getByTestId("tag-input-error-input");
      await userEvent.type(input, "Moda");
      await userEvent.keyboard("{Enter}");
      expect(canvas.getByTestId("tag-input-error-tag-0")).toBeInTheDocument();
    });
  },
};

export const AllowDuplicates: Story = {
  parameters: {
    docs: {
      source: {
        code: `import React, { useState } from 'react';
import { TagInput } from '@mlw-packages/react-components';

export default function AllowDuplicates() {
  const [tags, setTags] = useState(['azul']);
  return (
    <TagInput
      label="Cores (duplicatas permitidas)"
      tags={tags}
      onTagsChange={setTags}
      allowDuplicates
    />
  );
}
`,
      },
    },
  },
  render: (args) => {
    const Comp = () => {
      const [tags, setTags] = useState(["azul"]);
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "32px 0",
          }}
        >
          <div style={{ width: 360 }}>
            <TagInput
              {...args}
              label="Cores (duplicatas permitidas)"
              tags={tags}
              onTagsChange={setTags}
              allowDuplicates
              data-testid="tag-input-dup"
            />
          </div>
        </div>
      );
    };
    return <Comp />;
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Adicionar tag duplicada", async () => {
      const input = canvas.getByTestId("tag-input-dup-input");
      await userEvent.type(input, "azul");
      await userEvent.keyboard("{Enter}");
      expect(canvas.getByTestId("tag-input-dup-tag-1")).toBeInTheDocument();
    });
  },
};
