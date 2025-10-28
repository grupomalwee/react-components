import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  FileUploader,
  FileWithPreview,
} from "../components/ui/data/FileUploader";
import { useState } from "react";

const meta: Meta<typeof FileUploader> = {
  title: "forms/File Uploader",
  component: FileUploader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para upload de arquivos com drag & drop, preview de imagens e ícones específicos por tipo de arquivo. O comportamento múltiplo é determinado automaticamente pelo valor de maxFiles (1 = único, >1 = múltiplo).",
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
      control: "object",
      description: "Array de tipos de arquivo aceitos",
    },
    maxSize: {
      control: "number",
      description: "Tamanho máximo do arquivo em bytes",
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
    accept: [],
    maxSize: 10 * 1024 * 1024,
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
  args: React.ComponentProps<typeof FileUploader>
) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleUpload = async (
    uploadFiles: FileWithPreview[]
  ): Promise<void> => {
    console.log("Uploading files:", uploadFiles);
    return new Promise((resolve) => {
      setTimeout(() => resolve(), 2000);
    });
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
};

export const ImagesOnly: Story = {
  render: (args) => (
    <FileUploaderWrapper
      {...args}
      accept={["image/*"]}
      dropzoneText="Apenas imagens"
      dropzoneSubtext="PNG, JPEG, GIF, WebP até 10MB"
    />
  ),
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
};

meta.parameters = {
  ...meta.parameters,
  docs: {
    ...meta.parameters?.docs,
    source: {
      code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  async function handleUpload(uploadFiles) {
    // enviar para o servidor
    console.log('Uploading', uploadFiles);
  }

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        accept={[]}
        maxSize={10 * 1024 * 1024}
        maxFiles={5}
        showPreview
        onValueChange={setFiles}
        onUpload={handleUpload}
      />
    </div>
  );
}

export default Example;`,
    },
  },
};

Default.parameters = {
  ...Default.parameters,
  docs: {
    ...Default.parameters?.docs,
    source: {
      code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader value={files} onValueChange={setFiles} onUpload={() => {}} />
    </div>
  );
}

export default Example;`,
    },
  },
};

ImagesOnly.parameters = {
  ...ImagesOnly.parameters,
  docs: {
    ...ImagesOnly.parameters?.docs,
    source: {
      code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        accept={["image/*"]}
        dropzoneText='Apenas imagens'
        dropzoneSubtext='PNG, JPEG, GIF, WebP até 10MB'
        value={files}
        onValueChange={setFiles}
      />
    </div>
  );
}

export default Example;`,
    },
  },
};

SingleFile.parameters = {
  ...SingleFile.parameters,
  docs: {
    ...SingleFile.parameters?.docs,
    source: {
      code: `import { FileUploader } from '@mlw-packages/react-components';

function Example() {
  const [files, setFiles] = React.useState([]);

  return (
    <div style={{ width: 400 }}>
      <FileUploader
        maxFiles={1}
        dropzoneText='Selecione um arquivo'
        dropzoneSubtext='Apenas um arquivo por vez'
        value={files}
        onValueChange={setFiles}
      />
    </div>
  );
}

export default Example;`,
    },
  },
};
