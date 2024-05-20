import { HighlightableInput } from "./components/HighlightableInput/HighlightableInput";
import { ContentEditableEvent } from "react-contenteditable";
import { highlightMentions } from "./utils/hightlightMentions";
import { cleanHtml } from "./utils/cleanHtml";
import { useState } from "react";

export default function App() {
	const [html, setHtml] = useState("Type here...");
	const handleChange = (event: ContentEditableEvent) => {
		console.log("raw: ", event.target.value);

		const highlighted = highlightMentions(
			event.target.value,
			/@[\w]+/g,
			"#1d9bf0"
		);
		console.log("highlighted: ", highlighted);

		setHtml(highlighted);

		const clean = cleanHtml(highlighted);
		console.log("clean: ", clean);
	};

	return (
		<HighlightableInput
			html={html}
			onChange={handleChange}
		/>
	);
}
