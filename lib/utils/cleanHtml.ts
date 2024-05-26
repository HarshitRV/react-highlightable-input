import sanitizeHtml from "sanitize-html";

export function cleanHtml(html: string): string {
	const modified = html.replace(/<div>/g, "\n").replace(/<\/div>/g, "");

	const clean = sanitizeHtml(modified, {
		allowedTags: [],
		allowedAttributes: {},
		textFilter: (text) => {
			return text.replace(/&lt;/g, "<").replace(/&gt;/g, ">");
		},
	});

	return clean;
}
