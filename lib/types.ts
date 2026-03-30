export interface FrontMatter {
  title: string;
  description?: string;
  date?: string;
  author?: string;
  tags?: string[];
  draft?: boolean;
  slug?: string;
  order?: number;
  access?: number | number[];
  wordCount?: number;
  showWordCount?: boolean;
  [key: string]: any;
}

export interface MDXContent {
  content: string;
  frontMatter: FrontMatter;
  slug: string;
  filePath: string;
}

export interface NavItem {
  title: string;
  slug: string;
  href: string;
  children?: NavItem[];
  order?: number;
  description?: string;
  access?: number[];
}

export interface DocsPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export interface FileSystemItem {
  name: string;
  path: string;
  type: "file" | "directory";
  children?: FileSystemItem[];
  frontMatter?: FrontMatter;
}

export interface MarkdownPageData {
  content: string;
  frontMatter: FrontMatter;
  slug: string[];
  navigation: NavItem[];
  breadcrumbs: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  title: string;
  href: string;
  isLast?: boolean;
}

export interface SearchResult {
  title: string;
  description?: string;
  href: string;
  content?: string;
}

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
  children?: TableOfContentsItem[];
}

export interface FileTreeProps {
  children: React.ReactNode;
}

export interface CodeComparisonProps {
  beforeCode: string;
  afterCode: string;
  language?: string;
  filename?: string;
}

export interface ScriptCopyBtnProps {
  children: React.ReactNode;
  language?: string;
}

export interface HighlighterProps {
  children: React.ReactNode;
  color?: string;
}
