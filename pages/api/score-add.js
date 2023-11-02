//@ts-nocheck
import Redis from "ioredis";
let eventDataGreen = 0;
let eventDataRed = 0;
let eventDataPurple = 0;
let eventDataBlue = 0;
let greenStepsArray = [];
let redStepsArray = [];
let purpleStepsArray = [];
let blueStepsArray = [];
const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

export default async function handler(req, res) {
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
        updateEventData(0);
        break;
    }
    res.status(200).send();
  }
}

async function updateEventData(team, stepCompleted) {
  switch (team) {
    case "green":
      if (!greenStepsArray.includes(stepCompleted)) {
        greenStepsArray.push(stepCompleted);
        eventDataGreen = greenStepsArray.length * 20;
        await redis.zadd("green", eventDataGreen, team);
        break;
      }
      break;
    case "red":
      if (!redStepsArray.includes(stepCompleted)) {
        redStepsArray.push(stepCompleted);
        eventDataRed = redStepsArray.length * 20;
        await redis.zadd("red", eventDataRed, team);
        break;
      }
      break;
    case "purple":
      if (!purpleStepsArray.includes(stepCompleted)) {
        purpleStepsArray.push(stepCompleted);
        eventDataPurple = purpleStepsArray.length * 20;
        await redis.zadd("purple", eventDataPurple, team);
        break;
      }
      break;
    case "blue":
      if (!blueStepsArray.includes(stepCompleted)) {
        blueStepsArray.push(stepCompleted);
        eventDataBlue = blueStepsArray.length * 20;
        await redis.zadd("blue", eventDataBlue, team);
        break;
      }
      break;
  }
}
