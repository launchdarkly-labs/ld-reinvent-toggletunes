import React, { useEffect, useState } from "react";
import MusicApp from "@/components/musicapp";
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import { Room } from "@/components/room";
// import { setCookie } from "cookies-next";

let Team1: () => JSX.Element | null;

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
        name: "Team1",
        appName: "ToggleTunes",
        tier: "Platinum",
      },
      device: {
        key: uniqueKey,
        operating_system: "MacOS",
        mobile_device: "False",
      },
    },
  });

  Team1 = (): JSX.Element => {
    // const [teamName, setTeamName] = useState("green");
    const [isConfigured, setIsConfigured] = useState(false);

    async function configUser() {
      // await setCookie("team", "Team1");
      setIsConfigured(true);
    }

    useEffect(() => {
      configUser();
    }, []);

    return (
      <LDProviderT1>
        {isConfigured && (
          <Room>
            <MusicApp teamName={"green"} />
          </Room>
        )}
      </LDProviderT1>
    );
  };
} else {
  Team1 = () => null;
}

export default Team1;
