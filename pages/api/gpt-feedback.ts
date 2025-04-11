export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { essay } = req.body;

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ message: "Missing OpenAI API key" });
  }

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
          content: `You are a professional IELTS Writing Examiner. Please read the student's essay and return feedback in the following JSON format:

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

Only return JSON. No explanation.`,
        },
        {
          role: "user",
          content: essay,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    return res.status(response.status).json({ message: "OpenAI API error", error: errorData });
  }

  const data = await response.json();
  res.status(200).json(data);
}
