import { createClient } from "@supabase/supabase-js";
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
const SUPABASE_URL: string = process.env.NEXT_PUBLIC_DB_URL as string;
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_DB_ANON_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  for (const projectKey of projectKeys) {
    // get the flags then delete them
    const flags = await getFlags(projectKey);
    console.log(flags);
    for (const flag of flags.items) {
      await deleteFlag(projectKey, flag.key);
    }
    // get environments which we need for deleting segments
    const environments = await getEnvironments(projectKey);
    console.log("environments " + environments);
    // get the segments for each environment and delete them
    for (const environment of environments.items) {
      const segments = await getSegments(projectKey, environment.key);
      console.log("segments " + segments);
      for (const segment of segments.items) {
        await deleteSegment(projectKey, environment.key, segment.key);
      }
    }
  }
  await supabase
    .from("scoreboard")
    .update({
      red: 0,
      blue: 0,
      green: 0,
      purple: 0,
      isTimeRunning: false,
      resetTriggered: true,
    })
    .eq("id", 1);
  res.status(200).json({ message: "success" });
}

async function getEnvironments(projectKey: string) {
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/projects/${projectKey}/environments`,
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
    throw new Error(`Cannot get environments: ${data ?? "unknown"}`);
  }
  return data;
}

async function getFlags(projectKey: string) {
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}`,
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

async function deleteFlag(projectKey: string, flagKey: string) {
  console.log("Debug: Deleting Flag " + flagKey);
  if (!projectKeys.includes(projectKey)) {
    throw new Error("Cannot delete flags from an unspecified project");
  }

  console.log("Running the disable function for the flag " + flagKey);
  const disableResp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
    {
      method: "PATCH",
      headers: {
        Authorization: API_KEY,
        "Content-Type":
          "application/json; domain-model=launchdarkly.semanticpatch",
      },
      body: JSON.stringify({
        environmentKey: "test",
        instructions: [{ kind: "turnFlagOff" }],
      }),
    }
  );

  if (!disableResp.ok) {
    throw new Error(
      `Cannot disable flag ${flagKey}: ${disableResp.statusText}`
    );
  }

  console.log("Running the delete function for the flag " + flagKey);
  const deleteResp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
    {
      method: "DELETE",
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  let data;
  if (deleteResp.ok) {
    data = await deleteResp.text();
    if (data) {
      data = JSON.parse(data);
    }
  } else {
    throw new Error(`Cannot delete flag ${flagKey}: ${data ?? "unknown"}`);
  }
}

async function getSegments(projectKey: string, environmentKey: string) {
  console.log("Debug: Getting Segments");
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/segments/${projectKey}/${environmentKey}`,
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
    throw new Error(`Cannot get segments: ${data ?? "unknown"}`);
  }
  return data;
}

async function deleteSegment(
  projectKey: string,
  environmentKey: string,
  segmentKey: string
) {
  if (!projectKeys.includes(projectKey)) {
    throw new Error("Cannot delete segments from an unspecified project");
  }
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/segments/${projectKey}/${environmentKey}/${segmentKey}`,
    {
      method: "DELETE",
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
    throw new Error(
      `Cannot delete segment ${segmentKey}: ${data ?? "unknown"}`
    );
  }
}
