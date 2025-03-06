import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(400).json({ message: "Only post request is allowed" });
  const params = new URLSearchParams({
    access_token: process.env.FACEBOOK_PIXEL_ACCESS_TOKEN as string,
  });
  try {
    let response = await fetch(
      `https://graph.facebook.com/v18.0/1615942912495571/events?${params.toString()}`,
      {
        method: "POST",
        body: JSON.stringify(req.body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    response = await response.json();
    res.status(200).json(response);
  } catch (e) {
    res.status(400).json(e);
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
