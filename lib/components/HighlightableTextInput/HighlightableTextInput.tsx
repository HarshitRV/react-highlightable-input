import { useState } from "react";
import styles from "./HighlightableTextInput.module.scss";
import { HighlightableTextInputProps } from "./types";

// eslint-disable-next-line prefer-const
export let PLACEHOLDER = "Start typing...";

export function HighlightableTextInput({
	placeholderText = PLACEHOLDER,
	inputRef,
	shadowRef,
	setHiglightedContent,
	onInput,
	highlightedContent,
	style,
	...props
}: HighlightableTextInputProps): JSX.Element {
	const [placeholder, setPlaceholder] = useState<string>(placeholderText);

	// remove position property from style prop
	const styleWithoutPosition = { ...style };
	if (style && style.position) {
		delete styleWithoutPosition.position;
	}

	const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
		if (shadowRef.current) {
			shadowRef.current.scrollTop = e.currentTarget.scrollTop;
		}
	};

	return (
		<div
			id="highlightableTextInput-container"
			className={styles.container}
			style={{ position: "relative", ...styleWithoutPosition }}
			tabIndex={0}
			onFocus={() => {
				if (placeholder === PLACEHOLDER || placeholder === placeholderText) {
					setPlaceholder(() => "");
				}
			}}
			onBlur={() => {
				if (placeholder === "") {
					setPlaceholder(() => placeholderText ?? PLACEHOLDER);
				}

				if (inputRef.current?.textContent === "") {
					setHiglightedContent("");
				}
			}}
			{...props}>
			<div
				onScroll={handleScroll}
				className={`${styles.inputDiv}`}
				ref={inputRef}
				contentEditable
				onInput={onInput}
				suppressContentEditableWarning
			/>
			<div
				className={`${styles.shadowDiv}`}
				ref={shadowRef}
				dangerouslySetInnerHTML={{
					__html: highlightedContent || placeholder,
				}}
			/>
		</div>
	);
}
