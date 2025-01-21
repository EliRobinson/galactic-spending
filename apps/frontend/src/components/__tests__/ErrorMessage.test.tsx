import { render, screen } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { ErrorMessage } from "../ErrorMessage";
import { messages } from "../../i18n/en-US";

describe("ErrorMessage", () => {
  const renderComponent = (messageId: string) => {
    return render(
      <IntlProvider messages={messages} locale="en">
        <ErrorMessage messageId={messageId} />
      </IntlProvider>
    );
  };

  it("displays the correct error message", () => {
    renderComponent("error.api");
    expect(screen.getByText(messages["error.api"])).toBeInTheDocument();
  });

  it("renders with error styling", () => {
    renderComponent("error.api");
    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("MuiAlert-standardError");
  });

  it("renders within a padded container", () => {
    const { container } = renderComponent("error.api");
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("p-4");
  });
});
