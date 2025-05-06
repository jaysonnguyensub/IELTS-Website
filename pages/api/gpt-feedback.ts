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

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000); // 30s timeout

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
          { role: "system", content: task1Prompt },
          { role: "user", content: essay },
        ],
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    const data = await response.json();

    const gptContent = data.choices?.[0]?.message?.content;

    if (!gptContent || typeof gptContent !== "string") {
      console.error("❌ GPT did not return valid content:", data);
      return res.status(500).json({
        message: "GPT did not return valid content",
        raw: data,
      });
    }

    // 👉 Làm sạch JSON: fix lỗi thường gặp do GPT sinh ra
    const cleanJson = gptContent
      .trim()
      .replace(/^\uFEFF/, "") // bỏ BOM
      .replace(/```json\s*|\s*```/g, "") // loại bỏ code block markdown nếu có
      .replace(/,(\s*[}\]])/g, "$1"); // fix dấu phẩy thừa

    try {
      const parsed = JSON.parse(cleanJson);
      return res.status(200).json(parsed);
    } catch (parseErr) {
      console.error("❌ Failed to parse GPT response as JSON:", cleanJson);
      return res.status(200).json({ rawText: cleanJson });
    }
  } catch (error: any) {
    clearTimeout(timeout);

    if (error.name === "AbortError") {
      console.error("⚠️ Request to OpenAI API timed out");
      return res.status(504).json({
        message: "Request timed out. Please try again.",
      });
    }

    console.error("🔥 Unexpected error calling OpenAI API:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message || "Unknown error",
    });
  }
}
