import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";

import { AIGeneratedPlaylistProvider } from "@/lib/AIGeneratedPlaylistContext";

let c;

if (typeof window !== "undefined") {
  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>
        <AIGeneratedPlaylistProvider>
          <Component {...pageProps} />
        </AIGeneratedPlaylistProvider>
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;
