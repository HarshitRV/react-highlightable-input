import { HighlightableTextInputContainer } from "./containers/HighlightableTextInputContainer";

export default function App() {
	return (
		<>
			<HighlightableTextInputContainer />
			<br />
			<br />
			<input defaultValue={"hello"} type="text" />
			<br />
			<br />
			<textarea
				name=""
				id="">Some content</textarea>
		</>
	);
}
