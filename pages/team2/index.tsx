import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";
import { PERSONA_TIER_STANARD, PERSONA_ROLE_USER } from "@/lib/constant";
import { LoginProvider } from "@/lib/LoginContext";
import { TEAM2 } from "@/lib/constant";

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
        name: TEAM2,
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

  Team2 = (): JSX.Element  => {
    const [isConfigured, setIsConfigured] = useState(false);

    async function configUser() {
      await setCookie("team", TEAM2);
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT2>
        {isConfigured && (
          <Room>
            <LoginProvider>
              <MusicApp teamName={"red"} />
            </LoginProvider>
          </Room>
        )}
      </LDProviderT2>
    );
  };
} else {
  Team2 = () => null;
}

export default Team2;
