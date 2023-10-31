
import React from 'react';
import MusicApp from '@/components/musicapp';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

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


  c = () => {
    return (
        <LDProvider>
          <MusicApp />
        </LDProvider>
    );
  };
} else {
  c = () => null;
}

export default c;