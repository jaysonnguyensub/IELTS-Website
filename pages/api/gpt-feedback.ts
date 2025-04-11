import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { essay } = req.body;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // tạm thời dùng GPT-3.5
        temperature: 0.3,
        messages: [
          {
            role: "system",
            content: `You are an IELTS Writing examiner. Return ONLY a JSON format feedback like this:

{
  "corrections": [
    {
      "type": "replaced",
      "text": "is",
      "suggestion": "are",
      "reason": "Subject-verb agreement",
      "start": 50,
      "end": 52
    }
  ],
  "bandScores": {
    "task_response": 6,
    "coherence": 6,
    "lexical": 6,
    "grammar": 6,
    "overall": 6
  }
}

Return only JSON. No explanation.`,
          },
          {
            role: "user",
            content: essay,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("GPT RAW RESPONSE:", data);

    // Lấy text và parse
    const gptText = data.choices?.[0]?.message?.content || "{}";
    const feedback = JSON.parse(gptText);

    console.log("GPT Feedback:", feedback);

    res.status(200).json(feedback);
  } catch (error: any) {
    console.error("GPT error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
