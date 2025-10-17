import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { useFormContext } from "../../context/FormContext"; // Provides dynamic template questions
import axios from "axios";

const Quiz = ({ onClose }) => {
  const [theme, setTheme] = useState("light");
  const [capitalAnswer, setCapitalAnswer] = useState("");
  const [mathAnswer, setMathAnswer] = useState("");
  const [planetAnswer, setPlanetAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { formQuestions } = useFormContext();
  const dynamicFields = formQuestions["Quiz"] || [];

  // Dynamic responses state
  const [dynamicResponses, setDynamicResponses] = useState({});

  // Sync dynamic responses whenever template changes
useEffect(() => {
  setDynamicResponses((prev) => {
    const updated = {};
    dynamicFields.forEach((q) => {
      // Keep previous answer if exists, else initialize empty string
      updated[q.id] = prev[q.id] ?? "";
    });
    return updated;
  });
}, [dynamicFields]);


  // Theme handling
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const handleDynamicChange = (id, value) => {
    setDynamicResponses((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate static fields
    if (!capitalAnswer || !mathAnswer || !planetAnswer) {
      alert("Please fill all required fields.");
      return;
    }

    // Validate dynamic fields
    const unfilledDynamic = dynamicFields.some((f) => f.required && !dynamicResponses[f.id]);
    if (unfilledDynamic) {
      alert("Please fill all required dynamic fields.");
      return;
    }

    const payload = {
      formType: "Quiz",
      username: localStorage.getItem("username") || "Guest",
      responses: {
        capitalAnswer,
        mathAnswer,
        planetAnswer,
        ...dynamicResponses,
      },
    };

    try {
      setIsSubmitting(true);
      const response = await axios.post("http://localhost:5000/api/forms/submit", payload, {
        headers: { "Content-Type": "application/json" },
      });
      alert(response.data.message || "Quiz submitted successfully!");
      onClose();
    } catch (error) {
      console.error("Error submitting Quiz:", error);
      alert("Error connecting to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Styles
  const questionStyle = theme === "dark" ? "border-gray-700 bg-gray-900 text-gray-100" : "border-gray-300 bg-white text-gray-900";
  const labelTextStyle = theme === "dark" ? "text-gray-300" : "text-gray-700";
  const inputStyle = theme === "dark" ? "bg-gray-800 text-gray-100 border-gray-600 placeholder-gray-400" : "bg-white text-gray-900 border-gray-300 placeholder-gray-500";
  const footerStyle = theme === "dark" ? "border-gray-700 bg-gray-900" : "border-gray-200 bg-gray-50";
  const pageTextStyle = theme === "dark" ? "text-gray-400" : "text-gray-500";
  const closeBtnStyle = theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div className={`w-full max-w-3xl mx-auto max-h-[90vh] rounded-xl shadow-lg relative flex flex-col transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}>
        {/* Header */}
        <div className={`flex justify-between items-center px-4 sm:px-6 py-4 border-b ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className="text-xl font-bold">Form Preview</h2>
          <button onClick={onClose} className={closeBtnStyle}><IoClose size={24} /></button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <h2 className="text-2xl font-bold mb-2">General Knowledge Quiz</h2>
          <p className={theme === "dark" ? "text-gray-400 mb-6" : "text-gray-500 mb-6"}>Answer the questions below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ==== STATIC QUESTIONS ==== */}
            <div className={`border rounded-lg p-4 ${questionStyle}`}>
              <label className={`block font-medium mb-2 ${labelTextStyle}`}>Capital of France? <span className="text-red-500">*</span></label>
              {["Paris","Lyon","Nice"].map(opt => (
                <label key={opt} className="flex items-center space-x-2">
                  <input type="radio" name="capital" value={opt} checked={capitalAnswer===opt} onChange={e=>setCapitalAnswer(e.target.value)} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className={`border rounded-lg p-4 ${questionStyle}`}>
              <label className={`block font-medium mb-2 ${labelTextStyle}`}>2 + 2 = ? <span className="text-red-500">*</span></label>
              {["3","4","5"].map(opt => (
                <label key={opt} className="flex items-center space-x-2">
                  <input type="radio" name="math" value={opt} checked={mathAnswer===opt} onChange={e=>setMathAnswer(e.target.value)} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            <div className={`border rounded-lg p-4 ${questionStyle}`}>
              <label className={`block font-medium mb-2 ${labelTextStyle}`}>Largest planet? <span className="text-red-500">*</span></label>
              {["Earth","Jupiter","Mars"].map(opt => (
                <label key={opt} className="flex items-center space-x-2">
                  <input type="radio" name="planet" value={opt} checked={planetAnswer===opt} onChange={e=>setPlanetAnswer(e.target.value)} required />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* ==== DYNAMIC QUESTIONS ==== */}
            {dynamicFields.map((field) => (
              <div key={field.id} className={`border rounded-lg p-4 ${questionStyle}`}>
                <label className={`block font-medium mb-2 ${labelTextStyle}`}>{field.placeholder} {field.required && <span className="text-red-500">*</span>}</label>

                {field.type==="Short answer" && (
                  <input type="text" value={dynamicResponses[field.id]||""} onChange={e=>handleDynamicChange(field.id,e.target.value)} required={field.required||false} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${inputStyle}`} />
                )}
                {field.type==="Paragraph" && (
                  <textarea rows="4" value={dynamicResponses[field.id]||""} onChange={e=>handleDynamicChange(field.id,e.target.value)} required={field.required||false} className={`w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 ${inputStyle}`} />
                )}
                {field.type==="Multiple choice" && (
                  <div className="space-y-2">
                    {field.options?.map((opt,idx)=>(
                      <label key={idx} className={`flex items-center space-x-2 ${theme==="dark"?"text-gray-100":"text-gray-900"}`}>
                        <input type="radio" name={`mcq-${field.id}`} value={opt} checked={dynamicResponses[field.id]===opt} onChange={()=>handleDynamicChange(field.id,opt)} />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </form>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-between border-t px-4 sm:px-6 py-4 rounded-b-xl ${footerStyle}`}>
          <span className={`text-sm ${pageTextStyle}`}>Page 1 of 1</span>
          <button onClick={handleSubmit} disabled={!capitalAnswer || !mathAnswer || !planetAnswer || isSubmitting} className={`px-5 py-2 rounded-lg shadow ${!capitalAnswer || !mathAnswer || !planetAnswer || isSubmitting ? "bg-gray-400 cursor-not-allowed" : theme==="dark"?"bg-gray-800 text-gray-100 hover:bg-gray-700":"bg-blue-800 text-white hover:bg-blue-700"}`}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
