import { AppProps } from "next/app";
import "../styles/globals.css";
import { PageWrapper } from "../components/PageWrapper";
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PageWrapper>
      <Component {...pageProps} />
    </PageWrapper>
  );
}

export default MyApp;
