import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CourseEvaluation = ({ onClose }) => {
  const [theme, setTheme] = useState("light"); // track current theme
  const [fullName, setFullName] = useState("");
  const [instructorRating, setInstructorRating] = useState(""); 
  const [contentRating, setContentRating] = useState(""); 
  const [likeMost, setLikeMost] = useState("");
  const [improve, setImprove] = useState("");

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme(); // initial theme
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = { fullName, instructorRating, contentRating, likeMost, improve };
    console.log("Submitted Feedback:", feedback);
    alert("Thanks for your response!");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div
        className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col
                    transition-colors duration-300 ${
                      theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
                    }`}
      >
        {/* Header */}
        <div className={`flex justify-between items-center px-6 py-4 border-b
                        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button
            onClick={onClose}
            className={theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Course Evaluation</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>
            Your feedback helps improve the course.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rate Instructor */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Rate the instructor <span className="text-red-500">*</span>
              </label>
              <input type="range" min="0" max="100" value={instructorRating} onChange={(e) => setInstructorRating(e.target.value)} className="w-full" required />
              <div className={theme === "dark" ? "flex justify-between text-xs text-gray-400 mt-1" : "flex justify-between text-xs text-gray-500 mt-1"}>
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Rate Content */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Rate the event content <span className="text-red-500">*</span>
              </label>
              <input type="range" min="0" max="100" value={contentRating} onChange={(e) => setContentRating(e.target.value)} className="w-full" required />
              <div className={theme === "dark" ? "flex justify-between text-xs text-gray-400 mt-1" : "flex justify-between text-xs text-gray-500 mt-1"}>
                <span>Weak</span>
                <span>Strong</span>
              </div>
            </div>

            {/* Most valuable part */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                What did you like most about the event?
              </label>
              <textarea
                rows="4"
                value={likeMost}
                onChange={(e) => setLikeMost(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                            ${theme === "dark" ? "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"}`}
              />
            </div>

            {/* Suggestions */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700" : "border-gray-300"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Suggestions for improvement
              </label>
              <textarea
                rows="4"
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500
                            ${theme === "dark" ? "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"}`}
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl
                        ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
          <span className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={instructorRating === "" || contentRating === ""}
            className={`px-5 py-2 rounded-lg shadow ${
              !instructorRating || !contentRating
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
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

export default CourseEvaluation;
