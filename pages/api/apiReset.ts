import type { NextApiRequest, NextApiResponse } from "next";

// we need to list the project keys for each of the projects that we want to clean up
// this prevents us from accidentally deleting flags from the wrong project
// since the API key has access to all projects
//"toggle-tunes-team-1"
const projectKeys: Array<string> = [
  "toggletunes-team-1",
  "toggletunes-team-2",
  "toggletunes-team-3",
  // "toggletunes-team-4",
];
const API_KEY: string = process.env.LD_API_KEY as string;
const delay = 1000;

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  try {
    for (const projectKey of projectKeys) {
      // get the flags then delete them

      const flags = await getFlags(projectKey);
      for (const flag of flags.items) {
        if (flag.key === "release-new-ad-sidebar") {
          await turnOffFlag(projectKey, flag.key);
          await removeMetricKeysFromFlag(projectKey, flag.key);
          await sleep(delay);
        } else {
          await deleteFlag(projectKey, flag.key);
          await sleep(delay);
        }
      }

      //get environments which we need for deleting segments
      //const environments = await getEnvironments(projectKey);

      // get the segments for each environment and delete them

      // for (const environment of environments.items) {
      //   const metricsFetched = await getMetrics(projectKey, environment.key);
      //   console.log("metricsFetched", metricsFetched);
      //   for (const metric of metricsFetched.items) {
      //     await deleteMetrics(projectKey, metric.key);
      //     await sleep(delay);
      //   }
      // }
      //createMetrics(projectKey);
      createFlags(projectKey);
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
  //`https://app.launchdarkly.com/api/v2/flags/toggletunes?env=${projectKey}&selected-env=${projectKey}`,
  const resp = await fetch(`https://app.launchdarkly.com/api/v2/flags/${projectKey}`, {
    method: "GET",
    headers: {
      Authorization: API_KEY,
    },
  });

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

async function turnOffFlag(projectKey: string, flagKey: string) {
  //console.log("Debug: Deleting Flag " + flagKey);
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
        "Content-Type": "application/json; domain-model=launchdarkly.semanticpatch",
      },
      body: JSON.stringify({
        environmentKey: "test",
        instructions: [{ kind: "turnFlagOff" }],
      }),
    }
  );

  if (!disableResp.ok) {
    throw new Error(`Cannot disable flag ${flagKey}: ${disableResp.statusText}`);
  }

  console.log("disableResp.ok", disableResp.ok);
  let data;
  if (disableResp.ok) {
    data = await disableResp.text();
    if (data) {
      data = JSON.parse(data);
    }
  } else {
    throw new Error(`Cannot turn off flag ${flagKey}: ${data ?? "unknown"}`);
  }
}

async function removeMetricKeysFromFlag(projectKey: string, flagKey: string) {
  //console.log("Debug: Deleting Flag " + flagKey);
  if (!projectKeys.includes(projectKey)) {
    throw new Error("Cannot delete flags from an unspecified project");
  }

  console.log("Running the disable function for the flag " + flagKey);

  const disableResp = await fetch(
    `https://app.launchdarkly.com/api/v2/projects/${projectKey}/flags/${flagKey}/measured-rollout-configuration`,
    {
      method: "PUT",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
        "ld-api-version": "beta"
      },
      body: JSON.stringify({
        environmentKey: "test",
        instructions: [{ metricKeys: []  }],
      }),
    }
  );

  if (!disableResp.ok) {
    throw new Error(`Cannot remove metrics from flag ${flagKey}: ${disableResp.statusText}`);
  }

  console.log("disableResp.ok", disableResp.ok);
  let data;
  if (disableResp.ok) {
    data = await disableResp.text();
    if (data) {
      data = JSON.parse(data);
    }
  } else {
    throw new Error(`Cannot turn off flag ${flagKey}: ${data ?? "unknown"}`);
  }
}

