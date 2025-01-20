import { render, fireEvent, screen } from "@testing-library/react";
import { PageWrapper } from "../PageWrapper";
import { messages as enMessages } from "../../i18n/en-US";

jest.mock("../../i18n/en-US", () => ({
  messages: {
    "app.title": "Application Title",
  },
}));

describe("PageWrapper", () => {
  it("renders children correctly", () => {
    render(
      <PageWrapper>
        <div>Test Child Content</div>
      </PageWrapper>
    );

    expect(screen.getByText("Test Child Content")).toBeInTheDocument();
    expect(screen.getByText("Application Title")).toBeInTheDocument();
  });

  it("toggles theme when clicking theme button", () => {
    render(
      <PageWrapper>
        <div>Content</div>
      </PageWrapper>
    );

    const themeButton = screen.getByRole("button");

    // Initially should show dark mode icon (Brightness4Icon)
    expect(screen.getByTestId("Brightness4Icon")).toBeInTheDocument();

    // Click to toggle theme
    fireEvent.click(themeButton);

    // Should now show light mode icon (Brightness7Icon)
    expect(screen.getByTestId("Brightness7Icon")).toBeInTheDocument();
  });
});
