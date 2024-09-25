import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


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
