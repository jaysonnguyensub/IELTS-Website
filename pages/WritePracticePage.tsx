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
      console.log("🧠 GPT Feedback:", feedback); // ✅ Log kết quả thật từ GPT
      setResult(feedback);
    } catch (e) {
  if (e instanceof Error) {
    alert("Lỗi khi gọi GPT: " + e.message);
  } else {
    alert("Lỗi không xác định");
  }
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
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "1rem",
          marginBottom: "1rem",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          fontWeight: 600,
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
