import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CourseEvaluation = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [instructorRating, setInstructorRating] = useState(""); // separate state
  const [contentRating, setContentRating] = useState(""); // separate state
  const [likeMost, setLikeMost] = useState("");
  const [improve, setImprove] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      fullName,
      instructorRating,
      contentRating,
      likeMost,
      improve,
    };
    console.log("Submitted Feedback:", feedback);
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
            Course Evaluation
          </h2>
          <p className="text-base text-gray-500 mb-6">
            Your feedback helps improve the course.
          </p>

          <h5 className="text-lg font-bold text-gray-800 mt-3 mb-3">
            Feedback
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Rate the Instructor */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Rate the instructor <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={instructorRating}
                onChange={(e) => setInstructorRating(e.target.value)}
                className="w-full"
                required
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Rate the course content */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Rate the event content <span className="text-red-500">*</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={contentRating}
                onChange={(e) => setContentRating(e.target.value)}
                className="w-full"
                required
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Weak</span>
                <span>Strong</span>
              </div>
            </div>

            {/* Most valuable part */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                What did you like most about the event?
              </label>
              <textarea
                rows="4"
                value={likeMost}
                onChange={(e) => setLikeMost(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Suggestions */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Suggestions for improvement
              </label>
              <textarea
                rows="4"
                value={improve}
                onChange={(e) => setImprove(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-6 py-4 rounded-b-xl bg-gray-50">
          <span className="text-sm text-gray-500">Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={instructorRating === "" || contentRating === ""}
            className={`px-5 py-2 rounded-lg shadow ${
              instructorRating === "" || contentRating === ""
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

export default CourseEvaluation;
