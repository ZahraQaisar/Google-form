import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const Quiz = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [capitalAnswer, setCapitalAnswer] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [planetAnswer, setPlanetAnswer] = useState("");

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
    const feedback = {
      capitalAnswer,
      mathAnswer,
      planetAnswer,
    };
    console.log("Submitted Answers:", feedback);
    alert("Thanks for your response!");
    onClose();
  };

  const questionStyle = theme === "dark"
    ? "border-gray-700 bg-gray-900 text-gray-100"
    : "border-gray-300 bg-white text-gray-900";

  const labelTextStyle = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const footerStyle = theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50";
  const pageTextStyle = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const closeBtnStyle = theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col transition-colors duration-300
                      ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
        {/* Header */}
        <div className={`flex justify-between items-center px-4 sm:px-6 py-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button onClick={onClose} className={closeBtnStyle}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">General Knowledge Quiz</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>Answer the questions below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Q1: Capital of France */}
            <div className={`border rounded-lg p-4 ${questionStyle}`}>
              <label className={`block font-medium mb-2 ${labelTextStyle}`}>
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
            <div className={`border rounded-lg p-4 ${questionStyle}`}>
              <label className={`block font-medium mb-2 ${labelTextStyle}`}>
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
            <div className={`border rounded-lg p-4 ${questionStyle}`}>
              <label className={`block font-medium mb-2 ${labelTextStyle}`}>
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
        <div className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl ${footerStyle}`}>
          <span className={`text-sm ${pageTextStyle}`}>Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!capitalAnswer || !mathAnswer || !planetAnswer}
            className={`px-5 py-2 rounded-lg shadow ${
              !capitalAnswer || !mathAnswer || !planetAnswer
                ? "bg-gray-400 cursor-not-allowed"
                : theme === "dark"
                ? "bg-gray-800 text-gray-100 hover:bg-gray-700"
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
