import { describe, it, expect } from "vitest";
import { cleanHtml } from "../cleanHtml";

describe("cleanHtml", () => {
	it("strips span tags but keeps their text content", () => {
		expect(cleanHtml('hi <span style="color:red;">@harshit</span>')).toBe(
			"hi @harshit"
		);
	});

	it("converts opening <div> tags to newlines and drops closing tags", () => {
		expect(cleanHtml("line1<div>line2</div>")).toBe("line1\nline2");
	});

	it("decodes escaped angle brackets back to characters", () => {
		expect(cleanHtml("a &lt;b&gt; c")).toBe("a <b> c");
	});

	it("returns plain text unchanged", () => {
		expect(cleanHtml("just text")).toBe("just text");
	});
});
