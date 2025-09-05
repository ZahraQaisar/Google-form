import React, { useState } from "react";
import { IoClose } from "react-icons/io5";

const EventRegister = ({ onClose }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [topics, setTopics] = useState([]);

  const handleCheckboxChange = (topic) => {
    setTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic) // remove if already selected
        : [...prev, topic] // add if not selected
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const registration = { fullName, email, preferredTime, topics };
    console.log("Submitted Registration:", registration);
    alert("Thanks for registering!");
    onClose();
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
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Event Registration
          </h2>
          <p className="text-base text-gray-500 mb-6">
            Please register to attend.
          </p>

          <h5 className="text-lg font-bold text-gray-800 mt-3 mb-3">
            Registration
          </h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Email */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Preferred time */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Preferred time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                placeholder="12:30"
                className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Topics of interest (optional) */}
            <div className="border rounded-lg p-4">
              <label className="block font-medium text-gray-700 mb-2">
                Topics of interest (optional)
              </label>
              <div className="space-y-2">
                {["AI", "Web Dev", "Design", "Marketing"].map((topic) => (
                  <label key={topic} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={topic}
                      checked={topics.includes(topic)}
                      onChange={() => handleCheckboxChange(topic)}
                    />
                    <span>{topic}</span>
                  </label>
                ))}
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl bg-gray-50">
          <span className="text-sm text-gray-500">Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!fullName || !email || !preferredTime}
            className={`px-5 py-2 rounded-lg shadow ${!fullName || !email || !preferredTime
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

export default EventRegister;
