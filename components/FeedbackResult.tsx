import React from "react";

interface Correction {
  type: "replaced" | "added" | "removed";
  text: string;
  suggestion: string;
  reason: string;
  start: number;
  end: number;
}

interface BandScoreDetail {
  task_response: number;
  coherence: number;
  lexical: number;
  grammar: number;
  overall: number;
  explanations?: {
    task_response: string;
    coherence: string;
    lexical: string;
    grammar: string;
  };
  strengths: {
    task_response: string[];
    coherence: string[];
    lexical: string[];
    grammar: string[];
  };
  weaknesses: {
    task_response: string[];
    coherence: string[];
    lexical: string[];
    grammar: string[];
  };
}

interface Improvement {
  missing_data_points: string[];
  recommended_vocabulary: string[];
  advanced_structures: string[];
  cohesion_tips: string[];
}

interface Props {
  essay: string;
  corrections: Correction[];
  scores: BandScoreDetail;
  improvement: Improvement;
  rewrite?: string;
}

const FeedbackResult = ({
  essay,
  corrections,
  scores,
  improvement,
  rewrite,
}: Props) => {
  const sorted = corrections.sort((a, b) => a.start - b.start);
  let result: React.ReactNode[] = [];
  let cursor = 0;

  sorted.forEach((correction, index) => {
    if (cursor < correction.start) {
      result.push(
        <span key={`text-${index}`}>{essay.slice(cursor, correction.start)}</span>
      );
    }

    const actualText = essay.slice(correction.start, correction.end);

    if (actualText === correction.text) {
      result.push(
        <span
          key={`highlight-${index}`}
          style={{ backgroundColor: "#fff3cd", padding: "2px 4px", borderRadius: "4px" }}
        >
          {actualText}
        </span>
      );
    } else {
      console.warn("⚠️ Correction mismatch:", {
        expected: correction.text,
        actual: actualText,
        start: correction.start,
        end: correction.end,
      });
      result.push(
        <span key={`fallback-${index}`}>{actualText}</span>
      );
    }

    cursor = correction.end;
  });

  result.push(<span key="end">{essay.slice(cursor)}</span>);

  const e = scores.explanations;

  return (
    <div style={{ marginTop: "2rem", lineHeight: 1.6 }}>
      <h2>🖍️ Essay with Highlighted Mistakes</h2>
      <p>{result}</p>

      {/* các phần khác giữ nguyên */}

      {rewrite?.trim() && (
        <div style={{ marginTop: "2rem" }}>
          <h3>🔁 Band 7.0+ Rewritten Essay</h3>
          <p style={{ background: "#f4f4f4", padding: "1rem", borderRadius: "6px", whiteSpace: 'pre-line' }}>
            {rewrite}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackResult;
