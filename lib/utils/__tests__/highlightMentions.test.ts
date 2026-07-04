import { describe, it, expect } from "vitest";
import { highlightMentions, highlightText } from "../highlightMentions";

describe("highlightMentions", () => {
	it("wraps a matched mention in a colored span", () => {
		const result = highlightMentions("hi @harshit", /@[\w]+/g, "#1d9bf0");
		expect(result).toBe('hi <span style="color:#1d9bf0;">@harshit</span>');
	});

	it("highlights multiple mentions", () => {
		const result = highlightMentions("@a and @b", /@[\w]+/g, "red");
		expect(result).toBe(
			'<span style="color:red;">@a</span> and <span style="color:red;">@b</span>'
		);
	});

	it("does not duplicate spans when re-highlighting already highlighted text", () => {
		const once = highlightMentions("hi @harshit", /@[\w]+/g, "#1d9bf0");
		const twice = highlightMentions(once, /@[\w]+/g, "#1d9bf0");
		expect(twice).toBe(once);
	});

	it("returns the text unchanged when there is no match", () => {
		expect(highlightMentions("no mentions here", /@[\w]+/g, "red")).toBe(
			"no mentions here"
		);
	});
});

describe("highlightText", () => {
	it("wraps a match in a span with camelCase styles converted to kebab-case", () => {
		const result = highlightText("hi @harshit", /@[\w]+/g, {
			color: "red",
			fontWeight: "bold",
		});
		expect(result).toBe(
			'hi <span style="color: red; font-weight: bold">@harshit</span>'
		);
	});

	it("strips existing spans before re-applying", () => {
		const once = highlightText("@a", /@[\w]+/g, { color: "red" });
		const twice = highlightText(once, /@[\w]+/g, { color: "red" });
		expect(twice).toBe(once);
	});
});
