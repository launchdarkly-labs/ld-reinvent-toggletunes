import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";
import ToggleTunes from "@/components/Toogle-Tunes";
import { useState } from "react";

 let TeamOne;

 if (typeof window !== "undefined") {
   const uniqueKey = 1;
   const LDProvider = await asyncWithLDProvider({
     clientSideID: process.env.NEXT_PUBLIC_LD_CLIENT_KEY_2 || "",
     reactOptions: {
       useCamelCaseFlagKeys: false,
     },
     context: {
       kind: "multi",
       user: {
         key: uniqueKey,
         name: "anonymous",
         appName: "ToggleTunes",
       },
       device: {
         key: uniqueKey,
         operating_system: "MacOS",
         mobile_device: "False",
       },
       team: {
         key: uniqueKey,
         teamName: "",
         teamSlot: "",
       },
     },
   });

    TeamOne = () => {
      const [teamName, setTeamName] = useState("Green Team");
      console.log(teamName)
     return (
         <LDProvider>
           <ToggleTunes teamName={teamName} />
         </LDProvider>
     );
   }
 } else {
   TeamOne = () => null;
 }

      export default TeamOne