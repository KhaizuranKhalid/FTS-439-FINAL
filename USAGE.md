# Using This Documentation System

This site uses Markdown (MDX) plus a few custom tags to make writing docs fast.
Keep it simple: one topic per page under `content/`, with a `README.md` per folder.

## Write a Page

````md
---
title: TITLE
description: SHORT DESCRIPTION
date: 2025-09-12
author: Brians Tjipto
order: 3 // Which sub-folder layer is it in
tags: [powertrain, something1, something2]
access: [0] // Allowed tiers
---

# Page Title

Some text, lists, and code:

- Item 1
- Item 2

```ts
export function example() {
  return "hello";
}
```
````

### Links, Images, and Files

Use Markdown for quick links/images, or HTML tags for extra attributes.

#### Link (Markdown)

```mdx
[NUS Formula SAE](https://www.nusformulasae.com/)
```

#### Link (HTML with attributes)

```mdx
<a
  href="https://www.nusformulasae.com/"
  target="_blank"
  rel="noopener noreferrer"
>
  NUS Formula SAE
</a>
```

### Image

Add the image inside a subfolder under the `/public`, and add an image

#### Image with placeholder text (alt) and optional title

```mdx
![Team car on track](/subfolder/image.png "R25e at Michigan")
// [Team car on track] is the alt text
// "R25e at Michigan" is the title
```

- Alt text (inside the brackets) is shown when the image can't load and is used by screen readers.
- The optional string in quotes is the image title (tooltip on hover).

#### Normal Image

```mdx
![](/subfolder/image.png)
```

#### Make an image clickable (image → link)

```mdx
[![Team car on track](/subfolder/image.png "R25e at Michigan")](/powertrain)
```

#### Link to a file in /public (PDF, ZIP, etc.)

- Put your file under `/public/…`
- Then link to it using its public path:

```mdx
[Download HV Schematic (PDF)](/hv-schematic.pdf)
```

#### Force download (HTML only)

```mdx
<a href="/docs/hv-schematic.pdf" download>
  Download HV Schematic (PDF)
</a>
```

## Custom Tags (MDX Components)

- **FileTree**: Show a directory structure

```mdx
<FileTree>
  content/
├── getting-started/
│ └── README.md
└── powertrain/
└── README.md
</FileTree>
```

- **CodeComparison**: Side-by-side before/after code

```mdx
<CodeComparison
beforeCode={`#include <iostream>

int main() {
std::cout << "Hello, World!" << std::endl;
return 0;
}`}
afterCode={`#include <iostream>

int main() {
std::cout << "Pool Testis" << std::endl;
return 0;
}`}
language="cpp"
filename="main.cpp"
/>
```

- **Highlighter**: Emphasize text

```mdx
// Preset variants (theme-aware)

<Highlighter variant="destructive">Danger zone</Highlighter>
<Highlighter variant="success">All good</Highlighter>

// Custom color (overrides variant)

<Highlighter color="#ff6b6b">Custom highlight</Highlighter>
```

- **CodeTabs**: Multiple code variants

```mdx
<CodeTabs
files={[
{ filename: "install.py", language: "bash", code: `python run pool_testis.py` },
{ filename: "main.cpp", language: "cpp", code: `
#include <iostream>

int main() {
std::cout << "Hello, World!" << std::endl;
return 0;
}
` },
]}
/>
```

- **Alert**: Informational or warning messages

```mdx
<Alert title="Info" variant="default">
  Helpful context.
</Alert>
<Alert title="Warning" variant="destructive">
  Important notice.
</Alert>
```

## Copy Script (Single Command)

Show only one command with a copy button (no npm/yarn/pnpm tabs):

```mdx
<ScriptCopyBtn command="python run pool_testis.py" language="bash" />
```

- **Card**: Group related content

```mdx
<Card title="Feature" description="Short detail">
  Body content
</Card>
```

- **Tabs**: Switch between options

```mdx
<Tabs
  defaultValue="test"
  items={[
    { label: "Pool", value: "pool", content: <div>This is Pool</div> },
    { label: "Testis", value: "testis", content: <div>This is Testis</div> },
  ]}
/>
```

## Structure

- Put docs under `content/` and mirror the sidebar.
- Use `README.md` inside each folder with frontmatter (`title`, `description`, `order`).
- Use short, focused pages; split large topics.

```mdx
---
title: TITLE
description: SHORT DESCRIPTION
date: 2025-09-12
author: Brians Tjipto
order: 3 // Which sub-folder layer is it in
tags: [powertrain, something1, something2]
access: [0] // Allowed tiers
---
```

## Access

```mdx
access: [0] // Allowed tiers
```

- 1 is for Y2
- 2 is for Spare
- 3 is for 3301
- 4 is ONLY main password can access

You may combine more than one so if you would like to have access for Y2 and 3301 you can do `access: [1, 3]`.



