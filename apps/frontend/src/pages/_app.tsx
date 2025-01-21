import { AppProps } from "next/app";
import "../styles/globals.css";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "../theme/ThemeContext";
import { LanguageProvider } from "../i18n/LanguageContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default MyApp;
