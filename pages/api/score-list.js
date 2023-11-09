import Redis from "ioredis";

const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

export default async function handler(req, res) {
  if (req.method === "GET") {
    const greenScoreUpdate = await redis.zrevrange(
      "green",
      0,
      100,
      "WITHSCORES"
    );
    const redScoreUpdate = await redis.zrevrange("red", 0, 100, "WITHSCORES");
    const blueScoreUpdate = await redis.zrevrange("blue", 0, 100, "WITHSCORES");
    const purpleScoreUpdate = await redis.zrevrange(
      "purple",
      0,
      100,
      "WITHSCORES"
    );

    const scores = [];

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
