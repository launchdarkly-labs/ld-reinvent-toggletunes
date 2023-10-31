//@ts-nocheck

let eventData = 0;
let teamName;

export default function handler(req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const sendSSEEvent = (data, teamName) => {
    res.write(`data: ${JSON.stringify(data)}\n\n`);
    res.write(`teamName: ${JSON.stringify(teamName)}\n\n`)
  };
  
  let intervalId;

  if (req.method === "GET") {
    
    intervalId = setInterval(() => {
    const data = {score: eventData, teamname: teamName}
    sendSSEEvent(data); // Send initial eventData
    console.log(data)
  }, 60000); 
}
  
  if (req.method === "POST") {
      let body = req.body;
      if ((body.event === 'first step complete')) {
      eventData = 20;
      teamName = body.teamname;
      console.log(body.teamname)
      res.end()
       }
      if ((body.event === "second step complete")) {
        eventData = 40;
        teamName = body.teamname;
        res.end();
      }
      if ((body.event === "third step complete")) {
        eventData = 60;
        teamName = body.teamname;
        console.log(eventData);
        res.end();
      }
      if ((body.event === "fourth step complete")) {
        eventData = 80;
        teamName = body.teamname;
        res.end();
      }
      if ((body.event === "fifth step complete")) {
        eventData = 100;
        teamName = body.teamname;
        res.end();
      }
      if (body === 'Reset') {
        eventData = 0
      }
      console.log('API Reached')
      res.status(200).send();
  }
  
}
