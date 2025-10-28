import {
  FileUploader,
  FileWithPreview,
} from "@/components/ui/data/FileUploader";
import { useState } from "react";

export const FileUploaderPage = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const handleValueChange = (newFiles: FileWithPreview[]) => {
    setFiles(newFiles);
  };

  const handleUpload = async (files: FileWithPreview[]) => {
    console.log("Uploading files:", files);
  };

  return (
    <>
      <div className="mt-5 ml-5 grid grid-cols-2 gap-5 p-3 rounded-sm">
        <FileUploader
          accept={["image/*", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"]}
          maxSize={10 * 1024 * 1024}
          maxFiles={10}
          value={files}
          onValueChange={handleValueChange}
          onUpload={handleUpload}
          showPreview={true}
          dropzoneText="Arraste arquivos aqui ou clique para selecionar"
          dropzoneSubtext="Suporta imagens, documentos e mais tipos de arquivo"
        />
        <FileUploader
          accept={["image/*", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"]}
          maxSize={10 * 1024 * 1024}
          maxFiles={10}
          value={files}
          onValueChange={handleValueChange}
          onUpload={handleUpload}
          showPreview={true}
          dropzoneText="Arraste arquivos aqui ou clique para selecionar"
          dropzoneSubtext="Suporta imagens, documentos e mais tipos de arquivo"
        />
        <FileUploader
          accept={["image/*", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"]}
          maxSize={10 * 1024 * 1024}
          maxFiles={10}
          value={files}
          onValueChange={handleValueChange}
          onUpload={handleUpload}
          showPreview={true}
          dropzoneText="Arraste arquivos aqui ou clique para selecionar"
          dropzoneSubtext="Suporta imagens, documentos e mais tipos de arquivo"
        />
        <FileUploader
          accept={["image/*", ".pdf", ".doc", ".docx", ".xls", ".xlsx", ".txt"]}
          maxSize={10 * 1024 * 1024}
          maxFiles={10}
          value={files}
          onValueChange={handleValueChange}
          onUpload={handleUpload}
          showPreview={true}
          dropzoneText="Arraste arquivos aqui ou clique para selecionar"
          dropzoneSubtext="Suporta imagens, documentos e mais tipos de arquivo"
        />

        <div className="my-8 mx-5">
          <h3 className="text-xl font-semibold mb-3">Documentação</h3>
          <div className="border-t-2 border-gray-300 mb-4"></div>

          <div className="bg-gray-800 text-white p-4 rounded-md mb-4">
            <h5 className="font-medium mb-2">Como importar:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`import { FileUploader, FileWithPreview } from "@/components/ui/FileUploader";`}
              </code>
            </pre>
          </div>

          <div className="bg-gray-800 text-white p-4 rounded-md">
            <h5 className="font-medium mb-2">Funcionalidades:</h5>
            <pre className="bg-gray-900 p-3 rounded-sm">
              <code>
                {`<FileUploader
const [files, setFiles] = useState<FileWithPreview[]>([]);

<FileUploader
  accept={["image/*", ".pdf", ".doc", ".docx"]}
  maxSize={10 * 1024 * 1024} 
  maxFiles={10}
  value={files}
  onValueChange={setFiles}
  onUpload={async (files) => {
    console.log('Enviando arquivos:', files);
  }}
/>`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </>
  );
};
