import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";

let Team2;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT2 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM2 || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey,
        name: "Team2",
        appName: "ToggleTunes",
        tier: "Platinum"
      },
      device: {
        key: uniqueKey,
        operating_system: "MacOS",
        mobile_device: "False",
      },
    },
  });

  Team2 = () => {
    const [teamName, setTeamName] = useState("red");
    const [isConfigured, setIsConfigured] = useState(false);


    async function configUser() {
      await setCookie("team", "Team2");
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT2>
        {isConfigured && (
        <Room>
          <MusicApp teamName={teamName} />
        </Room>
        )}
      </LDProviderT2>
    );
  };
} else {
  Team2 = () => null;
}

export default Team2;
