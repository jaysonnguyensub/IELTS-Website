export const getFeedbackFromGPT = async ({ essay }: { essay: string }) => {
  const res = await fetch("/api/gpt-feedback", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ essay }),
  });

  const gptResponse = await res.json();

  console.log("📩 GPT RAW RESPONSE:", gptResponse);

  // Tạm trả về mock để frontend không lỗi
  return {
    corrections: [],
    bandScores: {
      task_response: 6,
      coherence: 6,
      lexical: 6,
      grammar: 6,
      overall: 6,
    },
  };
};
