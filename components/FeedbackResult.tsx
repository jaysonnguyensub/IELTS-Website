import React from "react";
import ScoreSection from "./ScoreSection";
import CorrectionTable from "./CorrectionTable";
import ImprovementTips from "./ImprovementTips";
import RewriteSuggestion from "./RewriteSuggestion";

interface FeedbackResultProps {
  essay: string;
  scores: {
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
  };
  corrections: {
    mistake: string;
    correction: string;
    note: string;
  }[];
  suggestions: string;
  rewrite: string;
}

const FeedbackResult: React.FC<FeedbackResultProps> = ({
  essay,
  scores,
  corrections,
  suggestions,
  rewrite,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-xl space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">AI Feedback Result</h1>

      {/* Band Score Section */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">📊 Band Scores</h2>
        <ScoreSection
          scores={{
            "Task Response": {
              score: scores.taskResponse,
              explanation: scores.explanations.taskResponse,
            },
            "Coherence and Cohesion": {
              score: scores.coherenceCohesion,
              explanation: scores.explanations.coherenceCohesion,
            },
            "Lexical Resource": {
              score: scores.lexicalResource,
              explanation: scores.explanations.lexicalResource,
            },
            "Grammatical Range and Accuracy": {
              score: scores.grammaticalRangeAccuracy,
              explanation: scores.explanations.grammaticalRangeAccuracy,
            },
          }}
        />
      </section>

      {/* Correction Table */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Corrections</h2>
        <CorrectionTable corrections={corrections} />
      </section>

      {/* Suggestions */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Suggestions for Improvement</h2>
        <ImprovementTips suggestions={suggestions} />
      </section>

      {/* Rewrite */}
      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Rewrite Suggestion (Band 7+)</h2>
        <RewriteSuggestion content={rewrite} />
      </section>
    </div>
  );
};

export default FeedbackResult;
