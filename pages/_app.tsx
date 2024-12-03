import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";
import { Room } from "@/components/room";
import { AIGeneratedPlaylistProvider } from "@/lib/AIGeneratedPlaylistContext";

let c; 

if (typeof window !== "undefined") {
  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>
        <AIGeneratedPlaylistProvider>
          <Room>
            <Component {...pageProps} />
          </Room>
        </AIGeneratedPlaylistProvider>
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;
