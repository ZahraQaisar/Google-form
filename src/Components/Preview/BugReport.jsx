import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const BugReport = ({ onClose }) => {
  const [summary, setSummary] = useState(""); 
  const [steps, setSteps] = useState(""); 
  const [severity, setSeverity] = useState(""); 
  const [screenshot, setScreenshot] = useState(null); 

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div className="bg-base-100 w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-base-300">
          <h2 className="text-xl font-bold text-base-content">Form Preview</h2>
          <button
            onClick={onClose}
            className="text-base-content/70 hover:text-base-content"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-base-content mb-2">Bug Report</h2>
          <p className="text-base text-base-content/70 mb-6">Help us squash bugs.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Summary */}
            <div className="border border-base-300 rounded-lg p-4">
              <label className="block font-medium text-base-content mb-2">
                Summary <span className="text-error">*</span>
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full border border-base-300 rounded-lg px-3 py-2 text-sm 
                           bg-base-100 text-base-content placeholder-base-content/50 
                           focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Steps to reproduce */}
            <div className="border border-base-300 rounded-lg p-4">
              <label className="block font-medium text-base-content mb-2">
                Steps to reproduce <span className="text-error">*</span>
              </label>
              <textarea
                rows="4"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                className="w-full border border-base-300 rounded-lg px-3 py-2 text-sm 
                           bg-base-100 text-base-content placeholder-base-content/50 
                           focus:outline-none focus:ring-2 focus:ring-primary"
                required
              />
            </div>

            {/* Severity */}
            <div className="border border-base-300 rounded-lg p-4">
              <label className="block font-medium text-base-content mb-2">
                Severity <span className="text-error">*</span>
              </label>
              <div className="space-y-2">
                {["Blocker", "Critical", "Major", "Minor"].map((option) => (
                  <label key={option} className="flex items-center space-x-2 text-base-content">
                    <input
                      type="radio"
                      name="severity"
                      value={option}
                      checked={severity === option}
                      onChange={(e) => setSeverity(e.target.value)}
                      className="radio radio-primary"
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Screenshot / recording */}
            <div className="border border-base-300 rounded-lg p-4">
              <label className="block font-medium text-base-content mb-2">
                Screenshot / Recording (optional)
              </label>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileChange}
                className="file-input file-input-bordered w-full max-w-xs"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-base-300 px-4 sm:px-6 py-4 rounded-b-xl bg-base-200">
          <span className="text-sm text-base-content/70">Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!summary || !steps || !severity}
            className={`px-5 py-2 rounded-lg shadow ${
              !summary || !steps || !severity
                ? "bg-base-300 text-base-content/50 cursor-not-allowed"
                : "bg-primary text-white hover:bg-primary/80"
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
