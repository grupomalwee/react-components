import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CloudArrowUpIcon,
  CheckIcon,
  XIcon,
  FileTextIcon,
  FilePdfIcon,
  FileImageIcon,
  FileVideoIcon,
  FileAudioIcon,
  FileZipIcon,
  FileIcon,
  FileCsvIcon,
  FileXlsIcon,
  FilePptIcon,
  FileDocIcon,
} from "@phosphor-icons/react";
import { ButtonBase } from "../form/ButtonBase";

export const FileTypes = {
  Image: ["image/*", ".jpeg", ".jpg", ".png", ".gif", ".webp", ".svg"],
  Document: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  Spreadsheet: [".xls", ".xlsx", ".csv"],
  Presentation: [".ppt", ".pptx"],
  Video: ["video/*", ".mp4", ".webm", ".mkv", ".avi"],
  Audio: ["audio/*", ".mp3", ".wav", ".ogg"],
  All: [] as string[],
} as const;

export type FileTypeValues = (typeof FileTypes)[keyof typeof FileTypes];

export interface FileWithPreview extends File {
  id?: string;
  error?: string;
  preview?: string;
}

export interface FileUploaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrop"
> {
  accept?: string[] | readonly string[];
  maxSize?: number;
  maxFiles?: number;
  onValueChange: (files: FileWithPreview[]) => void;
  disabled?: boolean;
  value?: FileWithPreview[];
  onUpload?: (files: FileWithPreview[]) => Promise<void>;
  showPreview?: boolean;
  dropzoneText?: string;
  dropzoneSubtext?: string;
  animate?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
};

const getFileTypeIcon = (file: File) => {
  const extension = getFileExtension(file.name).toLowerCase();
  const mimeType = file.type.toLowerCase();

  if (extension === "pdf" || mimeType === "application/pdf") {
    return <FilePdfIcon size={20} className="text-red-500" />;
  }
  if (["doc", "docx"].includes(extension) || mimeType.includes("word")) {
    return <FileDocIcon size={20} className="text-blue-500" />;
  }
  if (["xls", "xlsx"].includes(extension) || mimeType.includes("sheet")) {
    return <FileXlsIcon size={20} className="text-green-500" />;
  }
  if (
    ["ppt", "pptx"].includes(extension) ||
    mimeType.includes("presentation")
  ) {
    return <FilePptIcon size={20} className="text-orange-500" />;
  }
  if (extension === "csv" || mimeType === "text/csv") {
    return <FileCsvIcon size={20} className="text-green-600" />;
  }
  if (
    ["txt", "md", "json", "xml", "js", "ts", "html", "css"].includes(
      extension,
    ) ||
    mimeType.includes("text")
  ) {
    return <FileTextIcon size={20} className="text-gray-500" />;
  }

  if (mimeType.startsWith("image/")) {
    return <FileImageIcon size={20} className="text-purple-500" />;
  }
  if (mimeType.startsWith("video/")) {
    return <FileVideoIcon size={20} className="text-pink-500" />;
  }
  if (mimeType.startsWith("audio/")) {
    return <FileAudioIcon size={20} className="text-indigo-500" />;
  }

  if (["zip", "rar", "7z", "tar", "gz"].includes(extension)) {
    return <FileZipIcon size={20} className="text-yellow-600" />;
  }

  return <FileIcon size={20} className="text-muted-foreground" />;
};

