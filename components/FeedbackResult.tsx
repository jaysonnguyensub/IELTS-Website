// components/FeedbackResult.tsx

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
  const sorted = [...corrections].sort((a, b) => a.start - b.start);
  let result: React.ReactNode[] = [];
  let current = 0;

  sorted.forEach((correction, index) => {
    if (current < correction.start) {
      result.push(<span key={`text-${index}`}>{essay.slice(current, correction.start)}</span>);
    }

    if (correction.type === "replaced") {
      result.push(
        <span key={`rep-${index}`} title={correction.reason} style={{ backgroundColor: "yellow" }}>
          {correction.suggestion}
        </span>
      );
    }

    current = correction.end;
  });

  result.push(<span key="end">{essay.slice(current)}</span>);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>Feedback:</h2>
      <div>{result}</div>
      <h3>Band Scores</h3>
      <ul>
        <li>Task Response: {scores.task_response}</li>
        <li>Coherence: {scores.coherence}</li>
        <li>Lexical: {scores.lexical}</li>
        <li>Grammar: {scores.grammar}</li>
        <li><strong>Overall: {scores.overall}</strong></li>
      </ul>
    </div>
  );
};

export default FeedbackResult;
