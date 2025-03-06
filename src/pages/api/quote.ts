import axios from "axios";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import path from "path";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const privateKeyPath = path.resolve(process.cwd(), 'paybis.pem');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
    const data = req.body;
    const hash = crypto.createHash("sha512");
    const hashedData = hash.update(JSON.stringify(req.body), "utf-8").digest("hex");

    const signature = crypto.sign("sha512", Buffer.from(hashedData) as any, {
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PSS_PADDING,
      saltLength: crypto.constants.RSA_PSS_SALTLEN_DIGEST,
    });
    const response = await axios.post(
      `https://widget-api.paybis.com/v2/quote`,
      data,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYBIS_API_KEY}`,
          "X-Request-Signature": signature.toString("base64"),
        },
      }
    );
    res.status(200).json(response.data);
  } catch (e: any) {
    console.log(e)
    res.status(500).json({ error: e?.response?.data || JSON.stringify(e) });
  }
}
