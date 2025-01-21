import { AppProps } from "next/app";
import "../styles/globals.css";
import { PageWrapper } from "../components/PageWrapper";
import { ThemeProvider } from "../theme/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <PageWrapper>
        <Component {...pageProps} />
      </PageWrapper>
    </ThemeProvider>
  );
}

export default MyApp;
