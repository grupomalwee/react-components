"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  TextBolderIcon,
  TextItalicIcon,
  TextUnderlineIcon,
  TextStrikethroughIcon,
  ListBulletsIcon,
  ListNumbersIcon,
  TextAlignLeftIcon,
  TextAlignCenterIcon,
  TextAlignRightIcon,
  LinkIcon,
} from "@phosphor-icons/react";
import { cn } from "../../../../lib/utils";

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ onClick, title, active, children }) => (
  <button
    onMouseDown={(e) => { e.preventDefault(); onClick(); }}
    title={title}
    className={cn(
      "size-7 flex items-center justify-center rounded transition-all text-sm",
      active
        ? "bg-foreground/10 text-foreground"
        : "text-foreground/40 hover:text-foreground/80 hover:bg-foreground/5",
    )}
  >
    {children}
  </button>
);

const Divider = () => (
  <div className="w-px h-4 bg-border/60 mx-0.5 shrink-0" />
);

interface TextEditorProps {
  content: string;
  onChange: (content: string) => void;
  autoFocus?: boolean;
  borderless?: boolean;
  hideToolbar?: boolean;
  contentClassName?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  content,
  onChange,
  autoFocus,
  borderless = false,
  hideToolbar = false,
  contentClassName,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (autoFocus && editorRef.current && isMounted) {
      editorRef.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [autoFocus, isMounted]);

  const exec = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const handleInput = () => {
    if (editorRef.current) onChange(editorRef.current.innerHTML);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      exec("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  return (
    <div className={cn("flex flex-col w-full h-full bg-background overflow-hidden transition-all", !borderless && "focus-within:ring-2 focus-within:ring-primary/15")}>
      {!hideToolbar && (
        <div className={cn(
          "flex items-center gap-0.5 px-2 py-1 flex-wrap",
          borderless ? "border-b border-border/40 bg-muted/5" : "border-b border-border bg-muted/20",
        )}>
          <ToolbarButton onClick={() => exec("bold")} title="Negrito (Ctrl+B)">
            <TextBolderIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("italic")} title="Itálico (Ctrl+I)">
            <TextItalicIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("underline")} title="Sublinhado (Ctrl+U)">
            <TextUnderlineIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("strikeThrough")} title="Tachado">
            <TextStrikethroughIcon className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec("insertUnorderedList")} title="Lista com marcadores">
            <ListBulletsIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("insertOrderedList")} title="Lista numerada">
            <ListNumbersIcon className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton onClick={() => exec("justifyLeft")} title="Alinhar à esquerda">
            <TextAlignLeftIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("justifyCenter")} title="Centralizar">
            <TextAlignCenterIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton onClick={() => exec("justifyRight")} title="Alinhar à direita">
            <TextAlignRightIcon className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <select
            onMouseDown={(e) => e.stopPropagation()}
            onChange={(e) => exec("fontSize", e.target.value)}
            className="h-6 text-[10px] bg-transparent border border-border/50 rounded px-1 text-foreground/60 hover:text-foreground cursor-pointer outline-none"
            defaultValue=""
          >
            <option value="" disabled>Tam.</option>
            <option value="1">XS</option>
            <option value="2">SM</option>
            <option value="3">MD</option>
            <option value="4">LG</option>
            <option value="5">XL</option>
          </select>

          <ToolbarButton
            onClick={() => {
              const url = prompt("URL do link:");
              if (url) exec("createLink", url);
            }}
            title="Inserir link"
          >
            <LinkIcon className="size-3.5" />
          </ToolbarButton>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        dangerouslySetInnerHTML={{ __html: content }}
        className={cn(
          "p-4 flex-1 outline-none text-sm text-foreground overflow-y-auto leading-relaxed",
          "prose prose-sm dark:prose-invert max-w-none",
          "[&_a]:text-primary [&_a]:underline",
          "empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/40 empty:before:pointer-events-none",
          contentClassName,
        )}
        data-placeholder="Escreva aqui..."
        style={{ minHeight: "inherit" }}
      />
    </div>
  );
};