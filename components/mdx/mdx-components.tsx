import { MDXComponents } from "mdx/types";
import { isValidElement, cloneElement } from "react";
import { cn } from "@/lib/utils";
import { CodeBlock } from "./code-block";
import { CodeTabs } from "./code-tabs";
import { Image } from "@/components/ui/image";
import { CollapsibleHeading } from "@/components/collapsible-heading-simple";
import * as Twoslash from "fumadocs-twoslash/ui";

import { File, Folder, Tree } from "@/components/magic-ui/file-tree";
import { CodeComparison } from "@/components/magic-ui/code-comparison";
import { ScriptCopyBtn } from "@/components/magic-ui/script-copy-btn";
import { Highlighter } from "@/components/magic-ui/highlighter";
import { BlurFade } from "@/components/magic-ui/blur-fade";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Pre = ({ children }: { children: React.ReactNode }) => {
  if (isValidElement(children)) {
    const child: any = children;
    const childProps = child.props || {};
    let title: string | undefined = childProps.title;

    const meta: string | undefined =
      childProps.metastring || childProps.meta || childProps["data-meta"];
    if (!title && typeof meta === "string" && meta.length > 0) {
      const m = meta.match(/\btitle\s*=\s*("([^"]+)"|'([^']+)'|([^\s]+))/);
      if (m) {
        title = m[2] || m[3] || m[4];
      }
    }

    if (title) {
      return <div>{cloneElement(child, { title })}</div>;
    }
  }

  return <div>{children}</div>;
};

const CustomFileTree = ({
  children,
  title = "File Tree",
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const parseFileTreeContent = (content: string) => {
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    const rootItems: Array<{
      id: string;
      name: string;
      isFolder: boolean;
      level: number;
      href?: string;
      children: any[];
    }> = [];
    const stack: Array<{
      id: string;
      name: string;
      isFolder: boolean;
      level: number;
      href?: string;
      children: any[];
    }> = [];
    let idCounter = 0;

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) return;

      const leadingMatch = line.match(/^(\s*[├└│─\s]*)/);
      const leadingLength = leadingMatch ? leadingMatch[1].length : 0;
      const level = Math.floor(leadingLength / 2);

      let name = trimmed.replace(/[├└│─\s]/g, "").trim();
      let href: string | undefined;

      const linkMatch = name.match(/\[([^\]]+)\]\(([^)]+)\)/);
      if (linkMatch) {
        name = linkMatch[1];
        href = linkMatch[2];
      }

      const isFolder = name.endsWith("/") || name.endsWith("\\");
      if (isFolder) {
        name = name.replace(/[/\\]$/, "");
      }

      const item = {
        id: `item-${++idCounter}`,
        name,
        isFolder,
        level,
        href,
        children: [],
      };

      while (stack.length > 0 && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length > 0) {
        stack[stack.length - 1].children.push(item);
      } else {
        rootItems.push(item);
      }

      stack.push(item);
    });

    return rootItems;
  };

  const getTextContent = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(getTextContent).join("");
    if (node && typeof node === "object" && "props" in node) {
      return getTextContent((node as any).props.children);
    }
    return "";
  };

  const content = getTextContent(children);
  const items = parseFileTreeContent(content);

  const buildRenderTree = (items: any[]): React.ReactNode[] => {
    return items.map((item) => {
      if (item.isFolder && item.children.length > 0) {
        return (
          <Folder key={item.id} element={item.name} value={item.id}>
            {buildRenderTree(item.children)}
          </Folder>
        );
      } else if (item.isFolder) {
        return (
          <Folder key={item.id} element={item.name} value={item.id}></Folder>
        );
      } else {
        return (
          <File key={item.id} value={item.id} href={item.href}>
            <span>{item.name}</span>
          </File>
        );
      }
    });
  };

  const getAllIds = (items: any[]): string[] => {
    const ids: string[] = [];
    items.forEach((item) => {
      ids.push(item.id);
      if (item.children.length > 0) {
        ids.push(...getAllIds(item.children));
      }
    });
    return ids;
  };

  const allIds = getAllIds(items);

  return (
    <div className="my-6 overflow-hidden rounded-lg border bg-background">
      <div className="bg-muted/50 px-4 py-2 text-sm font-medium">{title}</div>
      <div className="p-4">
        <Tree className="h-fit w-full" initialExpandedItems={allIds}>
          {buildRenderTree(items)}
        </Tree>
      </div>
    </div>
  );
};

const CustomCodeComparison = ({
  beforeCode,
  afterCode,
  language = "typescript",
  filename = "example.ts",
}: {
  beforeCode: string;
  afterCode: string;
  language?: string;
  filename?: string;
}) => {
  return (
    <div className="my-6">
      <CodeComparison
        beforeCode={beforeCode}
        afterCode={afterCode}
        language={language}
        filename={filename}
        lightTheme="github-light"
        darkTheme="github-dark"
      />
    </div>
  );
};

