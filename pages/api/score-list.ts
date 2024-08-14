import Redis from "ioredis";
import type { NextApiRequest, NextApiResponse } from "next";

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL || "");

interface ScoresInterface {
  name: string;
  score: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScoresInterface[]>) {
  if (req.method === "GET") {
    const greenScoreUpdate = await redis.zrevrange("green", 0, 100, "WITHSCORES");
    const redScoreUpdate = await redis.zrevrange("red", 0, 100, "WITHSCORES");
    const blueScoreUpdate = await redis.zrevrange("blue", 0, 100, "WITHSCORES");
    const purpleScoreUpdate = await redis.zrevrange("purple", 0, 100, "WITHSCORES");

    const scores: ScoresInterface[] = [];

    scores.push(
      {
        name: "green",
        score: greenScoreUpdate,
      },
      {
        name: "red",
        score: redScoreUpdate,
      },
      {
        name: "purple",
        score: purpleScoreUpdate,
      },
      {
        name: "blue",
        score: blueScoreUpdate,
      }
    );
    res.status(200).json(scores);
  }
}
