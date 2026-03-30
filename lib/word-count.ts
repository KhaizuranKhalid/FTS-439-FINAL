/**
 * Count words in markdown content, excluding:
 * - HTML tags and their content (<div>...</div>, <p>...</p>, etc.)
 * - Multiline code blocks (```code```)
 * - Front matter
 * - Markdown syntax (headers, links, etc.)
 * 
 * Includes:
 * - Inline code (`code`) - words are counted
 * - LaTeX math expressions ($...$ and $$...$$) - delimiters removed, content counted
 */
export function countWords(content: string): number {
  if (!content || typeof content !== "string") {
    return 0;
  }

  let text = content;

  // Remove front matter (between --- markers)
  text = text.replace(/^---\s*[\s\S]*?---\s*/m, "");

  // Remove multiline code blocks (```code```) - do this first before processing HTML
  text = text.replace(/```[\s\S]*?```/g, "");

  // Handle LaTeX math expressions - remove $ delimiters but keep content
  // Block math: $$...$$ (handle first to avoid conflicts)
  text = text.replace(/\$\$[\s\S]*?\$\$/g, (match) => {
    return match.replace(/\$\$/g, ""); // Remove $$ delimiters, keep content
  });
  // Inline math: $...$ (single dollar signs, not part of $$)
  // Match $...$ but ensure we don't match $$...$$
  text = text.replace(/\$([^$\n]+?)\$/g, "$1");

  // Remove HTML tags and their content
  // Handle paired tags like <div>content</div>, <p>content</p>
  // Match common HTML tags
  const htmlTagPattern =
    /<(?:div|p|span|section|article|header|footer|nav|aside|main|ul|ol|li|table|thead|tbody|tr|td|th|form|button|input|textarea|select|option|a|img|h[1-6]|blockquote|pre|code|strong|em|b|i|u|small|sub|sup|mark|del|ins)[^>]*>[\s\S]*?<\/(?:div|p|span|section|article|header|footer|nav|aside|main|ul|ol|li|table|thead|tbody|tr|td|th|form|button|a|h[1-6]|blockquote|pre|code|strong|em|b|i|u|small|sub|sup|mark|del|ins)>/gi;
  text = text.replace(htmlTagPattern, "");

  // Remove self-closing HTML tags
  text = text.replace(/<[^>]+\/>/g, "");

  // Remove any remaining HTML tags
  text = text.replace(/<[^>]*>/g, "");

  // Remove markdown headers (# ## ###)
  text = text.replace(/^#{1,6}\s+/gm, "");

  // Remove markdown links [text](url) - keep the text part
  text = text.replace(/\[([^\]]*)\]\([^\)]*\)/g, "$1");

  // Remove markdown images ![alt](url) - remove entirely
  text = text.replace(/!\[([^\]]*)\]\([^\)]*\)/g, "");

  // Remove markdown bold/italic formatting but keep text
  text = text.replace(/\*\*([^\*]*)\*\*/g, "$1");
  text = text.replace(/\*([^\*]*)\*/g, "$1");
  text = text.replace(/__([^_]*)__/g, "$1");
  text = text.replace(/_([^_]*)_/g, "$1");

  // Remove markdown lists (-, *, +) but keep the text
  text = text.replace(/^[\s]*[-*+]\s+/gm, "");

  // Remove numbered lists
  text = text.replace(/^\d+\.\s+/gm, "");

  // Remove markdown blockquotes (>) but keep the text
  text = text.replace(/^>\s+/gm, "");

  // Remove horizontal rules (---, ***)
  text = text.replace(/^[-*]{3,}$/gm, "");

  // Remove markdown tables (| col | col |) - remove entirely
  text = text.replace(/\|.*\|/g, "");

  // Remove markdown reference-style links [text][ref]
  text = text.replace(/\[([^\]]*)\]\[[^\]]*\]/g, "$1");

  // Remove extra whitespace and normalize
  text = text
    .replace(/\s+/g, " ") // Replace multiple spaces/newlines with single space
    .trim();

  // Split by spaces and filter out empty strings
  const words = text.split(/\s+/).filter((word) => word.length > 0);

  return words.length;
}

