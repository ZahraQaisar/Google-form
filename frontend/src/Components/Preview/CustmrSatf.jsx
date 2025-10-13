import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CustomerSatisfaction = ({ onClose }) => {
  const [theme, setTheme] = useState("light"); // track current theme
  const [eventRating, setEventRating] = useState(""); 
  const [recommendScore, setRecommendScore] = useState(""); 
  const [likeMost, setLikeMost] = useState("");
  const [improve, setImprove] = useState("");
  const [heardFrom, setHeardFrom] = useState("");

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = { eventRating, recommendScore, likeMost, improve, heardFrom };
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
          <h2 className="text-2xl font-bold mb-2">Customer Satisfaction Survey</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>
            Help us improve our product.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Overall satisfaction */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Overall satisfaction <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={eventRating}
                onChange={(e) => setEventRating(e.target.value)}
                className="w-full"
                required
              />
              <div className={theme === "dark" ? "flex justify-between text-xs text-gray-400 mt-1" : "flex justify-between text-xs text-gray-500 mt-1"}>
                <span>Bad</span>
                <span>Great</span>
              </div>
            </div>

            {/* How often do you use the product? */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                How often do you use the product? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Daily", "Weekly", "Monthly", "Rarely"].map((option) => (
                  <label key={option} className={`flex items-center space-x-2 ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}>
                    <input
                      type="radio"
                      name="heardFrom"
                      value={option}
                      checked={heardFrom === option}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      required
                      className={theme === "dark" ? "accent-gray-400" : "accent-blue-600"}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Recommend Score */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                How likely are you to recommend us? (0–10) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={recommendScore}
                onChange={(e) => setRecommendScore(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
            </div>

            {/* What did you like most */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>What did you like most?</label>
              <textarea
                rows="4"
                value={likeMost}
                onChange={(e) => setLikeMost(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
              />
            </div>

            {/* What can we improve */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>What can we improve?</label>
              <textarea
                rows="4"
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
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
            disabled={eventRating === "" || recommendScore === ""}
            className={`px-5 py-2 rounded-lg shadow ${
              !eventRating || !recommendScore
                ? theme === "dark" ? "bg-gray-700 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-gray-400 cursor-not-allowed"
                : theme === "dark" ? "bg-gray-800 text-gray-100 hover:bg-gray-700" : "bg-blue-800 text-white hover:bg-blue-700"
            }`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerSatisfaction;
