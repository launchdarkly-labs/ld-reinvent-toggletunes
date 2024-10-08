import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
import { setCookie } from "cookies-next";
import { PERSONA_TIER_STANARD, PERSONA_ROLE_USER } from "@/lib/constant";
import { LoginProvider } from "@/lib/LoginContext";
import { AIGeneratedPlaylistProvider } from "@/lib/AIGeneratedPlaylistContext";
let c;

if (typeof window !== "undefined") {
  const uniqueKey = 1;

  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY || "",
    reactOptions: {
      useCamelCaseFlagKeys: false,
    },
    context: {
      kind: "multi",
      user: {
        key: uniqueKey,
        name: "anonymous",
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

  c = () => {
    const [isConfigured, setIsConfigured] = useState(false);

    async function configUser() {
      await setCookie("team", "Root");
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);
    return (
      <LDProvider>
        {isConfigured && (
          <Room>
            <LoginProvider>
              <MusicApp />
            </LoginProvider>
          </Room>
        )}
      </LDProvider>
    );
  };
} else {
  c = () => null;
}

export default c;
