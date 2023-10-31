
import React, {useState} from 'react';
import MusicApp from '@/components/musicapp';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';


let Team2;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT2 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM2 || "",
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


  Team2 = () => {
    const [teamName, setTeamName] = useState("Red Team");
    return (
      <LDProviderT2>
        <MusicApp teamName={teamName} />
      </LDProviderT2>
    );
  };
} else {
  Team2 = () => null;
}

export default Team2;