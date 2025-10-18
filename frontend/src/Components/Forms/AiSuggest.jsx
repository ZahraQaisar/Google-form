import React, { useEffect, useState } from "react";
import usePersistentState from "../../hooks/usePersistentState";

const AiSuggestComponent = ({ placeholder, onCopy, onDelete }) => {
    // Persistent states
    const [title, setTitle] = usePersistentState("ai-title", "");
    const [description, setDescription] = usePersistentState("ai-description", "");
    const [prefillKey, setPrefillKey] = usePersistentState("ai-prefillKey", "");
    const [inputType, setInputType] = usePersistentState("ai-inputType", "Text");
    const [regex, setRegex] = usePersistentState("ai-regex", "");
    const [minLength, setMinLength] = usePersistentState("ai-minLength", "");
    const [required, setRequired] = usePersistentState("ai-required", false);

    // Theme detection
    const [theme, setTheme] = useState("light");
    useEffect(() => {
        const updateTheme = () => setTheme(document.documentElement.getAttribute("data-theme") || "light");
        updateTheme();
        const observer = new MutationObserver(updateTheme);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
        return () => observer.disconnect();
    }, []);

    const isDark = theme === "dark";
    const containerBg = isDark ? "bg-base-800 text-gray-100" : "bg-white text-gray-900";
    const inputBg = isDark ? "bg-base-700 text-gray-100 placeholder-gray-400 border-white/20" : "bg-white text-gray-900 placeholder-gray-400 border-gray-300";
    const labelText = isDark ? "text-gray-300" : "text-gray-700";
    const secondaryText = isDark ? "text-gray-400" : "text-gray-500";

    return (
        <div className={`space-y-4 p-4 rounded-lg shadow-md transition-colors duration-300 ${containerBg}`}>
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={placeholder || "Question title (use {{qid}} to reference answers)"}
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

            {/* Type, Regex, Min Length */}
            <div className="flex flex-col sm:flex-row gap-4">
                <select
                    value={inputType}
                    onChange={(e) => setInputType(e.target.value)}
                    className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
                >
                    <option>Text</option>
                    <option>Email</option>
                    <option>Number</option>
                </select>
                <input
                    type="text"
                    value={regex}
                    onChange={(e) => setRegex(e.target.value)}
                    placeholder="Regex pattern"
                    className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
                />
                <input
                    type="number"
                    value={minLength}
                    onChange={(e) => setMinLength(e.target.value)}
                    placeholder="Min length"
                    className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ${inputBg}`}
                />
            </div>

            {/* Conditional Logic */}
            <div className="mt-4">
                <span className={secondaryText}>Conditional logic (show when...)</span>
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

export default AiSuggestComponent;
