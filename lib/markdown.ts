import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";
import {
  FrontMatter,
  MDXContent,
  NavItem,
  FileSystemItem,
  BreadcrumbItem,
  SearchResult,
} from "./types";
import { countWords } from "./word-count";

const CONTENT_DIR = path.join(process.cwd(), "content");

export const getContentStructure = cache((): FileSystemItem[] => {
  if (!fs.existsSync(CONTENT_DIR)) {
    return [];
  }

  return scanDirectory(CONTENT_DIR, "");
});

function scanDirectory(
  dirPath: string,
  relativePath: string
): FileSystemItem[] {
  const items: FileSystemItem[] = [];

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      const itemRelativePath = path.join(relativePath, entry.name);

      if (entry.isDirectory()) {
        const children = scanDirectory(fullPath, itemRelativePath);
        if (children.length > 0) {
          items.push({
            name: entry.name,
            path: itemRelativePath,
            type: "directory",
            children,
          });
        }
      } else if (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) {
        const fileContent = fs.readFileSync(fullPath, "utf-8");
        const { data: frontMatter } = matter(fileContent);

        items.push({
          name: entry.name,
          path: itemRelativePath,
          type: "file",
          frontMatter: frontMatter as FrontMatter,
        });
      }
    }

    return items.sort((a, b) => {
      if (a.type === "directory" && b.type === "file") return -1;
      if (a.type === "file" && b.type === "directory") return 1;

      const aOrder = a.frontMatter?.order ?? Infinity;
      const bOrder = b.frontMatter?.order ?? Infinity;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      return a.name.localeCompare(b.name);
    });
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error);
    return [];
  }
}

export const getMarkdownFile = cache((slug: string[]): MDXContent | null => {
  const filePath = getFilePath(slug);

  if (!filePath || !fs.existsSync(filePath)) {
    return null;
  }

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { content, data: frontMatter } = matter(fileContent);

    // Auto-calculate word count if not provided in front matter
    const wordCount =
      frontMatter.wordCount !== undefined
        ? frontMatter.wordCount
        : countWords(content);

    return {
      content,
      frontMatter: {
        ...(frontMatter as FrontMatter),
        wordCount,
      },
      slug: slug.join("/"),
      filePath,
    };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
});

function getFilePath(slug: string[]): string | null {
  if (slug.length === 0) {
    return null;
  }

  const possiblePaths = [
    path.join(CONTENT_DIR, ...slug, "README.md"),
    path.join(CONTENT_DIR, ...slug, "index.md"),
    path.join(CONTENT_DIR, ...slug.slice(0, -1), `${slug[slug.length - 1]}.md`),
    path.join(CONTENT_DIR, ...slug, "README.mdx"),
    path.join(CONTENT_DIR, ...slug, "index.mdx"),
    path.join(
      CONTENT_DIR,
      ...slug.slice(0, -1),
      `${slug[slug.length - 1]}.mdx`
    ),
  ];

  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      return possiblePath;
    }
  }

  return null;
}

function toAllowedArray(value: unknown): number[] {
  if (Array.isArray(value)) {
    const arr = value
      .map((v) => (typeof v === "number" ? v : parseInt(String(v), 10)))
      .filter((n) => !Number.isNaN(n))
      .map((n) => Math.min(Math.max(n, 0), 4));
    return arr.length > 0 ? Array.from(new Set(arr)).sort() : [0];
  }
  const n =
    typeof value === "number" ? value : parseInt(String(value ?? 0), 10);
  if (Number.isNaN(n)) return [0];
  return [Math.min(Math.max(n, 0), 4)];
}

function getDirectoryReadmeAccess(item: FileSystemItem): number[] {
  if (item.type !== "directory" || !item.children) return [0];
  const readme = item.children.find(
    (child) =>
      child.type === "file" &&
      (child.name === "README.md" || child.name === "index.md")
  );
  return toAllowedArray(readme?.frontMatter?.access);
}

export function getEffectiveAccessForSlug(slug: string[]): number[] {
  const structure = getContentStructure();

  function traverse(items: FileSystemItem[], parts: string[]): number[] {
    const acc: number[] = [0];
    if (parts.length === 0) return acc;

    const [head, ...rest] = parts;
    const dir = items.find((i) => i.type === "directory" && i.name === head);
    if (dir) {
      const dirAccess = getDirectoryReadmeAccess(dir);
      if (rest.length === 0) {
        return dirAccess;
      }
      return traverse(dir.children ?? [], rest);
    }

    const fileName = `${head}.md`;
    const mdxName = `${head}.mdx`;
    const file = items.find(
      (i) => i.type === "file" && (i.name === fileName || i.name === mdxName)
    );
    if (file) {
      const fileAccess = toAllowedArray(file.frontMatter?.access);
      return fileAccess;
    }

    return acc;
  }

  const result = traverse(structure, slug);
  return Array.isArray(result) ? result : [0];
}

export const generateNavigation = cache((): NavItem[] => {
  const structure = getContentStructure();
  return buildNavigationFromStructure(structure, "");
});

