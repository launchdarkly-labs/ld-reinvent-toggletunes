import { Liveblocks } from "@liveblocks/node";
import type { NextApiRequest, NextApiResponse } from "next";

const API_KEY = process.env.LIVEBLOCKS_KEY;

const liveblocks = new Liveblocks({
  secret: API_KEY!,
});

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Get the current user from your database
  //   const user = __getUserFromDB__(request);
  // console.log(JSON.stringify(request.body))
  const team: any = request.cookies["team"];
  console.log("The team is: " + team);
  const session = liveblocks.prepareSession(team);

  // Implement your own security, and give the user access to the room

  function __shouldUserHaveAccess__(user: any, room: string) {
    if (
      team === "Root" ||
      team === "Team1" ||
      team === "Team2" ||
      team === "Team3" ||
      team === "Team4" ||
      team === "Scoreboard"
    ) {
      return true;
    }
  }

  const { room } = request.body;
  if (room && __shouldUserHaveAccess__(team, room)) {
    session.allow(room, session.FULL_ACCESS);
  }

  // Authorize the user and return the result
  const { status, body } = await session.authorize();
  response.status(status).send(body);
}
