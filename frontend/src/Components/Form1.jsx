import React, { useEffect } from "react";
import usePersistentState from "../hooks/usePersistentState";

export default function Form1({ onAddSectionFromSidebar }) {
  const [quota, setQuota] = usePersistentState("form1_quota", 0);
  const [quiz, setQuiz] = usePersistentState("form1_quiz", false);
  const [captcha, setCaptcha] = usePersistentState("form1_captcha", false);
  const [shuffleQs, setShuffleQs] = usePersistentState("form1_shuffleQs", false);
  const [shuffleOptions, setShuffleOptions] = usePersistentState("form1_shuffleOptions", false);
  const [openAt, setOpenAt] = usePersistentState("form1_openAt", "");
  const [closeAt, setCloseAt] = usePersistentState("form1_closeAt", "");
  const [accent, setAccent] = usePersistentState("form1_accent", "#4f46e5");
  const [description, setDescription] = usePersistentState("form1_description", "");
  const [thankYouMessage, setThankYouMessage] = usePersistentState(
    "form1_thankYouMessage",
    "Thanks for your response!"
  );
  const [sections, setSections] = usePersistentState("form1_sections", []);

  // Detect dark mode
  const [darkMode, setDarkMode] = React.useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setDarkMode(savedTheme === "dark");
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const theme = document.documentElement.getAttribute("data-theme");
      setDarkMode(theme === "dark");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      title: `New Section`,
      content: "",
    };
    setSections([...sections, newSection]);
  };

  const handleRemoveSection = (id) => {
    setSections(sections.filter((section) => section.id !== id));
  };

  // Bind addSection to ref from App.jsx
  useEffect(() => {
    if (onAddSectionFromSidebar) {
      onAddSectionFromSidebar.current = handleAddSection;
    }
  }, [onAddSectionFromSidebar, sections]);

  return (
<div className={`max-w-6xl p-6 mx-auto shadow-lg rounded-xl
  ${darkMode 
     ? "bg-base-200 text-base-content border-white/20" 
     : "bg-white text-base-content border-gray-300"}`}>

      {/* Form Controls */}
      <div className="flex flex-wrap items-center gap-4">
        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={quiz}
            onChange={() => setQuiz(!quiz)}
            className={`${darkMode ? "bg-base-100 border-base-300" : "bg-white border-gray-300"}`}
          />
          <span>Quiz</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={captcha}
            onChange={() => setCaptcha(!captcha)}
            className={`${darkMode ? "bg-base-100 border-base-300" : "bg-white border-gray-300"}`}
          />
          <span>Captcha</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={shuffleQs}
            onChange={() => setShuffleQs(!shuffleQs)}
            className={`${darkMode ? "bg-base-100 border-base-300" : "bg-white border-gray-300"}`}
          />
          <span>Shuffle Qs</span>
        </label>

        <label className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={shuffleOptions}
            onChange={() => setShuffleOptions(!shuffleOptions)}
            className={`${darkMode ? "bg-base-100 border-base-300" : "bg-white border-gray-300"}`}
          />
          <span>Shuffle options</span>
        </label>

        <label className="flex items-center gap-1">
          <span>Quota</span>
          <input
            type="number"
            value={quota}
            onChange={(e) => setQuota(e.target.value)}
            className={`w-20 px-2 border rounded ${darkMode ? "bg-base-100 border-base-300 text-base-content" : "bg-white border-gray-300 text-base-content"}`}
          />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-4 mt-4">
        <label className="flex-1 min-w-[200px]">
          Open at
          <input
            type="datetime-local"
            value={openAt}
            onChange={(e) => setOpenAt(e.target.value)}
            className={`w-full px-2 py-1 mt-1 border rounded ${darkMode ? "bg-base-100 border-base-300 text-base-content text-purple-600" : "bg-white border-gray-300 text-base-content"}`}
          />
        </label>

        <label className="flex-1 min-w-[200px]">
          Close at
          <input
            type="datetime-local"
            value={closeAt}
            onChange={(e) => setCloseAt(e.target.value)}
            className={`w-full px-2 py-1 mt-1 border rounded ${darkMode ? "bg-base-100 border-base-300 text-base-content text-purple-600" : "bg-white border-gray-300 text-base-content"}`}
          />
        </label>

        <label className="flex items-center gap-1">
          <span>Accent</span>
          <input
            type="color"
            value={accent}
            onChange={(e) => setAccent(e.target.value)}
            className={`w-10 h-8 p-0 border rounded ${darkMode ? "border-base-300" : "border-gray-300"}`}
          />
        </label>
      </div>

      <div className="mt-4">
        <label className="block mb-1">Form description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your form (optional)"
          className={`w-full p-2 border rounded ${darkMode ? "bg-base-100 border-base-300 text-base-content" : "bg-white border-gray-300 text-base-content"}`}
        />
      </div>

      <div className="mt-4">
        <label className="block mb-1">Thank-you message</label>
        <input
          type="text"
          value={thankYouMessage}
          onChange={(e) => setThankYouMessage(e.target.value)}
          className={`w-full p-2 border rounded ${darkMode ? "bg-base-100 border-base-300 text-base-content" : "bg-white border-gray-300 text-base-content"}`}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => alert("Basics clicked")}
          className={`flex-1 px-4 py-2 border rounded hover:bg-base-200 ${darkMode ? "border-base-300" : "border-gray-300"}`}
        >
          Basics
        </button>
        <button
          onClick={() => alert("Details clicked")}
          className={`flex-1 px-4 py-2 border rounded hover:bg-base-200 ${darkMode ? "border-base-300" : "border-gray-300"}`}
        >
          Details
        </button>
        <button
          onClick={handleAddSection}
          className={`flex-1 px-4 py-2 border rounded hover:bg-base-200 ${darkMode ? "border-base-300" : "border-gray-300"}`}
        >
          Add section
        </button>
      </div>

      {/* Dynamic Sections */}
      <div className="mt-4 space-y-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`relative p-4 border rounded ${darkMode ? "bg-base-100 border-base-300" : "bg-gray-50 border-gray-300"}`}
          >
            <h3 className="font-semibold">{section.title}</h3>
            <textarea
              placeholder="Drag items here from the right to start building your form"
              value={section.content}
              onChange={(e) => {
                const updatedSections = sections.map((s) =>
                  s.id === section.id ? { ...s, content: e.target.value } : s
                );
                setSections(updatedSections);
              }}
              className={`w-full p-2 mt-2 border rounded ${darkMode ? "bg-base-100 border-base-300 text-base-content" : "bg-white border-gray-300 text-base-content"}`}
            />
            <button
              onClick={() => handleRemoveSection(section.id)}
              className="absolute text-red-500 top-2 right-2 hover:text-red-700"
            >
              Remove Section
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
