import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "../../context/FormContext"; // Provides dynamic template questions
import axios from "axios";

const LeadCapture = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [lookingFor, setLookingFor] = useState("");

  // Dynamic fields state
  const [dynamicResponses, setDynamicResponses] = useState({});
  const { formQuestions } = useFormContext();
  const dynamicFields = formQuestions["Lead Capture"] || [];

  useEffect(() => {
    const updateTheme = () => {
      const currentTheme =
        document.documentElement.getAttribute("data-theme") || "light";
      setTheme(currentTheme);
    };

    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const handleDynamicChange = (id, value) => {
    setDynamicResponses((prev) => ({ ...prev, [id]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // ===== LOGIN CHECK =====
  const username = localStorage.getItem("username");
  if (!username) {
    alert("Please login first to submit the form.");
    return; // Stop submission if not logged in
  }

  // Validate required static fields
  if (!fullName || !email || !company) {
    alert("Please fill all required fields.");
    return;
  }

  // Validate required dynamic fields
  const unfilledDynamic = dynamicFields.some(
    (f) => f.required && !dynamicResponses[f.id]
  );
  if (unfilledDynamic) {
    alert("Please fill all required dynamic fields.");
    return;
  }

  // Prepare payload
  const payload = {
    formType: "Lead Capture",
    user: username, // top-level field for backend
    responses: {
      fullName,
      email,
      company,
      lookingFor,
      ...dynamicResponses,
    },
  };

  try {
    const response = await axios.post(
  `${import.meta.env.VITE_API_URL}/api/forms/submit`,
  payload,
      { headers: { "Content-Type": "application/json" } }
    );
    alert(response.data.message || "Thanks for registering!");
    onClose();
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("An error occurred. Please try again later.");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div
        className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col
                    transition-colors duration-300 ${
                      theme === "dark"
                        ? "bg-gray-900 text-gray-100"
                        : "bg-white text-gray-900"
                    }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-4 sm:px-6 py-4 border-b
                      ${
                        theme === "dark"
                          ? "border-gray-700"
                          : "border-gray-200"
                      }`}
        >
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button
            onClick={onClose}
            className={
              theme === "dark"
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Lead Capture</h2>
          <p
            className={
              theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"
            }
          >
            We will not spam you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ==== STATIC FIELDS KEPT AS IS ==== */}
            <div
              className={`border rounded-lg p-4 ${
                theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
              }`}
            >
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Your name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div
              className={`border rounded-lg p-4 ${
                theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
              }`}
            >
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"
                }`}
                required
              />
            </div>

            <div
              className={`border rounded-lg p-4 ${
                theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
              }`}
            >
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                Company
              </label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>

            <div
              className={`border rounded-lg p-4 ${
                theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
              }`}
            >
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                What are you looking for?
              </label>
              <textarea
                rows="4"
                value={lookingFor}
                onChange={(e) => setLookingFor(e.target.value)}
                className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                  theme === "dark"
                    ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700"
                    : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"
                }`}
              />
            </div>

            {/* ==== DYNAMIC QUESTIONS BELOW STATIC FIELDS ==== */}
            {dynamicFields.map((field) => (
              <div
                key={field.id}
                className={`border rounded-lg p-4 ${
                  theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"
                }`}
              >
                <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {field.placeholder} {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "Short answer" && (
                  <input
                    type="text"
                    value={dynamicResponses[field.id] || ""}
                    onChange={(e) => handleDynamicChange(field.id, e.target.value)}
                    required={field.required || false}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700"
                        : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                )}

                {field.type === "Paragraph" && (
                  <textarea
                    rows="4"
                    value={dynamicResponses[field.id] || ""}
                    onChange={(e) => handleDynamicChange(field.id, e.target.value)}
                    required={field.required || false}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
                      theme === "dark"
                        ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700"
                        : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"
                    }`}
                  />
                )}

                {field.type === "Multiple choice" && (
                  <div className="space-y-2">
                    {field.options?.map((option, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center space-x-2 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}
                      >
                        <input
                          type="radio"
                          name={`mcq-${field.id}`}
                          value={option}
                          checked={dynamicResponses[field.id] === option}
                          onChange={() => handleDynamicChange(field.id, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div
          className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl ${
            theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
          }`}
        >
          <span className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
            Page 1 of 1
          </span>
          <button
            onClick={handleSubmit}
            disabled={!fullName || !email || !company}
            className={`px-5 py-2 rounded-lg shadow ${
              !fullName || !email || !company
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

export default LeadCapture;
