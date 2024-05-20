import ContentEditable from "react-contenteditable";
import { HighlightableInputProps } from "./types";

export function HighlightableInput({
	html,
	onChange,
	...props
}: HighlightableInputProps): JSX.Element {
	return (
		<ContentEditable
			html={html.replace(/<\/?font[^>]*>/g, "")}
			onChange={onChange}
			{...props}
		/>
	);
}

/**
 * *Note:
 * On line 11 we have `html={html.replace(/<\/?font[^>]*>/g, "")}`.
 * This is because if someone add a highlightable text right in the
 * beginning of the input and removes it and then add some input later
 * then the whole inner html is getting wrapped in a font tag making 
 * everything highlighted.
 */