function buildNavigationFromStructure(
  items: FileSystemItem[],
  basePath: string
): NavItem[] {
  const navItems: NavItem[] = [];

  for (const item of items) {
    if (item.type === "directory") {
      const children = item.children
        ? buildNavigationFromStructure(
            item.children,
            path.join(basePath, item.name)
          )
        : [];

      const readmeFile = item.children?.find(
        (child) =>
          child.type === "file" &&
          (child.name === "README.md" || child.name === "index.md")
      );
      const dirSelfAccess = getDirectoryReadmeAccess(item);

      const navItem: NavItem = {
        title: readmeFile?.frontMatter?.title || formatTitle(item.name),
        slug: path.join(basePath, item.name),
        href: `/docs/${path.join(basePath, item.name)}`,
        children: children.length > 0 ? children : undefined,
        order: readmeFile?.frontMatter?.order,
        description: readmeFile?.frontMatter?.description,
        access: dirSelfAccess,
      };

      navItems.push(navItem);
    } else if (
      item.type === "file" &&
      !["README.md", "index.md"].includes(item.name)
    ) {
      const fileName = path.parse(item.name).name;
      const fileAccess = toAllowedArray(item.frontMatter?.access);
      const navItem: NavItem = {
        title: item.frontMatter?.title || formatTitle(fileName),
        slug: path.join(basePath, fileName),
        href: `/docs/${path.join(basePath, fileName)}`,
        order: item.frontMatter?.order,
        description: item.frontMatter?.description,
        access: fileAccess,
      };

      navItems.push(navItem);
    }
  }

  return navItems.sort((a, b) => {
    const aOrder = a.order ?? Infinity;
    const bOrder = b.order ?? Infinity;

    if (aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    const aIsFolder = a.children && a.children.length > 0;
    const bIsFolder = b.children && b.children.length > 0;

    if (aIsFolder && !bIsFolder) return -1;
    if (!aIsFolder && bIsFolder) return 1;

    return a.title.localeCompare(b.title);
  });
}

function formatTitle(name: string): string {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function generateBreadcrumbs(slug: string[]): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [{ title: "Docs", href: "/docs" }];

  let currentPath = "";

  for (let i = 0; i < slug.length; i++) {
    currentPath = currentPath ? `${currentPath}/${slug[i]}` : slug[i];
    const isLast = i === slug.length - 1;

    breadcrumbs.push({
      title: formatTitle(slug[i]),
      href: `/docs/${currentPath}`,
      isLast,
    });
  }

  return breadcrumbs;
}

export function getAllSlugs(): string[][] {
  const structure = getContentStructure();
  const slugs: string[][] = [];

  function extractSlugs(items: FileSystemItem[], currentPath: string[] = []) {
    for (const item of items) {
      if (item.type === "directory") {
        const newPath = [...currentPath, item.name];

        const hasReadme = item.children?.some(
          (child) =>
            child.type === "file" &&
            (child.name === "README.md" || child.name === "index.md")
        );

        if (hasReadme) {
          slugs.push(newPath);
        }

        if (item.children) {
          extractSlugs(item.children, newPath);
        }
      } else if (
        item.type === "file" &&
        !["README.md", "index.md"].includes(item.name)
      ) {
        const fileName = path.parse(item.name).name;
        slugs.push([...currentPath, fileName]);
      }
    }
  }

  extractSlugs(structure);
  return slugs;
}

export function searchContent(
  query: string
): { title: string; href: string; description?: string; content?: string }[] {
  if (!query.trim()) return [];

  const results: {
    title: string;
    href: string;
    description?: string;
    content?: string;
  }[] = [];
  const structure = getContentStructure();

  function searchInStructure(
    items: FileSystemItem[],
    currentPath: string[] = []
  ) {
    for (const item of items) {
      if (item.type === "directory") {
        if (item.children) {
          searchInStructure(item.children, [...currentPath, item.name]);
        }
      } else if (item.type === "file") {
        const title =
          item.frontMatter?.title || formatTitle(path.parse(item.name).name);
        const description = item.frontMatter?.description;

        if (
          title.toLowerCase().includes(query.toLowerCase()) ||
          description?.toLowerCase().includes(query.toLowerCase())
        ) {
          const fileName = path.parse(item.name).name;
          const isReadme = ["README", "index"].includes(fileName);
          const href = isReadme
            ? `/docs/${currentPath.join("/")}`
            : `/docs/${[...currentPath, fileName].join("/")}`;

          results.push({
            title,
            href,
            description,
          });
        }
      }
    }
  }

  searchInStructure(structure);
  return results;
}

export function generateSearchData(): SearchResult[] {
  const structure = getContentStructure();
  const results: SearchResult[] = [];

  function searchInStructure(
    items: FileSystemItem[],
    currentPath: string[] = []
  ) {
    for (const item of items) {
      if (item.type === "directory" && item.children) {
        searchInStructure(item.children, [...currentPath, item.name]);
      } else if (item.type === "file" && item.frontMatter) {
        const { title, description } = item.frontMatter;

        if (
          title &&
          (item.name === "README.md" ||
            item.name === "index.md" ||
            !item.name.startsWith("_"))
        ) {
          const fileName = path.parse(item.name).name;
          const isReadme = ["README", "index"].includes(fileName);
          const href = isReadme
            ? `/docs/${currentPath.join("/")}`
            : `/docs/${[...currentPath, fileName].join("/")}`;

          const fullPath = path.join(CONTENT_DIR, ...currentPath, item.name);
          let content = "";
          try {
            const fileContent = fs.readFileSync(fullPath, "utf-8");
            const { content: markdownContent } = matter(fileContent);
            content = markdownContent.substring(0, 500);
          } catch (error) {
            console.error(`Error reading markdown file ${fullPath}:`, error);
          }

          results.push({
            title,
            href,
            description,
            content,
          });
        }
      }
    }
  }

  searchInStructure(structure);
  return results;
}
