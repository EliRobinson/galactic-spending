import { ReactNode } from "react";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  return (
    <QueryClientProvider client={queryClient}>
        <IntlProvider messages={messages} locale={locale}>
          {children}
        </IntlProvider>
    </QueryClientProvider>
  );
};
