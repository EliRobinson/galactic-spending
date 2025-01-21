import { render, screen } from "@testing-library/react";
import { Providers } from "../Providers";
import { useIntl } from "react-intl";
import { useQueryClient } from "@tanstack/react-query";

// Test component that uses the IntlProvider context
const LocaleComponent = () => {
  const intl = useIntl();
  return <div data-testid="locale-display">{intl.locale}</div>;
};

// Test component that uses the QueryClient context
const QueryComponent = () => {
  const queryClient = useQueryClient();
  return (
    <div data-testid="query-client">{queryClient ? "present" : "missing"}</div>
  );
};

describe("Providers", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Providers messages={{}} locale="en">
        <div>Test Child</div>
      </Providers>
    );

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("provides IntlProvider with correct props", () => {
    const mockMessages = { "test.key": "Test Message" };
    render(
      <Providers messages={mockMessages} locale="fr">
        <LocaleComponent />
      </Providers>
    );

    // Verify the locale is correctly provided through context
    expect(screen.getByTestId("locale-display")).toHaveTextContent("fr");
  });

  it("provides QueryClientProvider", () => {
    render(
      <Providers messages={{}} locale="en">
        <QueryComponent />
      </Providers>
    );

    expect(screen.getByTestId("query-client")).toHaveTextContent("present");
  });
});
