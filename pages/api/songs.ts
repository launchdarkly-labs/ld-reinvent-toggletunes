import type { NextApiRequest, NextApiResponse } from 'next'
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { songs } from '@/schema/schema'
import { songs as usersongs } from '@/lib/data'
import { getServerClient } from '../../utils/ld-server';

type Data = {
    id: number;
    title: string | null;
    image: string | null;
    artists: string | null;
    album: string | null;
    duration: string | null;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data[]>
) {

    const connectionString = process.env.DATABASE_URL

    const team = req.query.team;
    let sdkKey;

    switch (team) {
        case 'team1':
            sdkKey = process.env.LD_SDK_KEY_TEAM1;
            console.log(`Team: ${team}, SDK Key: ${sdkKey}`);
            break;
        case 'team2':
            sdkKey = process.env.LD_SDK_KEY_TEAM2;
            console.log(`Team: ${team}, SDK Key: ${sdkKey}`);
            break;
        case 'team3':
            sdkKey = process.env.LD_SDK_KEY_TEAM3;
            console.log(`Team: ${team}, SDK Key: ${sdkKey}`);
            break;
        case 'team4':
            sdkKey = process.env.LD_SDK_KEY_TEAM4;
            console.log(`Team: ${team}, SDK Key: ${sdkKey}`);
            break;
        case 'team5':
            sdkKey = process.env.LD_SDK_KEY_TEAM5;
            console.log(`Team: ${team}, SDK Key: ${sdkKey}`);
            break;
        default:
            sdkKey = process.env.LD_SDK_KEY;
            console.log(`Team: ${team}, SDK Key: ${sdkKey}`);
    }

    const ldClient = await getServerClient(sdkKey || "");
    let newToggleDB;
    let jsonObject;
    
    jsonObject = {
        key: "1",
        name: "anonymous",
        appName: "ToggleTunes",
        tier: "Platinum"
    }

    newToggleDB = await ldClient.variation("newToggleDB", jsonObject, 'off');

    let songList;
    if (newToggleDB == 'complete') {
        console.log(newToggleDB + "for team" + team)
        console.log("sdk key is " + sdkKey)
        if (!connectionString) {
            throw new Error('DATABASE_URL is not set')
        }

        const pool = new Pool({
            connectionString: connectionString,
        });
        
        const db = drizzle(pool);
        console.log(newToggleDB)
        songList = await db.select().from(songs)
    } else {
        songList = usersongs;
        console.log(songList)
    }

    res.status(200).json(songList)
}
