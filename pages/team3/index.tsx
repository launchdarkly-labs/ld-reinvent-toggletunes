
import React, {useState} from 'react';
import MusicApp from '@/components/musicapp';
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';


let Team3;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT3 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM3 || "",
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


  Team3 = () => {
    const [teamName, setTeamName] = useState("Purple Team");
    return (
        <LDProviderT3>
          <MusicApp teamName={teamName}/>
        </LDProviderT3>
    );
  };
} else {
  Team3 = () => null;
}

export default Team3;