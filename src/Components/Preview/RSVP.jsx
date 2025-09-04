import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const RSVP = ({ onClose }) => {
  const [willAttend, setWillAttend] = useState(""); 
  const [mealPreference, setMealPreference] = useState("Select..");
  const [allergies, setAllergies] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const registration = { willAttend, mealPreference, allergies };
    console.log("Submitted RSVP:", registration);
    alert("Thanks for registering!");
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">RSVP</h2>
          <p className="text-base text-gray-500 mb-6">
            Let us know if you can make it.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Will you attend? */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Will you attend? <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {["Yes", "No", "Maybe"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="willAttend"
                      value={option}
                      checked={willAttend === option}
                      onChange={(e) => setWillAttend(e.target.value)}
                      required
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Meal preference */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Meal Preference
              </label>
              <select
                value={mealPreference}
                onChange={(e) => setMealPreference(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {["Select..", "Veg", "Non Veg", "Vegan", "Halal", "Kosher"].map(
                  (option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* Allergies */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Allergies (if any)
              </label>
              <input
                type="text"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
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
            disabled={!willAttend}
            className={`px-5 py-2 rounded-lg shadow ${
              !willAttend
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

export default RSVP;
