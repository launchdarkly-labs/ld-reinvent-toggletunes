import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";
import { PERSONA_TIER_STANARD, PERSONA_ROLE_USER, PURPLE } from "@/lib/constant";
import { LoginProvider } from "@/lib/LoginContext";
import { TEAM3 } from "@/lib/constant";


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
        name: TEAM3,
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

  Team3 = () => {
    const [teamName, setTeamName] = useState("purple");
    const [isConfigured, setIsConfigured] = useState(false);

    async function configUser() {
      await setCookie("team", TEAM3);
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT3>
        {isConfigured && (
          <Room>
            <LoginProvider>
              <MusicApp teamColor={PURPLE} teamName={TEAM3} />
            </LoginProvider>
          </Room>
        )}
      </LDProviderT3>
    );
  };
} else {
  Team3 = () => null;
}

export default Team3;
