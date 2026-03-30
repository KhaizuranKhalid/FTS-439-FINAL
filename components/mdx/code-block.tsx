"use client";

import {
  ComponentProps,
  useEffect,
  useMemo,
  useState,
  isValidElement,
} from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiGo,
  SiRust,
  SiPhp,
  SiRuby,
  SiSwift,
  SiKotlin,
  SiDart,
  SiHtml5,
  SiCss3,
  SiSass,
  SiJson,
  SiYaml,
  SiMarkdown,
  SiGnubash,
} from "react-icons/si";
import { SiOpenjdk } from "react-icons/si";
import { VscFile } from "react-icons/vsc";

const Mermaid = dynamic(() => import("./mermaid"), { ssr: false });

const getTextContent = (node: React.ReactNode): string => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getTextContent).join("");
  if (isValidElement(node)) {
    const el = node as React.ReactElement<{ children?: React.ReactNode }>;
    return getTextContent(el.props.children ?? "");
  }
  return "";
};

export const CodeBlock = ({
  children,
  className,
  title,
  ...props
}: ComponentProps<"code">) => {
  const { theme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [highlightedHtml, setHighlightedHtml] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const derivedLanguageFromClass = className?.replace("language-", "");
  let nestedLanguage: string | undefined;
  if (!derivedLanguageFromClass && isValidElement(children)) {
    const childProps: any = (children as any).props || {};
    const childClass: string | undefined = childProps.className;
    if (typeof childClass === "string" && childClass.startsWith("language-")) {
      nestedLanguage = childClass.replace("language-", "");
    }
  }
  const language = derivedLanguageFromClass || nestedLanguage || "text";

  const codeContent = getTextContent(children).replace(/\n$/, "");
  const selectedTheme = useMemo(() => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    return currentTheme === "dark" ? "github-dark" : "github-light";
  }, [theme, systemTheme]);

  const hasTitle = Boolean(title);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (language === "mermaid") return;
    if (!mounted) return;
    let cancelled = false;

    async function highlight() {
      try {
        const { codeToHtml } = await import("shiki");

        const transformers: any[] = [];

        if (className?.includes("twoslash")) {
          try {
            const { transformerTwoslash } = await import("fumadocs-twoslash");
            transformers.push(transformerTwoslash());
          } catch (error) {
            console.warn("Twoslash transformer not available:", error);
          }
        }

        const html = await codeToHtml(codeContent, {
          lang: language,
          themes: {
            light: "github-light",
            dark: "github-dark",
          },
          defaultColor: false,
          transformers,
        });

        if (!cancelled) setHighlightedHtml(html);
      } catch (error) {
        console.error("Syntax highlighting failed:", error);
        if (!cancelled) setHighlightedHtml("");
      }
    }

    if (className) highlight();
    return () => {
      cancelled = true;
    };
  }, [mounted, codeContent, language, selectedTheme, className]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (language === "mermaid") {
    return <Mermaid code={codeContent} />;
  }

  if (!className) {
    return (
      <code
        className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
        {...props}
      >
        {children}
      </code>
    );
  }

  if (!mounted || !highlightedHtml) {
    return (
      <div className="group relative my-6 overflow-hidden rounded-lg border bg-[#f6f8fa] dark:bg-[#212121] border-[#e1e4e8] dark:border-[#30363d]">
        {hasTitle && (
          <CodeHeader filename={title as string} _language={language} />
        )}
        <pre className={cn("overflow-x-auto p-4 text-sm")}>
          <code className="font-mono">{codeContent}</code>
        </pre>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "absolute right-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100",
            hasTitle ? "top-[6px]" : "top-2"
          )}
          onClick={copyToClipboard}
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="group relative my-6 overflow-hidden rounded-lg border bg-[#f6f8fa] dark:bg-[#212121] border-[#e1e4e8] dark:border-[#30363d]">
      {hasTitle && (
        <CodeHeader filename={title as string} _language={language} />
      )}
      <div
        className={cn(
          "overflow-x-auto text-sm",
          "[&_pre]:m-0 [&_pre]:bg-transparent [&_pre]:p-4",
          "[&_code]:font-mono",
          "[&_.shiki]:bg-transparent",
          hasTitle && "",
          className
        )}
        dangerouslySetInnerHTML={{ __html: highlightedHtml }}
      />
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "absolute right-2 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100",
          hasTitle ? "top-[6px]" : "top-2"
        )}
        onClick={copyToClipboard}
      >
        {copied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

function CodeHeader({
  filename,
  _language,
}: {
  filename: string;
  _language: string;
}) {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  const Icon = getFileIconComponent(extension);
  return (
    <div className="flex items-center border-b bg-[#f6f8fa] dark:bg-[#212121] border-[#e1e4e8] dark:border-[#30363d] px-4 py-2.5 text-sm font-medium">
      <span className="flex items-center gap-2">
        <Icon className={cn("text-xs", getIconColor(extension))} />
        {filename}
      </span>
    </div>
  );
}

function _getLanguageLabel(language: string): string {
  const lang = language.toLowerCase();
  switch (lang) {
    case "cpp":
    case "c++":
      return "C++";
    case "ts":
    case "typescript":
      return "TypeScript";
    case "js":
    case "javascript":
      return "JavaScript";
    case "py":
    case "python":
      return "Python";
    case "go":
      return "Go";
    case "rs":
    case "rust":
      return "Rust";
    case "java":
      return "Java";
    case "php":
      return "PHP";
    case "rb":
    case "ruby":
      return "Ruby";
    case "swift":
      return "Swift";
    case "kt":
    case "kotlin":
      return "Kotlin";
    case "dart":
      return "Dart";
    case "html":
      return "HTML";
    case "css":
      return "CSS";
    case "scss":
    case "sass":
      return "Sass";
    case "json":
      return "JSON";
    case "yaml":
    case "yml":
      return "YAML";
    case "md":
    case "markdown":
      return "Markdown";
    case "sh":
    case "bash":
      return "Bash";
    default:
      return lang.toUpperCase();
  }
}

function getIconColor(ext: string) {
  switch (ext) {
    case "py":
      return "text-blue-500";
    case "js":
    case "jsx":
      return "text-yellow-500";
    case "ts":
    case "tsx":
      return "text-blue-600";
    case "cpp":
    case "c":
    case "cc":
      return "text-blue-700";
    case "java":
      return "text-red-500";
    case "go":
      return "text-cyan-500";
    case "rs":
      return "text-orange-500";
    case "php":
      return "text-purple-500";
    case "rb":
      return "text-red-600";
    case "swift":
      return "text-orange-600";
    case "kt":
      return "text-purple-600";
    case "dart":
      return "text-blue-400";
    case "html":
      return "text-orange-400";
    case "css":
      return "text-blue-500";
    case "scss":
    case "sass":
      return "text-pink-500";
    case "json":
      return "text-yellow-600";
    case "xml":
      return "text-green-500";
    case "yaml":
    case "yml":
      return "text-red-400";
    case "md":
      return "text-gray-600";
    case "sh":
    case "bash":
      return "text-green-600";
    default:
      return "text-gray-500";
  }
}

function getFileIconComponent(ext: string) {
  switch (ext) {
    case "py":
      return SiPython;
    case "js":
    case "jsx":
      return SiJavascript;
    case "ts":
    case "tsx":
      return SiTypescript;
    case "cpp":
    case "c":
    case "cc":
      return SiCplusplus;
    case "java":
      return SiOpenjdk;
    case "go":
      return SiGo;
    case "rs":
      return SiRust;
    case "php":
      return SiPhp;
    case "rb":
      return SiRuby;
    case "swift":
      return SiSwift;
    case "kt":
      return SiKotlin;
    case "dart":
      return SiDart;
    case "html":
      return SiHtml5;
    case "css":
      return SiCss3;
    case "scss":
    case "sass":
      return SiSass;
    case "json":
      return SiJson;
    case "xml":
      return VscFile;
    case "yaml":
    case "yml":
      return SiYaml;
    case "md":
      return SiMarkdown;
    case "sh":
    case "bash":
      return SiGnubash;
    default:
      return VscFile;
  }
}
