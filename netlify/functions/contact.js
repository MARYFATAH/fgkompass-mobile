const { createClient } = require("@sanity/client");

const config = {
  projectId:
    process.env.SANITY_PROJECT_ID ||
    process.env.EXPO_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || process.env.EXPO_PUBLIC_SANITY_DATASET,
  apiVersion:
    process.env.SANITY_API_VERSION ||
    process.env.EXPO_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
};

const client = createClient(config);

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    if (!config.projectId || !config.dataset || !config.apiVersion || !config.token) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error:
            "Server not configured. Missing Sanity environment variables.",
        }),
      };
    }

    const { name, email, message } = JSON.parse(event.body || "{}");

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: "Missing required fields" }),
      };
    }

    const doc = {
      _type: "contactMessage",
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    };

    await client.create(doc);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: "Server error" }),
    };
  }
};
