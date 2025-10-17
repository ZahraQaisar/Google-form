import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "../../context/FormContext"; // make sure your context provides template questions
import axios from "axios";

const EventFeedback = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [fullName, setFullName] = useState("");
  const [eventRating, setEventRating] = useState("");
  const [likeMost, setLikeMost] = useState("");
  const [improve, setImprove] = useState("");
  const [heardFrom, setHeardFrom] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formQuestions } = useFormContext();
  const dynamicFields = formQuestions["Event Feedback"] || [];
  const [responses, setResponses] = useState({}); // store dynamic responses

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

  const handleChange = (id, value) => {
    setResponses((prev) => ({ ...prev, [id]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  // ===== LOGIN CHECK =====
  const username = localStorage.getItem("username"); // get logged-in username
  if (!username) {
    alert("Please login first to submit the feedback.");
    return; // stop submission if not logged in
  }

  // Validate dynamic required fields
  const requiredUnfilled = dynamicFields.some(f => f.required && !responses[f.id]);
  if (requiredUnfilled) {
    alert("Please fill all required dynamic fields.");
    return;
  }

  try {
    setIsSubmitting(true);

    const token = localStorage.getItem("token");

    const payload = {
      formType: "Event Feedback",
      user: username, // send the logged-in username
      responses: {
        fullName,
        eventRating,
        likeMost,
        improve,
        heardFrom,
        ...responses, // include dynamic fields
      },
    };

    const res = await axios.post(
      "http://localhost:5000/api/forms/submit",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    alert(res.data.message || "Thanks for your feedback!");
    onClose();
  } catch (error) {
    console.error("Error submitting feedback:", error);
    alert("Error submitting feedback. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
        {/* Header */}
        <div className={`flex justify-between items-center px-6 py-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button onClick={onClose} className={theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">Event Feedback</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>
            We value your thoughts about the event.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* === STATIC FIELDS === */}
            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Your name</label>
              <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Enter your name (optional)" className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`} />
            </div>

            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Rate the event <span className="text-red-500">*</span></label>
              <input type="range" min="0" max="100" value={eventRating} onChange={(e) => setEventRating(e.target.value)} className="w-full" required />
              <div className={theme === "dark" ? "flex justify-between text-xs text-gray-400 mt-1" : "flex justify-between text-xs text-gray-500 mt-1"}>
                <span>Poor</span><span>Excellent</span>
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>How did you hear about it?</label>
              <div className="space-y-2">
                {["Email", "Social media", "Friend", "Website"].map((option) => (
                  <label key={option} className="flex items-center space-x-2">
                    <input type="radio" name="heardFrom" value={option} checked={heardFrom === option} onChange={(e) => setHeardFrom(e.target.value)} />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>What did you like most?</label>
              <textarea rows="3" value={likeMost} onChange={(e) => setLikeMost(e.target.value)} placeholder="Write your feedback..." className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`} />
            </div>

            <div className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
              <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>What can we improve?</label>
              <textarea rows="3" value={improve} onChange={(e) => setImprove(e.target.value)} placeholder="Write your feedback..." className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`} />
            </div>

            {/* === DYNAMIC FIELDS BELOW STATIC ONES === */}
            {dynamicFields.map((field) => (
              <div key={field.id} className={`border rounded-lg p-4 ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-300 bg-white"}`}>
                <label className={`block font-medium mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                  {field.placeholder} {field.required && <span className="text-red-500">*</span>}
                </label>

                {field.type === "Short answer" && (
                  <input type="text" value={responses[field.id] || ""} onChange={(e) => handleChange(field.id, e.target.value)} required={field.required || false} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`} />
                )}

                {field.type === "Paragraph" && (
                  <textarea rows="4" value={responses[field.id] || ""} onChange={(e) => handleChange(field.id, e.target.value)} required={field.required || false} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${theme === "dark" ? "bg-gray-900 text-gray-100 placeholder-gray-400 border-gray-700 focus:ring-gray-700" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300 focus:ring-blue-500"}`} />
                )}

                {field.type === "Multiple choice" && (
                  <div className="space-y-2">
                    {field.options?.map((option, idx) => (
                      <label key={idx} className={`flex items-center space-x-2 ${theme === "dark" ? "text-gray-100" : "text-gray-900"}`}>
                        <input type="radio" name={`mcq-${field.id}`} value={option} checked={responses[field.id] === option} onChange={() => handleChange(field.id, option)} />
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
        <div className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl ${theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50"}`}>
          <span className={theme === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>Page 1 of 1</span>
          <button onClick={handleSubmit} disabled={!eventRating || isSubmitting} className={`px-5 py-2 rounded-lg shadow ${!eventRating || isSubmitting ? "bg-gray-400 cursor-not-allowed" : theme === "dark" ? "bg-gray-800 text-gray-100 hover:bg-gray-700" : "bg-blue-800 text-white hover:bg-blue-700"}`}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventFeedback;
