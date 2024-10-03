import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";
import { TimerProvider } from "@/lib/TimerContext";
import { AIGeneratedPlaylistProvider } from "@/lib/AIGeneratedPlaylistContext";
// import { LoginProvider } from "@/lib/LoginContext";

let c;

if (typeof window !== "undefined") {
  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>

          <TimerProvider>
            <AIGeneratedPlaylistProvider>
              <Component {...pageProps} />
            </AIGeneratedPlaylistProvider>
          </TimerProvider>
       
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;
