import React from "react";

interface Correction {
  mistake: string;
  correction: string;
  note: string;
}

interface CorrectionTableProps {
  corrections: Correction[];
}

const CorrectionTable: React.FC<CorrectionTableProps> = ({ corrections }) => {
  if (!corrections || corrections.length === 0) {
    return <p className="text-gray-600">No corrections found. Great job!</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Mistake
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Correction
            </th>
            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700 border-b">
              Note
            </th>
          </tr>
        </thead>
        <tbody>
          {corrections.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b text-red-600 font-medium">
                {item.mistake}
              </td>
              <td className="px-4 py-2 border-b text-green-700 font-semibold">
                {item.correction}
              </td>
              <td className="px-4 py-2 border-b text-gray-600 text-sm">
                {item.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CorrectionTable;
