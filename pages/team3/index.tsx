import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";

let Team3;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT3 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM3 || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey,
        name: "Team3",
        appName: "ToggleTunes",
      },
      device: {
        key: uniqueKey,
        operating_system: "MacOS",
        mobile_device: "False",
      },
    },
  });

  Team3 = () => {
    const [teamName, setTeamName] = useState("purple");
    const [isConfigured, setIsConfigured] = useState(false);


    async function configUser() {
      await setCookie("team", "Team3");
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT3>
        {isConfigured && (
        <Room>
          <MusicApp teamName={teamName} />
        </Room>
        )}
      </LDProviderT3>
    );
  };
} else {
  Team3 = () => null;
}

export default Team3;