const CustomScriptCopyBtn = ({
  command,
  language = "bash",
  packageManagers = ["npm", "yarn", "pnpm", "bun"],
}: {
  command?: string;
  language?: string;
  packageManagers?: string[];
}) => {
  if (command) {
    return (
      <div className="my-6">
        <ScriptCopyBtn
          showMultiplePackageOptions={false}
          codeLanguage={language}
          lightTheme="github-light"
          darkTheme="github-dark"
          commandMap={{ cmd: command }}
        />
      </div>
    );
  }

  const defaultCommands = {
    npm: "npm install",
    yarn: "yarn add",
    pnpm: "pnpm add",
    bun: "bun add",
  };

  const commandMap = packageManagers.reduce((acc, pm) => {
    if (defaultCommands[pm as keyof typeof defaultCommands]) {
      acc[pm] = defaultCommands[pm as keyof typeof defaultCommands];
    }
    return acc;
  }, {} as Record<string, string>);

  return (
    <div className="my-6">
      <ScriptCopyBtn
        codeLanguage={language}
        lightTheme="github-light"
        darkTheme="github-dark"
        commandMap={commandMap}
      />
    </div>
  );
};

const CustomHighlighter = ({
  children,
  color,
  variant,
}: {
  children: React.ReactNode;
  color?: string;
  variant?: "destructive" | "success";
}) => {
  return (
    <Highlighter color={color} variant={variant}>
      {children}
    </Highlighter>
  );
};

const CustomAlert = ({
  variant = "default",
  title,
  children,
}: {
  variant?: "default" | "destructive";
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <Alert variant={variant} className="my-6">
      {title && <AlertTitle>{title}</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};

const CustomTabs = ({
  defaultValue,
  items,
}: {
  defaultValue: string;
  items: Array<{ label: string; value: string; content: React.ReactNode }>;
}) => {
  return (
    <Tabs defaultValue={defaultValue} className="my-6">
      <TabsList>
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent key={item.value} value={item.value}>
          {item.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

const CustomCard = ({
  title,
  description,
  children,
}: {
  title?: string;
  description?: string;
  children: React.ReactNode;
}) => {
  return (
    <Card className="my-6">
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export const mdxComponents: MDXComponents = {
  h1: ({ className, children, ...props }) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return (
      <CollapsibleHeading level={1} id={id} className={className} {...props}>
        {children}
      </CollapsibleHeading>
    );
  },
  h2: ({ className, children, ...props }) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return (
      <CollapsibleHeading level={2} id={id} className={className} {...props}>
        {children}
      </CollapsibleHeading>
    );
  },
  h3: ({ className, children, ...props }) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return (
      <CollapsibleHeading level={3} id={id} className={className} {...props}>
        {children}
      </CollapsibleHeading>
    );
  },
  h4: ({ className, children, ...props }) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return (
      <CollapsibleHeading level={4} id={id} className={className} {...props}>
        {children}
      </CollapsibleHeading>
    );
  },
  h5: ({ className, children, ...props }) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;
    return (
      <CollapsibleHeading level={5} id={id} className={className} {...props}>
        {children}
      </CollapsibleHeading>
    );
  },
  h6: ({ className, children, ...props }) => {
    const id =
      typeof children === "string"
        ? children
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-")
        : undefined;

    const handleAnchorClick = () => {
      if (id) {
        window.history.pushState(null, "", `#${id}`);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    return (
      <h6
        id={id}
        className={cn(
          "group mt-6 scroll-m-20 text-sm font-semibold tracking-tight cursor-pointer hover:text-primary transition-colors",
          className
        )}
        onClick={handleAnchorClick}
        {...props}
      >
        {children}
      </h6>
    );
  },
  p: ({ className, ...props }) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  hr: ({ ...props }) => <Separator className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-hidden rounded-lg border">
      <div className="overflow-y-auto">
        <table className={cn("w-full", className)} {...props} />
      </div>
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn(
        "m-0 border-t p-0 even:bg-muted first:border-t-0",
        className
      )}
      {...props}
    />
  ),
  th: ({ className, ...props }) => (
    <th
      className={cn(
        "border-r border-b px-4 py-3 text-left font-bold bg-muted/50 last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }) => (
    <td
      className={cn(
        "border-r border-b px-4 py-2 text-left last:border-r-0 [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  code: CodeBlock,
  CodeBlock: CodeBlock,
  pre: Pre,
  a: ({ className, ...props }) => (
    <a
      className={cn(
        "font-medium text-primary underline underline-offset-4",
        className
      )}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    src,
    width,
    height,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return (
      <Image
        className={className}
        alt={alt}
        src={typeof src === "string" ? src : undefined}
        width={width}
        height={height}
        {...props}
      />
    );
  },

  FileTree: CustomFileTree,
  File,
  Folder,
  CodeComparison: CustomCodeComparison,
  ScriptCopyBtn: CustomScriptCopyBtn,
  Highlighter: CustomHighlighter,
  BlurFade,
  CodeTabs,

  Alert: CustomAlert,
  Badge,
  Button,
  Card: CustomCard,
  Separator,
  Tabs: CustomTabs,

  ...Twoslash,
};
