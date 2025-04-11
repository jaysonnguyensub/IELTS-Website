export const getFeedbackFromGPT = async ({ essay }: { essay: string }) => {
  const start = essay.indexOf("is");
  return {
    corrections: [
      {
        type: "replaced",
        text: "is",
        suggestion: "are",
        reason: "Subject-verb agreement",
        start,
        end: start + 2,
      },
    ],
    bandScores: {
      task_response: 6,
      coherence: 6,
      lexical: 6,
      grammar: 6,
      overall: 6,
    },
  };
};
