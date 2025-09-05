import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const BugReport = ({ onClose }) => {
  const [summary, setSummary] = useState(""); // required
  const [steps, setSteps] = useState(""); // required
  const [severity, setSeverity] = useState(""); // radio buttons required
  const [screenshot, setScreenshot] = useState(null); // optional

  const handleSubmit = (e) => {
    e.preventDefault();
    const bugReport = { summary, steps, severity, screenshot };
    console.log("Submitted Bug Report:", bugReport);
    alert("Thanks for submitting the bug report!");
    onClose();
  };

  const handleFileChange = (e) => {
    setScreenshot(e.target.files[0]);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50 px-4 sm:px-6">
      <div className="bg-white w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col">
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
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bug Report</h2>
          <p className="text-base text-gray-500 mb-6">Help us squash bugs.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Summary */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Summary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Steps to reproduce */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Steps to reproduce <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Severity */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Severity <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Blocker", "Critical", "Major", "Minor"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="severity"
                      value={option}
                      checked={severity === option}
                      onChange={(e) => setSeverity(e.target.value)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Screenshot / recording */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Screenshot / Recording (optional)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="w-full text-sm text-gray-700"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl bg-gray-50">
          <span className="text-sm text-gray-500">Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!summary || !steps || !severity}
            className={`px-5 py-2 rounded-lg shadow ${!summary || !steps || !severity
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

export default BugReport;
