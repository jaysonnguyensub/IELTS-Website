import { NextApiRequest, NextApiResponse } from "next";

const examinerPrompt = `
You are a professional IELTS Writing Examiner.

Your task is to assess a student's IELTS Writing Task 1 essay. Analyze the grammar, vocabulary, coherence, and task achievement. Then return ONLY JSON in this format:

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

Notes:
- `corrections` should include real suggestions with `reason`, `text`, `suggestion`, `start`, and `end`.
- Only return the JSON. Do not explain.
`;

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
        model: "gpt-3.5-turbo",
        temperature: 0.3,
        messages: [
          { role: "system", content: examinerPrompt },
          { role: "user", content: essay }
        ],
      }),
    });

    const data = await response.json();
    const gptText = data.choices?.[0]?.message?.content || "";

    console.log("GPT RAW:", gptText);

    // try parse JSON safely
    const parsed = JSON.parse(gptText);
    res.status(200).json(parsed);

  } catch (e: any) {
    console.error("GPT error:", e);
    res.status(500).json({ error: "GPT error" });
  }
}
