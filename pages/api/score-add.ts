import Redis from "ioredis";
import type { NextApiRequest, NextApiResponse } from "next";
let greenStepsArray:string[] = [];
let redStepsArray:string[]  = [];
let purpleStepsArray:string[]  = [];
let blueStepsArray:string[]  = [];
const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL || "");

//I GUESS THIS IS NOT USED TOO
export default async function handler(req: NextApiRequest, res: NextApiResponse<any[]>) {
  if (req.method === "POST") {
    const { event } = req.body;

    switch (event) {
      case "first step complete":
        updateEventData(req.body.team.name, req.body.team.stepCompleted);
        console.log("first step completed");
        break;
      case "second step complete":
        updateEventData(req.body.team.name, req.body.team.stepCompleted);
        break;
      case "third step complete":
        updateEventData(req.body.team.name, req.body.team.stepCompleted);
        break;
      case "fourth step complete":
        updateEventData(req.body.team.name, req.body.team.stepCompleted);
        break;
      case "fifth step complete":
        updateEventData(req.body.team.name, req.body.team.stepCompleted);
        break;
      case "Reset":
        updateEventData("","");
        break;
    }
    // @ts-ignore
    res.status(200).send();
  }
}

async function updateEventData(team:string, stepCompleted:string) {
  switch (team) {
    case "green":
      if (!greenStepsArray.includes(stepCompleted)) {
        greenStepsArray.push(stepCompleted);
        const eventDataGreen = greenStepsArray.length * 20;
        await redis.zadd("green", eventDataGreen, team);
        break;
      }
      break;
    case "red":
      if (!redStepsArray.includes(stepCompleted)) {
        redStepsArray.push(stepCompleted);
        const eventDataRed = redStepsArray.length * 20;
        await redis.zadd("red", eventDataRed, team);
        break;
      }
      break;
    case "purple":
      if (!purpleStepsArray.includes(stepCompleted)) {
        purpleStepsArray.push(stepCompleted);
        const eventDataPurple = purpleStepsArray.length * 20;
        await redis.zadd("purple", eventDataPurple, team);
        break;
      }
      break;
    case "blue":
      if (!blueStepsArray.includes(stepCompleted)) {
        blueStepsArray.push(stepCompleted);
        const eventDataBlue = blueStepsArray.length * 20;
        await redis.zadd("blue", eventDataBlue, team);
        break;
      }
      break;
  }
}
