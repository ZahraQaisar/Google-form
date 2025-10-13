import React, { useEffect, useState } from "react";
import usePersistentState from "../../hooks/usePersistentState";

const CheckboxesComponent = ({ id, placeholder, options = [], onCopy, onDelete }) => {
  // Persistent states
  const [questionTitle, setQuestionTitle] = usePersistentState(
    `checkboxes_${id}_title`,
    placeholder || "Question title (use {{qid}} to reference answers)"
  );
  const [description, setDescription] = usePersistentState(
    `checkboxes_${id}_description`,
    ""
  );
  const [prefillKey, setPrefillKey] = usePersistentState(
    `checkboxes_${id}_prefill`,
    ""
  );
  const [checkboxOptions, setCheckboxOptions] = usePersistentState(
    `checkboxes_${id}_options`,
    options.length > 0 ? options : ["Option 1", "Option 2"]
  );

  const [isRequired, setIsRequired] = usePersistentState(
    `checkboxes_${id}_required`,
    false
  );

  // Theme detection
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.getAttribute("data-theme") || "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  const isDark = theme === "dark";
  const containerBg = isDark ? "bg-base-800 text-gray-100" : "bg-white text-gray-900";
  const inputBg = isDark
    ? "bg-base-700 text-gray-100 placeholder-gray-400 border-white/20"
    : "bg-white text-gray-900 placeholder-gray-400 border-gray-300";
  const labelText = isDark ? "text-gray-300" : "text-gray-700";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-500";

  // Add option handler
  const handleAddOption = () => {
    setCheckboxOptions((prev) => [...prev, `Option ${prev.length + 1}`]);
  };

  return (
    <div className={`space-y-4 p-4 rounded-lg shadow-md transition-colors duration-300 ${containerBg}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-xl font-semibold ${labelText}`}>Checkboxes</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Checkboxes
        </span>
      </div>

      {/* Question */}
      <input
        type="text"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
        placeholder="Question title (use {{qid}} to reference answers)"
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
      />

      {/* Description + Prefill */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description / help (optional)"
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
        <input
          type="text"
          value={prefillKey}
          onChange={(e) => setPrefillKey(e.target.value)}
          placeholder="Prefill key (optional)"
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
      </div>

      {/* Dynamic Options */}
      <div className="space-y-2">
        {checkboxOptions.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input type="checkbox" className="text-blue-600 rounded form-checkbox" />
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const updated = [...checkboxOptions];
                updated[index] = e.target.value;
                setCheckboxOptions(updated);
              }}
              className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
            />
          </div>
        ))}
      </div>

      {/* Add option button */}
      <button
        type="button"
        onClick={handleAddOption}
        className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800 transition-colors duration-300"
      >
        + Add option
      </button>

      {/* Conditional Logic */}
      <div className="mt-4">
        <span className={secondaryText}>Conditional logic (show when...)</span>
      </div>

      {/* Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label className={`flex items-center ${labelText}`}>
          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            className="mr-2 text-blue-600 rounded form-checkbox"
          />
          Required
        </label>
        <div className="flex gap-4">
          <button onClick={onDelete} className="text-red-500 hover:text-red-700 transition-colors duration-300">
            Delete
          </button>
          <button onClick={onCopy} className="text-blue-500 hover:text-blue-700 transition-colors duration-300">
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckboxesComponent;
