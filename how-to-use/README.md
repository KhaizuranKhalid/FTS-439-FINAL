---
title: How to Use
description: Complete guide to writing and formatting documentation pages with MDX
date: 2025-10-19
author: Brians Tjipto
order: 1
tags: [guide, documentation, mdx]
access: [0]
---

# Using This Documentation System

This site uses Markdown (MDX) plus a few custom tags to make writing docs fast.
Keep it simple: one topic per page under `content/`, with a `README.md` per folder.

<div className="flex justify-center my-8">
  <button className="relative px-8 py-4 text-lg font-bold text-white rounded-lg overflow-hidden group">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 animate-spin-slow"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 opacity-50 blur-xl animate-spin-slow"></div>
    <span className="relative z-10">GAY</span>
  </button>
</div>

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
wordCount: 500 // Optional: manually set word count (auto-calculated if omitted)
showWordCount: false // Optional: hide word count display (default: true)
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

### Word Count

The word count is automatically calculated for each page and displayed next to the tags at the bottom of the page.

**Excluded from count:**

- HTML tags and their content (`<div>`, `<p>`, etc.)
- Multiline code blocks (`code`)
- Front matter
- Markdown syntax (headers, links, images, etc.)

**Included in count:**

- Inline code (`code`) - words are counted
- LaTeX math expressions (`$V_in$`, `$$\frac{a}{b}$$`) - delimiters removed, content counted (e.g., `$V_in$` counts as 1 word "V_in")

**Automatic (Recommended):**

The word count is calculated automatically from your content. Just leave it out of the front matter:

```md
---
title: My Page
tags: [example]
---
```

**Manual Override:**

If you want to manually set the word count (e.g., for a specific reading time calculation), you can add it to the front matter:

```md
---
title: My Page
tags: [example]
wordCount: 500
---
```

**Disable Word Count:**

To hide the word count display on a specific page, set `showWordCount: false`:

```md
---
title: My Page
tags: [example]
showWordCount: false
---
```

The word count will appear next to the tags section at the bottom of each page, formatted with commas (e.g., "6,969 words"). By default, word count is shown unless explicitly disabled.

## Links, Images, and Files

Use Markdown for quick links/images, or HTML tags for extra attributes.

### Link (Markdown)

```mdx
[NUS Formula SAE](https://www.nusformulasae.com/)
```

