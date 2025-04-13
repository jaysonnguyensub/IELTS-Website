export const getFeedbackFromGPT = async ({ essay }: { essay: string }) => {
  try {
    const res = await fetch("/api/gpt-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ essay }),
    });

    const data = await res.json();

    // Nếu là JSON trực tiếp (có bandScores/corrections), trả luôn
    if (data?.bandScores && data?.corrections) {
      console.log("🧠 GPT Feedback (JSON format):", data);
      return data;
    }

    // Nếu là phản hồi dạng raw message.content từ GPT
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) throw new Error("Empty GPT response");

    console.log("🧠 GPT RAW TEXT:", raw);

    const parsed = JSON.parse(raw);
    console.log("✅ Parsed GPT JSON:", parsed);
    return parsed;
  } catch (e: any) {
    console.error("❌ Error while fetching GPT feedback:", e.message);
    return {
      corrections: [],
      bandScores: {
        task_response: 0,
        coherence: 0,
        lexical: 0,
        grammar: 0,
        overall: 0,
      },
    };
  }
};
