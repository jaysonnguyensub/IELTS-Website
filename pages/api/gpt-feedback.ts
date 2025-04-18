// File: pages/api/gpt-feedback.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { task1Prompt } from "@/prompts/task1Prompt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { essay } = req.body;

  if (!essay || typeof essay !== "string") {
    return res.status(400).json({ message: "Invalid essay input" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: task1Prompt,
          },
          {
            role: "user",
            content: essay,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("📦 RAW GPT Response:", data);

    const gptContent = data.choices?.[0]?.message?.content;

    if (!gptContent || typeof gptContent !== "string") {
      console.error("❌ GPT did not return valid content:", data);
      return res.status(500).json({ message: "GPT did not return valid content", raw: data });
    }

    console.log("🧠 GPT Text Content:", gptContent);

    let parsed;
    try {
      parsed = JSON.parse(gptContent);
    } catch (err) {
      console.error("❌ Failed to parse GPT response as JSON:", gptContent);
      return res.status(500).json({ message: "Invalid JSON from GPT", raw: gptContent });
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("❌ Error calling OpenAI API:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
