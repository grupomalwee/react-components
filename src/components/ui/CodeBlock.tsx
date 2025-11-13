import {
  ArrowRightIcon,
  ArrowsOutIcon,
  CheckIcon,
  CodeIcon,
  CopyIcon,
  DownloadIcon,
  FileArchiveIcon,
  FolderIcon,
  GearIcon,
  TerminalIcon,
} from "@phosphor-icons/react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";


type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
  breadcrumb?: string[];
  showStats?: boolean;
  loading?: boolean;
  loaderWords?: string[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
  | {
      code?: string;
      tabs?: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
  breadcrumb = [],
  showStats = true,
}: CodeBlockProps) => {

  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [isExpanded, setIsExpanded] = React.useState(false);

  const tabsExist = tabs.length > 0;

  const cssVars = React.useMemo(
    () => ({
      container: {
        backgroundColor: "hsl(var(--card))",
        borderColor: "hsl(var(--border))",
      },
      header: {
        backgroundColor: "hsl(var(--popover))",
        borderBottomColor: "hsl(var(--border))",
      },
      filename: { color: "hsl(var(--card-foreground))" },
      mutedText: { color: "hsl(var(--muted-foreground))" },
      icon: { color: "hsl(var(--muted-foreground))" },
      lineNumbers: {
        color: "hsl(var(--muted-foreground))",
        borderRight: `1px solid hsl(var(--border))`,
      },
      highlightBorder: `3px solid hsl(var(--primary))`,
    }),
    []
  );

  const sanitizeCode = (input?: string) => {
    if (!input) return "";
    let out = input.replace(
      /(^['"]use client['"];?\s*|\b'use client';|\b"use client";)/g,
      ""
    );
    out = out.replace(/style=\{[\s\S]*?\}/g, "");
    out = out.replace(/style=(["'`])(?:\\.|(?!\1)[\s\S])*?\1/g, "");
    return out;
  };

  const getActiveRawCode = () =>
    (tabsExist ? tabs[activeTab].code : code) || "";
  const activeRawCode = getActiveRawCode();
  const activeCodeSanitized = sanitizeCode(activeRawCode);

  const copyToClipboard = async () => {
    const textToCopy = activeCodeSanitized;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadCode = () => {
    const textToDownload = activeCodeSanitized;
    const activeFilename = tabsExist ? tabs[activeTab].name : filename;
    if (textToDownload) {
      const blob = new Blob([textToDownload], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = activeFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  const getLanguageIcon = (lang: string) => {
    switch (lang.toLowerCase()) {
      case "javascript":
      case "jsx":
      case "typescript":
      case "tsx":
        return <CodeIcon size="1em" className="text-yellow-400" />;
      case "bash":
      case "shell":
        return <TerminalIcon size="1em" className="text-green-400" />;
      default:
        return <FileArchiveIcon size="1em" className="text-blue-400" />;
    }
  };

  const getCodeStats = (source: string) => {
    const lines = source.split("\n").length;
    const chars = source.length;
    const words = source.split(/\s+/).filter((word) => word.length > 0).length;
    return { lines, chars, words };
  };

  const stats = showStats ? getCodeStats(activeCodeSanitized) : null;

  return (
    <div
      className={`relative w-full rounded-xl overflow-hidden shadow-sm border no-underline-code`}
      style={cssVars.container}
    >
      <style>{`.no-underline-code a { text-decoration: none !important; text-shadow: none !important; box-shadow: none !important; } .no-underline-code code a { text-decoration: none !important; }`}</style>
      <div className={`flex items-stretch min-h-[3rem]`} style={cssVars.header}>
        <div className="flex-1 flex items-center min-w-0 px-3">
          <div className="flex gap-2 mr-3 shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>

          {breadcrumb.length > 0 && (
            <div className="flex items-center min-w-0">
              <FolderIcon size="1em" style={cssVars.icon} />
              <div className="flex items-center min-w-0 ml-2">
                {breadcrumb.map((crumb, index) => (
                  <React.Fragment key={index}>
                    <span
                      className="text-xs truncate"
                      style={cssVars.mutedText}
                    >
                      {crumb}
                    </span>
                    {index < breadcrumb.length - 1 && (
                      <ArrowRightIcon
                        size="0.75em"
                        style={cssVars.icon}
                        className="shrink-0 mx-1"
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-end shrink-0 px-2">
          {stats && (
            <div
              className={`text-xs mx-2 truncate hidden md:block`}
              style={cssVars.mutedText}
            >
              {stats.lines}L • {stats.words}W
            </div>
          )}

          <div className="flex">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`p-2 transition-colors hover:bg-gray-200 dark:hover:bg-slate-700`}
              title="Toggle fullscreen"
            >
              <ArrowsOutIcon size="1em" style={cssVars.icon} />
            </button>
            <button
              onClick={downloadCode}
              className={`p-2 transition-colors hover:bg-gray-200 dark:hover:bg-slate-700`}
              title="Download code"
            >
              <DownloadIcon size="1em" style={cssVars.icon} />
            </button>
            <button
              onClick={copyToClipboard}
              className={`p-2 transition-colors hover:bg-gray-200 dark:hover:bg-slate-700`}
              title="Copy code"
            >
              {copied ? (
                <CheckIcon
                  size="1em"
                  style={{ color: "hsl(var(--primary))" }}
                />
              ) : (
                <CopyIcon size="1em" style={cssVars.icon} />
              )}
            </button>
          </div>
        </div>
      </div>

      {tabsExist && (
        <div
          className={`flex border-b overflow-x-auto`}
          style={{
            borderColor: "hsl(var(--border))",
            backgroundColor: "hsl(var(--popover))",
          }}
        >
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-all duration-200 border-b-2 shrink-0 ${
                activeTab === index ? "border-blue-500" : "border-transparent"
              }`}
              style={
                activeTab === index
                  ? {
                      backgroundColor: "hsl(var(--card))",
                      color: "hsl(var(--card-foreground))",
                    }
                  : undefined
              }
            >
              {getLanguageIcon(tab.language || language)}
              <span className="truncate max-w-[10rem]">{tab.name}</span>
            </button>
          ))}
        </div>
      )}

      {!tabsExist && filename && (
        <div
          className="flex items-center px-3 py-2 border-b"
          style={{
            borderColor: "hsl(var(--border))",
            backgroundColor: "hsl(var(--popover))",
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            {getLanguageIcon(language)}
            <span
              className="text-sm font-medium truncate"
              style={cssVars.filename}
            >
              {filename}
            </span>
          </div>
        </div>
      )}

      <div
        className={`relative ${
          isExpanded ? "max-h-screen overflow-auto" : "max-h-96 overflow-auto"
        }`}
      >
        <SyntaxHighlighter
          language={activeLanguage}
          customStyle={{
            margin: 0,
            padding: "1rem",
            fontSize: "0.875rem",
            lineHeight: "1.5",
            backgroundColor: "hsl(var(--card))",
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineNumberStyle={{
            ...(cssVars.lineNumbers as React.CSSProperties),
            minWidth: "3em",
            paddingRight: "1em",
            marginRight: "1em",
          }}
          lineProps={(lineNumber: number) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "hsl(var(--highlight))"
                : "transparent",
              display: "block",
              width: "100%",
              borderLeft: activeHighlightLines.includes(lineNumber)
                ? cssVars.highlightBorder
                : "none",
              paddingLeft: "0.5rem",
            },
          })}
          PreTag="div"
        >
          {String(activeCodeSanitized)}
        </SyntaxHighlighter>
      </div>

      {showStats && stats && (
        <div
          className="px-3 py-2 border-t text-xs flex items-center justify-between min-h-[2.5rem]"
          style={{
            borderTopColor: "hsl(var(--border))",
            backgroundColor: "hsl(var(--popover))",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span className="truncate">{activeLanguage.toUpperCase()}</span>
            <span className="truncate hidden sm:inline">
              {stats.lines} lines
            </span>
            <span className="truncate hidden md:inline">
              {stats.chars} chars
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <GearIcon size="0.75em" style={cssVars.icon} />
            <span>UTF-8</span>
          </div>
        </div>
      )}
    </div>
  );
};
