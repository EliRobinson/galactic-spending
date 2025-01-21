import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LoadingSpinner } from "../LoadingSpinner";

describe("LoadingSpinner", () => {
  it("renders circular progress", () => {
    const { container } = render(<LoadingSpinner />);
    expect(
      container.querySelector(".MuiCircularProgress-root")
    ).toBeInTheDocument();
  });

  it("has correct styling classes", () => {
    const { container } = render(<LoadingSpinner />);
    const wrapper = container.firstChild as HTMLElement;

    expect(wrapper).toHaveClass(
      "flex",
      "justify-center",
      "items-center",
      "min-h-screen"
    );
  });

  it("renders with correct accessibility", () => {
    const { container } = render(<LoadingSpinner />);
    const progress = container.querySelector(".MuiCircularProgress-root");
    expect(progress).toHaveAttribute("role", "progressbar");
  });
});
