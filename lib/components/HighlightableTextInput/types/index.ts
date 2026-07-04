export interface HighlightableTextInputProps {
	inputRef: React.RefObject<HTMLDivElement | null>;
	shadowRef: React.RefObject<HTMLDivElement | null>;
	highlightedContent: string;
	placeholderText?: string;
	/**
	 * Accessible name for the editable region. Announced by screen readers.
	 * @default "Highlightable text input"
	 */
	ariaLabel?: string;
	onInput: (event: React.FormEvent<HTMLDivElement>) => void;
	setHighlightedContent: (highlighted: string) => void;
	style?: React.CSSProperties;
}
