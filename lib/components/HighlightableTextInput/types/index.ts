export interface HighlightableTextInputProps {
	inputRef: React.RefObject<HTMLDivElement>;
	shadowRef: React.RefObject<HTMLDivElement>;
	highlightedContent: string;
	placeholderText?: string;
	onInput: (event: React.FormEvent<HTMLDivElement>) => void;
    setHiglightedContent: (highlighted: string) => void;
	style?: React.CSSProperties;
}