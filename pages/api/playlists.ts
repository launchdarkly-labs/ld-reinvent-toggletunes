// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { playlists } from '@/schema/schema'
import { playlists as userplaylists } from '@/lib/data'
import { getServerClient } from '../../utils/ld-server';


type Data = {
  id: number;
  title: string | null;
  cover: string | null;
  // color: string | null;
  artists: string | null;
}


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[]>
) {
  const ldClient = await getServerClient(process.env.LD_SDK_KEY || "");
  const connectionString = process.env.DATABASE_URL

  let newToggleDB;
  let jsonObject;

  jsonObject = {
    key: "1",
    name: "anonymous",
    appName: "ToggleTunes",
    tier: "Platinum"
  }

  newToggleDB = await ldClient.variation("newToggleDB", jsonObject, 'off');
  
  
  
  let lists;
  if (newToggleDB == 'complete') {
    if (!connectionString) {
      throw new Error('DATABASE_URL is not set')
    }

    const pool = new Pool({
      connectionString: connectionString,
    });
    
    const db = drizzle(pool);
    console.log(newToggleDB)
    lists = await db.select().from(playlists).finally(() => pool.end())
    console.log("pool maybe ended")
  } else {
    lists = userplaylists;
    console.log(lists)
  }

  res.status(200).json(lists)
}