**Example:** [NUS Formula SAE](https://www.nusformulasae.com/)

### Link (HTML with attributes)

```mdx
<a
  href="https://www.nusformulasae.com/"
  target="_blank"
  rel="noopener noreferrer"
>
  NUS Formula SAE
</a>
```

**Example:** <a href="https://www.nusformulasae.com/" target="_blank" rel="noopener noreferrer">NUS Formula SAE (opens in new tab)</a>

## Images

Add the image inside a subfolder under the `/public`, and add an image

### Image with placeholder text (alt) and optional title

```mdx
![Team car on track](/r25e.jpeg "R25e at Michigan")
// [Team car on track] is the alt text
// "R25e at Michigan" is the title
```

- Alt text (inside the brackets) is shown when the image can't load and is used by screen readers.
- The optional string in quotes is the image title (tooltip on hover).

<FileTree>
  public/
├── powertrain/
│ └── image1.png
│ └── image2.png
│ └── image3.jpg
└── r25e.jpeg
</FileTree>

### Normal Image

```mdx
![](/subfolder/image.png)
```

**Example (from above file tree):**

```mdx
![](/powertrain/image1.png)
```

### Make an image clickable (image → link)

```mdx
[![Team car on track](/r25e.jpeg "R25e at Michigan")](/powertrain)
```

### Link to a file in /public (PDF, ZIP, etc.)

- Put your file under `/public/…`
- Then link to it using its public path:

```mdx
[Download HV Schematic (PDF)](/hv-schematic.pdf)
```

### Advanced Image Parameters

You can now control image dimensions and styling directly in the alt text! This makes it super easy to customize images without HTML tags.

**Quick Reference:**

| Parameter   | Example        | Description                                     |
| ----------- | -------------- | ----------------------------------------------- |
| `=WxH`      | `=300x200`     | Set width and height                            |
| `=W`        | `=300`         | Set width only                                  |
| `=xH`       | `=x200`        | Set height only                                 |
| `circle`    | `circle`       | Make image circular                             |
| `rounded-*` | `rounded-lg`   | Corner radius (none, sm, md, lg, xl, 2xl, full) |
| `aspect-*`  | `aspect-video` | Aspect ratio (square, video, [custom])          |
| `center`    | `center`       | Center image horizontally                       |

All parameters can be combined: `![Alt =300 circle center](/image.png)`

---

#### Dimensions

**Width and Height:**

```mdx
![R25e car =300x200](/r25e.jpeg)
```

This sets width to 300px and height to 200px.

**Example:**

![R25e car =300x200](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Width Only:**

```mdx
![R25e car =300](/r25e.jpeg)
```

This sets width to 300px, height auto.

**Example:**

![R25e car =300](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Height Only:**

```mdx
![R25e car =x200](/r25e.jpeg)
```

This sets height to 200px, width auto.

**Example:**

![R25e car =x200](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

#### Circle Mask

Create circular images (perfect for profile pictures or icons):

```mdx
![R25e profile =150 circle](/r25e.jpeg)
```

The `circle` keyword makes the image perfectly round. If you specify only width or height, it automatically makes it square.

**Example:**

![R25e profile =150 circle](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Different sizes:**

```mdx
![R25e =100 circle](/r25e.jpeg)
![R25e =200 circle](/r25e.jpeg)
```

**Example:**

![R25e =100 circle](https://brianstm.github.io/fsae-docs-template/r25e.jpeg) ![R25e =200 circle](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

#### Rounded Corners

By default, images have medium rounded corners (`rounded-md`). You can customize this:

**No rounding:**

```mdx
![R25e =200 rounded-none](/r25e.jpeg)
```

**Example:**

![R25e =200 rounded-none](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Different rounding levels:**

```mdx
![R25e =150 rounded-sm](/r25e.jpeg)
![R25e =150 rounded-md](/r25e.jpeg)
![R25e =150 rounded-lg](/r25e.jpeg)
![R25e =150 rounded-xl](/25e.jpeg)
```

**Example:**

Small (`rounded-sm`):

![R25e =150 rounded-sm](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

Medium (`rounded-md`, default):

![R25e =150 rounded-md](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

Large (`rounded-lg`):

![R25e =150 rounded-lg](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

Extra Large (`rounded-xl`):

![R25e =150 rounded-xl](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

Fully Rounded (`rounded-full`):

![R25e =150 rounded-full](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

#### Aspect Ratios

Maintain specific aspect ratios:

```mdx
![Video thumbnail =400 aspect-video](/r25e.jpeg)
```

**Available aspect ratios:**

- `aspect-square` - 1:1 ratio
- `aspect-video` - 16:9 ratio
- `aspect-[16/9]` - Custom ratio (any fraction)

**Examples:**

Square aspect (1:1):

```mdx
![R25e =300 aspect-square](/r25e.jpeg)
```

![R25e =300 aspect-square](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

Video aspect (16:9):

```mdx
![R25e =400 aspect-video](/r25e.jpeg)
```

![R25e =400 aspect-video](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

Custom aspect ratio:

```mdx
![R25e =300 aspect-[4/3]](/r25e.jpeg)
```

![R25e =300 aspect-[4/3]](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

#### Combining Parameters

You can combine multiple parameters:

**Example 1: Fixed dimensions with custom rounding**

```mdx
![R25e car =300x200 rounded-lg](/r25e.jpeg)
```

![R25e car =300x200 rounded-lg](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Example 2: Circle with size**

```mdx
![R25e profile =120 circle](/r25e.jpeg)
```

![R25e profile =120 circle](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Example 3: Aspect ratio with rounding**

```mdx
![R25e thumbnail =400 aspect-video rounded-xl](/r25e.jpeg)
```

![R25e thumbnail =400 aspect-video rounded-xl](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Example 4: Large image, no rounding**

```mdx
![R25e diagram =500 rounded-none](/r25e.jpeg)
```

![R25e diagram =500 rounded-none](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Example 5: Multiple images with different styles**

```mdx
![R25e =150 circle](/r25e.jpeg)
![R25e =150 rounded-xl](/r25e.jpeg)
![R25e =150 rounded-none](/r25e.jpeg)
```

![R25e =150 circle](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)
![R25e =150 rounded-xl](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)
![R25e =150 rounded-none](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

#### Centering Images

Center any image horizontally on the page by adding the `center` keyword:

**Basic centered image:**

```mdx
![R25e car =400 center](/r25e.jpeg)
```

![R25e car =400 center](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Centered circle:**

```mdx
![R25e profile =200 circle center](/r25e.jpeg)
```

![R25e profile =200 circle center](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Centered with aspect ratio:**

```mdx
![R25e video =500 aspect-video rounded-xl center](/r25e.jpeg)
```

![R25e video =500 aspect-video rounded-xl center](https://brianstm.github.io/fsae-docs-template/r25e.jpeg)

---

**Alternative Method: Using HTML/MDX**

If you need more control over centering or want to add additional styling, you can also use a div wrapper:

```mdx
<div className="flex justify-center my-6">
  ![R25e =300 rounded-lg](/r25e.jpeg)
</div>
```

Or with HTML img tag:

```mdx
<div className="flex justify-center my-6">
  <img src="/r25e.jpeg" alt="R25e" width="300" className="rounded-lg" />
</div>
```

### Force download (HTML only)

```mdx
<a href="/docs/hv-schematic.pdf" download>
  Download HV Schematic (PDF)
</a>
```

## Custom MDX Components

### FileTree

Show a directory structure:

```mdx
<FileTree>
  content/ ├── getting-started/ │ └── README.md └── powertrain/ └── README.md
</FileTree>
```

**Example:**

<FileTree>
  content/
├── getting-started/
│ └── README.md
├── powertrain/
│ └── README.md
├── how-to-use/
│ └── README.md
</FileTree>

### CodeComparison

Side-by-side before/after code:

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

**Example:**

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

### Highlighter

Emphasize text with preset variants (theme-aware):

```mdx
<Highlighter variant="destructive">Danger zone</Highlighter>
<Highlighter variant="success">All good</Highlighter>

// Custom color (overrides variant)

<Highlighter color="#ff6b6b">Custom highlight</Highlighter>
```

**Example:**

<Highlighter variant="destructive">Danger zone</Highlighter> <Highlighter variant="success">All good</Highlighter> <Highlighter color="#ff6b6b">Custom highlight</Highlighter>

### CodeTabs

Multiple code variants in tabs:

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

**Example:**

<CodeTabs
files={[
{ filename: "install.py", language: "python", code: `print("Hello from Python!")` },
{ filename: "main.cpp", language: "cpp", code: `#include <iostream>

int main() {
std::cout << "Hello, World!" << std::endl;
return 0;
}` },
]}
/>

### Alert

Informational or warning messages:

```mdx
<Alert title="Info" variant="default">
  Helpful context.
</Alert>
<Alert title="Warning" variant="destructive">
  Important notice.
</Alert>
```

**Example:**

<Alert title="Info" variant="default">
  PSA: DONT BE STUPID
</Alert>

<Alert title="Warning" variant="destructive">
OI STUPID A U
</Alert>

### ScriptCopyBtn

Show only one command with a copy button (no npm/yarn/pnpm tabs):

```mdx
<ScriptCopyBtn command="python run pool_testis.py" language="bash" />
```

**Example:**

<ScriptCopyBtn command="python run pool_testis.py" language="bash" />

### Card

Group related content:

```mdx
<Card title="Feature" description="Short detail">
  Body content
</Card>
```

**Example:**

<Card title="LINGANG" description="wocaooooooo">
 Lingang guli guli waca lingangu lingagnu
</Card>

### Tabs

Switch between options:

```mdx
<Tabs
  defaultValue="test"
  items={[
    { label: "Pool", value: "pool", content: <div>This is Pool</div> },
    { label: "Testis", value: "testis", content: <div>This is Testis</div> },
  ]}
/>
```

**Example:**

<Tabs
defaultValue="pool"
items={[
{ label: "POOL", value: "pool", content: <div>POOOLLLLLLL!!!!</div> },
{ label: "TESTIS", value: "testis", content: <div>TESTISSSSS!!!!</div> },
{ label: "WOCAO", value: "wocao", content: <div>WOCAOOOOOO!!!!</div> },
]}
/>

## Page Structure

- Put docs under `content/` and mirror the sidebar.
- Use `README.md` inside each folder with frontmatter (`title`, `description`, `order`).
- Use short, focused pages; split large topics.

**Frontmatter format:**

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

## Access Control

```mdx
access: [0] // Allowed tiers
```

Access levels:

- `0` - Public (everyone)
- `1` - Password 1
- `2` - Password 2
- `3` - Password 3
- `4` - Main password only (restricted)

You may combine more than one, so if you would like to have access for 1 and 3 you can do `access: [1, 3]`.

## The Sky is the Limit

<div className="flex justify-center my-12">
  <div 
    id="corner-button-wrapper" 
    className="relative group"
    dangerouslySetInnerHTML={{
      __html: `
        <button 
          class="relative px-10 py-5 text-xl font-bold text-white rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105 cursor-pointer"
          onclick="
            const wrapper = document.getElementById('corner-button-wrapper');
            wrapper.style.animation = 'none';
            setTimeout(() => {
              wrapper.style.animation = 'visitCorners 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards';
            }, 10);
            setTimeout(() => {
              wrapper.style.animation = 'none';
            }, 3000);
          "
        >
          <div class='absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-spin'></div>
          <div class='absolute inset-[2px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl'></div>
          <span class='relative z-10 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent'>
            WOW MAGIC🪄
          </span>
        </button>
      `
    }}
  />
</div>

<div className="flex justify-center my-8">
  <a 
    href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    target="_blank"
    rel="noopener noreferrer"
    className="relative px-8 py-4 text-lg font-bold text-white rounded-lg overflow-hidden group transition-all hover:scale-110 hover:rotate-2 cursor-pointer inline-block no-underline"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse"></div>
    <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-50 blur-lg"></div>
    <span className="relative z-10 drop-shadow-lg">
      FUN BUTTON
    </span>
  </a>
</div>

<style>{`
  @keyframes visitCorners {
    0% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(calc(50vw - 100px), calc(-40vh)) rotate(90deg);
    }
    50% {
      transform: translate(calc(50vw - 100px), calc(40vh)) rotate(180deg);
    }
    75% {
      transform: translate(calc(-50vw + 100px), calc(40vh)) rotate(270deg);
    }
    87.5% {
      transform: translate(calc(-50vw + 100px), calc(-40vh)) rotate(315deg);
    }
    100% {
      transform: translate(0, 0) rotate(360deg);
    }
  }
`}</style>

<div
  className="inline-block"
  style={{ animation: "wiggle 3s linear infinite" }}
>
  <style jsx>{`
    @keyframes wiggle {
      0%, 100% {
        transform: translateX(-500px) rotate(-180deg);
      }
      50% {
        transform: translateX(500px) rotate(180deg);
      }
    }
  `}</style>
  <p className="text-xl font-bold">🌹🌸NIGGAAAAA🌸🌹</p>
</div>

<div className="flex justify-center my-12">
  <div className="relative group">
    <button className="relative px-10 py-5 text-xl font-bold text-white rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-spin"></div>
      <div className="absolute inset-[2px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl"></div>
      <span className="relative z-10 text-white">
        NIGGA
      </span>
    </button>
  </div>
</div>

<div className="flex justify-center my-12 animate-spin">
  <div className="relative group">
    <button className="relative px-10 py-5 text-xl font-bold text-white rounded-xl overflow-hidden shadow-2xl transition-transform hover:scale-105">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 animate-spin"></div>
      <div className="absolute inset-[2px] bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl"></div>
      <span className="relative z-10 text-white">
        SPINNING NIGGA
      </span>
    </button>
  </div>
</div>
