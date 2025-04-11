import { useState } from "react";
import FeedbackResult from "@/components/FeedbackResult";
import { getFeedbackFromGPT } from "@/utils/gptClient";

const WritePracticePage = () => {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    if (!essay.trim()) return;
    setLoading(true);
    const feedback = await getFeedbackFromGPT({
      taskType: "task1",
      essay,
      taskRequirement: "The graph below shows the production levels of the main kinds of fuel in the UK between 1981 and 2000."
    });
    setResult(feedback);
    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif", maxWidth: "800px", margin: "auto" }}>
      <h1>📝 IELTS Writing Practice – Task 1</h1>
      <p>Enter your response below:</p>

      <textarea
        rows={15}
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Start writing your essay here..."
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1rem",
          fontFamily: "inherit",
          borderRadius: "8px",
          border: "1px solid #ccc",
          marginBottom: "1rem"
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#0070f3",
          color: "white",
          cursor: "pointer"
        }}
      >
        {loading ? "Scoring..." : "Get Feedback"}
      </button>

      {result && (
        <div style={{ marginTop: "2rem" }}>
          <FeedbackResult
            essay={essay}
            corrections={result.corrections}
            scores={result.bandScores}
          />
        </div>
      )}
    </div>
  );
};

export default WritePracticePage;
