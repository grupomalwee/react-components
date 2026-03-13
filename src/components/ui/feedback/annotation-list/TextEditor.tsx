"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
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
import { Select } from "../../selects/Select";

interface ToolbarButtonProps {
  onClick: () => void;
  title: string;
  active?: boolean;
  children: React.ReactNode;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  title,
  active,
  children,
}) => (
  <button
    onMouseDown={(e) => {
      e.preventDefault();
      onClick();
    }}
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

const Divider = () => <div className="w-px h-4 bg-border/60 mx-0.5 shrink-0" />;

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
  const internalContentRef = useRef(content);
  const [isMounted, setIsMounted] = useState(false);
  const [activeStates, setActiveStates] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Update which formatting commands are active at the current selection
  const updateActiveStates = useCallback(() => {
    if (!isMounted || !editorRef.current) return;

    const states = {
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      strikeThrough: document.queryCommandState("strikeThrough"),
      insertUnorderedList: document.queryCommandState("insertUnorderedList"),
      insertOrderedList: document.queryCommandState("insertOrderedList"),
      justifyLeft: document.queryCommandState("justifyLeft"),
      justifyCenter: document.queryCommandState("justifyCenter"),
      justifyRight: document.queryCommandState("justifyRight"),
    };
    setActiveStates(states);
  }, [isMounted]);

  useEffect(() => {
    const handleSelectionChange = () => {
      // Only update if the selection is within our editor
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const parent = selection.getRangeAt(0).commonAncestorContainer;
        if (editorRef.current?.contains(parent)) {
          updateActiveStates();
        }
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    return () =>
      document.removeEventListener("selectionchange", handleSelectionChange);
  }, [updateActiveStates]);

  // Sync internal ref with prop when it changes externally
  useEffect(() => {
    if (content !== internalContentRef.current && editorRef.current) {
      internalContentRef.current = content;
      editorRef.current.innerHTML = content;
    }
  }, [content]);

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
    handleInput();
    updateActiveStates();
  };

  const handleInput = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      internalContentRef.current = newContent;
      onChange(newContent);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const isMod = e.ctrlKey || e.metaKey;

    if (isMod && e.key.toLowerCase() === "b") {
      e.preventDefault();
      exec("bold");
    } else if (isMod && e.key.toLowerCase() === "i") {
      e.preventDefault();
      exec("italic");
    } else if (isMod && e.key.toLowerCase() === "u") {
      e.preventDefault();
      exec("underline");
    } else if (e.key === "Tab") {
      e.preventDefault();
      exec("insertHTML", "&nbsp;&nbsp;&nbsp;&nbsp;");
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full h-full bg-background overflow-hidden transition-all",
        !borderless && "focus-within:ring-2 focus-within:ring-primary/15",
      )}
    >
      {!hideToolbar && (
        <div
          className={cn(
            "flex items-center gap-0.5 px-2 py-1 flex-wrap relative z-20 pointer-events-auto",
            borderless
              ? "border-b border-border/40 bg-muted/5"
              : "border-b border-border bg-muted/20",
          )}
        >
          <ToolbarButton
            onClick={() => exec("bold")}
            title="Negrito (Ctrl+B)"
            active={activeStates.bold}
          >
            <TextBolderIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => exec("italic")}
            title="Itálico (Ctrl+I)"
            active={activeStates.italic}
          >
            <TextItalicIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => exec("underline")}
            title="Sublinhado (Ctrl+U)"
            active={activeStates.underline}
          >
            <TextUnderlineIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => exec("strikeThrough")}
            title="Tachado"
            active={activeStates.strikeThrough}
          >
            <TextStrikethroughIcon className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            onClick={() => exec("insertUnorderedList")}
            title="Lista com marcadores"
            active={activeStates.insertUnorderedList}
          >
            <ListBulletsIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => exec("insertOrderedList")}
            title="Lista numerada"
            active={activeStates.insertOrderedList}
          >
            <ListNumbersIcon className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            onClick={() => exec("justifyLeft")}
            title="Alinhar à esquerda"
            active={activeStates.justifyLeft}
          >
            <TextAlignLeftIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => exec("justifyCenter")}
            title="Centralizar"
            active={activeStates.justifyCenter}
          >
            <TextAlignCenterIcon className="size-3.5" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => exec("justifyRight")}
            title="Alinhar à direita"
            active={activeStates.justifyRight}
          >
            <TextAlignRightIcon className="size-3.5" />
          </ToolbarButton>

          <Divider />

          <div className="w-[80px]">
            <Select
              selected={null}
              onChange={(value) => exec("fontSize", value)}
              placeholder="Tam."
              className="h-5 text-xs"
              hideClear
              items={[
                { label: "XS", value: "1" },
                { label: "SM", value: "2" },
                { label: "MD", value: "3" },
                { label: "LG", value: "4" },
                { label: "XL", value: "5" },
              ]}
            />
          </div>

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
        className={cn(
          "p-4 flex-1 outline-none text-sm text-foreground overflow-y-auto leading-relaxed",
          "prose prose-sm dark:prose-invert max-w-none",
          "[&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:pl-1",
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
