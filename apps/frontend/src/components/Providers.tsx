import { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useTheme } from "../theme/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface ProvidersProps {
  children: ReactNode;
  messages: Record<string, string>;
  locale: string;
  theme: any;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const Providers = ({ children, messages, locale }: ProvidersProps) => {
  const { theme } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <MuiThemeProvider theme={theme}>
        <IntlProvider messages={messages} locale={locale}>
          {children}
        </IntlProvider>
      </MuiThemeProvider>
    </QueryClientProvider>
  );
};
