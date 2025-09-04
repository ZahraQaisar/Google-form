import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const CustomerSatisfaction = ({ onClose }) => {
  const [eventRating, setEventRating] = useState(""); // required
  const [recommendScore, setRecommendScore] = useState(""); // numerical (0–10)
  const [likeMost, setLikeMost] = useState("");
  const [improve, setImprove] = useState("");
  const [heardFrom, setHeardFrom] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedback = {
      eventRating,
      recommendScore,
      likeMost,
      improve,
      heardFrom,
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
            Customer Satisfaction Survey
          </h2>
          <p className="text-base text-gray-500 mb-6">
            Help us improve our product.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Overall satisfaction (Required) */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
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
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Bad</span>
                <span>Great</span>
              </div>
            </div>

            {/* How often do you use the product? */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                How often do you use the product? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Daily", "Weekly", "Monthly", "Rarely"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="heardFrom"
                      value={option}
                      checked={heardFrom === option}
                      onChange={(e) => setHeardFrom(e.target.value)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* How likely are you to recommend us? (0–10) */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                How likely are you to recommend us? (0–10) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={recommendScore}
                onChange={(e) => setRecommendScore(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* What did you like most */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                What did you like most?
              </label>
              <textarea
                rows="4"
                value={likeMost}
                onChange={(e) => setLikeMost(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* What can we improve */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                What can we improve?
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
            disabled={eventRating === "" || recommendScore === ""}
            className={`px-5 py-2 rounded-lg shadow ${
              eventRating === "" || recommendScore === ""
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

export default CustomerSatisfaction;
