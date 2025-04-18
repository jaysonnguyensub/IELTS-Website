// File: pages/api/gpt-feedback.ts

import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { essay } = req.body;

  if (!essay || typeof essay !== 'string') {
    return res.status(400).json({ message: 'Invalid essay input' });
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        temperature: 0.3,
        messages: [
          {
            role: 'system',
            content: `You are a professional IELTS Writing Examiner.

Your job is to evaluate a student's IELTS Writing Task 1 essay based on official IELTS band descriptors.

Please return your feedback strictly in the following JSON format:

{
  "bandScores": {
    "task_response": number,
    "coherence": number,
    "lexical": number,
    "grammar": number,
    "overall": number
  },
  "summary": "string",
  "strengths": ["string", "string"],
  "weaknesses": ["string", "string"],
  "corrections": [
    {
      "type": "replaced" | "added" | "removed",
      "text": "string",
      "suggestion": "string",
      "reason": "string",
      "start": number,
      "end": number
    }
  ],
  "rewrite": "string"
}

Instructions:
- Provide only valid JSON output. No extra commentary.
- Use index positions (start, end) to highlight exact error locations.
- The rewrite version should revise the essay to aim for a band score of 7.0+.
- Do not break JSON format.`
          },
          {
            role: 'user',
            content: essay,
          },
        ],
      }),
    });

    const data = await response.json();

    console.log("📦 RAW GPT Response:", data); // ✅ In ra toàn bộ response

    const gptContent = data.choices?.[0]?.message?.content;

    if (!gptContent) {
      console.error("❌ GPT didn't return any content:", data);
      return res.status(500).json({ message: 'GPT did not return any content', raw: data });
    }

    console.log("🧠 GPT Raw Text Content:", gptContent); // ✅ In ra nội dung GPT trả về

    let parsed;
    try {
      parsed = JSON.parse(gptContent);
    } catch (err) {
      console.error('❌ Failed to parse GPT response as JSON:', gptContent);
      return res.status(500).json({ message: 'Invalid JSON from GPT', raw: gptContent });
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error('❌ Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
