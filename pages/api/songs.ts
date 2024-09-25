import type { NextApiRequest, NextApiResponse } from "next";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { songs } from "@/schema/schema";
import { songs as usersongs } from "@/lib/data";
import { init, LDClient, LDOptions } from "launchdarkly-node-server-sdk";

type Data = {
  id: number;
  title: string | null;
  image: string | null;
  artists: string | null;
  album: string | null;
  duration: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  let ldClient: LDClient;

  const getServerClient = async (sdkKey: string, options?: LDOptions) => {
    if (!ldClient) {
      ldClient = await init(sdkKey, options);
    }
    await ldClient.waitForInitialization();
    return ldClient;
  };

  const connectionString = process.env.DATABASE_URL;

  const team = req.query.team as string;
  let sdkKey;

  if (team === "") {
    sdkKey = process.env.LD_SDK_KEY;
  } else {
    sdkKey = process.env[`LD_SDK_KEY_${team!.toUpperCase()}`];
  }
  // console.log(`Team: ${team}, SDK Key: ${sdkKey}`);

  ldClient = await getServerClient(sdkKey || "");
  let migrateNewSongDBLDFlag;
  let jsonObject;

  // console.log(jsonObject)

  jsonObject = {
    key: "1",
    name: "anonymous",
    appName: "ToggleTunes",
    tier: "Platinum",
  };

  // migrateNewSongDBLDFlag = await ldClient.variation("migrate-new-song-db", jsonObject, "off");
  migrateNewSongDBLDFlag = "complete";

  let songList;
  if (migrateNewSongDBLDFlag === "complete") {
    await console.log(migrateNewSongDBLDFlag + "for team" + team);
    // console.log("sdk key is " + sdkKey)
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }

    const pool = await new Pool({
      connectionString: connectionString,
    });

    const db = await drizzle(pool);
    // console.log(migrateNewSongDBLDFlag)
    songList = await db
      .select()
      .from(songs)
      .finally(() => pool.end());
  } else {
    songList = usersongs;
    // console.log(songList)
  }
  ldClient.close();
  res.status(200).json(songList);
}
