import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRef, useState } from "react";
import { HighlightableTextInput } from "../HighlightableTextInput";
import { highlightMentions } from "../../../utils";

function Harness({
	onInputSpy,
	initialContent = "",
	placeholderText,
}: {
	onInputSpy?: () => void;
	initialContent?: string;
	placeholderText?: string;
}) {
	const inputRef = useRef<HTMLDivElement>(null);
	const shadowRef = useRef<HTMLDivElement>(null);
	const [highlightedContent, setHighlightedContent] =
		useState<string>(initialContent);

	const onInput = () => {
		onInputSpy?.();
		if (inputRef.current) {
			setHighlightedContent(
				highlightMentions(inputRef.current.innerHTML, /@[\w]+/g, "#1d9bf0")
			);
		}
	};

	return (
		<HighlightableTextInput
			inputRef={inputRef}
			shadowRef={shadowRef}
			highlightedContent={highlightedContent}
			setHighlightedContent={setHighlightedContent}
			onInput={onInput}
			placeholderText={placeholderText}
		/>
	);
}

describe("HighlightableTextInput", () => {
	it("renders an accessible multiline textbox", () => {
		render(<Harness />);
		const textbox = screen.getByRole("textbox", {
			name: "Highlightable text input",
		});
		expect(textbox).toBeInTheDocument();
		expect(textbox).toHaveAttribute("aria-multiline", "true");
		expect(textbox).toHaveAttribute("contenteditable", "true");
	});

	it("exposes the placeholder via aria-placeholder", () => {
		render(<Harness placeholderText="Type here..." />);
		expect(
			screen.getByRole("textbox", { name: "Highlightable text input" })
		).toHaveAttribute("aria-placeholder", "Type here...");
	});

	it("shows the placeholder text while empty and unfocused", () => {
		const { container } = render(<Harness placeholderText="Type here..." />);
		const shadow = container.querySelector('[aria-hidden="true"]');
		expect(shadow?.textContent).toBe("Type here...");
	});

	it("hides the visual shadow layer from assistive technology", () => {
		const { container } = render(<Harness initialContent="hello" />);
		const shadow = container.querySelector('[aria-hidden="true"]');
		expect(shadow).toBeInTheDocument();
		expect(screen.queryAllByRole("textbox")).toHaveLength(1);
	});

	it("calls onInput as the user types", async () => {
		const onInputSpy = vi.fn();
		const user = userEvent.setup();
		render(<Harness onInputSpy={onInputSpy} />);
		const textbox = screen.getByRole("textbox", {
			name: "Highlightable text input",
		});
		await user.click(textbox);
		await user.keyboard("hi");
		expect(onInputSpy).toHaveBeenCalled();
	});
});
