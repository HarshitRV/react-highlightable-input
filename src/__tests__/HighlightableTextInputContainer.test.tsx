import { HighlightableTextInput } from "../../lib/components";
import { render, screen } from "@testing-library/react";
import { useRef, useState } from "react";
import { highlightMentions } from "../../lib/utils";

describe("HighlightableTextInput", () => {
	it("should render", () => {
		const inputRef = useRef<HTMLDivElement>(null);
		const shadowRef = useRef<HTMLDivElement>(null);
		const [highlightedContent, setHiglightedContent] = useState<string>(
			highlightMentions("hi @harshit", /@[\w]+/g, "#1d9bf0")
		);

		const onInput = () => {
			if (inputRef.current) {
				console.log("called", inputRef.current.innerHTML);
				const value = inputRef.current.innerHTML;
				const highlighted = highlightMentions(value, /@[\w]+/g, "#1d9bf0");
				console.log("highlighted", highlighted);
				setHiglightedContent(highlighted);
			}
		};

		render(
			<HighlightableTextInput
				placeholderText={`Type here...`}
				inputRef={inputRef}
				shadowRef={shadowRef}
				setHiglightedContent={setHiglightedContent}
				highlightedContent={highlightedContent}
				onInput={onInput}
			/>
		);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});
});
