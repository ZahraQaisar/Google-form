import React, { useEffect, useState } from "react";
import usePersistentState from "../../hooks/usePersistentState";

const FileUploadComponent = ({ placeholder, onCopy, onDelete }) => {
  // Persistent inputs
  const [title, setTitle] = usePersistentState("fileupload-title", "");
  const [description, setDescription] = usePersistentState("fileupload-description", "");
  const [prefillKey, setPrefillKey] = usePersistentState("fileupload-prefillKey", "");
  const [required, setRequired] = usePersistentState("fileupload-required", false);
  const [fileData, setFileData] = usePersistentState("fileupload-fileData", null); // { name, type, data }

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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setFileData({
          name: selectedFile.name,
          type: selectedFile.type,
          data: reader.result,
        });
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleClearFile = () => setFileData(null);

  return (
    <div className={`space-y-4 p-4 rounded-lg shadow-md transition-colors duration-300 ${containerBg}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h2 className={`text-xl font-semibold ${labelText}`}>File Upload</h2>
        <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          File upload
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

      {/* File Upload */}
      <div className="flex flex-col gap-2">
        <input
          type="file"
          onChange={handleFileChange}
          className={`block w-full text-sm file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0 file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 transition-colors duration-300`}
        />

        {fileData && (
          <div className={`mt-2 text-sm ${secondaryText}`}>
            <p><strong>Selected file:</strong> {fileData.name}</p>
            {fileData.type.startsWith("image/") && (
              <img
                src={fileData.data}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg border"
              />
            )}
            <button
              onClick={handleClearFile}
              className="mt-2 text-red-500 hover:text-red-700 transition-colors duration-300 text-sm"
            >
              Remove file
            </button>
          </div>
        )}
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

export default FileUploadComponent;
