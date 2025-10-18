import React, { useEffect, useState } from "react";
import {
  Type,
  FileText,
  List,
  CheckSquare,
  ChevronDown,
  Calendar,
  Clock,
  Upload,
  Sliders,
  Grid,
  Sparkles,
  FolderPlus,
  LayoutTemplate,
} from "lucide-react";

                  // {/* ============================ Updated this part ============================ */}
const Sidebar = ({ onBrowseTemplatesClick, onAddSection, onSelectQuestion, onAiSuggestClick }) => {
                  // ============================ Till this ============================

  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const observer = new MutationObserver(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      setTheme(currentTheme);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const questionTypes = [
    { label: "Short answer", icon: Type },
    { label: "Paragraph", icon: FileText },
    { label: "Multiple choice", icon: List },
    { label: "Checkboxes", icon: CheckSquare },
    { label: "Dropdown", icon: ChevronDown },
    { label: "Date", icon: Calendar },
    { label: "Time", icon: Clock },
    { label: "File upload", icon: Upload },
    { label: "Linear scale", icon: Sliders },
    { label: "Grid / Matrix", icon: Grid },
  ];

  return (
        //         {/* ============================ Updated this part ============================ */}
        // dark mode classes added
        <aside className={`w-full max-w-md mx-auto order-2 lg:order-none border rounded-xl p-4 sm:p-5 shadow-sm mt-4 mr-8 mb-8 lg:mt-6 lg:ml-6 h-auto self-start
          ${theme === "dark" ? "bg-base-200 border-white/20" : "bg-gray-50 border-gray-300"}`}>
            {/* ============================ Till this ============================ */}      
          <div>
        <h2 className={`text-xs font-semibold mb-3 uppercase tracking-wide opacity-70 ${theme === "dark" ? "text-gray-400" : ""}`}>
          Add a question
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {questionTypes.map(({ label, icon: Icon }, i) => (
            <button
              key={i}
              onClick={() => onSelectQuestion(label)}
              // dark mode classes added
              // dark mode border adjusted
              className={`w-full flex items-center gap-2 rounded-lg border p-3 text-xs font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition whitespace-nowrap
                ${theme === "dark" ? "bg-base-800 border-white/20" : "bg-base-100 border-base-300"}`}>
              <Icon className="w-5 h-5 text-purple-500" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
      </div>

            {/*============================ Updated this part ============================ */}

            {/* AI assist */}
            <div className="mt-8">
                <h2 className={`text-xs font-semibold mb-2 uppercase tracking-wide ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    AI assist
                </h2>
                <button
                    onClick={onAiSuggestClick}   
                    // dark mode classes added
                    // dark mode border adjusted
                    className={`w-full flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition
                      ${theme === "dark" ? "bg-base-800 border-white/20 text-gray-200" : "bg-white border-gray-200 text-gray-700"}`}>
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Suggest next questions
                </button>
            </div>

            {/* ============================ Till this ============================ */}

      {/* Structure */}
      <div className="mt-8">
        <h2 className={`text-xs font-semibold mb-2 uppercase tracking-wide opacity-70 ${theme === "dark" ? "text-gray-400" : ""}`}>
          Structure
        </h2>
        <button
          onClick={onAddSection}
          // dark mode classes added
          // dark mode border adjusted
          className={`w-full flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition
            ${theme === "dark" ? "bg-base-800 border-white/20" : "bg-base-100 border-base-300"}`}>
          <FolderPlus className="w-5 h-5 text-purple-500" />
          Add section
        </button>
      </div>

      {/* Templates section */}
      <div className="mt-8">
        <h2 className={`text-xs font-semibold mb-2 uppercase tracking-wide opacity-70 ${theme === "dark" ? "text-gray-400" : ""}`}>
          Templates
        </h2>
        <button
          onClick={onBrowseTemplatesClick}
          // dark mode classes added
          // dark mode border adjusted
          className={`w-full flex items-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium shadow-sm hover:border-purple-400 hover:text-purple-600 transition
            ${theme === "dark" ? "bg-base-800 border-white/20" : "bg-base-100 border-base-300"}`}>
          <LayoutTemplate className="w-5 h-5 text-purple-500" />
          Browse templates
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
