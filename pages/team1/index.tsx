
import React, {useState} from 'react';
import MusicApp from '@/components/musicapp';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';


let Team1;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT1 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM1 || "",
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


  Team1 = () => {
    const [teamName, setTeamName] = useState("green")
    return (
        <LDProviderT1>
          <MusicApp teamName={teamName}/>
        </LDProviderT1>
    );
  };
} else {
  Team1 = () => null;
}

export default Team1;