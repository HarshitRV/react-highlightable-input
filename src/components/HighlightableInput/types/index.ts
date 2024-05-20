import { ContentEditableEvent } from "react-contenteditable";

export interface HighlightableInputProps {
	className?: string;
	innerRef?: React.RefObject<HTMLDivElement>;
	html: string;
	disabled?: boolean;
	onChange: (event: ContentEditableEvent) => void;
	style?: React.CSSProperties;
	onKeyDown?: () => void;
	onKeyUp?: () => void;
	onFocus?: () => void;
	onBlur?: () => void;
}

export type { ContentEditableEvent };
