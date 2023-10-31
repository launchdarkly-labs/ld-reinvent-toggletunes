import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

let c;

if (typeof window !== "undefined") {
  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>
        <Component {...pageProps} />
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;