// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { playlists } from "@/schema/schema";
import { playlists as userplaylists } from "@/lib/data";
import { init, LDClient, LDOptions } from "launchdarkly-node-server-sdk";

type Data = {
  id: number;
  title: string | null;
  cover: string | null;
  artists: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  let ldClient: LDClient;
  let sdkKey;

  const getServerClient = async (sdkKey: string, options?: LDOptions) => {
    if (!ldClient) {
      ldClient = await init(sdkKey, options);
    }
    await ldClient.waitForInitialization();
    return ldClient;
  };

  const connectionString = process.env.DATABASE_URL;
  const team = req.query.team as string;
  if (team === "") {
    sdkKey = process.env.LD_SDK_KEY;
  } else {
    sdkKey = process.env[`LD_SDK_KEY_${team!.toUpperCase()}`];
  }

  ldClient = await getServerClient(sdkKey || "");
  let newToggleDB;
  let jsonObject;

  jsonObject = {
    key: "1",
    name: "anonymous",
    appName: "ToggleTunes",
    tier: "Platinum",
  };

  newToggleDB = await ldClient.variation("newToggleDB", jsonObject, "off");

  let lists;
  if (newToggleDB === "complete") {
    if (!connectionString) {
      throw new Error("DATABASE_URL is not set");
    }

    const pool = await new Pool({
      connectionString: connectionString,
    });

    const db = await drizzle(pool);
    lists = await db
      .select()
      .from(playlists)
      .finally(() => pool.end());
  } else {
    lists = userplaylists;
  }

  ldClient.close();
  res.status(200).json(lists);
}
