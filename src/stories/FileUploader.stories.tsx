import "../style/global.css";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { FileUploader, FileWithPreview } from "../components/ui/FileUploader";
import { useState } from "react";

const meta: Meta<typeof FileUploader> = {
  title: "forms/FileUploader",
  component: FileUploader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Componente para upload de arquivos com drag & drop, preview de imagens e ícones específicos por tipo de arquivo. Suporta validação, progress e estados de upload.",
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
      description: "Número máximo de arquivos permitidos",
    },
    multiple: {
      control: "boolean",
      description: "Permitir múltiplos arquivos",
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
    showProgress: {
      control: "boolean",
      description: "Mostrar barra de progresso",
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
    accept: ["image/*", ".pdf", ".doc", ".docx"],
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5,
    multiple: true,
    disabled: false,
    showPreview: true,
    animate: true,
    showProgress: true,
    dropzoneText: "Arraste arquivos aqui ou clique para selecionar",
    dropzoneSubtext: "Suporta imagens e documentos até 10MB",
  },
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

// Wrapper component para gerenciar estado
const FileUploaderWrapper = (
  args: React.ComponentProps<typeof FileUploader>
) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleUpload = async (
    uploadFiles: FileWithPreview[]
  ): Promise<void> => {
    console.log("Uploading files:", uploadFiles);
    // Simular upload
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
      multiple={false}
      maxFiles={1}
      dropzoneText="Selecione um arquivo"
      dropzoneSubtext="Apenas um arquivo por vez"
    />
  ),
};
