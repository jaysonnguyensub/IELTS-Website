import React from "react";

interface Correction {
  type: "replaced" | "added" | "removed";
  text: string;
  suggestion: string;
  reason: string;
}

interface BandScoreDetail {
  taskResponse: number;
  coherenceCohesion: number;
  lexicalResource: number;
  grammaticalRangeAccuracy: number;
  overall: number;
  explanations: {
    taskResponse: string;
    coherenceCohesion: string;
    lexicalResource: string;
    grammaticalRangeAccuracy: string;
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
  return (
    <div style={{ marginTop: "2rem", lineHeight: 1.6, fontFamily: "Inter, sans-serif" }}>
      {/* Original Essay Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">📄 Original Essay</h2>
        <p className="mt-2 text-gray-700" style={{ background: "#f9f9f9", padding: "1rem", borderRadius: "6px", whiteSpace: "pre-line" }}>
          {essay}
        </p>
      </div>

      {/* Band Scores Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">📊 Band Scores</h2>
        <ul className="mt-4 text-gray-700">
          <li>
            <strong>Task Response:</strong> {scores.taskResponse} – {scores.explanations.taskResponse}
          </li>
          <li>
            <strong>Coherence and Cohesion:</strong> {scores.coherenceCohesion} – {scores.explanations.coherenceCohesion}
          </li>
          <li>
            <strong>Lexical Resource:</strong> {scores.lexicalResource} – {scores.explanations.lexicalResource}
          </li>
          <li>
            <strong>Grammatical Range and Accuracy:</strong> {scores.grammaticalRangeAccuracy} – {scores.explanations.grammaticalRangeAccuracy}
          </li>
          <li>
            <strong>Overall Band:</strong> {scores.overall}
          </li>
        </ul>
      </div>

      {/* Corrections Section */}
      {corrections.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">🛠️ Corrections</h2>
          <table className="mt-4 table-auto w-full text-sm border-collapse">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-center text-gray-700 border border-gray-300">Type</th>
                <th className="p-3 text-center text-gray-700 border border-gray-300">Text</th>
                <th className="p-3 text-center text-gray-700 border border-gray-300">Suggestion</th>
                <th className="p-3 text-center text-gray-700 border border-gray-300">Reason</th>
              </tr>
            </thead>
            <tbody>
              {corrections.map((correction, idx) => (
                <tr
                  key={idx}
                  className={`border-t ${idx % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-50`}
                >
                  <td className="p-3 text-center border border-gray-300">{correction.type}</td>
                  <td className="p-3 text-center border border-gray-300">{correction.text}</td>
                  <td className="p-3 text-center border border-gray-300">{correction.suggestion}</td>
                  <td className="p-3 text-center border border-gray-300">{correction.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Improvement Suggestions Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">💡 Suggestions for Improvement</h2>

        <h4 className="font-semibold text-gray-800 mt-4">📈 Missing Data Points</h4>
        <ul className="list-disc pl-6">
          {improvement.missing_data_points.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>

        <h4 className="font-semibold text-gray-800 mt-4">🧠 Recommended Vocabulary</h4>
        <ul className="list-disc pl-6">
          {improvement.recommended_vocabulary.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>

        <h4 className="font-semibold text-gray-800 mt-4">🔁 Advanced Grammar Structures</h4>
        <ul className="list-disc pl-6">
          {improvement.advanced_structures.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>

        <h4 className="font-semibold text-gray-800 mt-4">🔗 Cohesion Tips</h4>
        <ul className="list-disc pl-6">
          {improvement.cohesion_tips.map((item, idx) => <li key={idx}>{item}</li>)}
        </ul>
      </div>

      {/* Rewritten Essay Section */}
      {rewrite?.trim() && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">📝 Band 7.0+ Rewritten Essay</h2>
          <p className="mt-2 text-gray-700" style={{ whiteSpace: "pre-line" }}>
            {rewrite}
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackResult;
