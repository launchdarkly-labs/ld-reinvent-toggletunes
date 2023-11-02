//@ts-nocheck
import Redis from 'ioredis'
let eventDataGreen = 0;
let eventDataRed = 0;
let eventDataPurple = 0;
let eventDataBlue = 0;
let greenStepsArray = []; 
let redStepsArray = [];
let purpleStepsArray = [];
let blueStepsArray = [];
const redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL)

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    const { event } = req.body;

    switch (event) {
      case "first step complete":
        updateEventData();
        console.log('first step completed')
        break;
      case "second step complete":
        updateEventData();
        break;
      case "third step complete":
        updateEventData();
        break;
      case "fourth step complete":
        updateEventData();
        break;
      case "fifth step complete":
        updateEventData();
        break;
      case "Reset":
        updateEventData(0);
        break;
    }

    async function updateEventData() {
      const { team } = req.body;
      let array = team.stepCompleted;
      console.log(team.name);
      switch (team.name) {
        case "green":
          if (!greenStepsArray.includes(array)) {
            greenStepsArray = greenStepsArray.concat(array);
            eventDataGreen = greenStepsArray.length * 20;
            await redis.zadd('green', eventDataGreen, team.name )
            break;
          }
          break;
        case "red":
          if (!redStepsArray.includes(array)) {
            redStepsArray = redStepsArray.concat(array);
            eventDataRed = redStepsArray.length * 20;
            await redis.zadd('red', eventDataRed, team.name )
            break;
          }
          break;
        case "purple":
          if (!purpleStepsArray.includes(array)) {
            purpleStepsArray = purpleStepsArray.concat(array);
            eventDataPurple = purpleStepsArray.length * 20;
            await redis.zadd('purple', eventDataPurple, team.name )
            break;
          }
          break;
        case "blue":
          if (!blueStepsArray.includes(array)) {
            blueStepsArray = blueStepsArray.concat(array);
            eventDataBlue = blueStepsArray.length * 20;
            await redis.zadd('blue', eventDataBlue, team.name )
            break;
          }
          break;
      }
    }
    res.status(200).send();
  }
}