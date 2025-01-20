import { CssBaseline } from "@mui/material";

import { ThemeProvider } from "@emotion/react";

import { IntlProvider } from "react-intl";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
  messages: any;
  locale: string;
  theme: any;
}

export const Providers = ({
  children,
  messages,
  locale,
  theme,
}: ProvidersProps) => {
  return (
    <IntlProvider messages={messages} locale={locale}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </IntlProvider>
  );
};
