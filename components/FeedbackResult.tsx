// components/FeedbackResult.tsx

type FeedbackResultProps = {
  essay: string;
  corrections: any[]; // Trong MVP có thể dùng tạm "any" để tránh type error
  scores: any;
};

const FeedbackResult = ({ essay, corrections, scores }: FeedbackResultProps) => {
  return (
    <div>
      <h2>📋 Feedback Preview</h2>
      <p><strong>Essay:</strong> {essay}</p>
      <p><strong>Corrections:</strong> {corrections?.length || 0}</p>
      <p><strong>Band Score:</strong> {scores?.overall || "-"}</p>
    </div>
  );
};

export default FeedbackResult;
