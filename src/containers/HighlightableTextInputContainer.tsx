import { HighlightableTextInput } from "../../lib/components/HighlightableTextInput/HighlightableTextInput";
import { useRef, useState } from "react";
import { highlightMentions } from "../../lib/utils";

export function HighlightableTextInputContainer() {
	const inputRef = useRef<HTMLDivElement>(null);
	const shadowRef = useRef<HTMLDivElement>(null);
	const [highlightedContent, setHiglightedContent] = useState<string>(highlightMentions("hi @harshit", /@[\w]+/g, "#1d9bf0"));

	const onInput = () => {
		if (inputRef.current) {
			console.log("called", inputRef.current.innerHTML);
			const value = inputRef.current.innerHTML;
			const highlighted = highlightMentions(value, /@[\w]+/g, "#1d9bf0");
			console.log("highlighted", highlighted);
			setHiglightedContent(highlighted);
		}
	};

	return (
		<div style={{ border: "1px solid black", padding: "5px" }}>
			<HighlightableTextInput
				placeholderText={`Type here...`}
				inputRef={inputRef}
				shadowRef={shadowRef}
				setHiglightedContent={setHiglightedContent}
				highlightedContent={highlightedContent}
				onInput={onInput}
			/>
		</div>
	);
}
