import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";
import { PERSONA_TIER_STANARD, PERSONA_ROLE_USER } from "@/lib/constant";
import { LoginProvider } from "@/lib/LoginContext";
import { TEAM4, BLUE } from "@/lib/constant";
let Team4;

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
        name: TEAM4,
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

  Team4 = () => {
    const [teamName, setTeamName] = useState(BLUE);
    const [isConfigured, setIsConfigured] = useState(false);

    async function configUser() {
      await setCookie("team", TEAM4);
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT4>
        {isConfigured && (
          <Room>
            <LoginProvider>
              <MusicApp teamName={teamName} />
            </LoginProvider>
          </Room>
        )}
      </LDProviderT4>
    );
  };
} else {
  Team4 = () => null;
}

export default Team4;
