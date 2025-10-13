import React, { useState, useEffect } from "react";

const MultipleChoiceComponent = ({
  placeholder,
  value,
  description,
  prefill,
  options = [],
  required,
  selected,
  onChange,
  onCopy,
  onDelete,
}) => {
  const [theme, setTheme] = useState("light");

  // Detect theme changes like in TimeComponent
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

  // Add new option dynamically
  const handleAddOption = () => {
    const newOption = `Option ${options.length + 1}`;
    onChange("options", [...options, newOption]);
  };

  return (
    <div className={`space-y-4 p-4 rounded-lg shadow-md transition-colors duration-300 ${containerBg}`}>
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-xl font-semibold ${labelText}`}>Multiple Choice</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Multiple choice
        </span>
      </div>

      {/* Question Title */}
      <input
        type="text"
        placeholder={placeholder || "Question title (use {{qid}} to reference answers)"}
        value={value || ""}
        onChange={(e) => onChange("value", e.target.value)}
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
      />

      {/* Description + Prefill */}
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Description / help (optional)"
          value={description || ""}
          onChange={(e) => onChange("description", e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
        <input
          type="text"
          placeholder="Prefill key (optional)"
          value={prefill || ""}
          onChange={(e) => onChange("prefill", e.target.value)}
          className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
        />
      </div>

      {/* Dynamic Options */}
      <div className="space-y-2">
        {options.map((choice, index) => (
          <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
            <input
              type="radio"
              checked={selected === choice}
              onChange={() => onChange("selected", choice)}
              className="text-blue-600 form-radio"
            />
            <input
              type="text"
              value={choice}
              onChange={(e) => {
                const updated = [...options];
                updated[index] = e.target.value;
                onChange("options", updated);
              }}
              className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
            />
          </div>
        ))}
      </div>

      {/* Add option */}
      <button
        type="button"
        onClick={handleAddOption}
        className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-800"
      >
        + Add option
      </button>

      {/* Conditional logic */}
      <div>
        <span className={`${secondaryText}`}>Conditional logic (show when...)</span>
      </div>

      {/* Required Checkbox */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <label className={`flex items-center ${labelText}`}>
          <input
            type="checkbox"
            checked={required || false}
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

export default MultipleChoiceComponent;
