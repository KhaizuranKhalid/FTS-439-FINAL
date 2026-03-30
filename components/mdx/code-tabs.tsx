"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeBlock } from "./code-block";
import { cn } from "@/lib/utils";
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

interface CodeFile {
  filename: string;
  language: string;
  code: React.ReactNode;
}

interface CodeTabsProps {
  files: CodeFile[];
  className?: string;
}

export function CodeTabs({ files, className }: CodeTabsProps) {
  const [activeTab, setActiveTab] = useState(files[0]?.filename || "");

  if (!files || files.length === 0) {
    return <div>No files provided</div>;
  }

  return (
    <div
      className={cn(
        "my-6 overflow-hidden rounded-lg border bg-[#f6f8fa] dark:bg-[#212121] border-[#e1e4e8] dark:border-[#30363d]",
        className
      )}
    >
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="border-b bg-[#f1f3f4] dark:bg-[#161b22] border-[#e1e4e8] dark:border-[#30363d]">
          <TabsList className="h-auto w-full justify-start rounded-none border-none bg-transparent p-0">
            {files.map((file) => (
              <TabsTrigger
                key={file.filename}
                value={file.filename}
                className={cn(
                  "relative border-b-2 border-transparent px-4 py-2.5 text-sm font-medium",
                  "data-[state=active]:border-primary data-[state=active]:bg-background/50",
                  "hover:bg-muted/50 hover:text-foreground",
                  "transition-all duration-200",
                  "first:rounded-tl-lg last:rounded-tr-lg"
                )}
              >
                <span className="flex items-center gap-2">
                  <FileIcon filename={file.filename} />
                  {file.filename}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {files.map((file) => (
          <TabsContent
            key={file.filename}
            value={file.filename}
            className="m-0 rounded-none border-none p-0"
          >
            <div className="relative group">
              <div className="[&>div]:my-0 [&>div]:rounded-none [&>div]:border-none [&_.shiki]:bg-transparent">
                <CodeBlock className={`language-${file.language}`}>
                  {file.code}
                </CodeBlock>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

function FileIcon({ filename }: { filename: string }) {
  const extension = filename.split(".").pop()?.toLowerCase();

  const getIconColor = (ext: string) => {
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
  };

  const getIcon = (ext: string) => {
    const iconProps = { className: cn("text-xs", getIconColor(ext)) };

    switch (ext) {
      case "py":
        return <SiPython {...iconProps} />;
      case "js":
      case "jsx":
        return <SiJavascript {...iconProps} />;
      case "ts":
      case "tsx":
        return <SiTypescript {...iconProps} />;
      case "cpp":
      case "c":
      case "cc":
        return <SiCplusplus {...iconProps} />;
      case "java":
        return <SiOpenjdk {...iconProps} />;
      case "go":
        return <SiGo {...iconProps} />;
      case "rs":
        return <SiRust {...iconProps} />;
      case "php":
        return <SiPhp {...iconProps} />;
      case "rb":
        return <SiRuby {...iconProps} />;
      case "swift":
        return <SiSwift {...iconProps} />;
      case "kt":
        return <SiKotlin {...iconProps} />;
      case "dart":
        return <SiDart {...iconProps} />;
      case "html":
        return <SiHtml5 {...iconProps} />;
      case "css":
        return <SiCss3 {...iconProps} />;
      case "scss":
      case "sass":
        return <SiSass {...iconProps} />;
      case "json":
        return <SiJson {...iconProps} />;
      case "xml":
        return <VscFile {...iconProps} />;
      case "yaml":
      case "yml":
        return <SiYaml {...iconProps} />;
      case "md":
        return <SiMarkdown {...iconProps} />;
      case "sh":
      case "bash":
        return <SiGnubash {...iconProps} />;
      default:
        return <VscFile {...iconProps} />;
    }
  };

  return getIcon(extension || "");
}
