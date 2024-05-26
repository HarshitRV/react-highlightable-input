export function highlightMentions(
	text: string,
	mentionPattern: RegExp,
	highlightColor: string
): string {
	// Remove existing span tags if any
	text = text
		.replace(/<span style="color:[^"]+;">/g, "")
		.replace(/<\/span>/g, "");

	const replacement = (match: string) =>
		`<span style="color:${highlightColor};">${match}</span>`;
	return text.replace(mentionPattern, replacement);
}

export function highlightText(
	text: string,
	mentionPattern: RegExp,
	style: React.CSSProperties
): string {
	// Remove existing span tags if any
	text = text.replace(/<span style="[^"]+">/g, "").replace(/<\/span>/g, "");

	const styleString = Object.entries(style)
		.map(
			([prop, value]) =>
				`${prop.replace(/([A-Z])/g, "-$1").toLowerCase()}: ${value}`
		)
		.join("; ");

	const replacement = (match: string) =>
		`<span style="${styleString}">${match}</span>`;
	return text.replace(mentionPattern, replacement);
}