const createImagePreview = (file: File): Promise<string | null> => {
  return new Promise((resolve) => {
    if (!file.type.startsWith("image/")) {
      resolve(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      resolve(e.target?.result as string);
    };
    reader.onerror = () => {
      resolve(null);
    };
    reader.readAsDataURL(file);
  });
};

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      className,
      accept = FileTypes.All,
      maxSize = 10,
      maxFiles = 1,
      disabled = false,
      value = [],
      onValueChange,
      onUpload,
      showPreview = true,
      dropzoneText = "Arraste arquivos aqui ou clique para selecionar",
      dropzoneSubtext,
      animate = true,
      ...props
    },
    ref,
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const [files, setFiles] = React.useState<FileWithPreview[]>(value);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const dragCounterRef = React.useRef(0);

    // Determina automaticamente se é múltiplo baseado em maxFiles
    const multiple = maxFiles > 1;

    React.useEffect(() => {
      setFiles(value);
    }, [value]);

    React.useEffect(() => {
      return () => {
        files.forEach((file) => {
          if (file.preview) {
            URL.revokeObjectURL(file.preview);
          }
        });
      };
    }, [files]);

    const validateFile = (file: File): string | null => {
      const maxSizeBytes = maxSize * 1024 * 1024;
      if (file.size > maxSizeBytes) {
        return `Arquivo muito grande. Máximo: ${maxSize} MB`;
      }

      if (accept.length > 0) {
        const fileExtension = `.${getFileExtension(file.name)}`;
        const fileType = file.type;

        const isAccepted = accept.some((acceptItem) => {
          if (acceptItem.startsWith(".")) {
            return fileExtension.toLowerCase() === acceptItem.toLowerCase();
          }
          if (acceptItem.endsWith("/*")) {
            return fileType.startsWith(acceptItem.replace("/*", ""));
          }
          return fileType === acceptItem;
        });

        if (!isAccepted) {
          return `Tipo de arquivo não permitido. Aceitos: ${accept.join(", ")}`;
        }
      }

      return null;
    };

    const createFileWithPreview = async (
      file: File,
    ): Promise<FileWithPreview> => {
      const fileWithPreview = file as FileWithPreview;
      fileWithPreview.id = `${file.name}-${Date.now()}-${Math.random()}`;

      const error = validateFile(file);
      if (error) {
        fileWithPreview.error = error;
      }

      // Criar preview para imagens
      if (file.type.startsWith("image/")) {
        try {
          const preview = await createImagePreview(file);
          if (preview) {
            fileWithPreview.preview = preview;
          }
        } catch (error) {
          console.warn("Erro ao criar preview da imagem:", error);
        }
      }

      return fileWithPreview;
    };

    const handleFiles = async (newFiles: File[]) => {
      if (disabled) return;

      const availableSlots = maxFiles - files.length;
      const filesToAdd = multiple
        ? newFiles.slice(0, availableSlots)
        : [newFiles[0]];

      const filesWithPreview = await Promise.all(
        filesToAdd.map((file) => createFileWithPreview(file)),
      );

      const updatedFiles = multiple
        ? [...files, ...filesWithPreview]
        : filesWithPreview;
      setFiles(updatedFiles);
      onValueChange(updatedFiles);

      if (onUpload) {
        const validFiles = filesWithPreview.filter((f) => !f.error);
        if (validFiles.length > 0) {
          try {
            await onUpload(validFiles);
          } catch (error) {
            console.error("Erro no upload:", error);
          }
        }
      }
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current--;
      if (dragCounterRef.current === 0) {
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounterRef.current = 0;

      if (disabled) return;

      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files);
        handleFiles(selectedFiles);
      }
    };

    const handleRemoveFile = (fileId: string) => {
      const fileToRemove = files.find((f) => f.id === fileId);
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }

      const updatedFiles = files.filter((f) => f.id !== fileId);
      setFiles(updatedFiles);
      onValueChange(updatedFiles);
    };

    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    const acceptString = accept.join(",");

    const getFormatText = () => {
      if (accept === FileTypes.All || accept.length === 0)
        return "Qualquer formato";
      if (accept === FileTypes.Image) return "Apenas imagens";
      if (accept === FileTypes.Document) return "Apenas documentos";
      if (accept === FileTypes.Video) return "Apenas vídeos";
      if (accept === FileTypes.Audio) return "Apenas áudio";
      if (accept === FileTypes.Spreadsheet) return "Apenas planilhas";
      if (accept === FileTypes.Presentation) return "Apenas apresentações";
      return "Formatos específicos válidos";
    };

    const defaultSubtext =
      dropzoneSubtext || `${getFormatText()} (Máx: ${maxSize}MB)`;

    return (
      <div ref={ref} className={cn("w-full", className)} {...props}>
        <motion.div
          className={cn(
            "relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 transition-all duration-300 dark:shadow-black/20",
            isDragging && "border-primary bg-primary/10 scale-[1.02]",
            !isDragging &&
              "border-border hover:border-primary/60 hover:bg-muted/50",
            disabled && "cursor-not-allowed opacity-50",
          )}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
          whileTap={!disabled ? { scale: 0.99 } : undefined}
          animate={
            isDragging
              ? {
                  borderColor: `hsl(var(--primary))`,
                  backgroundColor: `hsl(var(--primary) / 0.1)`,
                  scale: 1.02,
                }
              : {
                  borderColor: `hsl(var(--border))`,
                  backgroundColor: `hsl(var(--background))`,
                  scale: 1,
                }
          }
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.3,
          }}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={acceptString}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
          />

          <motion.div
            animate={
              isDragging ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }
            }
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              duration: 0.3,
            }}
          >
            <motion.div
              className={cn(
                "mb-4 h-16 w-16 text-muted-foreground transition-colors duration-300 drop-shadow-lg flex items-center justify-center",
                isDragging && "text-primary",
              )}
              initial={false}
              animate={{
                color: isDragging
                  ? `hsl(var(--primary))`
                  : `hsl(var(--muted-foreground))`,
              }}
              transition={{ duration: 0.3 }}
            >
              <CloudArrowUpIcon size={64} />
            </motion.div>
          </motion.div>

          <motion.p
            className="mb-2 text-xs font-semibold text-foreground"
            initial={animate ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {dropzoneText}
          </motion.p>

          <motion.p
            className="text-xs text-muted-foreground"
            initial={animate ? { opacity: 0, y: -10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {defaultSubtext}
          </motion.p>
          {showPreview && files.length > 0 && (
            <motion.div
              className="py-2 w-full"
              initial={animate ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div>
                <h4 className="text-xs font-medium text-muted-foreground pb-0.5">
                  Arquivos selecionados ({files.length}/{maxFiles})
                </h4>
                <div className="space-y-2 overflow-y-auto max-h-36">
                  <AnimatePresence mode="popLayout">
                    {files.map((file, index) => (
                      <motion.div
                        key={file.id}
                        layout
                        initial={animate ? { opacity: 0, x: -20 } : false}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -20,
                          transition: { duration: 0.2 },
                        }}
                        transition={{
                          delay: animate ? index * 0.05 : 0,
                          layout: { duration: 0.2 },
                        }}
                        className={cn(
                          "group flex items-center gap-3 rounded-md border p-2 transition-all duration-300",
                          file.error
                            ? "border-destructive/50 bg-destructive/5"
                            : "border-border bg-background/80 hover:bg-muted/50 hover:shadow-md hover:shadow-primary/10 hover:border-primary/30",
                        )}
                      >
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted overflow-hidden">
                          {file.preview ? (
                            <img
                              src={file.preview}
                              alt={file.name}
                              className="h-full w-full object-cover rounded-md"
                            />
                          ) : (
                            getFileTypeIcon(file)
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p
                            className="truncate text-sm font-medium text-foreground"
                            title={`${file.name} (${
                              file.type || "Tipo desconhecido"
                            })`}
                          >
                            {file.name}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span>{formatFileSize(file.size)}</span>
                            {file.type && (
                              <>
                                <span>•</span>
                                <span className="uppercase">
                                  {getFileExtension(file.name)}
                                </span>
                              </>
                            )}
                          </div>

                          {file.error && (
                            <motion.p
                              className="mt-1 text-xs text-destructive"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              {file.error}
                            </motion.p>
                          )}
                        </div>

                        <ButtonBase
                          size="icon"
                          variant="ghost"
                          onClick={(e) => {
                            e?.stopPropagation();
                            handleRemoveFile(file.id!);
                          }}
                          className="opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <XIcon size={12} className="text-red-500" />
                        </ButtonBase>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";

export { FileUploader };
