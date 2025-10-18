import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "../../context/FormContext";

const BugReport = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState({}); // ✅ store answers

  const { formQuestions } = useFormContext();
  const fields = formQuestions["Bug Report"] || [];

  // Track theme changes
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";

  // ✅ Update responses dynamically
  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

  // ✅ Submit form to backend
const handleSubmit = async (e) => {
  e.preventDefault();

  // ===== CHECK IF USER IS LOGGED IN =====
  const username = localStorage.getItem("username"); // get logged-in username
  if (!username) {
    alert("Please login first to submit your bug report.");
    return; // stop submission if user is not logged in
  }

  try {
    setLoading(true);

    // Prepare responses
    const formResponses = {};
    fields.forEach((field) => {
      formResponses[field.placeholder || field.label || "Untitled"] =
        responses[field.id] || "";
    });

    // ✅ Payload with logged-in username
    const payload = {
      formType: "Bug Report",
      user: username, // logged-in username
      responses: formResponses,
    };

const response = await fetch(`${import.meta.env.VITE_API_URL}/api/forms/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Bug Report submitted successfully!");
      onClose();
    } else {
      alert(data.message || "Failed to submit form.");
    }
  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Server error. Please try again later.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div
        className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col transition-colors duration-300 ${
          isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        {/* Header */}
        <div
          className={`flex justify-between items-center px-6 py-4 border-b ${
            isDark ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button
            className={`${
              isDark
                ? "text-gray-300 hover:text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={onClose}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Bug Report</h2>
          <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mb-6`}>
            Help us squash bugs.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div
                key={field.id}
                className={`border rounded-lg p-4 ${
                  isDark ? "border-gray-700 bg-gray-800" : "border-gray-300 bg-white"
                }`}
              >
                <label
                  className={`block font-medium mb-2 ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {/* {field.value || field.placeholder || "Untitled Question"}{" "} */}
                  {field.value || field.placeholder}
{field.options?.map(option => <li key={option}>{option}</li>)}

                  {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "Short answer" && (
                  <input
                    type="text"
            
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required || false}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDark
                        ? "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700"
                        : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"
                    }`}
                  />
                )}

                {field.type === "Paragraph" && (
                  <textarea
                    rows="4"
                    onChange={(e) => handleChange(field.id, e.target.value)}
                    required={field.required || false}
                    className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                      isDark
                        ? "bg-gray-800 text-gray-100 placeholder-gray-400 border-gray-700"
                        : "bg-white text-gray-900 placeholder-gray-400 border-gray-300"
                    }`}
                  />
                )}

                {field.type === "Multiple choice" && (
                  <div className="space-y-2">
                    {field.options?.map((option, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center space-x-2 ${
                          isDark ? "text-gray-100" : "text-gray-900"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`mcq-${field.id}`}
                          value={option}
                          onChange={() => handleChange(field.id, option)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                )}

                {field.type === "File Upload" && (
                  <input
                    type="file"
                    onChange={(e) =>
                      handleChange(field.id, e.target.files[0]?.name || "")
                    }
                    accept="image/*,video/*"
                    className="file-input file-input-bordered w-full max-w-xs"
                  />
                )}

                {field.type === "Linear scale" && (
                  <div className="flex items-center justify-between mt-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <label key={num} className="flex flex-col items-center text-sm">
                        <input
                          type="radio"
                          name={`scale-${field.id}`}
                          onChange={() => handleChange(field.id, num)}
                        />
                        <span>{num}</span>
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
          className={`flex items-center justify-between px-4 sm:px-6 py-4 rounded-b-xl border-t ${
            isDark ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"
          }`}
        >
          <span
            className={`${isDark ? "text-gray-400" : "text-gray-500"} text-sm`}
          >
            Page 1 of 1
          </span>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`px-5 py-2 rounded-lg shadow ${
              loading
                ? `${
                    isDark
                      ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                      : "bg-gray-300 text-gray-400 cursor-not-allowed"
                  }`
                : "bg-blue-800 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BugReport;
