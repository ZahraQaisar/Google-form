import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

const EventRegister = ({ onClose }) => {
  const [theme, setTheme] = useState("light"); // track current theme
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [topics, setTopics] = useState([]);

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

  const handleCheckboxChange = (topic) => {
    setTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
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
          <h2 className="text-2xl font-bold mb-2">Event Registration</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>
            Please register to attend.
          </p>

          <h5 className="text-lg font-bold mb-3">Registration</h5>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
            </div>

            {/* Email */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
            </div>

            {/* Preferred Time */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Preferred time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2
                  ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`}
                required
              />
            </div>

            {/* Topics of interest */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
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
        <div className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl
                        ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
          <span className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Page 1 of 1</span>
          <button
            onClick={handleSubmit}
            disabled={!fullName || !email || !preferredTime}
            className={`px-5 py-2 rounded-lg shadow ${
              !fullName || !email || !preferredTime
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

export default EventRegister;
