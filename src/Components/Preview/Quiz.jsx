import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const Quiz = ({ onClose }) => {
  const [capitalAnswer, setCapitalAnswer] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [planetAnswer, setPlanetAnswer] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      capitalAnswer,
      mathAnswer,
      planetAnswer,
    };
    console.log("Submitted Answers:", feedback);
    alert("Thanks for your response!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white w-[800px] max-h-[90vh] rounded-xl shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Form Preview</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            General Knowledge Quiz
          </h2>
          <p className="text-base text-gray-500 mb-6">Answer the questions below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Q1: Capital of France */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Capital of France? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Paris", "Lyon", "Nice"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="capital"
                      value={option}
                      checked={capitalAnswer === option}
                      onChange={(e) => setCapitalAnswer(e.target.value)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q2: 2 + 2 = ? */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                2 + 2 = ? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["3", "4", "5"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="math"
                      value={option}
                      checked={mathAnswer === option}
                      onChange={(e) => setMathAnswer(e.target.value)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Q3: Largest planet */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Largest planet? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Earth", "Jupiter", "Mars"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="planet"
                      value={option}
                      checked={planetAnswer === option}
                      onChange={(e) => setPlanetAnswer(e.target.value)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4 rounded-b-xl bg-gray-50">
          <span className="text-sm text-gray-500">Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!capitalAnswer || !mathAnswer || !planetAnswer}
            className={`px-5 py-2 rounded-lg shadow ${
              !capitalAnswer || !mathAnswer || !planetAnswer
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-800 text-white hover:bg-blue-700"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
