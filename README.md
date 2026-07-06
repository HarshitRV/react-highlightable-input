# react-highlightable-input

NPM Version NPM Downloads GitHub License

A React input that highlights or styles specific text **as you type** - for example, colouring `@mentions` in a message box.

- Highlight-as-you-type using any regex + colour (or full CSS style)
- Accessible: exposes a proper `textbox` role, `aria-label`, and `aria-placeholder`
- Ships a `cleanHtml` helper to get plain text back out
- Works with **React 18 and 19** (`react`/`react-dom` `^18.2.0 || ^19.0.0`) and is built with the React Compiler
- Fully typed (TypeScript)

**[Live demo & docs](https://reacthighlightableinput.netlify.app/)** · [Use with shadcn/ui](https://reacthighlightableinput.netlify.app/shadcn) · [Try it on CodeSandbox](https://codesandbox.io/p/devbox/react-highlightable-input-demo-798tz4?embed=1&file=%2Fsrc%2Fcomponents%2FHighlightMentions%2FHighlightMentions.tsx)

> ### ⭐ Pairs perfectly with [shadcn/ui](#use-with-shadcnui)
>
> Because it's unstyled, a tiny adapter makes it slot into `Field` layouts like any native control - border, focus ring and dark mode all driven by your tokens. **[Jump to the shadcn guide ↓](#use-with-shadcnui)** or [see it live](https://reacthighlightableinput.netlify.app/shadcn).

## Install

```bash
npm install react-highlightable-input
# or
pnpm add react-highlightable-input
# or
bun add react-highlightable-input
# or 
yarn add react-highlightable-input
```



## Quick start

```tsx
import {
  HighlightableTextInput,
  highlightMentions,
  cleanHtml,
} from "react-highlightable-input";
import { useRef, useState } from "react";

function App() {
  const inputRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [highlightedContent, setHighlightedContent] = useState("");

  const onInput = () => {
    if (!inputRef.current) return;
    const value = inputRef.current.innerHTML;
    setHighlightedContent(highlightMentions(value, /@[\w]+/g, "#1d9bf0"));
  };

  const onSend = () => {
    // cleanHtml strips the highlight markup back to plain text
    console.log("Send message:", cleanHtml(highlightedContent));
  };

  return (
    <div>
      <div style={{ border: "1px solid black", padding: "5px" }}>
        <HighlightableTextInput
          inputRef={inputRef}
          shadowRef={shadowRef}
          highlightedContent={highlightedContent}
          setHighlightedContent={setHighlightedContent}
          onInput={onInput}
          placeholderText="Highlight mentions with @ symbol"
        />
      </div>
      <button onClick={onSend}>Send</button>
    </div>
  );
}

export default App;
```



## Use with shadcn/ui

The component is unstyled on purpose, so it slots neatly into a [shadcn/ui](https://ui.shadcn.com) design system. Wrap it in a small adapter that borrows shadcn's input styling (border, radius, focus ring), drive the highlight colour from a CSS token, and it behaves like a native `Field` control.

**1. Create a `HighlightField` adapter** that owns the refs/state and matches shadcn's `Input`:

```tsx
// src/components/highlight-field.tsx
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import {
  HighlightableTextInput,
  highlightMentions,
  cleanHtml,
} from "react-highlightable-input";
import { cn } from "@/lib/utils";

const defaultHighlight = (raw: string) =>
  highlightMentions(raw, /@\w+/g, "var(--rhi-highlight)");

export const HighlightField = forwardRef(function HighlightField(
  { highlight = defaultHighlight, placeholder, className, minHeight = 44, onChange },
  ref,
) {
  const inputRef = useRef<HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [highlightedContent, setHighlightedContent] = useState("");

  useImperativeHandle(ref, () => ({
    clear() {
      if (inputRef.current) inputRef.current.innerHTML = "";
      setHighlightedContent("");
    },
    focus: () => inputRef.current?.focus(),
  }));

  const handleInput = () => {
    if (!inputRef.current) return;
    const html = highlight(inputRef.current.innerHTML);
    setHighlightedContent(html);
    onChange?.({ html, text: cleanHtml(html) });
  };

  return (
    // Border + padding + focus ring live on the wrapper, not the component.
    <div
      className={cn(
        "rounded-md border border-input bg-transparent px-3 py-2 shadow-xs focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50 dark:bg-input/30",
        className,
      )}
    >
      <HighlightableTextInput
        inputRef={inputRef}
        shadowRef={shadowRef}
        highlightedContent={highlightedContent}
        setHighlightedContent={setHighlightedContent}
        onInput={handleInput}
        placeholderText={placeholder}
        style={{ minHeight }}
      />
    </div>
  );
});
```

**2. Theme the highlight and fix the two hardcoded styles** in your global CSS. The package ships a black caret and a blue focus outline, and injects its CSS *unlayered* - so keep these overrides unlayered too, or `@layer` rules will silently lose:

```css
/* src/index.css */
:root {
  --rhi-highlight: oklch(0.55 0.2 264);
}
.dark {
  --rhi-highlight: oklch(0.72 0.16 264);
}

#highlightableTextInput-container [contenteditable] {
  caret-color: var(--foreground);
}
#highlightableTextInput-container [contenteditable]:focus-visible {
  outline: none; /* defer to the wrapper's focus ring */
}
```

**3. Drop it into a `Field`** and it looks native:

```tsx
<Field>
  <FieldLabel htmlFor="composer">Message</FieldLabel>
  <HighlightField placeholder="Mention a teammate with @..." minHeight={72} />
</Field>
```

> Swap the `highlight` prop for a `highlightText` transform to style anything (e.g. `#hashtags` with a soft themed background). Prefer metric-neutral styles - colour, background, `box-shadow` - over `padding`/`font-weight` so the caret stays aligned with the text.

See the **[Combine with shadcn/ui guide](https://reacthighlightableinput.netlify.app/shadcn)** for live, themeable examples.

## How it works

The component renders two overlaid layers inside a positioned container:

- an **editable layer** (`inputRef`) where the user types - its text is transparent, only the caret is visible
- a **shadow layer** (`shadowRef`) that displays your highlighted HTML underneath the caret

On every input you convert the raw text into highlighted HTML (e.g. with `highlightMentions`) and store it in `highlightedContent`; the shadow layer renders that markup so highlights line up with what's being typed.

## API



### `<HighlightableTextInput />`


| Prop                    | Type                                               | Description                                                                        |
| ----------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `inputRef`              | `React.RefObject<HTMLDivElement | null>`           | Ref to the editable layer. Read `inputRef.current.innerHTML` in `onInput`.         |
| `shadowRef`             | `React.RefObject<HTMLDivElement | null>`           | Ref to the shadow (highlight) layer.                                               |
| `highlightedContent`    | `string`                                           | The highlighted HTML to display.                                                   |
| `setHighlightedContent` | `(highlighted: string) => void`                    | Setter for `highlightedContent` (used to clear on blur).                           |
| `onInput`               | `(event: React.FormEvent<HTMLDivElement>) => void` | Called on every input event.                                                       |
| `placeholderText`       | `string` *(optional)*                              | Placeholder shown while empty and unfocused.                                       |
| `ariaLabel`             | `string` *(optional)*                              | Accessible name for the editable region. Defaults to `"Highlightable text input"`. |
| `style`                 | `React.CSSProperties` *(optional)*                 | Styles for the container (its `position` is managed internally).                   |


```ts
export interface HighlightableTextInputProps {
  inputRef: React.RefObject<HTMLDivElement | null>;
  shadowRef: React.RefObject<HTMLDivElement | null>;
  highlightedContent: string;
  placeholderText?: string;
  ariaLabel?: string;
  onInput: (event: React.FormEvent<HTMLDivElement>) => void;
  setHighlightedContent: (highlighted: string) => void;
  style?: React.CSSProperties;
}
```



### Helper functions


| Function                                  | Returns  | Description                                                                                              |
| ----------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------- |
| `highlightMentions(text, pattern, color)` | `string` | Wraps every `pattern` match in a `<span>` coloured with `color`.                                         |
| `highlightText(text, pattern, style)`     | `string` | Wraps every `pattern` match in a `<span>` styled with a `React.CSSProperties` object.                    |
| `cleanHtml(html)`                         | `string` | Strips highlight markup back to plain text (removes tags, turns `<div>` into newlines, decodes `<`/`>`). |


```ts
function highlightMentions(text: string, pattern: RegExp, color: string): string;
function highlightText(text: string, pattern: RegExp, style: React.CSSProperties): string;
function cleanHtml(html: string): string;
```

Example with a custom style instead of a single colour:

```ts
highlightText("hi @harshit", /@[\w]+/g, { color: "red", fontWeight: "bold" });
// => 'hi <span style="color: red; font-weight: bold">@harshit</span>'
```



## Styling and sizing

Apply borders, padding, and margins to a **wrapping element**, not the component itself, to avoid layout glitches:

```tsx
<div style={{ border: "1px solid black", padding: "5px" }}>
  <HighlightableTextInput {...props} />
</div>
```

Set width/height in either of two ways.

**Option A - the** `style` **prop:**

```tsx
<div style={{ border: "1px solid black", padding: "5px" }}>
  <HighlightableTextInput {...props} style={{ width: "500px", height: "300px" }} />
</div>
```

**Option B - target the container id** `highlightableTextInput-container`**:**

```css
#highlightableTextInput-container {
  width: 500px;
  height: 300px;
}
```

```tsx
<div style={{ border: "1px solid black", padding: "5px", display: "inline-block" }}>
  <HighlightableTextInput {...props} />
</div>
```

> `display: inline-block` on the wrapper makes it shrink to the sized child.



## Migrating from v1

- The `setHiglightedContent` prop was renamed to `setHighlightedContent` (typo fix). Rename it in your usage.



## License

MIT