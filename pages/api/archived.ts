import type { NextApiRequest, NextApiResponse } from "next";

// we need to list the project keys for each of the projects that we want to clean up
// this prevents us from accidentally deleting flags from the wrong project
// since the API key has access to all projects
const projectKeys: Array<string> = [
  "toggle-tunes-team-1",
  "toggle-tunes-team-2",
  "toggle-tunes-team-3",
  "toggle-tunes-team-4",
];
const API_KEY: string = process.env.LD_API_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log("Checking for archived flags");
  let message = "No archived flags found";
  let flagsFound = [];
  try {
    for (const projectKey of projectKeys) {
      // get the flags then delete them
      const flags = await getArchivedFlags(projectKey);
      if (flags.items.length > 0) {
        flagsFound.push(projectKey);
      }
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
  if (flagsFound.length > 0) {
    message = `Archived flags found in ${flagsFound.join(", ")}`;
  }
  return res.status(200).json({ success: true, message: message });
}

async function getArchivedFlags(projectKey: string) {
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}?archived=true`,
    {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  let data;
  if (resp.ok) {
    data = await resp.text();
    if (data) {
      data = JSON.parse(data);
    }
  } else {
    throw new Error(`Cannot get flags: ${data ?? "unknown"}`);
  }
  return data;
}
