# react-highlightable-input

A custom react input component that allows highlighting or styling of text as it is typed.

# Install

```bash
npm install react-highlightable-input
```

# Usage

```jsx
import {
  HighlightableTextInput,
  highlightMentions,
  cleanHtml,
} from "react-highlightable-input";
import { useRef, useState } from "react";
import "./App.css";

function App() {
  const inputRef = useRef <HTMLDivElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const [highlightedContent, setHiglightedContent] = useState<string>("");

  const onInput = () => {
	if (inputRef.current) {
	  const value = inputRef.current.innerHTML;
	  const highlighted = highlightMentions(value, /@[\w]+/g, "#1d9bf0");
	  setHiglightedContent(highlighted);
	}
  };

  const onSend = () => {
	console.log("Send message:", cleanHtml(highlightedContent));
  };

  return (
	<div>
	  <div
	   style={{
	    border: "1px solid black",
		padding: "5px",
	  }}>
	  <HighlightableTextInput
	    inputRef={inputRef}
		shadowRef={shadowRef}
		highlightedContent={highlightedContent}
		setHiglightedContent={setHiglightedContent}
		onInput={onInput}
	  />
	  </div>
		<button
		  onClick={onSend}
		  style={{
		    backgroundColor: "#4caf50",
			color: "white",
			padding: "5px 10px",
			border: "none",
			cursor: "pointer",
			alignSelf: "flex-start",
			marginTop: "10px",
			}}>
			Send
		</button>
	  </div>
	);
}

export default App;
```

# A closer look

```jsx
<HighlightableTextInput
  inputRef={inputRef} // Ref to the input element
  shadowRef={shadowRef} // Ref to the shadow element
  highlightedContent={highlightedContent} // The content to be highlighted
  setHiglightedContent={setHiglightedContent} // Function to set the highlighted content
  onInput={onInput} // Function to be called when the input changes
/>
```

# Props

| Prop Name              | Type                                               | Description                                  |
| ---------------------- | -------------------------------------------------- | -------------------------------------------- |
| `inputRef`             | `React.RefObject<HTMLDivElement>`                  | A reference to the input element.            |
| `shadowRef`            | `React.RefObject<HTMLDivElement>`                  | A reference to the shadow element.           |
| `highlightedContent`   | `string`                                           | The content that should be highlighted.      |
| `placeholderText`      | `string` (optional)                                | The placeholder text for the input element.  |
| `onInput`              | `(event: React.FormEvent<HTMLDivElement>) => void` | The event handler for the input event.       |
| `setHiglightedContent` | `(highlighted: string) => void`                    | The function to set the highlighted content. |
| `style`                | `React.CSSProperties` (optional)                   | The CSS styles for the input element.        |

```ts
export interface HighlightableTextInputProps {
  inputRef: React.RefObject<HTMLDivElement>;
  shadowRef: React.RefObject<HTMLDivElement>;
  highlightedContent: string; 
  placeholderText?: string;
  onInput: (event: React.FormEvent<HTMLDivElement>) => void;
  setHiglightedContent: (highlighted: string) => void;
  style?: React.CSSProperties;
}
```

# Functions

### `highlightMentions`

```ts
function highlightMentions(
  text: string,
  mentionPattern: RegExp,
  highlightColor: string
): string;
```

This function takes a string of text, a regular expression pattern to match mentions, and a color to highlight the mentions. It returns a new string where the mentions are wrapped in a `span` tag with the specified color.

**Parameters:**

- `text`: The input text.
- `mentionPattern`: The regular expression pattern to match mentions.
- `highlightColor`: The color to highlight the mentions.

**Returns:**

A new string where the mentions are highlighted with the specified color.

---

### `highlightText`

```ts
function highlightText(
  text: string,
  pattern: RegExp,
  style: React.CSSProperties
): string;
```

This function takes a string of text, a regular expression pattern to match mentions, and a style object to style the mentions. It returns a new string where the mentions are wrapped in a `span` tag with the specified styles.

**Parameters:**

- `text`: The input text.
- `mentionPattern`: The regular expression pattern to match mentions.
- `style`: The style object to style the mentions. This should be a `React.CSSProperties` object.

**Returns:**

A new string where the mentions are styled with the specified styles.

# Usage Instructions

## 1. Setting border and padding.

If you want to add the border to the `react-highlightable-input` then wrap the `HighlightableTextInput` component with a `div` and add the border to the `div` element. Same goes for other styles like padding margin. Otherwise some unexpected styling issues may occur.

```jsx
<div style={{ border: "1px solid black", padding: "5px" }}>
  <HighlightableTextInput
    inputRef={inputRef}
	shadowRef={shadowRef}
	highlightedContent={highlightedContent}
	setHiglightedContent={setHiglightedContent}
	onInput={onInput}
  />
</div>
```

## 2. Setting height and width.

Width and height of the input div can be set in two ways

### 1. Via `style` props.

```jsx
<div style={{ border: "1px solid black", padding: "5px" }}>
  <HighlightableTextInput
	inputRef={inputRef}
	shadowRef={shadowRef}
	highlightedContent={highlightedContent}
	setHiglightedContent={setHiglightedContent}
	onInput={onInput}
	style={{
	  width: "500px",
	  height: "300px",
	}}
  />
</div>
```

### 2. Via input div id (`highlightableTextInput-container`)

```css
#highlightableTextInput-container {
  width: 500px;
  height: 300px;
}
```

```jsx
<div style={{ border: "1px solid black", padding: "5px", display: "inline-block" }}>
  <HighlightableTextInput
    inputRef={inputRef}
    shadowRef={shadowRef}
    highlightedContent={highlightedContent}
    setHiglightedContent={setHiglightedContent}
    onInput={onInput}
</div>
```

**Note:** The `display: inline-block` is used to make the div element take the width and height of the child element.
