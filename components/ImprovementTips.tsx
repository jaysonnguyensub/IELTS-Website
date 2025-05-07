import React from "react";

interface ImprovementTipsProps {
  suggestions: string;
}

const ImprovementTips: React.FC<ImprovementTipsProps> = ({ suggestions }) => {
  if (!suggestions || suggestions.trim() === "") {
    return <p className="text-gray-600">No suggestions available.</p>;
  }

  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg shadow-sm">
      <p className="text-gray-700 text-sm whitespace-pre-line">
        {suggestions}
      </p>
    </div>
  );
};

export default ImprovementTips;
