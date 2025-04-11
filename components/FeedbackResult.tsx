interface Correction {
  type: "replaced";
  text: string;
  suggestion: string;
  reason: string;
  start: number;
  end: number;
}

interface BandScore {
  task_response: number;
  coherence: number;
  lexical: number;
  grammar: number;
  overall: number;
}

interface Props {
  essay: string;
  corrections: Correction[];
  scores: BandScore;
}

const FeedbackResult = ({ essay, corrections, scores }: Props) => {
  const sorted = corrections.sort((a, b) => a.start - b.start);
  let result: React.ReactNode[] = [];
  let current = 0;

  sorted.forEach((correction, index) => {
    if (current < correction.start) {
      result.push(<span key={`text-${index}`}>{essay.slice(current, correction.start)}</span>);
    }
    result.push(
      <span
        key={`corr-${index}`}
        style={{ backgroundColor: "yellow", padding: "0 4px" }}
        title={correction.reason}
      >
        {correction.suggestion}
      </span>
    );
    current = correction.end;
  });

  result.push(<span key="end">{essay.slice(current)}</span>);

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2>🖍️ Feedback</h2>
      <p>{result}</p>
      <h3>📊 Band Scores</h3>
      <ul>
        <li>Task Response: {scores.task_response}</li>
        <li>Coherence: {scores.coherence}</li>
        <li>Lexical Resource: {scores.lexical}</li>
        <li>Grammar: {scores.grammar}</li>
        <li><strong>Overall: {scores.overall}</strong></li>
      </ul>
    </div>
  );
};

export default FeedbackResult;
