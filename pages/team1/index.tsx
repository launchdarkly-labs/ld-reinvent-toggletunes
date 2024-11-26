import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";
import { PERSONA_TIER_STANARD, PERSONA_ROLE_USER } from "@/lib/constant";
import { LoginProvider } from "@/lib/LoginContext";
import { GREEN,TEAM1 } from "@/lib/constant";


let Team1: () => JSX.Element | null;

//TODO: make reuseable page
if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProviderT1 = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_TEAM1 || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey,
        name: TEAM1,
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

  Team1 = (): JSX.Element => {
    const [isConfigured, setIsConfigured] = useState(false);

   async function configUser() {
      await setCookie("team", TEAM1);
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT1>
        {isConfigured && (
          <Room>
            <LoginProvider>
              <MusicApp teamColor={GREEN} teamName={TEAM1} />
            </LoginProvider>
          </Room>
        )}
      </LDProviderT1>
    );
  };
} else {
  Team1 = () => null;
}

export default Team1;
