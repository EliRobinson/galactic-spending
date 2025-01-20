import { render } from "@testing-library/react";
import { LoadingSpinner } from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders circular progress", () => {
    const { container } = render(<LoadingSpinner />);

    // Check if CircularProgress is rendered
    expect(
      container.querySelector(".MuiCircularProgress-root")
    ).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    const { container } = render(<LoadingSpinner />);

    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "min-h-screen"
    );
  });
});
