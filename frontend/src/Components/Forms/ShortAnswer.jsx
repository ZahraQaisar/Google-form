import React, { useEffect, useState } from "react";

const ShortAnswerComponent = ({
  placeholder,
  value,
  description,
  prefill,
  regex,
  minLength,
  required,
  onChange,
  onCopy,
  onDelete,
}) => {
  const [theme, setTheme] = useState("light");

  // Detect theme changes like Sidebar/TimeComponent
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

  const containerBg = isDark ? "bg-base-800 text-gray-100" : "bg-white text-gray-900";
  const inputBg = isDark
    ? "bg-base-700 text-gray-100 placeholder-gray-400 border-white/20"
    : "bg-white text-gray-900 placeholder-gray-400 border-gray-300";
  const labelText = isDark ? "text-gray-300" : "text-gray-700";
  const secondaryText = isDark ? "text-gray-400" : "text-gray-500";

  return (
    <div
      className={`space-y-4 p-4 rounded-lg shadow-md transition-colors duration-300 ${containerBg}`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-xl font-semibold ${labelText}`}>Short Answer</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Short answer
        </span>
      </div>

      {/* Title */}
      <input
        type="text"
        placeholder={placeholder || "Question title (use {{qid}} to reference answers)"}
        value={value}
        onChange={(e) => onChange("value", e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
      />

      {/* Description + Prefill */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Description / help (optional)"
          value={description}
          onChange={(e) => onChange("description", e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
        <input
          type="text"
          placeholder="Prefill key (optional)"
          value={prefill}
          onChange={(e) => onChange("prefill", e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
      </div>

      {/* Regex + Min length */}
      <div className="flex flex-col sm:flex-row gap-4">
        <select
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        >
          <option>Text</option>
        </select>
        <input
          type="text"
          placeholder="Regex pattern"
          value={regex}
          onChange={(e) => onChange("regex", e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
        <input
          type="text"
          placeholder="Min length"
          value={minLength}
          onChange={(e) => onChange("minLength", e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
      </div>

      {/* Required Checkbox */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label className={`flex items-center ${labelText}`}>
          <input
            type="checkbox"
            checked={required}
            onChange={(e) => onChange("required", e.target.checked)}
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

export default ShortAnswerComponent;
