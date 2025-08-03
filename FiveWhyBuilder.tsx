// 5WhyBuilder.tsx
import { useState } from "react";

export default function FiveWhyBuilder() {
  const [problem, setProblem] = useState({ title: "", description: "", location: "" });
  const [whys, setWhys] = useState([""]);
  const [rootConfirmed, setRootConfirmed] = useState(false);
  const [countermeasure, setCountermeasure] = useState({ action: "", owner: "", dueDate: "" });

  const handleWhyChange = (index: number, value: string) => {
    const updatedWhys = [...whys];
    updatedWhys[index] = value;
    setWhys(updatedWhys);
  };

  const addWhy = () => setWhys([...whys, ""]);

  const detectBlame = (text: string) => {
    const blameWords = ["he", "she", "they", "operator", "forgot", "didn't", "should have", "wasn't trained"];
    return blameWords.some((word) => text.toLowerCase().includes(word));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Start a 5-Why Analysis</h1>

      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Problem Title</label>
        <input
          className="w-full border rounded p-2 mt-1"
          value={problem.title}
          onChange={(e) => setProblem({ ...problem, title: e.target.value })}
        />
      </div>

      <div className="mb-4">
        <label className="block font-semibold text-gray-700">Description</label>
        <textarea
          className="w-full border rounded p-2 mt-1"
          rows={3}
          value={problem.description}
          onChange={(e) => setProblem({ ...problem, description: e.target.value })}
        />
      </div>

      <div className="mb-6">
        <label className="block font-semibold text-gray-700">Location / Process Area</label>
        <input
          className="w-full border rounded p-2 mt-1"
          value={problem.location}
          onChange={(e) => setProblem({ ...problem, location: e.target.value })}
        />
      </div>

      {whys.map((why, idx) => (
        <div key={idx} className="mb-4">
          <label className="block font-semibold text-gray-700">Why {idx + 1}?</label>
          <textarea
            className="w-full border rounded p-2 mt-1"
            rows={2}
            value={why}
            onChange={(e) => handleWhyChange(idx, e.target.value)}
          />
          {detectBlame(why) && (
            <p className="text-yellow-600 text-sm mt-1">
              🛡️ <strong>Accountability Check™:</strong> This may be focusing on a person. Consider what process failed.
            </p>
          )}
        </div>
      ))}

      {!rootConfirmed ? (
        <div className="flex items-center space-x-4">
          <button
            onClick={addWhy}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
          >
            Add Another Why
          </button>
          <button
            onClick={() => setRootConfirmed(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Mark This as Root Cause
          </button>
        </div>
      ) : (
        <div className="mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Corrective Action</h2>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Proposed Action</label>
            <textarea
              className="w-full border rounded p-2 mt-1"
              rows={3}
              value={countermeasure.action}
              onChange={(e) => setCountermeasure({ ...countermeasure, action: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold text-gray-700">Responsible Owner</label>
            <input
              className="w-full border rounded p-2 mt-1"
              value={countermeasure.owner}
              onChange={(e) => setCountermeasure({ ...countermeasure, owner: e.target.value })}
            />
          </div>

          <div className="mb-6">
            <label className="block font-semibold text-gray-700">Due Date</label>
            <input
              type="date"
              className="w-full border rounded p-2 mt-1"
              value={countermeasure.dueDate}
              onChange={(e) => setCountermeasure({ ...countermeasure, dueDate: e.target.value })}
            />
          </div>

          <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
            Submit 5-Why Report
          </button>
        </div>
      )}
    </div>
  );
}