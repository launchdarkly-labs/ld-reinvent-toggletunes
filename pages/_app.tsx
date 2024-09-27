import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";
import { TimerProvider } from "@/lib/TimerContext";

let c;

if (typeof window !== "undefined") {
  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>
        <TimerProvider>
          <Component {...pageProps} />
        </TimerProvider>
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;
