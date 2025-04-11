export const getFeedbackFromGPT = async ({ essay }: { essay: string }) => {
  return {
    corrections: [
      {
        type: "replaced",
        text: "is",
        suggestion: "are",
        reason: "Subject-verb agreement",
        start: essay.indexOf("is"),
        end: essay.indexOf("is") + 2,
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
