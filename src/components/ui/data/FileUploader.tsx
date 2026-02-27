import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  CloudArrowUpIcon,
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

export type FilesAccepted =
  | "image/*"
  | "video/*"
  | "audio/*"
  | "pdf"
  | "doc"
  | "docx"
  | "txt"
  | "rtf"
  | "xls"
  | "xlsx"
  | "csv"
  | "ppt"
  | "pptx"
  | "jpeg"
  | "jpg"
  | "png"
  | "gif"
  | "webp"
  | "svg"
  | "mp4"
  | "webm"
  | "mkv"
  | "avi"
  | "mp3"
  | "wav"
  | "ogg"
  | "zip"
  | "rar"
  | "7z"
  | "tar"
  | "gz"
  | "*"
  | (string & {});

export const FileAccept = {
  Image: "image/*" satisfies FilesAccepted,
  Document: "pdf,doc,docx,txt,rtf" satisfies FilesAccepted,
  Spreadsheet: "xls,xlsx,csv" satisfies FilesAccepted,
  Presentation: "ppt,pptx" satisfies FilesAccepted,
  Video: "video/*" satisfies FilesAccepted,
  Audio: "audio/*" satisfies FilesAccepted,
  All: "*" satisfies FilesAccepted,
} as const;

export interface FileWithPreview extends File {
  id?: string;
  error?: string;
  preview?: string;
}

export interface FileUploaderProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "onDrop"
> {
  accept?: FilesAccepted;
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

const getFileExtension = (filename: string): string =>
  filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);

const parseAcceptTokens = (accept: string): string[] =>
  accept
    .split(",")
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);

const validateFileAgainstAccept = (file: File, accept: string): boolean => {
  if (!accept || accept === "*") return true;

  const tokens = parseAcceptTokens(accept);
  const ext = getFileExtension(file.name).toLowerCase();
  const mime = file.type.toLowerCase();

  return tokens.some((token) => {
    if (token.endsWith("/*")) return mime.startsWith(token.replace("/*", ""));
    const tokenExt = token.startsWith(".") ? token.substring(1) : token;
    if (!token.includes("/")) return ext === tokenExt;
    return mime === token;
  });
};

const formatAcceptForInput = (accept?: string): string | undefined => {
  if (!accept || accept === "*") return undefined;
  return parseAcceptTokens(accept)
    .map((t) => (t.includes("/") || t.startsWith(".") ? t : `.${t}`))
    .join(",");
};

const getFileTypeIcon = (file: File) => {
  const extension = getFileExtension(file.name).toLowerCase();
  const mimeType = file.type.toLowerCase();

  if (extension === "pdf" || mimeType === "application/pdf")
    return <FilePdfIcon size={20} className="text-red-500" />;
  if (["doc", "docx"].includes(extension) || mimeType.includes("word"))
    return <FileDocIcon size={20} className="text-blue-500" />;
  if (["xls", "xlsx"].includes(extension) || mimeType.includes("sheet"))
    return <FileXlsIcon size={20} className="text-green-500" />;
  if (["ppt", "pptx"].includes(extension) || mimeType.includes("presentation"))
    return <FilePptIcon size={20} className="text-orange-500" />;
  if (extension === "csv" || mimeType === "text/csv")
    return <FileCsvIcon size={20} className="text-green-600" />;
  if (
    ["txt", "md", "json", "xml", "js", "ts", "html", "css"].includes(
      extension,
    ) ||
    mimeType.includes("text")
  )
    return <FileTextIcon size={20} className="text-gray-500" />;
  if (mimeType.startsWith("image/"))
    return <FileImageIcon size={20} className="text-purple-500" />;
  if (mimeType.startsWith("video/"))
    return <FileVideoIcon size={20} className="text-pink-500" />;
  if (mimeType.startsWith("audio/"))
    return <FileAudioIcon size={20} className="text-indigo-500" />;
  if (["zip", "rar", "7z", "tar", "gz"].includes(extension))
    return <FileZipIcon size={20} className="text-yellow-600" />;

  return <FileIcon size={20} className="text-muted-foreground" />;
};

const createImagePreview = (file: File): Promise<string | null> =>
  new Promise((resolve) => {
    if (!file.type.startsWith("image/")) return resolve(null);
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = () => resolve(null);
    reader.readAsDataURL(file);
  });

const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(
  (
    {
      className,
      accept = "*",
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

    const multiple = maxFiles > 1;

    React.useEffect(() => {
      setFiles(value);
    }, [value]);

    React.useEffect(() => {
      return () => {
        files.forEach((f) => {
          if (f.preview) URL.revokeObjectURL(f.preview);
        });
      };
    }, [files]);

    const validateFile = (file: File): string | null => {
      if (file.size > maxSize * 1024 * 1024)
        return `Arquivo muito grande. Máximo: ${maxSize}MB`;

      if (!validateFileAgainstAccept(file, accept))
        return `Tipo não permitido. Aceitos: ${accept}`;

      return null;
    };

    const createFileWithPreview = async (
      file: File,
    ): Promise<FileWithPreview> => {
      const f = file as FileWithPreview;
      f.id = `${file.name}-${Date.now()}-${Math.random()}`;
      f.error = validateFile(file) ?? undefined;

      if (!f.error && file.type.startsWith("image/")) {
        try {
          const preview = await createImagePreview(file);
          if (preview) f.preview = preview;
        } catch (err) {
          console.warn("Erro ao criar preview:", err);
        }
      }

      return f;
    };

    const handleFiles = async (newFiles: File[]) => {
      if (disabled) return;

      const slots = maxFiles - files.length;
      const filesToAdd = multiple ? newFiles.slice(0, slots) : [newFiles[0]];

      const processed = await Promise.all(
        filesToAdd.map(createFileWithPreview),
      );
      const updated = multiple ? [...files, ...processed] : processed;

      setFiles(updated);
      onValueChange(updated);

      if (onUpload) {
        const valid = processed.filter((f) => !f.error);
        if (valid.length > 0) {
          try {
            await onUpload(valid);
          } catch (err) {
            console.error("Erro no upload:", err);
          }
        }
      }
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      dragCounterRef.current++;
      if (e.dataTransfer.items?.length > 0) setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (--dragCounterRef.current === 0) setIsDragging(false);
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
      if (!disabled) handleFiles(Array.from(e.dataTransfer.files));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) handleFiles(Array.from(e.target.files));
    };

    const handleRemoveFile = (fileId: string) => {
      const target = files.find((f) => f.id === fileId);
      if (target?.preview) URL.revokeObjectURL(target.preview);
      const updated = files.filter((f) => f.id !== fileId);
      setFiles(updated);
      onValueChange(updated);
    };

    const defaultSubtext =
      dropzoneSubtext ??
      `${accept === "*" ? "Qualquer formato" : accept} (Máx: ${maxSize}MB)`;

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
          onClick={() => !disabled && inputRef.current?.click()}
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
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <input
            ref={inputRef}
            type="file"
            className="hidden"
            accept={formatAcceptForInput(accept)}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
          />

          <motion.div
            animate={
              isDragging ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="mb-4 h-16 w-16 drop-shadow-lg flex items-center justify-center"
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
                          title={`${file.name} (${file.type || "Tipo desconhecido"})`}
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
            </motion.div>
          )}
        </motion.div>
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";

export { FileUploader };
