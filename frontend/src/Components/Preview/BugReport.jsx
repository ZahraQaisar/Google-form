import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const BugReport = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [summary, setSummary] = useState(""); 
  const [steps, setSteps] = useState(""); 
  const [severity, setSeverity] = useState(""); 
  const [screenshot, setScreenshot] = useState(null); 

  // Track theme changes
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const bugReport = { summary, steps, severity, screenshot };
    console.log("Submitted Bug Report:", bugReport);
    alert("Thanks for submitting the bug report!");
    onClose();
  };

  const handleFileChange = (e) => setScreenshot(e.target.files[0]);

  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div
        className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col transition-colors duration-300
                    ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center px-6 py-4 border-b
                        ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className="text-xl font-bold">{`Form Preview`}</h2>
          <button className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}`} onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Bug Report</h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-6`}>Help us squash bugs.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Summary */}
            <div className={`border rounded-lg p-4 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Summary <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Enter summary"
                required
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary
                            ${isDark ? "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"}`}
              />
            </div>

            {/* Steps to reproduce */}
            <div className={`border rounded-lg p-4 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Steps to reproduce <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="4"
                value={steps}
                onChange={(e) => setSteps(e.target.value)}
                placeholder="Enter steps..."
                required
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary
                            ${isDark ? "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"}`}
              />
            </div>

            {/* Severity */}
            <div className={`border rounded-lg p-4 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                Severity <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Blocker", "Critical", "Major", "Minor"].map((option) => (
                  <label key={option} className={`flex items-center space-x-2 ${isDark ? "text-gray-100" : "text-gray-900"}`}>
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

            {/* Screenshot */}
            <div className={`border rounded-lg p-4 ${isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Screenshot / Recording (optional)</label>
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
        <div className={`flex items-center justify-between px-4 sm:px-6 py-4 rounded-b-xl border-t
                        ${isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
          <span className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}>Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!summary || !steps || !severity}
            className={`px-5 py-2 rounded-lg shadow ${
              !summary || !steps || !severity
                ? `${isDark ? "bg-gray-400 text-gray-200 cursor-not-allowed" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`
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
