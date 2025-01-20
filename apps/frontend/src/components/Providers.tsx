import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { IntlProvider } from "react-intl";
import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface ProvidersProps {
  children: ReactNode;
  messages: any;
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

export const Providers = ({
  children,
  messages,
  locale,
  theme,
}: ProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider messages={messages} locale={locale}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ThemeProvider>
      </IntlProvider>
    </QueryClientProvider>
  );
};
