export function highlightMentions(
	text: string,
	mentionPattern: RegExp,
    highlighColor: string
): string {
    // Remove existing span tags if any
    text = text.replace(/<span style="color:[^"]+;">/g, "").replace(/<\/span>/g, "");

	const replacement = (match: string) =>
		`<span style="color:${highlighColor};">${match}</span>`;
	return text.replace(mentionPattern, replacement);
}
