
import React, {useState} from 'react';
import MusicApp from '@/components/musicapp';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';


let TEAM4;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT4 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM4 || "",
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


  TEAM4 = () => {
    const [teamName, setTeamName] = useState("Purple Team");
    return (
      <LDProviderT4>
        <MusicApp teamName={teamName} />
      </LDProviderT4>
    );
  };
} else {
  TEAM4 = () => null;
}

export default TEAM4;