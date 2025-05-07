import React from "react";

interface BandScoreDetail {
  score: number;
  explanation: string;
}

interface ScoreSectionProps {
  scores: {
    [key: string]: BandScoreDetail;
  };
}

const ScoreSection: React.FC<ScoreSectionProps> = ({ scores }) => {
  const criteria = [
    "Task Response",
    "Coherence and Cohesion",
    "Lexical Resource",
    "Grammatical Range and Accuracy",
  ];

  const total = criteria.reduce((sum, key) => sum + (scores[key]?.score || 0), 0);
  const overall = (total / criteria.length).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Grid 2x2 layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {criteria.map((key) => (
          <div
            key={key}
            className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-700">{key}</h3>
              <span className="text-xl font-bold text-blue-600">
                {scores[key]?.score ?? "-"}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {scores[key]?.explanation || "No explanation provided."}
            </p>
          </div>
        ))}
      </div>

      {/* Overall Band Score */}
      <div className="text-right mt-2">
        <span className="text-gray-700 font-medium">Overall Band Score: </span>
        <span className="text-xl font-bold text-green-600">{overall}</span>
      </div>
    </div>
  );
};

export default ScoreSection;
