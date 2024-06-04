import App from "../App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
	it("should render", () => {
		render(<App />);
		expect(screen.getByText("react-highlightable-input")).toBeInTheDocument();
	});
});