async function deleteFlag(projectKey: string, flagKey: string) {
  //console.log("Debug: Deleting Flag " + flagKey);
  if (!projectKeys.includes(projectKey)) {
    throw new Error("Cannot delete flags from an unspecified project");
  }

  await turnOffFlag(projectKey, flagKey);

  //console.log("Running the delete function for the flag " + flagKey);
  // `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
  const deleteResp = await fetch(
    `https://app.launchdarkly.com/api/v2/flags/${projectKey}/${flagKey}`,
    {
      method: "DELETE",
      headers: {
        Authorization: API_KEY,
      },
      body: JSON.stringify({
        environmentKey: "test",
        // environmentKey: "toggletunes",
      }),
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

async function getMetrics(projectKey: string, environmentKey: string) {
  console.log("Debug: Getting Metrics");
  const resp = await fetch(`https://app.launchdarkly.com/api/v2/metrics/${projectKey}`, {
    method: "GET",
    headers: {
      Authorization: API_KEY,
    },
  });

  let data;
  if (resp.ok) {
    data = await resp.text();
    if (data) {
      data = JSON.parse(data);
    }
  } else {
    throw new Error(`Cannot get metrics: ${data ?? "unknown"}`);
  }
  return data;
}

async function deleteMetrics(projectKey: string, metricKey: string) {
  if (!projectKeys.includes(projectKey)) {
    throw new Error("Cannot delete metrics from an unspecified project");
  }
  console.log("projectKey", projectKey);
  console.log("metricKey", metricKey);
  const resp = await fetch(
    `https://app.launchdarkly.com/api/v2/metrics/${projectKey}/${metricKey}`,
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
    throw new Error(`Cannot delete metric ${metricKey}: ${data ?? "unknown"}`);
  }
}

async function createFlags(projectKey: string) {
  //`https://app.launchdarkly.com/api/v2/flags/toggletunes?env=${projectKey}&selected-env=${projectKey}`,

  const flag2 = {
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: true,
    },
    key: "release-saved-playlists-sidebar",
    name: "2 - Release Saved Playlist Sidebar",
    description: "Releasing new playlist feature on the sidebar",
    kind: "boolean",
    temporary: true,
    tags: ["release"],
  };

  const flag3 = {
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: true,
    },
    key: "release-new-users-playlist",
    name: "3 - Release New Users Playlist",
    description: "Releasing new UI layout for all playlists on main page",
    kind: "boolean",
    temporary: true,
    tags: ["release", "targeting"],
  };

  const flag4 = {
    clientSideAvailability: {
      usingEnvironmentId: true,
      usingMobileKey: true,
    },
    key: "release-ai-playlist-creator",
    name: "4 - Change AI Model for AI Playlist Creator",
    description: "Changing AI Model",
    kind: "JSON",
    variations: [
      {
        name: "Claude Haiku",
        description: "This is Claude Haiku's AI model for quick response and cost saving",
        value: {
          max_tokens_to_sample: 0,
          modelId: "",
          temperature: 0,
          top_p: 0,
        },
      },
      {
        name: "Meta Llama",
        description: "This is Meta's Llama AI model for more creative responses",
        value: {
          max_gen_len: 0,
          modelId: "",
          temperature: 0,
          top_p: 0,
        },
      },
      {
        name: "Cohere Coral",
        description: "This is Cohere Coral AI model for balance between precision and creativity",
        value: {
          max_tokens: 0,
          modelId: "",
          p: 0,
          temperature: 0,
        },
      },
    ],
    defaults: {
      onVariation: 2,
      offVariation: 0,
    },
    temporary: true,
    tags: ["ai"],
  };

  // const flag5 = {
  //   clientSideAvailability: {
  //     usingEnvironmentId: true,
  //     usingMobileKey: true,
  //   },
  //   key: "release-ad-sidebar",
  //   name: "5 - Release Ad Sidebar",
  //   description: "Releasing new sidebar for Ads",
  //   kind: "boolean",
  //   temporary: true,
  // };

  const payloads: any = [flag2, flag3, flag4];

  for (const payload of payloads) {
    await fetch(`https://app.launchdarkly.com/api/v2/flags/${projectKey}`, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
}

async function createMetrics(projectKey: string) {
  //`https://app.launchdarkly.com/api/v2/flags/toggletunes?env=${projectKey}&selected-env=${projectKey}`,

  const metricPayload1 = {
    name: "Website Latency Rate",
    eventKey: "Website Latency Rate",
    Description: "Track to see if the newly released component affects Website Latency Rate",
    isNumeric: true,
    key: "website-latency-rate",
    kind: "custom",
    successCriteria: "LowerThanBaseline",
    randomizationUnits: ["user"],
    tags: ["remediate"],
    unit: "ms",
  };

  const metricPayload2 = {
    name: "Website Error Rate",
    eventKey: "Website Error Rate",
    Description: "Track to see if the newly released component affects Website Error Rate",
    isNumeric: false,
    key: "website-error-rate",
    kind: "custom",
    successCriteria: "LowerThanBaseline",
    randomizationUnits: ["user"],
    tags: ["remediate"],
  };

  const payloads: any = [metricPayload1, metricPayload2];

  for (const payload of payloads) {
    const resp = await fetch(`https://app.launchdarkly.com/api/v2/metrics/${projectKey}`, {
      method: "POST",
      headers: {
        Authorization: API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("awfawfe resp", resp);
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
