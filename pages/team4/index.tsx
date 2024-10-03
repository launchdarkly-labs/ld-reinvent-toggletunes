import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";
import { PERSONA_TIER_STANARD, PERSONA_ROLE_USER } from "@/lib/constant";
let TEAM4;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT4 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM4 || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey,
        name: "Team4",
        appName: "ToggleTunes",
        tier: PERSONA_TIER_STANARD,
        role: PERSONA_ROLE_USER,
      },
      device: {
        key: uniqueKey,
        operating_system: "MacOS",
        mobile_device: "False",
      },
    },
  });

  TEAM4 = () => {
    const [teamName, setTeamName] = useState("blue");
    const [isConfigured, setIsConfigured] = useState(false);

    async function configUser() {
      await setCookie("team", "Team4");
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT4>
        {isConfigured && (
          <Room>
            <MusicApp teamName={teamName} />
          </Room>
        )}
      </LDProviderT4>
    );
  };
} else {
  TEAM4 = () => null;
}

export default TEAM4;
