//@ts-nocheck

let eventDataGreen = 0;
let eventDataRed = 0;
let eventDataPurple = 0;
let eventDataBlue = 0;
let greenStepsArray = []; 
let redStepsArray = [];
let purpleStepsArray = [];
let blueStepsArray = []

export default function handler(req, res) {

  if (req.method === "GET") {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");
      res.setHeader("Access-Control-Allow-Origin", "*");

    const sendEvent = (data) => {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    };

  const  intervalId = setInterval(() => {
          const scoreUpdate = [{
            green: { score: eventDataGreen },
            red: { score: eventDataRed },
            purple: { score: eventDataPurple },
            blue: { score: eventDataBlue },
          }];
          sendEvent(scoreUpdate);
    console.log(scoreUpdate)
  }, 5000); 
}
  
  if (req.method === "POST") {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "close");
    res.setHeader("Access-Control-Allow-Origin", "*");
    const { event } = req.body;

    switch (event) {
      case "first step complete":
        updateEventData();
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
    console.log("API Reached");
    res.status(200).send();
  }

function updateEventData() {
  const { team } = req.body;
  let array = team.stepCompleted
  console.log(team.name);
  switch (team.name) {
    case "green":
        if (!greenStepsArray.includes(array)) {
          greenStepsArray = greenStepsArray.concat(array);
          eventDataGreen = greenStepsArray.length * 20;
          break;
        }
      break;
    case "red":
      if (!redStepsArray.includes(array)) {
        redStepsArray = redStepsArray.concat(array);
        eventDataRed = redStepsArray.length * 20;
        break;
      }
      break;
    case "purple":
      if (!purpleStepsArray.includes(array)) {
        purpleStepsArray = purpleStepsArray.concat(array);
        eventDataPurple = purpleStepsArray.length * 20;
        break;
      }
      break;
    case "blue":
      if (!blueStepsArray.includes(array)) {
        blueStepsArray = blueStepsArray.concat(array);
        eventDataBlue = blueStepsArray.length * 20;
        break;
      }
      break;
  }
}
}