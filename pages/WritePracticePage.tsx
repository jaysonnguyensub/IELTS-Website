import { useState } from "react";
import FeedbackResult from "@/components/FeedbackResult";
import { getFeedbackFromGPT } from "@/utils/gptClient";

const WritePracticePage = () => {
  const [essay, setEssay] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async () => {
    if (!essay.trim()) return;
    setLoading(true);
    try {
      const feedback = await getFeedbackFromGPT({ essay });
      setResult(feedback);
    } catch (e) {
      alert("Error receiving feedback.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "auto" }}>
      <h1>📝 IELTS Task 1 Practice</h1>
      <textarea
        rows={10}
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Write your essay here..."
        style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
      />

      <button onClick={handleSubmit} disabled={loading} style={{ marginTop: "1rem" }}>
        {loading ? "Scoring..." : "Get Feedback"}
      </button>

      {result && (
        <FeedbackResult
          essay={essay}
          corrections={result.corrections}
          scores={result.bandScores}
        />
      )}
    </div>
  );
};

export default WritePracticePage;
