import React from "react";
import { IoClose } from "react-icons/io5";

const TemplateModal = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  const templates = [
    { title: "Event Feedback", desc: "Post-event satisfaction with ratings & comments" },
    { title: "Job Application", desc: "Collect candidate info & resume upload" },
    { title: "Customer Satisfaction (CSAT + NPS)", desc: "NPS, usage questions & comments" },
    { title: "Course Evaluation", desc: "Education-focused feedback for instructors" },
    { title: "Event Registration", desc: "Basic registration form with date & time" },
    { title: "RSVP", desc: "Yes/No RSVP with meal preference" },
    { title: "Bug Report", desc: "Repro steps + file upload screenshot" },
    { title: "Employee Feedback", desc: "Internal company pulse survey" },
    { title: "Lead Capture", desc: "Simple marketing lead form" },
    { title: "Quiz (Multiple Choice)", desc: "Preconfigured quiz mode with scoring" },
  ];

  const theme = document.documentElement.getAttribute("data-theme") || "light";
  const isDark = theme === "dark";

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 px-4 sm:px-6">
      <div
        className={`w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-xl shadow-lg transition-colors duration-300
                    ${isDark ? "bg-gray-900 text-gray-100" : "bg-white text-gray-900"}`}
      >
        {/* Header */}
        <div className={`flex items-center justify-between border-b px-4 sm:px-6 py-4
                        ${isDark ? "border-gray-700" : "border-gray-200"}`}>
          <h2 className={`${isDark ? "text-gray-300" : "text-gray-900"} text-lg font-semibold`}>Choose a template</h2>
          <button className={`${isDark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}`} onClick={onClose}>
            <IoClose size={24} />
          </button>
        </div>

        {/* Templates list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 sm:p-6 overflow-y-auto" style={{ maxHeight: "calc(90vh - 64px)" }}>
          {templates.map((t, index) => (
            <div
              key={index}
              className={`border rounded-lg p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-colors duration-300
                          ${isDark ? "bg-gray-800 border-gray-700 text-gray-100" : "bg-white border-gray-300 text-gray-900"}`}
            >
              <div>
                <h3 className="font-medium text-lg">{t.title}</h3>
                <p className={`${isDark ? "text-gray-400" : "text-gray-500"} mt-1 text-sm`}>{t.desc}</p>
              </div>
              <button
                onClick={() => onSelectTemplate(t.title)}
                className="mt-4 px-3 py-1.5 rounded-md text-sm font-medium bg-blue-800 text-white hover:bg-blue-700"
              >
                Use this
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
