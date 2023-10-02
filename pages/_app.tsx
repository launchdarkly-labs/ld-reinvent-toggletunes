import KeyboardNavigation from "@/components/KeyboardNavigation";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NoSSRWrapper from "@/components/nossr";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

let c;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
    reactOptions: {
      useCamelCaseFlagKeys: false
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey, 
        name: "anonymous",
        appName: "ToggleTunes"
      },
      device: {
        key: uniqueKey,
        operating_system: "MacOS",
        mobile_device: "False",
      },
    },
  });


  c = ({ Component, pageProps }: AppProps) => {
    return (
      <NoSSRWrapper>
        <LDProvider>
          <Component {...pageProps} />
        </LDProvider>
      </NoSSRWrapper>
    );
  };
} else {
  c = () => null;
}

export default c;

