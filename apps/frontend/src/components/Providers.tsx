import { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { ThemeProvider, useTheme, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CssBaseline from "@mui/material/CssBaseline";
import { useMediaQuery } from "@mui/material";
import { useMemo } from "react";

interface ProvidersProps {
  children: ReactNode;
  messages: Record<string, string>;
  locale: string;
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
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
          background: {
            default: prefersDarkMode ? "#121212" : "#ffffff",
            paper: prefersDarkMode ? "#1e1e1e" : "#ffffff",
          },
          text: {
            primary: prefersDarkMode ? "#ffffff" : "#000000",
            secondary: prefersDarkMode ? "#b0b0b0" : "#666666",
          },
        },
      }),
    [prefersDarkMode]
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IntlProvider messages={messages} locale={locale}>
          {children}
        </IntlProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
