import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from "next";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkCodeMeta from "@/lib/remark-code-meta";

import {
  getMarkdownFile,
  generateBreadcrumbs,
  getAllSlugs,
} from "@/lib/markdown";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { DocsPageProps } from "@/lib/types";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BlurFade } from "@/components/magic-ui/blur-fade";
import { TocSidebar } from "@/components/toc-sidebar";
import { DeepLinkHandler } from "@/components/deep-link-handler";
import { TocMobileDock } from "@/components/toc-mobile-dock";
import { getEffectiveAccessForSlug } from "@/lib/markdown";
import { AccessGuard } from "@/components/access-guard";

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: DocsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const markdownFile = getMarkdownFile(slug);

  if (!markdownFile) {
    return {
      title: "Not Found",
      description: "The requested page could not be found.",
    };
  }

  const { frontMatter } = markdownFile;

  return {
    title: frontMatter.title
      ? `${frontMatter.title} | FSAE Powertrain Documentation`
      : "FSAE Powertrain Documentation",
    description: frontMatter.description || "FSAE Powertrain Documentation",
  };
}

export default async function DocsPage({ params }: DocsPageProps) {
  const { slug } = await params;
  const markdownFile = getMarkdownFile(slug);

  if (!markdownFile) {
    notFound();
  }

  const { content, frontMatter } = markdownFile;
  const breadcrumbs = generateBreadcrumbs(slug);
  const requiredAccess = getEffectiveAccessForSlug(slug);

  return (
    <>
      <DeepLinkHandler />
      <TocMobileDock content={content} />
      <TocSidebar content={content} />
      <div className="min-w-0">
        <AccessGuard required={requiredAccess}>
          <BlurFade delay={0.1} inView>
            <Breadcrumbs items={breadcrumbs} />
          </BlurFade>

          <BlurFade delay={0.2} inView>
            <div className="mb-8">
              {frontMatter.title && (
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  {frontMatter.title}
                </h1>
              )}
              {frontMatter.description && (
                <p className="text-xl text-muted-foreground mb-6">
                  {frontMatter.description}
                </p>
              )}
              {(frontMatter.date || frontMatter.author) && (
                <div className="flex items-center gap-4 text-sm text-muted-foreground border-b pb-4 mb-8">
                  {frontMatter.date && (
                    <span>
                      Updated: {new Date(frontMatter.date).toLocaleDateString()}
                    </span>
                  )}
                  {frontMatter.author && <span>By {frontMatter.author}</span>}
                </div>
              )}
            </div>
          </BlurFade>

          <BlurFade delay={0.3} inView>
            <div className="prose prose-gray dark:prose-invert max-w-none">
              <MDXRemote
                source={content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkGfm, remarkMath, remarkCodeMeta],
                    rehypePlugins: [rehypeKatex],
                  },
                }}
              />
            </div>
          </BlurFade>

          {((frontMatter.tags && frontMatter.tags.length > 0) ||
            (frontMatter.wordCount &&
              frontMatter.showWordCount !== false)) && (
            <BlurFade delay={0.4} inView>
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between mb-4">
                  {frontMatter.tags && frontMatter.tags.length > 0 && (
                    <h3 className="text-lg font-semibold">Tags</h3>
                  )}
                  {frontMatter.wordCount &&
                    frontMatter.showWordCount !== false && (
                      <span className="text-sm text-muted-foreground">
                        {frontMatter.wordCount.toLocaleString()} words
                      </span>
                    )}
                </div>
                {frontMatter.tags && frontMatter.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {frontMatter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-muted px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </BlurFade>
          )}
        </AccessGuard>
      </div>
    </>
  );
}
