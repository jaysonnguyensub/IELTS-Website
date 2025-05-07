import React from "react";

interface RewriteSuggestionProps {
  content: string;
}

const RewriteSuggestion: React.FC<RewriteSuggestionProps> = ({ content }) => {
  if (!content || content.trim() === "") {
    return <p className="text-gray-600">No rewrite suggestion provided.</p>;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg shadow-sm">
      <p className="text-gray-800 text-sm whitespace-pre-line">
        {content}
      </p>
    </div>
  );
};

export default RewriteSuggestion;
