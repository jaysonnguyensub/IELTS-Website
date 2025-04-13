// File: pages/api/gpt-feedback.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { essay } = req.body;

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

Your task is to assess a student's IELTS Writing Task 1 essay based on IELTS band descriptors.
Return your evaluation in the following JSON format:

{
  "corrections": [
    {
      "type": "replaced" | "added" | "removed",
      "text": "...",
      "suggestion": "...",
      "reason": "...",
      "start": number,
      "end": number
    }
  ],
  "bandScores": {
    "task_response": number,
    "coherence": number,
    "lexical": number,
    "grammar": number,
    "overall": number
  }
}

Instructions:
- Carefully review the essay and highlight the most important errors.
- Suggest corrections where needed (spelling, grammar, coherence, vocabulary use).
- For each correction, return the original word, suggested word, and brief reason.
- Use 'start' and 'end' index to locate the mistake in the original text.
- Only return a valid JSON object. Do not include explanations or comments outside JSON.`
          },
          {
            role: 'user',
            content: essay,
          },
        ],
      }),
    });

    const data = await response.json();
    const gptContent = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      parsed = JSON.parse(gptContent);
    } catch (err) {
      return res.status(500).json({ message: 'Invalid JSON from GPT', raw: gptContent });
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
