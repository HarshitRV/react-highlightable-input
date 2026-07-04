# react-highlightable-input

![NPM Version](https://img.shields.io/npm/v/react-highlightable-input) ![NPM Downloads](https://img.shields.io/npm/dw/react-highlightable-input) ![GitHub License](https://img.shields.io/github/license/harshitrv/react-highlightable-input)

A React input that highlights or styles specific text **as you type** - for example, colouring `@mentions` in a message box.

- Highlight-as-you-type using any regex + colour (or full CSS style)
- Accessible: exposes a proper `textbox` role, `aria-label`, and `aria-placeholder`
- Ships a `cleanHtml` helper to get plain text back out
- Works with **React 18 and 19** (`react`/`react-dom` `^18.2.0 || ^19.0.0`) and is built with the React Compiler
- Fully typed (TypeScript)

[Try it on CodeSandbox](https://codesandbox.io/p/devbox/react-highlightable-input-demo-798tz4?embed=1&file=%2Fsrc%2Fcomponents%2FHighlightMentions%2FHighlightMentions.tsx)

## Install

```bash
npm install react-highlightable-input
# or
pnpm add react-highlightable-input
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

## How it works

The component renders two overlaid layers inside a positioned container:

- an **editable layer** (`inputRef`) where the user types - its text is transparent, only the caret is visible
- a **shadow layer** (`shadowRef`) that displays your highlighted HTML underneath the caret

On every input you convert the raw text into highlighted HTML (e.g. with `highlightMentions`) and store it in `highlightedContent`; the shadow layer renders that markup so highlights line up with what's being typed.

## API

### `<HighlightableTextInput />`

| Prop                    | Type                                               | Description                                                              |
| ----------------------- | -------------------------------------------------- | ------------------------------------------------------------------------ |
| `inputRef`              | `React.RefObject<HTMLDivElement \| null>`          | Ref to the editable layer. Read `inputRef.current.innerHTML` in `onInput`. |
| `shadowRef`             | `React.RefObject<HTMLDivElement \| null>`          | Ref to the shadow (highlight) layer.                                     |
| `highlightedContent`    | `string`                                           | The highlighted HTML to display.                                         |
| `setHighlightedContent` | `(highlighted: string) => void`                    | Setter for `highlightedContent` (used to clear on blur).                 |
| `onInput`               | `(event: React.FormEvent<HTMLDivElement>) => void` | Called on every input event.                                             |
| `placeholderText`       | `string` _(optional)_                              | Placeholder shown while empty and unfocused.                             |
| `ariaLabel`             | `string` _(optional)_                              | Accessible name for the editable region. Defaults to `"Highlightable text input"`. |
| `style`                 | `React.CSSProperties` _(optional)_                 | Styles for the container (its `position` is managed internally).         |

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

| Function                                       | Returns  | Description                                                                                     |
| ---------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| `highlightMentions(text, pattern, color)`      | `string` | Wraps every `pattern` match in a `<span>` coloured with `color`.                                |
| `highlightText(text, pattern, style)`          | `string` | Wraps every `pattern` match in a `<span>` styled with a `React.CSSProperties` object.           |
| `cleanHtml(html)`                              | `string` | Strips highlight markup back to plain text (removes tags, turns `<div>` into newlines, decodes `&lt;`/`&gt;`). |

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

**Option A - the `style` prop:**

```tsx
<div style={{ border: "1px solid black", padding: "5px" }}>
  <HighlightableTextInput {...props} style={{ width: "500px", height: "300px" }} />
</div>
```

**Option B - target the container id `highlightableTextInput-container`:**

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

- The `setHiglightedContent` prop was renamed to **`setHighlightedContent`** (typo fix). Rename it in your usage.

## License

MIT
