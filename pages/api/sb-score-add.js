import { createClient } from "@supabase/supabase-js";

let eventDataGreen = 0;
let eventDataRed = 0;
let eventDataPurple = 0;
let eventDataBlue = 0;
let greenStepsArray = [];
let redStepsArray = [];
let purpleStepsArray = [];
let blueStepsArray = [];
const supabase = createClient(process.env.NEXT_PUBLIC_DB_URL, process.env.NEXT_PUBLIC_DB_ANON_KEY);

export default async function databaseConnection(req, res) {

  if (req.method === "POST") {
    const { event } = req.body;

    console.log(event)

    switch (event) {
      case "first step complete":
        updateEventData(req.body.team.name, req.body.team.stepCompleted);
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
        let eventDataGreen = 0;
        let eventDataRed = 0;
        let eventDataPurple = 0;
        let eventDataBlue = 0;
        let greenStepsArray = [];
        let redStepsArray = [];
        let purpleStepsArray = [];
        let blueStepsArray = [];
        console.log(greenStepsArray);
        res.status(200).json('values reset')
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
        const { data, error } = await supabase
          .from("scoreboard")
          .update({green: eventDataGreen })
          .eq("id", 1);
        console.log(eventDataGreen);

        break;
      }
      break;
    case "red":
      if (!redStepsArray.includes(stepCompleted)) {
        redStepsArray.push(stepCompleted);
        eventDataRed = redStepsArray.length * 20;
        const { error } = await supabase
          .from("scoreboard")
          .update({ red: eventDataRed })
          .eq("id", 1);
        console.log("score sent");
        break;
      }
      break;
    case "purple":
      if (!purpleStepsArray.includes(stepCompleted)) {
        purpleStepsArray.push(stepCompleted);
        eventDataPurple = purpleStepsArray.length * 20;
        const { error } = await supabase
          .from("scoreboard")
          .update({ purple: eventDataPurple })
          .eq("id", 1);
        break;
      }
      break;
    case "blue":
      if (!blueStepsArray.includes(stepCompleted)) {
        blueStepsArray.push(stepCompleted);
        eventDataBlue = blueStepsArray.length * 20;
        const { error } = await supabase
          .from("scoreboard")
          .update({ blue: eventDataBlue })
          .eq("id", 1);
        break;
      }
      break;
  }
}
