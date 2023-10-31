// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const projectKeys: Array<string> = ["temp-test"];
const API_KEY: string = process.env.LD_API_KEY as string;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  for (const projectKey of projectKeys) {
    // get the flags then delete them
    const flags = await getFlags(projectKey);
    for (const flag of flags.items) {
      await deleteFlag(projectKey, flag.key);
    }
    // get environments which we need for deleting segments
    const environments = await getEnvironments(projectKey);
    // get the segments for each environment and delete them
    for (const environment of environments.items) {
      const segments = await getSegments(projectKey, environment.key);
      for (const segment of segments.items) {
        await deleteSegment(projectKey, environment.key, segment.key);
      }
    }
  }
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

  const data = await resp.json();
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

  const data = await resp.json();
  return data;
}

async function deleteFlag(projectKey: string, flagKey: string) {
  if (projectKey !== "temp-test") {
    throw new Error("Cannot delete flags from non-temp-test project");
  }
  if (!(flagKey === "test-flag-2" || flagKey === "test-flag-1")) {
    console.log(flagKey);
    throw new Error("Cannot delete flag");
  }

  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
    {
      method: "DELETE",
      headers: {
        Authorization: API_KEY,
      },
    }
  );
}

async function getSegments(projectKey: string, environmentKey: string) {
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/segments/${projectKey}/${environmentKey}`,
    {
      method: "GET",
      headers: {
        Authorization: API_KEY,
      },
    }
  );

  const data = await resp.json();
  return data;
}

async function deleteSegment(
  projectKey: string,
  environmentKey: string,
  segmentKey: string
) {
  if (projectKey !== "temp-test") {
    throw new Error("Cannot delete segments from non-temp-test project");
  }
  if (segmentKey !== "dumb-segment") {
    throw new Error("Cannot delete segment");
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
}
