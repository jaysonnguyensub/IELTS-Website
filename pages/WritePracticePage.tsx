import React, { useState, useRef, useEffect } from "react";
import FeedbackResult from "@/components/FeedbackResult";

export default function WritePracticePage() {
  const [essay, setEssay] = useState("");
  const [feedback, setFeedback] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const feedbackRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async () => {
    if (!essay.trim()) {
      setError("Please enter your essay before submitting.");
      return;
    }

    setLoading(true);
    setError(null);
    setFeedback(null);

    try {
      const res = await fetch("/api/gpt-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ essay }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to get feedback");
      }

      setFeedback(data);
    } catch (err: any) {
      console.error("❌ GPT fetch error:", err);
      setError("Error getting feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (feedbackRef.current) {
      feedbackRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [feedback]);

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "1rem" }}>
      <h1>📝 IELTS Task 1 Practice</h1>

      <label htmlFor="essay" style={{ fontWeight: 600 }}>Your Essay</label>
      <textarea
        id="essay"
        rows={10}
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Write your Task 1 essay here..."
        style={{
          width: "100%",
          padding: "1rem",
          fontSize: "16px",
          marginTop: "0.5rem",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontFamily: "inherit",
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "1rem",
          padding: "0.6rem 1.2rem",
          fontSize: "16px",
          backgroundColor: loading ? "#999" : "#0070f3",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "all 0.2s ease-in-out",
        }}
      >
        {loading ? "Analyzing..." : "Get Feedback"}
      </button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {feedback && feedback.bandScores && feedback.improvement && feedback.corrections && (
        <div ref={feedbackRef} style={{ marginTop: "3rem" }}>
          <FeedbackResult
            essay={essay}
            corrections={feedback.corrections}
            scores={feedback.bandScores}
            improvement={feedback.improvement}
            rewrite={feedback.rewrite}
          />
        </div>
      )}
    </div>
  );
}
