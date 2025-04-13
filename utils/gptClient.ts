// File: utils/gptClient.ts
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

    // Nếu phản hồi là JSON gốc từ GPT thì trả về luôn
    if (data?.bandScores && data?.corrections) {
      console.log("✅ Parsed JSON (direct):", data);
      return data;
    }

    // Nếu GPT trả về phản hồi dạng chuỗi JSON trong content
    const raw = data?.choices?.[0]?.message?.content;
    if (!raw) throw new Error("No content returned from GPT");

    const parsed = JSON.parse(raw);
    console.log("✅ Parsed JSON (from GPT string):", parsed);
    return parsed;
  } catch (e: any) {
    console.error("❌ GPT fetch error:", e.message);
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
