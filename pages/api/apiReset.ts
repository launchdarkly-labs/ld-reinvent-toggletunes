import type { NextApiRequest, NextApiResponse } from "next";

// we need to list the project keys for each of the projects that we want to clean up
// this prevents us from accidentally deleting flags from the wrong project
// since the API key has access to all projects
//"toggle-tunes-team-1"
const projectKeys: Array<string> = ["team-1", "team-2", "team-3", "team-4"];
const API_KEY: string = process.env.LD_API_KEY as string;
const delay = 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  console.log("Reset starting");
  try {
    for (const projectKey of projectKeys) {
      // get the flags then delete them
      const flags = await getFlags(projectKey);
      console.log("flags", flags);
      for (const flag of flags.items) {
        console.log("flag", flag);
        await deleteFlag(projectKey, flag.key);
        await sleep(delay);
      }
      // get environments which we need for deleting segments
      // const environments = await getEnvironments(projectKey);
      // // get the segments for each environment and delete them
      // for (const environment of environments.items) {
      //   const segments = await getSegments(projectKey, environment.key);
      //   for (const segment of segments.items) {
      //     await deleteSegment(projectKey, environment.key, segment.key);
      //     await sleep(delay);
      //   }
      // }
    }
  } catch (e: any) {
    return res.status(500).json({ error: e.message });
  }
  console.log("Reset complete");
  return res.status(200).json({ success: true });
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

//09-23-2024 this works now
async function getFlags(projectKey: string) {
  //TODO: NEED TO CHANGE THIS TO SEPARATE PROJECTS
  //   `https://app.launchdarkly.com/api/v2/flags/${projectKey}`,
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/toggletunes?env=${projectKey}&selected-env=${projectKey}`,
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
  //    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
  //`https://app.launchdarkly.com/api/v2/flags/toggletunes/${flagKey}/targeting?env=${projectKey}`,
  const disableResp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/toggletunes/${flagKey}`,
    {
      method: "PATCH",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json; domain-model=launchdarkly.semanticpatch",
      },
      body: JSON.stringify({
        environmentKey: projectKey,
        instructions: [{ kind: "turnFlagOff" }],
      }),
    }
  );
  console.log("disableResp", disableResp);
  if (!disableResp.ok) {
    throw new Error(`Cannot disable flag ${flagKey}: ${disableResp.statusText}`);
  }

  console.log("Running the delete function for the flag " + flagKey);
  // `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
  // const deleteResp = await fetch(
  //   `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
  //   {
  //     method: "DELETE",
  //     headers: {
  //       Authorization: API_KEY,
  //     },
  // body: JSON.stringify({
  //   environmentKey: projectKey,
  // }),
  //   }
  // );
  // console.log("deleteResp", deleteResp);
  // let data;
  // if (deleteResp.ok) {
  //   data = await deleteResp.text();
  //   if (data) {
  //     data = JSON.parse(data);
  //   }
  // } else {
  //   throw new Error(`Cannot delete flag ${flagKey}: ${data ?? "unknown"}`);
  // }
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

async function deleteSegment(projectKey: string, environmentKey: string, segmentKey: string) {
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
    throw new Error(`Cannot delete segment ${segmentKey}: ${data ?? "unknown"}`);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
