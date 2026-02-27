import "../../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FileUploader,
  FileWithPreview,
  FileAccept,
} from "@/components/ui/data/FileUploader";
import { useState } from "react";

const meta: Meta<typeof FileUploader> = {
  title: "forms/File Uploader",
  component: FileUploader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para upload de arquivos com drag & drop, preview de imagens e ícones específicos por tipo de arquivo.",
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
    accept: {
      control: "text",
      description:
        "String de tipos aceitos no formato nativo do input: `.pdf`, `.xlsx,.docx`, `image/*`. Use `FileAccept.*` para atalhos comuns.",
    },
    maxSize: {
      control: "number",
      description: "Tamanho máximo do arquivo em MB",
    },
    maxFiles: {
      control: "number",
      description:
        "Número máximo de arquivos permitidos (1 = único, >1 = múltiplo)",
    },
    disabled: {
      control: "boolean",
      description: "Desabilitar o componente",
    },
    showPreview: {
      control: "boolean",
      description: "Mostrar preview dos arquivos",
    },
    animate: {
      control: "boolean",
      description: "Habilitar animações",
    },
    dropzoneText: {
      control: "text",
      description: "Texto principal da dropzone",
    },
    dropzoneSubtext: {
      control: "text",
      description: "Texto secundário da dropzone",
    },
  },
  args: {
    accept: FileAccept.All,
    maxSize: 10,
    maxFiles: 5,
    disabled: false,
    showPreview: true,
    animate: true,
    dropzoneText: "Arraste arquivos aqui ou clique para selecionar",
    dropzoneSubtext: "Suporta imagens e documentos até 10MB",
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

const FileUploaderWrapper = (
  args: React.ComponentProps<typeof FileUploader>,
) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleUpload = async (
    uploadFiles: FileWithPreview[],
  ): Promise<void> => {
    console.log("Uploading files:", uploadFiles);
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <div style={{ width: "400px", maxWidth: "100%" }}>
      <FileUploader
        {...args}
        value={files}
        onValueChange={setFiles}
        onUpload={handleUpload}
      />
    </div>
  );
};

export const Default: Story = {
  render: (args) => <FileUploaderWrapper {...args} />,
  parameters: {
    docs: {
      source: {
        code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader value={files} onValueChange={setFiles} onUpload={() => {}} />
    </div>
  );
}`,
      },
    },
  },
};

export const ImagesOnly: Story = {
  render: (args) => (
    <FileUploaderWrapper
      {...args}
      accept={FileAccept.Image}
      dropzoneText="Apenas imagens"
      dropzoneSubtext="PNG, JPEG, GIF, WebP até 10MB"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { FileUploader, FileAccept } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        accept={FileAccept.Image}
        dropzoneText="Apenas imagens"
        dropzoneSubtext="PNG, JPEG, GIF, WebP até 10MB"
        value={files}
        onValueChange={setFiles}
      />
    </div>
  );
}`,
      },
    },
  },
};

export const DocumentsAndSpreadsheets: Story = {
  render: (args) => (
    <FileUploaderWrapper
      {...args}
      accept=".pdf,.xlsx,.docx"
      dropzoneText="Documentos e planilhas"
      dropzoneSubtext=".pdf, .xlsx, .docx até 10MB"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        accept=".pdf,.xlsx,.docx"
        dropzoneText="Documentos e planilhas"
        dropzoneSubtext=".pdf, .xlsx, .docx até 10MB"
        value={files}
        onValueChange={setFiles}
      />
    </div>
  );
}`,
      },
    },
  },
};

export const SingleFile: Story = {
  render: (args) => (
    <FileUploaderWrapper
      {...args}
      maxFiles={1}
      dropzoneText="Selecione um arquivo"
      dropzoneSubtext="Apenas um arquivo por vez"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        maxFiles={1}
        dropzoneText="Selecione um arquivo"
        dropzoneSubtext="Apenas um arquivo por vez"
        value={files}
        onValueChange={setFiles}
      />
    </div>
  );
}`,
      },
    },
  },
};

export const Disabled: Story = {
  render: (args) => (
    <FileUploaderWrapper
      {...args}
      disabled
      dropzoneText="Upload desabilitado"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        disabled
        dropzoneText="Upload desabilitado"
        value={files}
        onValueChange={setFiles}
      />
    </div>
  );
}`,
      },
    },
  },
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import { FileUploader, FileAccept } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  async function handleUpload(uploadFiles) {
    console.log('Uploading', uploadFiles);
  }

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        accept={FileAccept.All}
        maxSize={10}
        maxFiles={5}
        showPreview
        onValueChange={setFiles}
        onUpload={handleUpload}
      />
    </div>
  );
}`,
    },
  },
};
