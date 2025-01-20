import { render } from "@testing-library/react";
import { Providers } from "../Providers";
import { createTheme } from "@mui/material";

describe("Providers", () => {
  const mockTheme = createTheme();
  const mockMessages = { "test.key": "Test Message" };

  it("renders children correctly", () => {
    const { getByText } = render(
      <Providers messages={mockMessages} locale="en" theme={mockTheme}>
        <div>Test Child</div>
      </Providers>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("provides IntlProvider with correct props", () => {
    const { container } = render(
      <Providers messages={mockMessages} locale="fr" theme={mockTheme}>
        <div>Test Child</div>
      </Providers>
    );

    // Verify the IntlProvider is rendered with correct locale
    expect(container.firstChild).toHaveAttribute("lang", "fr");
  });
});
