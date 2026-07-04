import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HighlightableTextInputContainer } from "../containers/HighlightableTextInputContainer";

describe("HighlightableTextInputContainer", () => {
	it("renders a textbox", () => {
		render(<HighlightableTextInputContainer />);
		expect(screen.getByRole("textbox")).toBeInTheDocument();
	});

	it("shows the initially highlighted mention in the shadow layer", () => {
		const { container } = render(<HighlightableTextInputContainer />);
		const shadow = container.querySelector('[aria-hidden="true"]');
		expect(shadow?.innerHTML).toContain("<span");
		expect(shadow?.textContent).toContain("@harshit");
	});
});
