type FeedbackResultProps = {
  essay: string;
  corrections: {
    type: "deleted" | "added" | "replaced";
    text: string;
    suggestion?: string;
    reason: string;
    start: number;
    end: number;
  }[];
  scores: {
    task_response: number;
    coherence: number;
    lexical: number;
    grammar: number;
    overall: number;
  };
};

const FeedbackResult = ({ essay, corrections, scores }: FeedbackResultProps) => {
  const safeCorrections = Array.isArray(corrections) ? corrections : [];
  const sorted = [...safeCorrections].sort((a, b) => a.start - b.start);

  let result: React.ReactNode[] = [];
  let current = 0;

  sorted.forEach((correction, index) => {
    if (current < correction.start) {
      result.push(<span key={`text-${index}`}>{essay.slice(current, correction.start)}</span>);
    }

    result.push(
      <span
        key={`corr-${index}`}
        title={correction.reason}
        style={{ backgroundColor: "yellow", textDecoration: "underline", padding: "0 4px" }}
      >
        {correction.suggestion}
      </span>
    );

    current = correction.end;
  });

  result.push(<span key="end">{essay.slice(current)}</span>);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🖍️ Highlighted Feedback</h2>
      <p style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}>{result}</p>

      <h3>📊 Band Score</h3>
      <ul>
        <li>Task Response: {scores.task_response}</li>
        <li>Coherence: {scores.coherence}</li>
        <li>Lexical: {scores.lexical}</li>
        <li>Grammar: {scores.grammar}</li>
        <li><strong>Overall Band: {scores.overall}</strong></li>
      </ul>
    </div>
  );
};

export default FeedbackResult;
