import React, { useState, useEffect } from "react";
import usePersistentState from "../../hooks/usePersistentState";

const GridComponent = ({ placeholder, onCopy, onDelete }) => {
  // Persistent states
  const [title, setTitle] = usePersistentState("grid-title", "");
  const [description, setDescription] = usePersistentState("grid-description", "");
  const [prefillKey, setPrefillKey] = usePersistentState("grid-prefillKey", "");
  const [row1, setRow1] = usePersistentState("grid-row1", "");
  const [row2, setRow2] = usePersistentState("grid-row2", "");
  const [col1, setCol1] = usePersistentState("grid-col1", "");
  const [col2, setCol2] = usePersistentState("grid-col2", "");
  const [required, setRequired] = usePersistentState("grid-required", false);

  const [theme, setTheme] = useState("light");

  // Detect dark/light theme
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

  return (
    <div className={`space-y-4 p-4 rounded-lg shadow-md transition-colors duration-300 ${containerBg}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-xl font-semibold ${labelText}`}>Grid / Matrix</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Grid / Matrix
        </span>
      </div>

      {/* Question Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder={placeholder || "Question title (use {{qid}} to reference answers)"}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
      />

      {/* Description + Prefill Key */}
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

      {/* Grid Rows + Columns */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <h3 className={`mb-2 text-sm font-semibold ${labelText}`}>Rows</h3>
          <input
            type="text"
            value={row1}
            onChange={(e) => setRow1(e.target.value)}
            placeholder="Row 1"
            className={`w-full px-4 py-2 mb-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
          />
          <input
            type="text"
            value={row2}
            onChange={(e) => setRow2(e.target.value)}
            placeholder="Row 2"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
          />
        </div>
        <div className="flex-1">
          <h3 className={`mb-2 text-sm font-semibold ${labelText}`}>Columns</h3>
          <input
            type="text"
            value={col1}
            onChange={(e) => setCol1(e.target.value)}
            placeholder="Col 1"
            className={`w-full px-4 py-2 mb-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
          />
          <input
            type="text"
            value={col2}
            onChange={(e) => setCol2(e.target.value)}
            placeholder="Col 2"
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
          />
        </div>
      </div>

      {/* Conditional Logic */}
      <div>
        <span className={`${secondaryText}`}>Conditional logic (show when...)</span>
      </div>

      {/* Required + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label className={`flex items-center ${labelText}`}>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => setRequired(e.target.checked)}
            className="mr-2 text-blue-600 rounded form-checkbox"
          />
          Required
        </label>
        <div className="flex gap-4">
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition-colors duration-300"
          >
            Delete
          </button>
          <button
            onClick={onCopy}
            className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridComponent;
