import { useEffect, useState } from "react";
import styles from "./HighlightableTextInput.module.scss";
import { HighlightableTextInputProps } from "./types";

const DEFAULT_PLACEHOLDER = "Start typing...";
const DEFAULT_ARIA_LABEL = "Highlightable text input";

export function HighlightableTextInput({
	placeholderText = DEFAULT_PLACEHOLDER,
	ariaLabel = DEFAULT_ARIA_LABEL,
	inputRef,
	shadowRef,
	setHighlightedContent,
	onInput,
	highlightedContent,
	style,
	...props
}: HighlightableTextInputProps): React.JSX.Element {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	// The container establishes the positioning context for the overlaid
	// editable and shadow layers, so `position` cannot be overridden.
	const styleWithoutPosition = { ...style };
	if (style && style.position) {
		delete styleWithoutPosition.position;
	}

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (shadowRef.current) {
			shadowRef.current.scrollTop = e.currentTarget.scrollTop;
		}
	};

	useEffect(() => {
		if (inputRef.current && highlightedContent) {
			inputRef.current.innerHTML = highlightedContent;
		}
		// Seed the editable content once on mount; re-running would overwrite user edits.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const showPlaceholder = !highlightedContent && !isFocused;

	return (
		<div
			id="highlightableTextInput-container"
			className={styles.container}
			style={{ position: "relative", ...styleWithoutPosition }}
			{...props}>
			<div
				className={styles.inputDiv}
				ref={inputRef}
				contentEditable
				role="textbox"
				aria-multiline="true"
				aria-label={ariaLabel}
				aria-placeholder={placeholderText}
				onScroll={handleScroll}
				onInput={onInput}
				onFocus={() => setIsFocused(true)}
				onBlur={() => {
					setIsFocused(false);
					if (inputRef.current?.textContent === "") {
						setHighlightedContent("");
					}
				}}
				suppressContentEditableWarning
			/>
			<div
				className={styles.shadowDiv}
				ref={shadowRef}
				aria-hidden="true"
				dangerouslySetInnerHTML={{
					__html: showPlaceholder ? placeholderText : highlightedContent,
				}}
			/>
		</div>
	);
}
